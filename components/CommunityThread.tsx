"use client";

import { useState } from "react";
import type { CommunityComment, CommunityIdea } from "@/lib/community-store";

export function CommunityThread({ idea, comments, canEdit }: { idea: CommunityIdea; comments: CommunityComment[]; canEdit: boolean }) {
  const [items, setItems] = useState(comments);
  const [contactVisible, setContactVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(idea.status);

  async function comment(formData: FormData) {
    setMessage("Posting...");
    const response = await fetch("/api/community/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ideaId: idea.id, content: formData.get("content") })
    });
    const data = await response.json() as { comment?: CommunityComment; error?: string };
    if (response.ok && data.comment) {
      setItems([...items, data.comment]);
      setMessage("Comment posted.");
    } else {
      setMessage(data.error || "Could not post comment.");
    }
  }

  async function report(targetType: "idea" | "comment", targetId: string) {
    const reason = window.prompt("Reason for report");
    if (!reason) return;
    await fetch("/api/community/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targetType, targetId, reason })
    });
    setMessage("Report submitted.");
  }

  async function updateStatus(nextStatus: string) {
    const response = await fetch("/api/community/status", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ideaId: idea.id, status: nextStatus })
    });
    if (response.ok) setStatus(nextStatus as typeof status);
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <p className="text-xs font-bold uppercase tracking-[0.26em] text-cyan">{idea.category}</p>
      <h1 className="mt-3 font-display text-5xl font-bold">{idea.title}</h1>
      <p className="mt-4 text-lg leading-8 text-white/65">{idea.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {idea.rolesNeeded.map((role) => <span key={role} className="rounded-full border border-white/10 px-3 py-2 text-sm font-bold text-white/60">{role}</span>)}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-cyan/10 px-3 py-2 text-sm font-bold text-cyan">{idea.authorName}</span>
        <button onClick={() => report("idea", idea.id)} className="rounded-full border border-white/10 px-3 py-2 text-sm font-bold text-white/55">Report idea</button>
        {idea.contactLink ? <button onClick={() => setContactVisible(!contactVisible)} className="rounded-full border border-cyan/30 px-3 py-2 text-sm font-bold text-cyan">Ver contacto</button> : null}
        {canEdit ? (
          <select value={status} onChange={(event) => updateStatus(event.target.value)} className="rounded-full border border-white/10 bg-ink/70 px-3 py-2 text-sm">
            <option value="open">Abierta</option>
            <option value="in_progress">En progreso</option>
            <option value="complete">Completa</option>
          </select>
        ) : null}
      </div>
      {contactVisible ? <p className="mt-4 rounded-lg border border-white/10 bg-card p-4 text-sm text-white/65">{idea.contactLink}</p> : null}
      <section className="mt-10">
        <h2 className="font-display text-3xl font-bold">Comments</h2>
        <div className="mt-5 space-y-3">
          {items.map((item) => (
            <article key={item.id} className="rounded-xl border border-white/5 bg-card p-4">
              <div className="flex items-center justify-between">
                <p className="font-bold">{item.authorName}</p>
                <button onClick={() => report("comment", item.id)} className="text-xs font-bold text-white/45">Report</button>
              </div>
              <p className="mt-2 text-sm leading-6 text-white/62">{item.content}</p>
            </article>
          ))}
        </div>
        <form action={comment} className="mt-5 rounded-xl border border-white/5 bg-card p-4">
          <textarea name="content" required rows={4} placeholder="Ask a question or say why you are interested." className="w-full rounded-lg border border-white/10 bg-ink/70 px-4 py-3 text-sm outline-none focus:border-cyan" />
          <button className="mt-3 rounded-lg bg-cyan px-5 py-3 text-sm font-bold text-ink">Post comment</button>
        </form>
        {message ? <p className="mt-3 text-sm text-white/55">{message}</p> : null}
      </section>
    </main>
  );
}
