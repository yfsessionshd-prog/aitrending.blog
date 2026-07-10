import { AdSlot } from "@/components/AdSlot";
import { ArticleCard } from "@/components/ArticleCard";
import { Sidebar } from "@/components/Sidebar";
import { TrendingBar } from "@/components/TrendingBar";
import { getAllArticles } from "@/lib/content-store";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const articles = getAllArticles();
  const featured = articles.find((article) => article.featured) || articles[0];
  const rest = articles.filter((article) => article.slug !== featured.slug);

  return (
    <main>
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0 opacity-35">
          <Image src={featured.image} alt="" fill priority sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/88 to-ink/35" />
        <div className="relative mx-auto grid min-h-[560px] max-w-7xl content-end px-4 pb-12 pt-28">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-red-500/15 px-3 py-1 text-xs font-bold text-red-300">LIVE</span>
              <span className="rounded-full bg-cyan/15 px-3 py-1 text-xs font-bold text-cyan">Breaking</span>
              <span className="text-sm text-white/55">12,840 reading now{" - "}{featured.readingMinutes} min read</span>
            </div>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[1.02] md:text-7xl">{featured.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">{featured.excerpt}</p>
            <Link href={`/article/${featured.slug}`} className="mt-8 inline-flex rounded-full bg-cyan px-6 py-3 text-sm font-bold text-ink shadow-glow">Read lead story</Link>
          </div>
        </div>
      </section>
      <TrendingBar />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1fr_330px]">
        <div className="space-y-8">
          <div className="grid gap-5 md:grid-cols-2">
            {rest.map((article, index) => <ArticleCard key={article.slug} article={article} large={index === 0} />)}
          </div>
          <AdSlot />
        </div>
        <Sidebar />
      </section>
    </main>
  );
}
