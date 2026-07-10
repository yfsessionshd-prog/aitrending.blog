"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CommunityIdea } from "@/lib/community-store";

type IdeaWithCount = CommunityIdea & { commentsCount: number };

const categories = ["all", "App", "Web", "AI/ML", "Content", "Other"];
const roles = ["all", "Developer", "Designer", "Marketing", "Content", "Data", "Founder"];
const statuses = ["all", "open", "in_progress", "complete"];

function statusLabel(status: string) {
  if (status === "open") return "Abierta";
  if (status === "in_progress") return "En progreso";
  if (status === "complete") return "Completa";
  return status;
}

export function CommunityBoard({ ideas }: { ideas: IdeaWithCount[] }) {
  const [category, setCategory] = useState("all");
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("recent");
  const filtered = useMemo(() => {
    let next = ideas.filter((idea) => {
      const categoryOk = category === "all" || idea.category === category;
      const roleOk = role === "all" || idea.rolesNeeded.includes(role);
      const statusOk = status === "all" || idea.status === status;
      return categoryOk && roleOk && statusOk;
    });
    if (sort === "comments") next = [...next].sort((a, b) => b.commentsCount - a.commentsCount);
    return next;
  }, [category, ideas, role, sort, status]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-cyan">Team Up</p>
          <h1 className="mt-3 font-display text-5xl font-bold">AI project board</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">Publish an AI project idea, find collaborators and keep the conversation public and simple.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/community/guidelines" className="rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-white/65">Guidelines</Link>
          <Link href="/community/new" className="rounded-full bg-cyan px-4 py-2 text-sm font-bold text-ink">Post idea</Link>
        </div>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-lg border border-white/10 bg-ink/70 px-4 py-3 text-sm outline-none">
          {categories.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select value={role} onChange={(event) => setRole(event.target.value)} className="rounded-lg border border-white/10 bg-ink/70 px-4 py-3 text-sm outline-none">
          {roles.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-lg border border-white/10 bg-ink/70 px-4 py-3 text-sm outline-none">
          {statuses.map((item) => <option key={item} value={item}>{item === "all" ? "all" : statusLabel(item)}</option>)}
        </select>
        <select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-lg border border-white/10 bg-ink/70 px-4 py-3 text-sm outline-none">
          <option value="recent">Most recent</option>
          <option value="comments">Most commented</option>
        </select>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((idea) => (
          <Link key={idea.id} href={`/community/${idea.id}`} className="tool-card block rounded-xl border border-white/5 bg-card p-5 transition hover:border-cyan/40 hover:shadow-glow">
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-display text-xl font-bold leading-7">{idea.title}</h2>
              <span className={idea.status === "open" ? "rounded-full bg-emerald-500/12 px-2 py-1 text-xs font-bold text-emerald-300" : idea.status === "in_progress" ? "rounded-full bg-amber-500/12 px-2 py-1 text-xs font-bold text-amber-300" : "rounded-full bg-white/10 px-2 py-1 text-xs font-bold text-white/50"}>{statusLabel(idea.status)}</span>
            </div>
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/58">{idea.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-cyan/10 px-2 py-1 text-xs font-bold text-cyan">{idea.category}</span>
              {idea.rolesNeeded.map((item) => <span key={item} className="rounded-full border border-white/10 px-2 py-1 text-xs font-bold text-white/50">{item}</span>)}
            </div>
            <div className="mt-5 flex items-center justify-between text-xs text-white/45">
              <span>{idea.authorName}</span>
              <span>{idea.commentsCount} comments</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
