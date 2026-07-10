import { getCurrentUser } from "@/lib/auth-store";
import { addReport } from "@/lib/community-store";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return Response.json({ error: "Login required." }, { status: 401 });
  const body = await request.json().catch(() => ({})) as { targetType?: "idea" | "comment"; targetId?: string; reason?: string };
  if (!body.targetType || !body.targetId || !body.reason) return Response.json({ error: "Missing report fields." }, { status: 400 });
  return Response.json({ ok: true, report: addReport({ targetType: body.targetType, targetId: body.targetId, reason: body.reason, reporterId: user.id }) });
}
