"use client";

import { useState } from "react";

export function CookieBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 rounded-xl border border-white/10 bg-panel p-4 shadow-2xl">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm leading-6 text-white/68">AITrending uses cookies for analytics, personalization and advertising readiness.</p>
        <button onClick={() => setVisible(false)} className="rounded-lg bg-cyan px-4 py-2 text-sm font-bold text-ink">Accept</button>
      </div>
    </div>
  );
}
