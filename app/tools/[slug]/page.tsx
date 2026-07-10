import { notFound } from "next/navigation";
import { OfficialLink, ToolCard } from "@/components/DirectoryCards";
import { aiTools } from "@/lib/public-data";

export function generateStaticParams() {
  return aiTools.map((tool) => ({ slug: tool.slug }));
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = aiTools.find((item) => item.slug === slug);
  if (!tool) notFound();
  const alternatives = aiTools.filter((item) => tool.alternatives.includes(item.name)).slice(0, 3);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <p className="text-xs font-bold uppercase tracking-[0.26em] text-violet">{tool.category}</p>
      <h1 className="mt-3 font-display text-6xl font-bold">{tool.name}</h1>
      <p className="mt-5 max-w-3xl text-xl leading-8 text-white/65">{tool.description}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {[tool.price, tool.freePlan ? "Free plan available" : "Paid only", `Rating ${tool.rating}`].map((item) => <span key={item} className="rounded-full border border-white/10 px-3 py-2 text-sm font-bold text-white/60">{item}</span>)}
      </div>
      <div className="mt-8"><OfficialLink href={tool.officialUrl} /></div>
      <section className="mt-12">
        <h2 className="font-display text-3xl font-bold">Alternatives</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-3">{alternatives.map((item) => <ToolCard key={item.slug} tool={item} />)}</div>
      </section>
    </main>
  );
}
