import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-panel">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1.2fr_2fr]">
        <div>
          <p className="font-display text-2xl font-bold">AI<span className="text-cyan">Trending</span></p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/55">Automated AI news, GitHub repos, prompts, agents, tools and practical learning resources.</p>
        </div>
        <div className="grid gap-6 text-sm sm:grid-cols-3">
          <div>
            <p className="font-bold text-white">AI Topics</p>
            <div className="mt-3 grid gap-2 text-white/55">
              <Link href="/news">News</Link>
              <Link href="/models">AI Models</Link>
              <Link href="/tools">AI Tools</Link>
              <Link href="/explainers">Explainers</Link>
              <Link href="/community">AI Community</Link>
            </div>
          </div>
          <div>
            <p className="font-bold text-white">Platform</p>
            <div className="mt-3 grid gap-2 text-white/55">
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/tools">AI Tools</Link>
              <Link href="/community">Team Up</Link>
            </div>
          </div>
          <div>
            <p className="font-bold text-white">Legal</p>
            <div className="mt-3 grid gap-2 text-white/55">
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/rss.xml">RSS</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
