import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const file = join(process.cwd(), "data", "newsletter.json");

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({})) as { email?: string };
  const email = String(body.email || "").trim().toLowerCase();

  if (!isEmail(email)) {
    return Response.json({ error: "Invalid email" }, { status: 400 });
  }

  const directory = dirname(file);
  if (!existsSync(directory)) mkdirSync(directory, { recursive: true });
  const current = existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) as string[] : [];
  const next = Array.from(new Set([...current, email]));
  writeFileSync(file, JSON.stringify(next, null, 2), "utf8");

  return Response.json({ ok: true, subscribers: next.length });
}
