import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/lib/types";
import { cleanText, excerpt } from "@/lib/text";

export function ArticleCard({ article, large = false }: { article: Article; large?: boolean }) {
  return (
    <Link href={`/article/${article.slug}`} className={`group block overflow-hidden rounded-xl border border-white/5 bg-card transition hover:border-cyan/40 hover:shadow-glow ${large ? "md:col-span-2" : ""}`}>
      <div className={large ? "h-72" : "h-44"}>
        <Image src={article.image} alt="" width={1200} height={720} className="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />
      </div>
      <div className="p-5">
        <span className="rounded-full bg-cyan/10 px-3 py-1 text-xs font-bold text-cyan">{article.category}</span>
        <h2 className={`mt-4 font-display font-bold leading-tight ${large ? "text-3xl" : "text-xl"}`}>{cleanText(article.title)}</h2>
        <p className="mt-3 text-sm leading-6 text-white/58">{excerpt(article.excerpt, large ? 260 : 170)}</p>
        <div className="mt-5 flex items-center justify-between text-xs font-semibold text-white/42">
          <span>{article.sourceName || "AITrending Staff"}</span>
          <span>{article.readingMinutes} min read · {article.views}</span>
        </div>
      </div>
    </Link>
  );
}
