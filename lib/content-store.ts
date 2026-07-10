import { articles as seedArticles } from "./data";
import { readStore, writeStore } from "./file-store";
import { explainers } from "./public-data";
import type { Article } from "./types";

export function getGeneratedArticles(): Article[] {
  const parsed = readStore<Article[]>("published-articles.json", []);
  return Array.isArray(parsed) ? parsed : [];
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
  const current = getGeneratedArticles();
  const bySlug = new Map<string, Article>();

  for (const article of [...newArticles, ...current]) {
    bySlug.set(article.slug, article);
  }

  const next = Array.from(bySlug.values()).sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt)).slice(0, 250);
  writeStore("published-articles.json", next);
  return next;
}
