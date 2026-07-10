import { checkRateLimit, createUser, setSession } from "@/lib/auth-store";

function validEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "local";
  if (!checkRateLimit(`register:${ip}`)) return Response.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  const body = await request.json().catch(() => ({})) as { email?: string; password?: string; name?: string };
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");
  const name = String(body.name || "AITrending User").trim();
  if (!validEmail(email) || password.length < 8) return Response.json({ error: "Valid email and 8+ character password required." }, { status: 400 });

  try {
    const user = await createUser({ email, password, name });
    await setSession(user);
    return Response.json({ ok: true, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Registration failed." }, { status: 400 });
  }
}
