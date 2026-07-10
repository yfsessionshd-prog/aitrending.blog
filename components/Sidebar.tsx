import { getAllArticles } from "@/lib/content-store";
import { modelLaunches } from "@/lib/data";
import { NewsletterForm } from "./NewsletterForm";
import { NotifyButton } from "./NotifyButton";

export function Sidebar() {
  const articles = getAllArticles();
  return (
    <aside className="space-y-5">
      <section className="glass rounded-xl p-5">
        <h3 className="font-display text-lg font-bold">Latest Model Launches</h3>
        <div className="mt-4 space-y-3">
          {modelLaunches.map((model) => (
            <div key={`${model.name}-${model.version}`} className="flex items-center justify-between rounded-lg bg-white/[0.03] p-3">
              <div>
                <p className="font-bold">{model.name}</p>
                <p className="text-xs text-white/50">{model.version}</p>
              </div>
              <span className="text-xs text-cyan">{model.date}</span>
            </div>
          ))}
        </div>
      </section>
      <section id="newsletter" className="rounded-xl border border-cyan/20 bg-gradient-to-br from-cyan/18 to-violet/18 p-5">
        <h3 className="font-display text-xl font-bold">Daily AI Brief</h3>
        <p className="mt-2 text-sm leading-6 text-white/65">One automated briefing with the signals worth tracking.</p>
        <NewsletterForm />
        <div className="mt-3">
          <NotifyButton />
        </div>
      </section>
      <section className="glass rounded-xl p-5">
        <h3 className="font-display text-lg font-bold">Most Popular</h3>
        <div className="mt-4 space-y-4">
          {articles.slice(1, 4).map((article, index) => (
            <a key={article.slug} href={`/article/${article.slug}`} className="grid grid-cols-[28px_1fr] gap-3 text-sm">
              <span className="font-display text-xl font-bold text-cyan">0{index + 1}</span>
              <span className="font-semibold leading-5 text-white/78">{article.title}</span>
            </a>
          ))}
        </div>
      </section>
    </aside>
  );
}
