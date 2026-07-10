import { ArticleCard } from "@/components/ArticleCard";
import { NativeSponsor } from "@/components/NativeSponsor";
import { getAllArticles } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default function NewsPage() {
  const articles = getAllArticles();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <p className="text-xs font-bold uppercase tracking-[0.26em] text-cyan">Newsroom</p>
      <h1 className="mt-3 font-display text-5xl font-bold">Latest AI News</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-white/62">Fresh signals across AI models, companies, research, tools and open-source development.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {articles.slice(0, 6).map((article, index) => <ArticleCard key={article.slug} article={article} large={index === 0} />)}
      </div>
      <div className="mt-8"><NativeSponsor /></div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {articles.slice(6).map((article) => <ArticleCard key={article.slug} article={article} />)}
      </div>
    </main>
  );
}
