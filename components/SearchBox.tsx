"use client";

import { useEffect, useState } from "react";

type Suggestion = {
  type: string;
  title: string;
  url: string;
};

export function SearchBox() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const visibleSuggestions = query.trim().length < 2 ? [] : suggestions;

  useEffect(() => {
    if (query.trim().length < 2) return;
    const timeout = window.setTimeout(async () => {
      const response = await fetch(`/api/search/suggest?q=${encodeURIComponent(query)}`);
      const data = await response.json() as { suggestions?: Suggestion[] };
      setSuggestions(data.suggestions || []);
    }, 180);

    return () => window.clearTimeout(timeout);
  }, [query]);

  return (
    <form action="/search" className="relative hidden md:block">
      <input
        name="q"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        aria-label="Search AITrending"
        placeholder="Search AI trends"
        className="w-64 rounded-full border border-white/5 bg-white/[0.04] px-4 py-2 text-sm text-white outline-none transition focus:border-cyan/70"
      />
      {visibleSuggestions.length ? (
        <div className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-xl border border-white/10 bg-panel shadow-2xl">
          {visibleSuggestions.map((suggestion) => (
            <a key={`${suggestion.type}-${suggestion.title}`} href={suggestion.url} className="block border-b border-white/5 px-4 py-3 text-sm hover:bg-white/[0.04]">
              <span className="text-xs font-bold uppercase text-cyan">{suggestion.type}</span>
              <span className="mt-1 block text-white/78">{suggestion.title}</span>
            </a>
          ))}
        </div>
      ) : null}
    </form>
  );
}
