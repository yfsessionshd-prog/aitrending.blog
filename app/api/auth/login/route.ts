import { checkRateLimit, getUserByEmail, setSession, verifyPassword } from "@/lib/auth-store";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "local";
  if (!checkRateLimit(`login:${ip}`)) return Response.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  const body = await request.json().catch(() => ({})) as { email?: string; password?: string };
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");
  const user = getUserByEmail(email);

  if (!user || user.suspended || !(await verifyPassword(user, password))) {
    return Response.json({ error: "Invalid credentials." }, { status: 401 });
  }

  await setSession(user);
  return Response.json({ ok: true, user: { id: user.id, email: user.email, role: user.role } });
}
