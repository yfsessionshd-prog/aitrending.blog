"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    return window.localStorage.getItem("aitrending-theme") === "light" ? "light" : "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    window.localStorage.setItem("aitrending-theme", nextTheme);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle rounded-full border border-white/10 px-3 py-2 text-sm font-bold text-white/75 transition hover:border-cyan/60 hover:text-cyan"
      aria-label="Toggle light and dark theme"
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
