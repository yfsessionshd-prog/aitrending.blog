import { getCurrentUser, isAdminRole } from "@/lib/auth-store";
import { getSettings, maskSecret, saveSettings } from "@/lib/admin-store";

export async function GET() {
  const user = await getCurrentUser();
  if (!user || !isAdminRole(user.role)) return Response.json({ error: "Forbidden" }, { status: 403 });
  return Response.json({ settings: getSettings() });
}

export async function PUT(request: Request) {
  const user = await getCurrentUser();
  if (!user || !isAdminRole(user.role)) return Response.json({ error: "Forbidden" }, { status: 403 });
  const body = await request.json().catch(() => ({}));
  const current = getSettings();
  const settings = saveSettings({
    ...current,
    siteName: String(body.siteName || current.siteName),
    logoText: String(body.logoText || current.logoText),
    seoTitle: String(body.seoTitle || current.seoTitle),
    seoDescription: String(body.seoDescription || current.seoDescription),
    analyticsId: String(body.analyticsId || current.analyticsId),
    maintenanceMode: Boolean(body.maintenanceMode),
    openRouterMasked: body.openRouterKey ? maskSecret(String(body.openRouterKey)) : current.openRouterMasked,
    adsenseMasked: body.adsenseKey ? maskSecret(String(body.adsenseKey)) : current.adsenseMasked
  });
  return Response.json({ ok: true, settings });
}
