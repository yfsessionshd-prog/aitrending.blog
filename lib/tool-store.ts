import { readStore, writeStore } from "./file-store";
import type { GitHubRepo, IdeaItem, PromptItem } from "./types";

type ToolStore = {
  repos: GitHubRepo[];
  prompts: PromptItem[];
  ideas: IdeaItem[];
  updatedAt: string;
};

const seed: ToolStore = {
  updatedAt: new Date().toISOString(),
  repos: [],
  prompts: [
    {
      id: "prompt-ai-business-plan",
      title: "AI business plan generator",
      category: "Business",
      prompt: "Act as a startup strategist. Build a practical AI business plan for [industry], including audience, offer, automation stack, pricing, acquisition channels, and first 30 days of execution.",
      description: "Creates a structured plan to launch a small AI-powered business.",
      popularity: 94
    },
    {
      id: "prompt-content-engine",
      title: "SEO content engine",
      category: "Marketing",
      prompt: "Create a content calendar for [niche] using AI search intent. Include keywords, titles, article angles, lead magnets, and monetization opportunities.",
      description: "Useful for blogs, newsletters and educational AI content sites.",
      popularity: 89
    }
  ],
  ideas: [
    {
      id: "idea-local-ai-automation",
      title: "Local business AI automation setup",
      category: "Make Money",
      description: "Sell workflow automation packages to local companies: lead capture, email replies, FAQ bots and report generation.",
      monetization: "Setup fee plus monthly maintenance.",
      difficulty: "Medium"
    },
    {
      id: "idea-niche-ai-directory",
      title: "Niche AI tools directory",
      category: "Software",
      description: "Build a focused directory for one industry, rank tools, publish comparisons and monetize with ads and affiliates.",
      monetization: "Sponsorships, partnerships and featured listings.",
      difficulty: "Easy"
    }
  ]
};

export function getToolStore(): ToolStore {
  const parsed = readStore<ToolStore>("tool-radar.json", seed);
  return {
    updatedAt: parsed.updatedAt || new Date().toISOString(),
    repos: Array.isArray(parsed.repos) ? parsed.repos : [],
    prompts: Array.isArray(parsed.prompts) && parsed.prompts.length ? parsed.prompts : seed.prompts,
    ideas: Array.isArray(parsed.ideas) && parsed.ideas.length ? parsed.ideas : seed.ideas
  };
}

export function saveToolStore(next: Partial<ToolStore>) {
  const current = getToolStore();
  const merged: ToolStore = {
    updatedAt: new Date().toISOString(),
    repos: next.repos || current.repos,
    prompts: next.prompts || current.prompts,
    ideas: next.ideas || current.ideas
  };

  writeStore("tool-radar.json", merged);
  return merged;
}
