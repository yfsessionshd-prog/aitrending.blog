import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/content-store";
import { categories } from "@/lib/data";
import { aiModels, aiTools, topics } from "@/lib/public-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const articles = getAllArticles();
  return [
    { url: site, lastModified: new Date() },
    ...articles.map((article) => ({ url: `${site}/article/${article.slug}`, lastModified: new Date(article.publishedAt) })),
    ...articles.map((article) => ({ url: `${site}/news/${article.slug}`, lastModified: new Date(article.publishedAt) })),
    ...categories.map((category) => ({ url: `${site}/category/${category.toLowerCase().replaceAll(" ", "-")}`, lastModified: new Date() })),
    ...aiModels.map((model) => ({ url: `${site}/models/${model.slug}`, lastModified: new Date() })),
    ...aiTools.map((tool) => ({ url: `${site}/tools/${tool.slug}`, lastModified: new Date() })),
    ...topics.map((topic) => ({ url: `${site}/topics/${topic.slug}`, lastModified: new Date() })),
    ...["news", "models", "tools", "explainers", "about", "privacy", "terms", "contact", "community"].map((page) => ({ url: `${site}/${page}`, lastModified: new Date() }))
  ];
}
