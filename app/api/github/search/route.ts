import { searchGitHubRepos } from "@/lib/github-radar";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "AI";
  return Response.json({ repos: await searchGitHubRepos(q) });
}
