export type Category = "News" | "AI Models" | "Tools" | "Analysis" | "Explainers" | "Open Source" | "Robotics" | "Startups" | "Research" | "Business" | "Security";

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  publishedAt: string;
  readingMinutes: number;
  views: string;
  image: string;
  featured?: boolean;
  body: string[];
  sourceUrl?: string;
  sourceName?: string;
  tags?: string[];
};

export type DiscoveredItem = {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  publishedAt: string;
  score: number;
  category: Category;
  tags: string[];
};

export type GitHubRepo = {
  id: string;
  name: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string;
  topics: string[];
  updatedAt: string;
  useCase: string;
};

export type PromptItem = {
  id: string;
  title: string;
  category: string;
  prompt: string;
  description: string;
  popularity: number;
};

export type IdeaItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  monetization: string;
  difficulty: "Easy" | "Medium" | "Advanced";
};

export type Trend = {
  rank: number;
  label: string;
  delta: "up" | "down";
};

export type ModelLaunch = {
  name: string;
  version: string;
  date: string;
};
