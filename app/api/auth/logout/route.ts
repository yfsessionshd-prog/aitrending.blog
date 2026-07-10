import { clearSession } from "@/lib/auth-store";

export async function POST() {
  await clearSession();
  return Response.json({ ok: true });
}
