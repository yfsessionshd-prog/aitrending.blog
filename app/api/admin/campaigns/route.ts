import { getCurrentUser, isAdminRole } from "@/lib/auth-store";
import { getCampaigns, saveCampaigns, type Campaign } from "@/lib/admin-store";

async function requireAdmin() {
  const user = await getCurrentUser();
  return user && isAdminRole(user.role) ? user : null;
}

export async function GET() {
  const user = await requireAdmin();
  if (!user) return Response.json({ error: "Forbidden" }, { status: 403 });
  return Response.json({ campaigns: getCampaigns() });
}

export async function POST(request: Request) {
  const user = await requireAdmin();
  if (!user) return Response.json({ error: "Forbidden" }, { status: 403 });
  const body = await request.json().catch(() => ({}));
  const campaigns = getCampaigns();
  const campaign: Campaign = {
    id: crypto.randomUUID(),
    title: String(body.title || "AI campaign"),
    description: String(body.description || ""),
    image: String(body.image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80"),
    url: String(body.url || "/tools"),
    startsAt: String(body.startsAt || new Date().toISOString()),
    endsAt: String(body.endsAt || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()),
    impressions: 0,
    clicks: 0,
    active: Boolean(body.active ?? true)
  };
  saveCampaigns([campaign, ...campaigns]);
  return Response.json({ ok: true, campaign });
}
