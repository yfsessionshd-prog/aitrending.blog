import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { articles as seedArticles } from "./data";
import { explainers } from "./public-data";
import type { Article } from "./types";

const storePath = join(process.cwd(), "data", "published-articles.json");

function ensureStore() {
  const directory = dirname(storePath);
  if (!existsSync(directory)) mkdirSync(directory, { recursive: true });
  if (!existsSync(storePath)) writeFileSync(storePath, "[]", "utf8");
}

export function getGeneratedArticles(): Article[] {
  ensureStore();
  try {
    const raw = readFileSync(storePath, "utf8").replace(/^\uFEFF/, "").trim();
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Article[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getAllArticles(): Article[] {
  const generated = getGeneratedArticles();
  const seen = new Set<string>();

  return [...generated, ...seedArticles, ...explainers]
    .filter((article) => {
      if (seen.has(article.slug)) return false;
      seen.add(article.slug);
      return true;
    })
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

export function findStoredArticle(slug: string) {
  return getAllArticles().find((article) => article.slug === slug);
}

export function saveArticles(newArticles: Article[]) {
  ensureStore();
  const current = getGeneratedArticles();
  const bySlug = new Map<string, Article>();

  for (const article of [...newArticles, ...current]) {
    bySlug.set(article.slug, article);
  }

  const next = Array.from(bySlug.values()).sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt)).slice(0, 250);
  writeFileSync(storePath, JSON.stringify(next, null, 2), "utf8");
  return next;
}
