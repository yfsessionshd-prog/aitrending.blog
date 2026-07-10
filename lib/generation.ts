import { slugify } from "./http";
import type { Article, DiscoveredItem } from "./types";

type GeneratedDraft = {
  title: string;
  excerpt: string;
  body: string[];
};

const fallbackImages = {
  agents: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
  models: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
  research: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1400&q=80",
  github: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1400&q=80",
  robotics: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1400&q=80",
  tools: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80"
};

function fallbackImageFor(item: DiscoveredItem) {
  const text = `${item.title} ${item.summary} ${item.category}`.toLowerCase();
  if (text.includes("agent")) return fallbackImages.agents;
  if (text.includes("github") || text.includes("open source")) return fallbackImages.github;
  if (text.includes("robot")) return fallbackImages.robotics;
  if (text.includes("research") || text.includes("paper") || text.includes("arxiv")) return fallbackImages.research;
  if (text.includes("tool") || text.includes("software")) return fallbackImages.tools;
  return fallbackImages.models;
}

function extractJson(value: string) {
  const match = value.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("Model did not return JSON");
  return JSON.parse(match[0]) as GeneratedDraft;
}

function fallbackDraft(item: DiscoveredItem): GeneratedDraft {
  return {
    title: item.title,
    excerpt: item.summary.slice(0, 240) || `New signal detected from ${item.source} about artificial intelligence.`,
    body: [
      `AITrending detected a relevant artificial intelligence signal from ${item.source}. The original item points to "${item.title}" and was selected because it connects to active AI development, research or adoption.`,
      item.summary || "The source did not provide a long summary, so this entry is published as a concise monitoring note while the system keeps tracking related updates.",
      "The practical relevance comes from its connection to model releases, developer tooling, open-source work, research activity or operational adoption. These signals are tracked together to identify what is gaining momentum across the AI ecosystem.",
      `Original source: ${item.url}`
    ]
  };
}

function validateDraft(draft: GeneratedDraft, item: DiscoveredItem): GeneratedDraft {
  const title = typeof draft.title === "string" && draft.title.length > 12 ? draft.title : item.title;
  const excerpt = typeof draft.excerpt === "string" && draft.excerpt.length > 30 ? draft.excerpt : item.summary.slice(0, 220);
  const body = Array.isArray(draft.body) ? draft.body.filter((paragraph) => typeof paragraph === "string" && paragraph.length > 80).slice(0, 7) : [];

  if (body.length < 3) return fallbackDraft(item);
  return { title, excerpt, body };
}

async function generateWithOpenRouter(item: DiscoveredItem): Promise<GeneratedDraft> {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) return fallbackDraft(item);

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      "X-Title": "AITrending"
    },
    body: JSON.stringify({
      model: process.env.OPENROUTER_MODEL || "meta-llama/llama-3.1-8b-instruct:free",
      messages: [
        {
          role: "system",
          content: "You are AITrending Staff. Write factual, neutral AI news in English. Return only valid JSON with title, excerpt and body array. Do not invent facts beyond the provided source summary."
        },
        {
          role: "user",
          content: JSON.stringify({
            source: item.source,
            sourceUrl: item.url,
            title: item.title,
            summary: item.summary,
            category: item.category,
            instruction: "Create a publishable AI news article with 4 to 6 clear paragraphs. Explain what happened, why it matters, who it affects and include source attribution."
          })
        }
      ],
      temperature: 0.32,
      max_tokens: 1200,
      response_format: { type: "json_object" }
    })
  });

  if (!response.ok) return fallbackDraft(item);
  const data = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
  return validateDraft(extractJson(data.choices?.[0]?.message?.content || ""), item);
}

async function generateImage(item: DiscoveredItem) {
  const key = process.env.MUAPI_API_KEY;
  if (!key) return fallbackImageFor(item);

  try {
    const response = await fetch("https://api.muapi.ai/api/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: `Editorial cinematic photo about artificial intelligence: ${item.title}. Premium tech newsroom, photorealistic, no text, no logos.`,
        aspect_ratio: "16:9"
      })
    });
    const data = await response.json() as { data?: Array<{ url?: string }>; url?: string };
    return data.data?.[0]?.url || data.url || fallbackImageFor(item);
  } catch {
    return fallbackImageFor(item);
  }
}

export async function createArticleFromSignal(item: DiscoveredItem): Promise<Article> {
  const draft = await generateWithOpenRouter(item);
  const image = await generateImage(item);
  const publishedAt = new Date().toISOString();
  const slug = `${slugify(draft.title)}-${Date.now().toString(36)}`;
  const words = draft.body.join(" ").split(/\s+/).filter(Boolean).length;

  return {
    slug,
    title: draft.title,
    excerpt: draft.excerpt,
    category: item.category,
    publishedAt,
    readingMinutes: Math.max(2, Math.ceil(words / 220)),
    views: "0",
    image,
    body: draft.body,
    sourceUrl: item.url,
    sourceName: item.source,
    tags: item.tags
  };
}
