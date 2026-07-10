import { ModelCard } from "@/components/DirectoryCards";
import { aiModels } from "@/lib/public-data";

export default function ModelsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <p className="text-xs font-bold uppercase tracking-[0.26em] text-cyan">Model Directory</p>
      <h1 className="mt-3 font-display text-5xl font-bold">AI Models</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-white/62">Compare text, image, audio, video and multimodal models by company, access, pricing and use case.</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {["Text", "Image", "Video", "Audio", "Multimodal", "Open Source", "Commercial", "Free", "Paid"].map((filter) => (
          <span key={filter} className="rounded-full border border-white/10 px-3 py-2 text-xs font-bold text-white/55">{filter}</span>
        ))}
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {aiModels.map((model) => <ModelCard key={model.slug} model={model} />)}
      </div>
    </main>
  );
}
