import { readStore, writeStore } from "./file-store";

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

export function getIdeas() {
  return readStore<CommunityIdea[]>("community-ideas.json", seedIdeas).filter((idea) => !idea.hidden && idea.status !== "hidden").sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

export function getAllIdeasForAdmin() {
  return readStore<CommunityIdea[]>("community-ideas.json", seedIdeas).sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

export function getIdea(id: string) {
  return getAllIdeasForAdmin().find((idea) => idea.id === id && !idea.hidden && idea.status !== "hidden");
}

export function getComments(ideaId: string) {
  return readStore<CommunityComment[]>("community-comments.json", []).filter((comment) => comment.ideaId === ideaId && !comment.hidden).sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
}

export function getReports() {
  return readStore<CommunityReport[]>("community-reports.json", []).sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

export function canPostIdeaToday(authorId: string) {
  const start = Date.now() - 24 * 60 * 60 * 1000;
  return getAllIdeasForAdmin().filter((idea) => idea.authorId === authorId && Date.parse(idea.createdAt) > start).length < 3;
}

export function createIdea(input: Omit<CommunityIdea, "id" | "status" | "createdAt">) {
  if (!canPostIdeaToday(input.authorId)) throw new Error("Daily idea limit reached.");
  const ideas = readStore<CommunityIdea[]>("community-ideas.json", seedIdeas);
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
  writeStore("community-ideas.json", [idea, ...ideas]);
  return idea;
}

export function updateIdeaStatus(ideaId: string, authorId: string, status: IdeaStatus) {
  const ideas = readStore<CommunityIdea[]>("community-ideas.json", seedIdeas);
  const index = ideas.findIndex((idea) => idea.id === ideaId);
  if (index === -1) throw new Error("Idea not found.");
  if (ideas[index].authorId !== authorId) throw new Error("Only the author can update this idea.");
  ideas[index] = { ...ideas[index], status };
  writeStore("community-ideas.json", ideas);
  return ideas[index];
}

export function addComment(input: Omit<CommunityComment, "id" | "createdAt">) {
  const comments = readStore<CommunityComment[]>("community-comments.json", []);
  const comment: CommunityComment = {
    ...input,
    id: crypto.randomUUID(),
    content: input.content.slice(0, 1000),
    createdAt: new Date().toISOString()
  };
  writeStore("community-comments.json", [...comments, comment]);
  return comment;
}

export function addReport(input: Omit<CommunityReport, "id" | "status" | "createdAt">) {
  const reports = readStore<CommunityReport[]>("community-reports.json", []);
  const report: CommunityReport = {
    ...input,
    id: crypto.randomUUID(),
    reason: input.reason.slice(0, 500),
    status: "pending",
    createdAt: new Date().toISOString()
  };
  writeStore("community-reports.json", [report, ...reports]);
  return report;
}

export function moderateReport(reportId: string, action: ReportStatus) {
  const reports = readStore<CommunityReport[]>("community-reports.json", []);
  const report = reports.find((item) => item.id === reportId);
  if (!report) throw new Error("Report not found.");
  report.status = action;

  if (action === "hidden" || action === "deleted") {
    if (report.targetType === "idea") {
      const ideas = readStore<CommunityIdea[]>("community-ideas.json", seedIdeas);
      const idea = ideas.find((item) => item.id === report.targetId);
      if (idea) idea.hidden = true;
      writeStore("community-ideas.json", ideas);
    } else {
      const comments = readStore<CommunityComment[]>("community-comments.json", []);
      const comment = comments.find((item) => item.id === report.targetId);
      if (comment) comment.hidden = true;
      writeStore("community-comments.json", comments);
    }
  }

  writeStore("community-reports.json", reports);
  return report;
}
