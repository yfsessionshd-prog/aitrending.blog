import { GitHubRadar } from "@/components/GitHubRadar";
import { ToolPanels } from "@/components/ToolPanels";
import { ToolCard } from "@/components/DirectoryCards";
import { aiTools } from "@/lib/public-data";
import { getToolStore } from "@/lib/tool-store";

export default function ToolsPage() {
  const tools = getToolStore();

  return (
    <main>
      <section className="mx-auto max-w-7xl px-4 py-12">
        <p className="text-xs font-bold uppercase tracking-[0.26em] text-cyan">AITrending Tools</p>
        <h1 className="mt-3 max-w-4xl font-display text-5xl font-bold leading-tight">Repositorios, prompts, agentes e ideas IA actualizadas automaticamente</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-white/62">Panel gratuito para aprender que usar, que construir y como monetizar proyectos de inteligencia artificial.</p>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-violet">Tool Directory</p>
            <h2 className="mt-3 font-display text-3xl font-bold">AI tools by category</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Writing", "Image", "Video", "Audio", "Coding", "Productivity", "Marketing", "Research", "Automation", "Design"].map((item) => <span key={item} className="rounded-full border border-white/10 px-3 py-2 text-xs font-bold text-white/55">{item}</span>)}
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {aiTools.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
        </div>
      </section>
      <GitHubRadar repos={tools.repos} updatedAt={tools.updatedAt} />
      <ToolPanels prompts={tools.prompts} ideas={tools.ideas} repos={tools.repos} />
    </main>
  );
}
