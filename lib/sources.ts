import { fetchWithRetry } from "./http";
import type { Category, DiscoveredItem } from "./types";

const aiTerms = [
  "artificial intelligence",
  "AI model",
  "OpenAI",
  "Anthropic",
  "Google DeepMind",
  "machine learning",
  "LLM",
  "AI agent",
  "generative AI",
  "open source AI",
  "robotics AI"
];

function clean(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function scoreText(text: string) {
  const lower = text.toLowerCase();
  return aiTerms.reduce((score, term) => score + (lower.includes(term.toLowerCase()) ? 12 : 0), 10);
}

function categorize(text: string): Category {
  const lower = text.toLowerCase();
  if (lower.includes("github") || lower.includes("open source")) return "Open Source";
  if (lower.includes("robot")) return "Robotics";
  if (lower.includes("paper") || lower.includes("arxiv") || lower.includes("research")) return "Research";
  if (lower.includes("model") || lower.includes("llm") || lower.includes("gpt") || lower.includes("claude") || lower.includes("gemini")) return "AI Models";
  if (lower.includes("tool") || lower.includes("app") || lower.includes("software")) return "Tools";
  if (lower.includes("startup") || lower.includes("funding")) return "Startups";
  return "News";
}

function toItem(input: Omit<DiscoveredItem, "score" | "category" | "tags">): DiscoveredItem {
  const text = `${input.title} ${input.summary}`;
  return {
    ...input,
    score: scoreText(text),
    category: categorize(text),
    tags: aiTerms.filter((term) => text.toLowerCase().includes(term.toLowerCase())).slice(0, 5)
  };
}

async function searchArxiv(): Promise<DiscoveredItem[]> {
  const query = encodeURIComponent('all:"artificial intelligence" OR all:"large language model" OR all:"generative ai"');
  const response = await fetchWithRetry(`https://export.arxiv.org/api/query?search_query=${query}&sortBy=submittedDate&sortOrder=descending&max_results=10`);
  const xml = await response.text();
  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];

  return entries.map((entry) => {
    const block = entry[1];
    const title = clean(block.match(/<title>([\s\S]*?)<\/title>/)?.[1] || "Untitled AI research");
    const summary = clean(block.match(/<summary>([\s\S]*?)<\/summary>/)?.[1] || "");
    const url = clean(block.match(/<id>([\s\S]*?)<\/id>/)?.[1] || "https://arxiv.org");
    const publishedAt = clean(block.match(/<published>([\s\S]*?)<\/published>/)?.[1] || new Date().toISOString());
    return toItem({ id: `arxiv:${url}`, title, summary, url, source: "arXiv", publishedAt });
  });
}

async function searchGitHub(): Promise<DiscoveredItem[]> {
  const created = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const response = await fetchWithRetry(`https://api.github.com/search/repositories?q=topic:artificial-intelligence+created:>${created}&sort=stars&order=desc&per_page=10`);
  const data = await response.json() as { items?: Array<{ id: number; full_name: string; description: string | null; html_url: string; created_at: string; stargazers_count: number }> };

  return (data.items || []).map((repo) => toItem({
    id: `github:${repo.id}`,
    title: `${repo.full_name} gains attention in AI open source`,
    summary: `${repo.description || "New AI repository"} Stars: ${repo.stargazers_count}.`,
    url: repo.html_url,
    source: "GitHub",
    publishedAt: repo.created_at
  }));
}

async function searchHackerNews(): Promise<DiscoveredItem[]> {
  const response = await fetchWithRetry("https://hn.algolia.com/api/v1/search_by_date?query=AI%20OR%20LLM%20OR%20OpenAI%20OR%20Anthropic&tags=story&hitsPerPage=10");
  const data = await response.json() as { hits?: Array<{ objectID: string; title: string | null; url: string | null; created_at: string; points?: number }> };

  return (data.hits || []).filter((hit) => hit.title && hit.url).map((hit) => toItem({
    id: `hn:${hit.objectID}`,
    title: hit.title || "AI story on Hacker News",
    summary: `Hacker News discussion with ${hit.points || 0} points.`,
    url: hit.url || "https://news.ycombinator.com",
    source: "Hacker News",
    publishedAt: hit.created_at
  }));
}

async function searchReddit(): Promise<DiscoveredItem[]> {
  const response = await fetchWithRetry("https://www.reddit.com/r/artificial+MachineLearning+LocalLLaMA/search.json?q=AI%20OR%20LLM%20OR%20OpenAI&restrict_sr=1&sort=new&limit=10");
  const data = await response.json() as { data?: { children?: Array<{ data: { id: string; title: string; selftext?: string; permalink: string; created_utc: number; score: number } }> } };

  return (data.data?.children || []).map(({ data: post }) => toItem({
    id: `reddit:${post.id}`,
    title: post.title,
    summary: clean(post.selftext || `Reddit discussion with score ${post.score}.`),
    url: `https://www.reddit.com${post.permalink}`,
    source: "Reddit",
    publishedAt: new Date(post.created_utc * 1000).toISOString()
  }));
}

async function searchRss(): Promise<DiscoveredItem[]> {
  const feeds = [
    ["TechCrunch AI", "https://techcrunch.com/category/artificial-intelligence/feed/"],
    ["VentureBeat AI", "https://venturebeat.com/category/ai/feed/"],
    ["The Verge AI", "https://www.theverge.com/ai-artificial-intelligence/rss/index.xml"]
  ] as const;
  const results = await Promise.allSettled(feeds.map(async ([source, url]) => {
    const response = await fetchWithRetry(url);
    const xml = await response.text();
    return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, 6).map((entry) => {
      const block = entry[1];
      const title = clean(block.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>|<title>([\s\S]*?)<\/title>/)?.[1] || block.match(/<title>([\s\S]*?)<\/title>/)?.[1] || "AI news update");
      const summary = clean(block.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>|<description>([\s\S]*?)<\/description>/)?.[1] || "");
      const link = clean(block.match(/<link>([\s\S]*?)<\/link>/)?.[1] || url);
      const date = clean(block.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] || new Date().toISOString());
      return toItem({ id: `rss:${link}`, title, summary, url: link, source, publishedAt: new Date(date).toISOString() });
    });
  }));

  return results.flatMap((result) => result.status === "fulfilled" ? result.value : []);
}

export async function discoverAiSignals() {
  const searches = await Promise.allSettled([searchArxiv(), searchGitHub(), searchHackerNews(), searchReddit(), searchRss()]);
  const items = searches.flatMap((result) => result.status === "fulfilled" ? result.value : []);
  const unique = new Map<string, DiscoveredItem>();

  for (const item of items) {
    if (item.score >= 20 && !unique.has(item.url)) unique.set(item.url, item);
  }

  return Array.from(unique.values()).sort((a, b) => b.score - a.score).slice(0, 12);
}
