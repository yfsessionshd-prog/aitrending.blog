import type { GitHubRepo, IdeaItem, PromptItem } from "@/lib/types";
import { excerpt } from "@/lib/text";
import Link from "next/link";

export function ToolPanels({ prompts, ideas, repos }: { prompts: PromptItem[]; ideas: IdeaItem[]; repos: GitHubRepo[] }) {
  const agents = repos.filter((repo) => `${repo.name} ${repo.description} ${repo.topics.join(" ")}`.toLowerCase().includes("agent")).slice(0, 4);

  return (
    <section id="tools" className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-cyan">Herramientas IA</p>
          <h2 className="mt-3 font-display text-4xl font-bold">Prompts, agentes e ideas para ganar dinero</h2>
        </div>
        <Link href="/tools" className="rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-white/68">Ver panel completo</Link>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-xl border border-white/5 bg-card p-5">
          <h3 className="font-display text-2xl font-bold">Prompts mas utiles</h3>
          <div className="mt-5 space-y-4">
            {prompts.slice(0, 4).map((prompt) => (
              <article key={prompt.id} className="tool-card rounded-xl border border-white/5 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="font-bold">{prompt.title}</h4>
                  <span className="rounded-full bg-cyan/10 px-2 py-1 text-xs font-bold text-cyan">{prompt.popularity}%</span>
                </div>
                <span className="mt-3 inline-flex rounded-full border border-white/10 px-2 py-1 text-[11px] font-bold text-white/50">{prompt.category}</span>
                <p className="mt-2 text-sm leading-6 text-white/58">{excerpt(prompt.description, 150)}</p>
                <pre className="mt-3 max-h-24 overflow-auto rounded-lg bg-ink/70 p-3 text-xs leading-5 text-white/68">{excerpt(prompt.prompt, 320)}</pre>
              </article>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-white/5 bg-card p-5">
          <h3 className="font-display text-2xl font-bold">Agentes IA destacados</h3>
          <div className="mt-5 space-y-4">
            {agents.map((repo) => (
              <article key={repo.id} className="tool-card rounded-xl border border-white/5 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="font-bold">{repo.name}</h4>
                  <span className="rounded-full bg-cyan/10 px-2 py-1 text-xs font-bold text-cyan">{repo.stars.toLocaleString()} stars</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-white/58">{excerpt(repo.description, 170)}</p>
                <Link href={repo.url} target="_blank" className="mt-3 inline-flex text-sm font-bold text-cyan">Ver repositorio</Link>
              </article>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-white/5 bg-card p-5">
          <h3 className="font-display text-2xl font-bold">Ideas IA monetizables</h3>
          <div className="mt-5 space-y-4">
            {ideas.slice(0, 4).map((idea) => (
              <article key={idea.id} className="tool-card rounded-xl border border-white/5 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="font-bold">{idea.title}</h4>
                  <span className="rounded-full border border-white/10 px-2 py-1 text-xs font-bold text-white/55">{idea.difficulty}</span>
                </div>
                <span className="mt-3 inline-flex rounded-full border border-white/10 px-2 py-1 text-[11px] font-bold text-white/50">{idea.category}</span>
                <p className="mt-2 text-sm leading-6 text-white/58">{excerpt(idea.description, 170)}</p>
                <p className="mt-3 text-sm font-bold text-cyan">{excerpt(idea.monetization, 120)}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
