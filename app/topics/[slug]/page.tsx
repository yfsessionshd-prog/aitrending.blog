import { ArticleCard } from "@/components/ArticleCard";
import { getAllArticles } from "@/lib/content-store";
import { topics } from "@/lib/public-data";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return topics.map((topic) => ({ slug: topic.slug }));
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = topics.find((item) => item.slug === slug);
  if (!topic) notFound();
  const articles = getAllArticles().filter((article) => `${article.title} ${article.excerpt} ${article.category} ${(article.tags || []).join(" ")}`.toLowerCase().includes(topic.slug.replaceAll("-", " ").split(" ")[0])).slice(0, 9);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <p className="text-xs font-bold uppercase tracking-[0.26em] text-cyan">Live Topic</p>
      <h1 className="mt-3 font-display text-5xl font-bold">{topic.title}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-white/62">{topic.description}</p>
      <div className="mt-5 flex gap-2 text-sm font-bold text-white/55">
        <span>{topic.interactions} interactions</span>
        <span>·</span>
        <span>Updated {topic.updated}</span>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {(articles.length ? articles : getAllArticles().slice(0, 6)).map((article) => <ArticleCard key={article.slug} article={article} />)}
      </div>
    </main>
  );
}
