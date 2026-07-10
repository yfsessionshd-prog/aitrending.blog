import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-panel">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1.2fr_2fr]">
        <div>
          <Link href="/" className="relative block h-14 w-60 overflow-hidden rounded-lg" aria-label="AITrending home">
            <Image src="/aitrending-logo.png" alt="AITrending" fill sizes="240px" className="object-cover object-center" />
          </Link>
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
