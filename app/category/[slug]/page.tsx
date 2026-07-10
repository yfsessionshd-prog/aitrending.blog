import { ArticleCard } from "@/components/ArticleCard";
import { getAllArticles } from "@/lib/content-store";
import { categories } from "@/lib/data";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.toLowerCase().replaceAll(" ", "-") }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const items = getAllArticles().filter((article) => article.category.toLowerCase().replaceAll(" ", "-") === slug);
  const title = slug.split("-").map((part) => part[0].toUpperCase() + part.slice(1)).join(" ");

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="font-display text-5xl font-bold">{title}</h1>
      <p className="mt-3 text-white/55">{items.length} stories tracked by AITrending.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {items.map((article) => <ArticleCard key={article.slug} article={article} />)}
      </div>
    </main>
  );
}
