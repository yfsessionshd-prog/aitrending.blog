"use client";

import { useEffect, useState } from "react";

const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "pt", label: "Portugues" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
  { code: "ar", label: "Arabic" },
  { code: "zh-CN", label: "Chinese" },
  { code: "ja", label: "Japanese" }
];

export function LanguageSelector() {
  const [language, setLanguage] = useState(() => {
    if (typeof window === "undefined") return "en";
    const stored = window.localStorage.getItem("aitrending-language");
    const detected = window.navigator.language?.split("-")[0] || "en";
    return stored || detected;
  });

  function changeLanguage(nextLanguage: string) {
    setLanguage(nextLanguage);
    window.localStorage.setItem("aitrending-language", nextLanguage);
    document.cookie = `aitrending-language=${nextLanguage}; path=/; max-age=31536000; SameSite=Lax`;

    if (nextLanguage !== "en") {
      const currentUrl = window.location.href;
      window.location.href = `https://translate.google.com/translate?sl=auto&tl=${encodeURIComponent(nextLanguage)}&u=${encodeURIComponent(currentUrl)}`;
    }
  }

  return (
    <select
      value={language}
      onChange={(event) => changeLanguage(event.target.value)}
      className="language-select rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-bold text-white/75 outline-none"
      aria-label="Change language"
    >
      {languages.map((item) => (
        <option key={item.code} value={item.code}>{item.label}</option>
      ))}
    </select>
  );
}
