import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { getCurrentUser, isAdminRole } from "@/lib/auth-store";

const file = join(process.cwd(), "data", "newsletter.json");

async function requireAdmin() {
  const user = await getCurrentUser();
  return user && isAdminRole(user.role) ? user : null;
}

function readSubscribers(): string[] {
  if (!existsSync(file)) return [];
  try {
    const raw = readFileSync(file, "utf8").replace(/^\uFEFF/, "").trim();
    return raw ? JSON.parse(raw) as string[] : [];
  } catch {
    return [];
  }
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
  writeFileSync(file, JSON.stringify(next, null, 2), "utf8");
  return Response.json({ ok: true });
}
