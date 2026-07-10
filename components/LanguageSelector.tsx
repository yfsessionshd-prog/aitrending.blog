"use client";

import { useEffect, useState } from "react";

const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "pt", label: "Português" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
  { code: "ar", label: "العربية" },
  { code: "zh-CN", label: "中文" },
  { code: "ja", label: "日本語" }
];

export function LanguageSelector() {
  const [language, setLanguage] = useState(() => {
    if (typeof window === "undefined") return "en";
    return window.localStorage.getItem("aitrending-language") || window.navigator.language || "en";
  });

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  function changeLanguage(nextLanguage: string) {
    setLanguage(nextLanguage);
    window.localStorage.setItem("aitrending-language", nextLanguage);
    document.cookie = `aitrending-language=${nextLanguage}; path=/; max-age=31536000; SameSite=Lax`;
    document.documentElement.lang = nextLanguage;
  }

  return (
    <select
      value={language}
      onChange={(event) => changeLanguage(event.target.value)}
      className="language-select rounded-full border border-white/10 px-3 py-2 text-sm font-bold outline-none"
      aria-label="Change language"
      title="Change language"
    >
      {languages.map((item) => (
        <option key={item.code} value={item.code}>{item.label}</option>
      ))}
    </select>
  );
}
