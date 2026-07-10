import { getCurrentUser, getProfile } from "@/lib/auth-store";
import { createIdea, getComments, getIdeas, type IdeaCategory } from "@/lib/community-store";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "all";
  const role = searchParams.get("role") || "all";
  const status = searchParams.get("status") || "all";
  const sort = searchParams.get("sort") || "recent";
  let ideas = getIdeas();

  if (category !== "all") ideas = ideas.filter((idea) => idea.category === category);
  if (role !== "all") ideas = ideas.filter((idea) => idea.rolesNeeded.includes(role));
  if (status !== "all") ideas = ideas.filter((idea) => idea.status === status);
  if (sort === "comments") {
    ideas = ideas.sort((a, b) => getComments(b.id).length - getComments(a.id).length);
  }

  return Response.json({ ideas: ideas.map((idea) => ({ ...idea, commentsCount: getComments(idea.id).length })) });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return Response.json({ error: "Login required." }, { status: 401 });
  const profile = getProfile(user.id);
  const body = await request.json().catch(() => ({})) as { title?: string; description?: string; category?: IdeaCategory; rolesNeeded?: string[]; contactLink?: string; captcha?: string };
  if (String(body.captcha || "").trim() !== "AI") return Response.json({ error: "Captcha failed. Type AI." }, { status: 400 });
  if (!body.title || body.title.length < 8 || !body.description || body.description.length < 20) return Response.json({ error: "Title and description are required." }, { status: 400 });

  try {
    const idea = createIdea({
      authorId: user.id,
      authorName: profile?.name || user.email,
      authorAvatar: profile?.avatar || "",
      title: body.title,
      description: body.description,
      category: body.category || "Other",
      rolesNeeded: Array.isArray(body.rolesNeeded) && body.rolesNeeded.length ? body.rolesNeeded.map(String) : ["Developer"],
      contactLink: body.contactLink
    });
    return Response.json({ ok: true, idea });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Could not create idea." }, { status: 400 });
  }
}
