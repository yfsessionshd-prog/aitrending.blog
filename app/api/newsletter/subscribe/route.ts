import { readStore, writeStore } from "@/lib/file-store";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({})) as { email?: string };
  const email = String(body.email || "").trim().toLowerCase();

  if (!isEmail(email)) {
    return Response.json({ error: "Invalid email" }, { status: 400 });
  }

  const current = readStore<string[]>("newsletter.json", []);
  const next = Array.from(new Set([...current, email]));
  writeStore("newsletter.json", next);

  return Response.json({ ok: true, subscribers: next.length });
}
