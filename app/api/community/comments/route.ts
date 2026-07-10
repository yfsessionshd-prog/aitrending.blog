import { getCurrentUser, getProfile } from "@/lib/auth-store";
import { addComment, getComments, getIdea } from "@/lib/community-store";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ideaId = searchParams.get("ideaId") || "";
  return Response.json({ comments: getComments(ideaId) });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return Response.json({ error: "Login required." }, { status: 401 });
  const profile = getProfile(user.id);
  const body = await request.json().catch(() => ({})) as { ideaId?: string; content?: string };
  const idea = body.ideaId ? getIdea(body.ideaId) : null;
  if (!idea) return Response.json({ error: "Idea not found." }, { status: 404 });
  const content = String(body.content || "").trim();
  if (content.length < 3) return Response.json({ error: "Comment is too short." }, { status: 400 });
  return Response.json({ ok: true, comment: addComment({ ideaId: idea.id, authorId: user.id, authorName: profile?.name || user.email, content }) });
}
