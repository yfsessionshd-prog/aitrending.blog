import { getAllArticles } from "@/lib/content-store";
import { getToolStore } from "@/lib/tool-store";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").toLowerCase();
  const tools = getToolStore();
  const items = [
    ...getAllArticles().map((article) => ({ type: "article", title: article.title, url: `/article/${article.slug}` })),
    ...tools.repos.map((repo) => ({ type: "github", title: repo.name, url: repo.url })),
    ...tools.prompts.map((prompt) => ({ type: "prompt", title: prompt.title, url: "/tools" })),
    ...tools.ideas.map((idea) => ({ type: "idea", title: idea.title, url: "/tools" }))
  ];

  return Response.json({ suggestions: items.filter((item) => item.title.toLowerCase().includes(q)).slice(0, 8) });
}
