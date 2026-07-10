"use client";

import { useMemo, useState } from "react";
import type { GitHubRepo } from "@/lib/types";
import { excerpt } from "@/lib/text";

export function GitHubRadar({ repos, updatedAt }: { repos: GitHubRepo[]; updatedAt: string }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState<GitHubRepo | null>(repos[0] || null);
  const categories = useMemo(() => ["All", ...Array.from(new Set(repos.flatMap((repo) => repo.topics).filter(Boolean))).slice(0, 8)], [repos]);
  const filtered = useMemo(() => {
    const term = query.toLowerCase();
    return repos.filter((repo) => {
      const matchesQuery = `${repo.name} ${repo.description} ${repo.language} ${repo.topics.join(" ")}`.toLowerCase().includes(term);
      const matchesCategory = category === "All" || repo.topics.includes(category);
      return matchesQuery && matchesCategory;
    });
  }, [category, query, repos]);

  return (
    <section id="github-radar" className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
        <div className="rounded-xl border border-white/5 bg-card p-5">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-cyan">GitHub Radar</p>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight">Repos IA que la gente esta buscando</h2>
          <p className="mt-3 text-sm leading-6 text-white/58">Busca repositorios, entiende para que sirven y abre el proyecto original en GitHub.</p>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Busca: agents, RAG, LLM, vision..."
            className="mt-5 w-full rounded-lg border border-white/10 bg-ink/70 px-4 py-3 text-sm outline-none focus:border-cyan"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((item) => (
              <button key={item} type="button" onClick={() => setCategory(item)} className={category === item ? "rounded-full bg-cyan px-3 py-1.5 text-xs font-bold text-ink" : "rounded-full border border-white/10 px-3 py-1.5 text-xs font-bold text-white/55"}>
                {item}
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs text-white/45">Actualizado: {new Date(updatedAt).toLocaleString()}</p>
          {active ? (
            <div className="mt-5 rounded-xl border border-cyan/20 bg-cyan/10 p-4">
              <p className="text-sm font-bold text-cyan">{active.name}</p>
              <p className="mt-2 text-sm leading-6 text-white/68">{active.useCase}</p>
              <a href={active.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full bg-cyan px-4 py-2 text-xs font-bold text-ink">Abrir GitHub</a>
            </div>
          ) : null}
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.slice(0, 12).map((repo) => {
            const rating = Math.min(5, Math.max(3, Math.round(repo.stars / 40000)));
            return (
              <button key={repo.id} onClick={() => setActive(repo)} className="tool-card rounded-xl border border-white/5 bg-card p-4 text-left transition hover:border-cyan/40 hover:shadow-glow">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-bold leading-6">{repo.name}</h3>
                  <span className="rounded-full bg-cyan/10 px-2 py-1 text-xs font-bold text-cyan">{repo.language}</span>
                </div>
                <div className="mt-3 text-sm tracking-[0.18em] text-amber-300">{"★".repeat(rating)}<span className="text-white/18">{"★".repeat(5 - rating)}</span></div>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/58">{excerpt(repo.description, 150)}</p>
                <p className="mt-3 text-xs leading-5 text-white/50">{repo.useCase}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {repo.topics.slice(0, 3).map((topic) => <span key={topic} className="rounded-full bg-white/[0.04] px-2 py-1 text-[11px] font-bold text-white/45">{topic}</span>)}
                </div>
                <div className="mt-4 flex items-center justify-between text-xs font-bold text-white/45">
                  <span>{repo.stars.toLocaleString()} stars</span>
                  <span>{repo.forks.toLocaleString()} forks</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
