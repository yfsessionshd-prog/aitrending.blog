"use client";

import { useState } from "react";

const roleOptions = ["Developer", "Designer", "Marketing", "Content", "Data", "Founder"];

export function CommunityIdeaForm() {
  const [message, setMessage] = useState("");

  async function submit(formData: FormData) {
    setMessage("Publishing...");
    const rolesNeeded = roleOptions.filter((role) => formData.get(role) === "on");
    const response = await fetch("/api/community/ideas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.get("title"),
        description: formData.get("description"),
        category: formData.get("category"),
        contactLink: formData.get("contactLink"),
        captcha: formData.get("captcha"),
        rolesNeeded
      })
    });
    const data = await response.json() as { idea?: { id: string }; error?: string };
    if (response.ok && data.idea) {
      window.location.href = `/community/${data.idea.id}`;
      return;
    }
    setMessage(data.error || "Could not publish idea.");
  }

  return (
    <form action={submit} className="rounded-xl border border-white/5 bg-card p-6">
      <input name="title" required maxLength={80} placeholder="Project idea title" className="w-full rounded-lg border border-white/10 bg-ink/70 px-4 py-3 text-sm outline-none focus:border-cyan" />
      <textarea name="description" required rows={7} placeholder="Explain the idea, who it helps, and what you need." className="mt-4 w-full rounded-lg border border-white/10 bg-ink/70 px-4 py-3 text-sm outline-none focus:border-cyan" />
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <select name="category" className="rounded-lg border border-white/10 bg-ink/70 px-4 py-3 text-sm outline-none focus:border-cyan">
          {["App", "Web", "AI/ML", "Content", "Other"].map((item) => <option key={item}>{item}</option>)}
        </select>
        <input name="contactLink" placeholder="Optional contact link or email" className="rounded-lg border border-white/10 bg-ink/70 px-4 py-3 text-sm outline-none focus:border-cyan" />
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        {roleOptions.map((role) => (
          <label key={role} className="rounded-full border border-white/10 px-3 py-2 text-sm text-white/65"><input name={role} type="checkbox" className="mr-2" />{role}</label>
        ))}
      </div>
      <input name="captcha" required placeholder="Type AI to confirm" className="mt-4 w-full rounded-lg border border-white/10 bg-ink/70 px-4 py-3 text-sm outline-none focus:border-cyan" />
      <button className="mt-4 rounded-lg bg-cyan px-5 py-3 text-sm font-bold text-ink">Publish idea</button>
      {message ? <p className="mt-3 text-sm text-white/55">{message}</p> : null}
    </form>
  );
}
