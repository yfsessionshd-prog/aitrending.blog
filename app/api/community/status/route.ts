import { getCurrentUser } from "@/lib/auth-store";
import { updateIdeaStatus, type IdeaStatus } from "@/lib/community-store";

export async function PATCH(request: Request) {
  const user = await getCurrentUser();
  if (!user) return Response.json({ error: "Login required." }, { status: 401 });
  const body = await request.json().catch(() => ({})) as { ideaId?: string; status?: IdeaStatus };
  if (!body.ideaId || !body.status) return Response.json({ error: "Missing fields." }, { status: 400 });
  try {
    return Response.json({ ok: true, idea: updateIdeaStatus(body.ideaId, user.id, body.status) });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Could not update status." }, { status: 403 });
  }
}
