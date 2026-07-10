import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { SearchBox } from "./SearchBox";
import { LanguageSelector } from "./LanguageSelector";

export function Header() {
  return (
    <header className="site-header sticky top-0 z-50 border-b border-white/5 bg-ink/86 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-5 px-4 py-4">
        <Link href="/" className="relative block h-10 w-44 overflow-hidden rounded-md" aria-label="AITrending home">
          <Image src="/aitrending-logo.png" alt="AITrending" fill priority sizes="176px" className="object-cover object-center" />
        </Link>
        <nav className="hidden flex-1 items-center gap-5 text-sm font-semibold text-white/68 lg:flex">
          <Link href="/news" className="transition hover:text-cyan">News</Link>
          <Link href="/models" className="transition hover:text-cyan">AI Models</Link>
          <Link href="/tools" className="transition hover:text-cyan">Tools</Link>
          <Link href="/community" className="transition hover:text-cyan">Community</Link>
          <Link href="/explainers" className="transition hover:text-cyan">Explainers</Link>
        </nav>
        <SearchBox />
        <LanguageSelector />
        <ThemeToggle />
        <Link href="/profile" className="hidden rounded-full border border-white/10 px-3 py-2 text-sm font-bold text-white/70 md:inline-flex">Profile</Link>
        <Link href="/#newsletter" className="rounded-full bg-cyan px-4 py-2 text-sm font-bold text-ink shadow-glow transition hover:brightness-110">
          Subscribe
        </Link>
      </div>
    </header>
  );
}
