import { getCurrentUser, isAdminRole } from "@/lib/auth-store";
import { readStore, writeStore } from "@/lib/file-store";

async function requireAdmin() {
  const user = await getCurrentUser();
  return user && isAdminRole(user.role) ? user : null;
}

function readSubscribers(): string[] {
  return readStore<string[]>("newsletter.json", []);
}

export async function GET() {
  const user = await requireAdmin();
  if (!user) return Response.json({ error: "Forbidden" }, { status: 403 });
  return Response.json({ subscribers: readSubscribers().map((email) => ({ email, tags: ["AI"], subscribedAt: new Date().toISOString() })) });
}

export async function DELETE(request: Request) {
  const user = await requireAdmin();
  if (!user) return Response.json({ error: "Forbidden" }, { status: 403 });
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  if (!email) return Response.json({ error: "email required" }, { status: 400 });
  const next = readSubscribers().filter((item) => item !== email);
  writeStore("newsletter.json", next);
  return Response.json({ ok: true });
}
