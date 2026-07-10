import { getAllArticles, getGeneratedArticles, saveArticles } from "./content-store";
import { createArticleFromSignal } from "./generation";
import { discoverAiSignals } from "./sources";
import { runToolAutomation } from "./tool-automation";

type PipelineResult = {
  captured: number;
  filtered: number;
  drafted: number;
  published: number;
  status: "ready" | "partial" | "error";
  missingCredentials: string[];
  articles: Array<{ slug: string; title: string; sourceName?: string; sourceUrl?: string }>;
  tools: { repos: number; prompts: number; ideas: number; updatedAt?: string };
  errors: string[];
};

const optionalKeys = ["OPENROUTER_API_KEY", "MUAPI_API_KEY"];

export async function runContentPipeline(): Promise<PipelineResult> {
  const missingCredentials = optionalKeys.filter((key) => !process.env[key]);
  const errors: string[] = [];

  try {
    const signals = await discoverAiSignals();
    const tools = await runToolAutomation();
    const existingUrls = new Set(getAllArticles().map((article) => article.sourceUrl).filter(Boolean));
    const freshSignals = signals.filter((signal) => !existingUrls.has(signal.url)).slice(0, Number(process.env.MAX_ARTICLES_PER_RUN || 3));
    const latestGeneratedAt = Math.max(0, ...getGeneratedArticles().map((article) => Date.parse(article.publishedAt) || 0));
    const canPublishBriefing = Date.now() - latestGeneratedAt > 10 * 60 * 1000;
    const signalsToDraft = freshSignals.length || !signals.length || !canPublishBriefing ? freshSignals : [{
      ...signals[0],
      id: `briefing:${Date.now()}`,
      title: `AI briefing: ${signals[0].title}`,
      summary: `AITrending briefing based on the latest tracked source. ${signals[0].summary}`,
      publishedAt: new Date().toISOString()
    }];
    const created = [];

    for (const signal of signalsToDraft) {
      try {
        created.push(await createArticleFromSignal(signal));
      } catch (error) {
        errors.push(error instanceof Error ? error.message : `Failed to generate article for ${signal.url}`);
      }
    }

    if (created.length) saveArticles(created);

    return {
      captured: signals.length,
      filtered: signalsToDraft.length,
      drafted: created.length,
      published: created.length,
      status: errors.length ? "partial" : "ready",
      missingCredentials,
      articles: created.map((article) => ({
        slug: article.slug,
        title: article.title,
        sourceName: article.sourceName,
        sourceUrl: article.sourceUrl
      })),
      tools: { repos: tools.repos.length, prompts: tools.prompts.length, ideas: tools.ideas.length, updatedAt: tools.updatedAt },
      errors
    };
  } catch (error) {
    return {
      captured: 0,
      filtered: 0,
      drafted: 0,
      published: 0,
      status: "error",
      missingCredentials,
      articles: [],
      tools: { repos: 0, prompts: 0, ideas: 0 },
      errors: [error instanceof Error ? error.message : "Unknown automation error"]
    };
  }
}
