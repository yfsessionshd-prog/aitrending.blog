import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function NativeSponsor() {
  return (
    <section className="rounded-xl border border-white/5 bg-card p-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/35">AI resource</p>
      <div className="mt-4 grid gap-5 md:grid-cols-[220px_1fr_auto] md:items-center">
        <div className="h-32 overflow-hidden rounded-lg bg-cyan/10">
          <Image src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" alt="" width={800} height={450} className="h-full w-full object-cover opacity-80" />
        </div>
        <div>
          <h3 className="font-display text-2xl font-bold">Build production-ready AI workflows</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/58">Explore tools, models and automation patterns for modern AI teams.</p>
        </div>
        <Link href="/tools" className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan/30 px-4 py-2 text-sm font-bold text-cyan">
          Learn More <ExternalLink size={15} />
        </Link>
      </div>
    </section>
  );
}
