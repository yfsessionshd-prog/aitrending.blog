"use client";

import { useState } from "react";

type AuthMode = "login" | "register" | "forgot";

export function AuthForm({ mode }: { mode: AuthMode }) {
  const [message, setMessage] = useState("");

  async function submit(formData: FormData) {
    setMessage("Processing...");
    const endpoint = mode === "login" ? "/api/auth/login" : mode === "register" ? "/api/auth/register" : "/api/auth/forgot-password";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password")
      })
    });
    const data = await response.json() as { error?: string; message?: string };
    if (!response.ok) {
      setMessage(data.error || "Request failed.");
      return;
    }
    setMessage(data.message || "Success.");
    if (mode !== "forgot") window.location.href = "/profile";
  }

  return (
    <form action={submit} className="rounded-xl border border-white/5 bg-card p-6">
      {mode === "register" ? <input name="name" required placeholder="Name" className="mb-3 w-full rounded-lg border border-white/10 bg-ink/70 px-4 py-3 text-sm outline-none focus:border-cyan" /> : null}
      <input name="email" type="email" required placeholder="Email" className="mb-3 w-full rounded-lg border border-white/10 bg-ink/70 px-4 py-3 text-sm outline-none focus:border-cyan" />
      {mode !== "forgot" ? <input name="password" type="password" required minLength={8} placeholder="Password" className="mb-4 w-full rounded-lg border border-white/10 bg-ink/70 px-4 py-3 text-sm outline-none focus:border-cyan" /> : null}
      <button className="w-full rounded-lg bg-cyan px-4 py-3 text-sm font-bold text-ink">
        {mode === "login" ? "Login" : mode === "register" ? "Create account" : "Send recovery"}
      </button>
      {mode === "login" ? <a href="/auth/forgot-password" className="mt-4 block text-center text-sm text-white/55">Forgot password?</a> : null}
      {message ? <p className="mt-4 text-sm text-white/62">{message}</p> : null}
    </form>
  );
}
