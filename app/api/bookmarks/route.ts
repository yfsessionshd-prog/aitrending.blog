import { getCurrentUser, getProfile, toggleBookmark } from "@/lib/auth-store";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
  return Response.json({ bookmarks: getProfile(user.id)?.bookmarks || [] });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => ({})) as { itemId?: string };
  const itemId = String(body.itemId || "").trim();
  if (!itemId) return Response.json({ error: "itemId required" }, { status: 400 });
  return Response.json({ ok: true, profile: toggleBookmark(user.id, itemId) });
}
