import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { ArticleCard } from "@/components/ArticleCard";
import { getAllArticles, findStoredArticle } from "@/lib/content-store";
import { cleanText } from "@/lib/text";

export function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = findStoredArticle(slug);
  if (!article) notFound();
  const related = getAllArticles().filter((item) => item.slug !== article.slug).slice(0, 3);

  return (
    <main>
      <div className="fixed left-0 top-0 z-50 h-1 w-1/2 bg-cyan" />
      <article className="mx-auto max-w-4xl px-4 py-10">
        <div className="mb-6 flex items-center gap-3 text-sm text-white/50">
          <span className="rounded-full bg-cyan/10 px-3 py-1 font-bold text-cyan">{article.category}</span>
          <span>{article.readingMinutes} min read</span>
          <span>AITrending Staff</span>
          {article.sourceName ? <a href={article.sourceUrl} className="text-cyan" target="_blank" rel="noreferrer">Source: {article.sourceName}</a> : null}
        </div>
        <h1 className="font-display text-4xl font-bold leading-tight md:text-6xl">{cleanText(article.title)}</h1>
        <p className="mt-5 text-xl leading-8 text-white/62">{cleanText(article.excerpt)}</p>
        <Image src={article.image} alt="" width={1400} height={840} priority className="mt-8 h-[420px] w-full rounded-xl object-cover" />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_190px]">
          <div className="article-body space-y-7">
            {article.body.map((paragraph, index) => (
              <div key={paragraph}>
                <p>{cleanText(paragraph)}</p>
                {index === 1 ? <AdSlot label="ARTICLE AD" /> : null}
              </div>
            ))}
          </div>
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-xl border border-white/5 bg-card p-4">
              <p className="font-display font-bold">Contents</p>
              <a href="#" className="mt-3 block text-sm text-white/55">Overview</a>
              <a href="#" className="mt-2 block text-sm text-white/55">Market signal</a>
              <a href="#" className="mt-2 block text-sm text-white/55">What changes next</a>
            </div>
          </aside>
        </div>
      </article>
      <section className="mx-auto max-w-7xl px-4 pb-12">
        <h2 className="mb-5 font-display text-2xl font-bold">Related</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {related.map((item) => <ArticleCard key={item.slug} article={item} />)}
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-4 pb-12">
        <div className="rounded-xl border border-cyan/20 bg-cyan/10 p-6">
          <h2 className="font-display text-2xl font-bold">Get the AI Edge Newsletter</h2>
          <p className="mt-2 text-sm leading-6 text-white/62">A concise briefing with AI news, tools and model releases.</p>
          <Link href="/#newsletter" className="mt-4 inline-flex rounded-full bg-cyan px-5 py-3 text-sm font-bold text-ink">Subscribe</Link>
        </div>
      </section>
    </main>
  );
}
