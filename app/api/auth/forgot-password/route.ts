import { checkRateLimit, getUserByEmail } from "@/lib/auth-store";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "local";
  if (!checkRateLimit(`forgot:${ip}`)) return Response.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  const body = await request.json().catch(() => ({})) as { email?: string };
  const email = String(body.email || "").trim().toLowerCase();
  const exists = Boolean(getUserByEmail(email));
  return Response.json({ ok: true, message: exists ? "Password recovery instructions prepared." : "If the account exists, recovery instructions will be sent." });
}
