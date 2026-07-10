"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [message, setMessage] = useState("");

  async function subscribe(formData: FormData) {
    const email = String(formData.get("email") || "");
    setMessage("Guardando...");
    const response = await fetch("/api/newsletter/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    setMessage(response.ok ? "Suscripcion activa." : "No se pudo guardar.");
  }

  return (
    <form action={subscribe} className="mt-4 space-y-3">
      <input name="email" type="email" required placeholder="email@company.com" className="w-full rounded-lg border border-white/10 bg-ink/70 px-4 py-3 text-sm outline-none focus:border-cyan" />
      <button className="w-full rounded-lg bg-cyan px-4 py-3 text-sm font-bold text-ink">Subscribe</button>
      {message ? <p className="text-xs text-white/55">{message}</p> : null}
    </form>
  );
}
