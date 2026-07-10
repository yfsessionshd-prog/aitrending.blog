"use client";

import { useState } from "react";
import type { UserProfile } from "@/lib/auth-store";

export function ProfileEditor({ profile }: { profile: UserProfile }) {
  const [message, setMessage] = useState("");

  async function save(formData: FormData) {
    setMessage("Saving...");
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        username: formData.get("username"),
        bio: formData.get("bio"),
        theme: formData.get("theme"),
        preferences: String(formData.get("preferences") || "").split(",").map((item) => item.trim()).filter(Boolean)
      })
    });
    setMessage(response.ok ? "Profile saved." : "Could not save profile.");
  }

  return (
    <form action={save} className="rounded-xl border border-white/5 bg-card p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <input name="name" defaultValue={profile.name} placeholder="Name" className="rounded-lg border border-white/10 bg-ink/70 px-4 py-3 text-sm outline-none focus:border-cyan" />
        <input name="username" defaultValue={profile.username} placeholder="Username" className="rounded-lg border border-white/10 bg-ink/70 px-4 py-3 text-sm outline-none focus:border-cyan" />
      </div>
      <textarea name="bio" defaultValue={profile.bio} placeholder="Bio" rows={5} className="mt-4 w-full rounded-lg border border-white/10 bg-ink/70 px-4 py-3 text-sm outline-none focus:border-cyan" />
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <select name="theme" defaultValue={profile.theme} className="rounded-lg border border-white/10 bg-ink/70 px-4 py-3 text-sm outline-none focus:border-cyan">
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
        <input name="preferences" defaultValue={profile.preferences.join(", ")} placeholder="Preferences" className="rounded-lg border border-white/10 bg-ink/70 px-4 py-3 text-sm outline-none focus:border-cyan" />
      </div>
      <button className="mt-4 rounded-lg bg-cyan px-5 py-3 text-sm font-bold text-ink">Save profile</button>
      {message ? <p className="mt-3 text-sm text-white/55">{message}</p> : null}
    </form>
  );
}
