import { getCurrentUser, getProfile, updateProfile } from "@/lib/auth-store";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
  return Response.json({ user: { id: user.id, email: user.email, role: user.role, verified: user.verified }, profile: getProfile(user.id) });
}

export async function PUT(request: Request) {
  const user = await getCurrentUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  const profile = updateProfile(user.id, {
    name: String(body.name || ""),
    username: String(body.username || ""),
    bio: String(body.bio || ""),
    theme: body.theme === "light" ? "light" : "dark",
    preferences: Array.isArray(body.preferences) ? body.preferences.map(String) : []
  });
  return Response.json({ ok: true, profile });
}
