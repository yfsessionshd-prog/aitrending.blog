import { getCurrentUser, getProfiles, getUsers, isAdminRole, suspendUser, updateUserRole, type UserRole } from "@/lib/auth-store";

async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || !isAdminRole(user.role)) return null;
  return user;
}

export async function GET() {
  const user = await requireAdmin();
  if (!user) return Response.json({ error: "Forbidden" }, { status: 403 });
  const profiles = getProfiles();
  const users = getUsers().map((item) => ({
    id: item.id,
    email: item.email,
    role: item.role,
    verified: item.verified,
    suspended: item.suspended,
    createdAt: item.createdAt,
    lastActivity: item.lastActivity,
    profile: profiles.find((profile) => profile.userId === item.id)
  }));
  return Response.json({ users });
}

export async function PATCH(request: Request) {
  const user = await requireAdmin();
  if (!user) return Response.json({ error: "Forbidden" }, { status: 403 });
  const body = await request.json().catch(() => ({})) as { userId?: string; role?: UserRole; suspended?: boolean };
  if (!body.userId) return Response.json({ error: "userId required" }, { status: 400 });
  if (body.role) updateUserRole(body.userId, body.role);
  if (typeof body.suspended === "boolean") suspendUser(body.userId, body.suspended);
  return Response.json({ ok: true });
}
