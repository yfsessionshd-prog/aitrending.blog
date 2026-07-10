import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

export type IdeaStatus = "open" | "in_progress" | "complete" | "hidden";
export type IdeaCategory = "App" | "Web" | "AI/ML" | "Content" | "Other";
export type ReportStatus = "pending" | "dismissed" | "hidden" | "deleted";

export type CommunityIdea = {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  title: string;
  description: string;
  category: IdeaCategory;
  rolesNeeded: string[];
  contactLink?: string;
  status: IdeaStatus;
  createdAt: string;
  hidden?: boolean;
};

export type CommunityComment = {
  id: string;
  ideaId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
  hidden?: boolean;
};

export type CommunityReport = {
  id: string;
  targetType: "idea" | "comment";
  targetId: string;
  reporterId: string;
  reason: string;
  status: ReportStatus;
  createdAt: string;
};

const ideasPath = join(process.cwd(), "data", "community-ideas.json");
const commentsPath = join(process.cwd(), "data", "community-comments.json");
const reportsPath = join(process.cwd(), "data", "community-reports.json");

const seedIdeas: CommunityIdea[] = [
  {
    id: "ai-local-business-agent",
    authorId: "seed",
    authorName: "AITrending Team",
    authorAvatar: "",
    title: "AI agent for local business lead follow-up",
    description: "A lightweight agent that captures website leads, qualifies intent, drafts replies and reminds the owner when a human follow-up is needed.",
    category: "AI/ML",
    rolesNeeded: ["Developer", "Marketing"],
    contactLink: "team@aitrending.local",
    status: "open",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "prompt-library-for-creators",
    authorId: "seed",
    authorName: "AITrending Team",
    authorAvatar: "",
    title: "Prompt library for Spanish-speaking creators",
    description: "A curated prompt library for YouTube scripts, thumbnails, shorts, newsletters and research workflows.",
    category: "Content",
    rolesNeeded: ["Designer", "Content"],
    contactLink: "",
    status: "in_progress",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
  }
];

function ensureFile(path: string, fallback: unknown) {
  const directory = dirname(path);
  if (!existsSync(directory)) mkdirSync(directory, { recursive: true });
  if (!existsSync(path)) writeFileSync(path, JSON.stringify(fallback, null, 2), "utf8");
}

function readJson<T>(path: string, fallback: T): T {
  ensureFile(path, fallback);
  try {
    const raw = readFileSync(path, "utf8").replace(/^\uFEFF/, "").trim();
    return raw ? JSON.parse(raw) as T : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(path: string, data: unknown) {
  writeFileSync(path, JSON.stringify(data, null, 2), "utf8");
}

export function getIdeas() {
  return readJson<CommunityIdea[]>(ideasPath, seedIdeas).filter((idea) => !idea.hidden && idea.status !== "hidden").sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

export function getAllIdeasForAdmin() {
  return readJson<CommunityIdea[]>(ideasPath, seedIdeas).sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

export function getIdea(id: string) {
  return getAllIdeasForAdmin().find((idea) => idea.id === id && !idea.hidden && idea.status !== "hidden");
}

export function getComments(ideaId: string) {
  return readJson<CommunityComment[]>(commentsPath, []).filter((comment) => comment.ideaId === ideaId && !comment.hidden).sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
}

export function getReports() {
  return readJson<CommunityReport[]>(reportsPath, []).sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

export function canPostIdeaToday(authorId: string) {
  const start = Date.now() - 24 * 60 * 60 * 1000;
  return getAllIdeasForAdmin().filter((idea) => idea.authorId === authorId && Date.parse(idea.createdAt) > start).length < 3;
}

export function createIdea(input: Omit<CommunityIdea, "id" | "status" | "createdAt">) {
  if (!canPostIdeaToday(input.authorId)) throw new Error("Daily idea limit reached.");
  const ideas = readJson<CommunityIdea[]>(ideasPath, seedIdeas);
  const idea: CommunityIdea = {
    ...input,
    id: crypto.randomUUID(),
    title: input.title.slice(0, 80),
    description: input.description.slice(0, 1400),
    rolesNeeded: input.rolesNeeded.slice(0, 6),
    contactLink: input.contactLink?.slice(0, 180),
    status: "open",
    createdAt: new Date().toISOString()
  };
  writeJson(ideasPath, [idea, ...ideas]);
  return idea;
}

export function updateIdeaStatus(ideaId: string, authorId: string, status: IdeaStatus) {
  const ideas = readJson<CommunityIdea[]>(ideasPath, seedIdeas);
  const index = ideas.findIndex((idea) => idea.id === ideaId);
  if (index === -1) throw new Error("Idea not found.");
  if (ideas[index].authorId !== authorId) throw new Error("Only the author can update this idea.");
  ideas[index] = { ...ideas[index], status };
  writeJson(ideasPath, ideas);
  return ideas[index];
}

export function addComment(input: Omit<CommunityComment, "id" | "createdAt">) {
  const comments = readJson<CommunityComment[]>(commentsPath, []);
  const comment: CommunityComment = {
    ...input,
    id: crypto.randomUUID(),
    content: input.content.slice(0, 1000),
    createdAt: new Date().toISOString()
  };
  writeJson(commentsPath, [...comments, comment]);
  return comment;
}

export function addReport(input: Omit<CommunityReport, "id" | "status" | "createdAt">) {
  const reports = readJson<CommunityReport[]>(reportsPath, []);
  const report: CommunityReport = {
    ...input,
    id: crypto.randomUUID(),
    reason: input.reason.slice(0, 500),
    status: "pending",
    createdAt: new Date().toISOString()
  };
  writeJson(reportsPath, [report, ...reports]);
  return report;
}

export function moderateReport(reportId: string, action: ReportStatus) {
  const reports = readJson<CommunityReport[]>(reportsPath, []);
  const report = reports.find((item) => item.id === reportId);
  if (!report) throw new Error("Report not found.");
  report.status = action;

  if (action === "hidden" || action === "deleted") {
    if (report.targetType === "idea") {
      const ideas = readJson<CommunityIdea[]>(ideasPath, seedIdeas);
      const idea = ideas.find((item) => item.id === report.targetId);
      if (idea) idea.hidden = true;
      writeJson(ideasPath, ideas);
    } else {
      const comments = readJson<CommunityComment[]>(commentsPath, []);
      const comment = comments.find((item) => item.id === report.targetId);
      if (comment) comment.hidden = true;
      writeJson(commentsPath, comments);
    }
  }

  writeJson(reportsPath, reports);
  return report;
}
