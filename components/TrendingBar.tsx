import Link from "next/link";
import { topics } from "@/lib/public-data";

export function TrendingBar() {
  return (
    <section className="trending-panel border-y border-white/5 bg-panel/70">
      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-6 lg:grid-cols-[280px_1fr]">
        <div className="rounded-xl border border-cyan/20 bg-cyan/10 p-5">
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.26em] text-cyan">
            <span className="live-dot h-3 w-3 rounded-full bg-cyan" />
            Tendencias en vivo
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight">Radar IA actualizado</h2>
          <p className="mt-3 text-sm leading-6 text-white/58">Signals across models, agents, tools and open source.</p>
          <span className="mt-5 inline-flex rounded-full border border-white/10 px-3 py-2 text-xs font-bold text-white/55">Updated 15 min ago</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {topics.slice(0, 5).map((topic, index) => (
            <Link key={topic.slug} href={`/topics/${topic.slug}`} className="trend-card rounded-xl border border-white/5 bg-card p-4 transition hover:border-cyan/40 hover:shadow-glow">
              <div className="flex items-center justify-between">
                <span className="font-display text-3xl font-bold text-cyan">#{index + 1}</span>
                <span className="rounded-full bg-emerald-500/12 px-2 py-1 text-xs font-bold text-emerald-300">LIVE</span>
              </div>
              <p className="mt-4 text-base font-bold leading-6 text-white/86">{topic.title}</p>
              <p className="mt-2 text-xs font-bold text-white/45">{topic.interactions} interactions</p>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-cyan" style={{ width: `${100 - (index + 1) * 9}%` }} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
