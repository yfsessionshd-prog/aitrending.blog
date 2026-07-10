import { redirect } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { getCurrentUser, getProfile } from "@/lib/auth-store";
import { getAllArticles } from "@/lib/content-store";

export default async function BookmarksPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");
  const profile = getProfile(user.id);
  const bookmarks = new Set(profile?.bookmarks || []);
  const articles = getAllArticles().filter((article) => bookmarks.has(article.slug));

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <p className="text-xs font-bold uppercase tracking-[0.26em] text-cyan">Bookmarks</p>
      <h1 className="mt-3 font-display text-5xl font-bold">Saved items</h1>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {articles.length ? articles.map((article) => <ArticleCard key={article.slug} article={article} />) : <p className="text-white/55">No saved articles yet.</p>}
      </div>
    </main>
  );
}
