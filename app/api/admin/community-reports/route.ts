import { getCurrentUser, isAdminRole } from "@/lib/auth-store";
import { getReports, moderateReport, type ReportStatus } from "@/lib/community-store";

async function requireAdmin() {
  const user = await getCurrentUser();
  return user && isAdminRole(user.role) ? user : null;
}

export async function GET() {
  const user = await requireAdmin();
  if (!user) return Response.json({ error: "Forbidden" }, { status: 403 });
  return Response.json({ reports: getReports() });
}

export async function PATCH(request: Request) {
  const user = await requireAdmin();
  if (!user) return Response.json({ error: "Forbidden" }, { status: 403 });
  const body = await request.json().catch(() => ({})) as { reportId?: string; action?: ReportStatus };
  if (!body.reportId || !body.action) return Response.json({ error: "Missing fields." }, { status: 400 });
  return Response.json({ ok: true, report: moderateReport(body.reportId, body.action) });
}
