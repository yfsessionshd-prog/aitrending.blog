import { getCurrentUser, isAdminRole } from "@/lib/auth-store";
import { getAllArticles, saveArticles } from "@/lib/content-store";
import { slugify } from "@/lib/http";
import type { Article, Category } from "@/lib/types";

async function requireAdmin() {
  const user = await getCurrentUser();
  return user && isAdminRole(user.role) ? user : null;
}

export async function GET() {
  const user = await requireAdmin();
  if (!user) return Response.json({ error: "Forbidden" }, { status: 403 });
  return Response.json({ articles: getAllArticles() });
}

export async function POST(request: Request) {
  const user = await requireAdmin();
  if (!user) return Response.json({ error: "Forbidden" }, { status: 403 });
  const body = await request.json().catch(() => ({}));
  const title = String(body.title || "").trim();
  if (title.length < 8) return Response.json({ error: "Title is required." }, { status: 400 });
  const article: Article = {
    slug: String(body.slug || slugify(title)),
    title,
    excerpt: String(body.excerpt || "").slice(0, 260),
    category: (body.category || "News") as Category,
    publishedAt: body.status === "scheduled" && body.scheduledAt ? String(body.scheduledAt) : new Date().toISOString(),
    readingMinutes: Math.max(2, Math.ceil(String(body.content || "").split(/\s+/).length / 220)),
    views: "0",
    image: String(body.image || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80"),
    featured: Boolean(body.featured),
    body: String(body.content || "").split(/\n{2,}/).filter(Boolean),
    sourceName: "AITrending Staff",
    tags: Array.isArray(body.tags) ? body.tags.map(String) : []
  };
  saveArticles([article]);
  return Response.json({ ok: true, article });
}
