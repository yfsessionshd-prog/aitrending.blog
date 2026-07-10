import { notFound } from "next/navigation";
import { OfficialLink } from "@/components/DirectoryCards";
import { ArticleCard } from "@/components/ArticleCard";
import { getAllArticles } from "@/lib/content-store";
import { aiModels } from "@/lib/public-data";

export function generateStaticParams() {
  return aiModels.map((model) => ({ slug: model.slug }));
}

export default async function ModelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const model = aiModels.find((item) => item.slug === slug);
  if (!model) notFound();
  const related = getAllArticles().filter((article) => article.category === "AI Models").slice(0, 3);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <p className="text-xs font-bold uppercase tracking-[0.26em] text-cyan">{model.company}</p>
      <h1 className="mt-3 font-display text-6xl font-bold">{model.name}</h1>
      <p className="mt-5 max-w-3xl text-xl leading-8 text-white/65">{model.description}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {[model.type, model.access, model.pricing, model.context, `Rating ${model.rating}`].map((item) => <span key={item} className="rounded-full border border-white/10 px-3 py-2 text-sm font-bold text-white/60">{item}</span>)}
      </div>
      <div className="mt-8"><OfficialLink href={model.officialUrl} /></div>
      <section className="mt-12">
        <h2 className="font-display text-3xl font-bold">Related news</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-3">{related.map((article) => <ArticleCard key={article.slug} article={article} />)}</div>
      </section>
    </main>
  );
}
