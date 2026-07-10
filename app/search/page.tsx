import { ArticleCard } from "@/components/ArticleCard";
import { getAllArticles } from "@/lib/content-store";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const params = await searchParams;
  const query = (params.q || "").toLowerCase();
  const articles = getAllArticles();
  const results = query ? articles.filter((article) => `${article.title} ${article.excerpt} ${article.category}`.toLowerCase().includes(query)) : articles;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="font-display text-5xl font-bold">Search</h1>
      <p className="mt-3 text-white/55">{results.length} results {query ? `for "${params.q}"` : ""}</p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {results.map((article) => <ArticleCard key={article.slug} article={article} />)}
      </div>
    </main>
  );
}
