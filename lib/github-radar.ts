import { fetchWithRetry } from "./http";
import type { GitHubRepo } from "./types";

type GitHubSearchResponse = {
  items?: Array<{
    id: number;
    full_name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    topics?: string[];
    updated_at: string;
  }>;
};

type GitHubRepoApiItem = NonNullable<GitHubSearchResponse["items"]>[number];

function repoUseCase(repo: GitHubRepoApiItem) {
  const text = `${repo.full_name} ${repo.description || ""} ${(repo.topics || []).join(" ")}`.toLowerCase();
  if (text.includes("agent")) return "Build AI agents, tool-calling workflows or autonomous assistants.";
  if (text.includes("rag") || text.includes("retrieval")) return "Create knowledge-base search, chat with documents or enterprise AI assistants.";
  if (text.includes("image") || text.includes("vision")) return "Work with image generation, computer vision or visual understanding.";
  if (text.includes("llm") || text.includes("model")) return "Run, evaluate or integrate language models in real products.";
  if (text.includes("automation")) return "Automate repetitive work using AI pipelines.";
  return "Explore practical AI development, tooling or research workflows.";
}

export async function discoverGitHubRepos() {
  const queries = [
    "topic:artificial-intelligence stars:>500",
    "topic:llm stars:>500",
    "topic:ai-agents stars:>100",
    "topic:rag stars:>300",
    "topic:generative-ai stars:>300"
  ];

  const responses = await Promise.allSettled(queries.map(async (query) => {
    const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=12`;
    const response = await fetchWithRetry(url);
    return await response.json() as GitHubSearchResponse;
  }));

  const repos = new Map<string, GitHubRepo>();
  for (const result of responses) {
    if (result.status !== "fulfilled") continue;
    for (const repo of result.value.items || []) {
      repos.set(repo.full_name, {
        id: String(repo.id),
        name: repo.full_name,
        description: repo.description || "AI repository with strong community traction.",
        url: repo.html_url,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language || "Mixed",
        topics: repo.topics || [],
        updatedAt: repo.updated_at,
        useCase: repoUseCase(repo)
      });
    }
  }

  return Array.from(repos.values()).sort((a, b) => b.stars - a.stars).slice(0, 24);
}

export async function searchGitHubRepos(query: string) {
  const safeQuery = query.trim() || "AI tools";
  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(`${safeQuery} in:name,description,readme`)}&sort=stars&order=desc&per_page=12`;
  const response = await fetchWithRetry(url);
  const data = await response.json() as GitHubSearchResponse;

  return (data.items || []).map((repo) => ({
    id: String(repo.id),
    name: repo.full_name,
    description: repo.description || "AI repository with strong community traction.",
    url: repo.html_url,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    language: repo.language || "Mixed",
    topics: repo.topics || [],
    updatedAt: repo.updated_at,
    useCase: repoUseCase(repo)
  }));
}
