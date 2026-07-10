import Link from "next/link";
import { ExternalLink, Star } from "lucide-react";
import type { AiModel, AiTool } from "@/lib/public-data";

function Rating({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-300">
      <Star size={14} fill="currentColor" /> {value.toFixed(1)}
    </span>
  );
}

export function ModelCard({ model }: { model: AiModel }) {
  return (
    <Link href={`/models/${model.slug}`} className="tool-card block rounded-xl border border-white/5 bg-card p-5 transition hover:border-cyan/40 hover:shadow-glow">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan">{model.company}</p>
          <h3 className="mt-2 font-display text-xl font-bold">{model.name}</h3>
        </div>
        <Rating value={model.rating} />
      </div>
      <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/58">{model.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-cyan/10 px-2 py-1 text-xs font-bold text-cyan">{model.type}</span>
        <span className="rounded-full border border-white/10 px-2 py-1 text-xs font-bold text-white/50">{model.access}</span>
        <span className="rounded-full border border-white/10 px-2 py-1 text-xs font-bold text-white/50">{model.pricing}</span>
      </div>
    </Link>
  );
}

export function ToolCard({ tool }: { tool: AiTool }) {
  return (
    <Link href={`/tools/${tool.slug}`} className="tool-card block rounded-xl border border-white/5 bg-card p-5 transition hover:border-cyan/40 hover:shadow-glow">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet">{tool.category}</p>
          <h3 className="mt-2 font-display text-xl font-bold">{tool.name}</h3>
        </div>
        <Rating value={tool.rating} />
      </div>
      <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/58">{tool.description}</p>
      <div className="mt-4 flex items-center justify-between text-xs font-bold text-white/48">
        <span>{tool.price}</span>
        <span className={tool.freePlan ? "text-emerald-300" : "text-white/45"}>{tool.freePlan ? "Free plan" : "Paid only"}</span>
      </div>
    </Link>
  );
}

export function OfficialLink({ href }: { href: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-cyan px-5 py-3 text-sm font-bold text-ink">
      Official site <ExternalLink size={16} />
    </a>
  );
}
