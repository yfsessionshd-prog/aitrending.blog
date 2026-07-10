import { getAllArticles } from "@/lib/content-store";
import { getToolStore } from "@/lib/tool-store";

export async function GET() {
  const tools = getToolStore();
  return Response.json({
    articles: getAllArticles().length,
    repos: tools.repos.length,
    prompts: tools.prompts.length,
    ideas: tools.ideas.length,
    updatedAt: tools.updatedAt
  });
}
