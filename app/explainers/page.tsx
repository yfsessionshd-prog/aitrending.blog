import { ArticleCard } from "@/components/ArticleCard";
import { explainers } from "@/lib/public-data";

export default function ExplainersPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <p className="text-xs font-bold uppercase tracking-[0.26em] text-cyan">Explainers</p>
      <h1 className="mt-3 font-display text-5xl font-bold">Learn AI without the noise</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-white/62">Clear guides for models, agents, RAG, multimodal AI, prompts and production workflows.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {explainers.map((article, index) => <ArticleCard key={article.slug} article={article} large={index === 0} />)}
      </div>
    </main>
  );
}
