import { getAllArticles } from "@/lib/content-store";

export function GET() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const articles = getAllArticles();
  const items = articles.map((article) => `<item><title>${article.title}</title><link>${site}/article/${article.slug}</link><description>${article.excerpt}</description><pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate></item>`).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>AITrending</title><link>${site}</link><description>AI news and trends</description>${items}</channel></rss>`, {
    headers: { "Content-Type": "application/rss+xml" }
  });
}
