import { redirect } from "next/navigation";
import Link from "next/link";
import { Activity, BarChart3, Bell, FileText, Megaphone, Settings, Users } from "lucide-react";
import { AdminArticleEditor } from "@/components/AdminArticleEditor";
import { AdminReportsPanel } from "@/components/AdminReportsPanel";
import { getCampaigns, getSettings } from "@/lib/admin-store";
import { getCurrentUser, getProfiles, getUsers, isAdminRole } from "@/lib/auth-store";
import { getReports } from "@/lib/community-store";
import { getAllArticles } from "@/lib/content-store";
import { modelLaunches, trends } from "@/lib/data";
import { aiModels, aiTools } from "@/lib/public-data";
import { getToolStore } from "@/lib/tool-store";

function Stat({ label, value, icon: Icon }: { label: string; value: string | number; icon: typeof BarChart3 }) {
  return (
    <div className="rounded-xl border border-white/5 bg-card p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-white/55">{label}</p>
        <Icon className="text-cyan" size={20} />
      </div>
      <p className="mt-3 font-display text-3xl font-bold">{value}</p>
    </div>
  );
}

export default async function AdminPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) redirect("/auth/login");
  if (!isAdminRole(currentUser.role)) redirect("/");

  const articles = getAllArticles();
  const users = getUsers();
  const profiles = getProfiles();
  const campaigns = getCampaigns();
  const settings = getSettings();
  const tools = getToolStore();
  const communityReports = getReports();
  const subscribers = 0;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-cyan">Admin</p>
          <h1 className="mt-3 font-display text-5xl font-bold">AITrending Control Center</h1>
          <p className="mt-3 text-sm text-white/55">Logged in as {currentUser.email} · {currentUser.role}</p>
        </div>
        <Link href="/" className="rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-white/65">View site</Link>
      </div>

      <section className="mt-8 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        <Stat label="Visits" value="128.4K" icon={BarChart3} />
        <Stat label="Users" value={users.length} icon={Users} />
        <Stat label="Articles" value={articles.length} icon={FileText} />
        <Stat label="Subscribers" value={subscribers} icon={Bell} />
        <Stat label="Campaign CTR" value="3.8%" icon={Megaphone} />
        <Stat label="Active trends" value={trends.length} icon={Activity} />
      </section>

      <section className="mt-8 grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="mb-4 font-display text-2xl font-bold">Create / Publish News</h2>
          <AdminArticleEditor />
        </div>
        <div className="space-y-5">
          <section className="rounded-xl border border-white/5 bg-card p-5">
            <h2 className="font-display text-2xl font-bold">Most popular content</h2>
            <div className="mt-4 space-y-3">
              {articles.slice(0, 5).map((article) => (
                <div key={article.slug} className="rounded-lg bg-white/[0.03] p-3">
                  <p className="text-sm font-bold">{article.title}</p>
                  <p className="mt-1 text-xs text-white/45">{article.views} · {article.category}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="rounded-xl border border-white/5 bg-card p-5">
            <h2 className="font-display text-2xl font-bold">Active campaigns</h2>
            <div className="mt-4 space-y-3">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="rounded-lg bg-white/[0.03] p-3">
                  <p className="text-sm font-bold">{campaign.title}</p>
                  <p className="mt-1 text-xs text-white/45">{campaign.impressions} impressions · {campaign.clicks} clicks · {campaign.active ? "Active" : "Inactive"}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="rounded-xl border border-white/5 bg-card p-5">
          <h2 className="font-display text-2xl font-bold">Models & Tools</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-lg bg-white/[0.03] p-4"><p className="text-sm text-white/55">Models</p><p className="font-display text-3xl font-bold">{aiModels.length}</p></div>
            <div className="rounded-lg bg-white/[0.03] p-4"><p className="text-sm text-white/55">Tools</p><p className="font-display text-3xl font-bold">{aiTools.length}</p></div>
            <div className="rounded-lg bg-white/[0.03] p-4"><p className="text-sm text-white/55">GitHub repos</p><p className="font-display text-3xl font-bold">{tools.repos.length}</p></div>
            <div className="rounded-lg bg-white/[0.03] p-4"><p className="text-sm text-white/55">Latest releases</p><p className="font-display text-3xl font-bold">{modelLaunches.length}</p></div>
          </div>
        </div>
        <div className="rounded-xl border border-white/5 bg-card p-5">
          <h2 className="font-display text-2xl font-bold">Trend management</h2>
          <div className="mt-4 space-y-3">
            {trends.map((trend) => (
              <div key={trend.rank} className="flex items-center justify-between rounded-lg bg-white/[0.03] p-3">
                <span className="text-sm font-bold">#{trend.rank} {trend.label}</span>
                <span className={trend.delta === "up" ? "text-xs font-bold text-emerald-300" : "text-xs font-bold text-red-300"}>{trend.delta}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="rounded-xl border border-white/5 bg-card p-5">
          <h2 className="font-display text-2xl font-bold">Users & roles</h2>
          <div className="mt-4 space-y-3">
            {users.map((user) => {
              const profile = profiles.find((item) => item.userId === user.id);
              return (
                <div key={user.id} className="flex items-center justify-between rounded-lg bg-white/[0.03] p-3">
                  <div>
                    <p className="text-sm font-bold">{profile?.name || user.email}</p>
                    <p className="text-xs text-white/45">{user.email}</p>
                  </div>
                  <span className="rounded-full border border-white/10 px-2 py-1 text-xs font-bold text-white/55">{user.role}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="rounded-xl border border-white/5 bg-card p-5">
          <div className="flex items-center gap-2">
            <Settings className="text-cyan" size={20} />
            <h2 className="font-display text-2xl font-bold">General settings</h2>
          </div>
          <div className="mt-4 space-y-3 text-sm text-white/60">
            <p><b className="text-white">Site:</b> {settings.siteName}</p>
            <p><b className="text-white">SEO title:</b> {settings.seoTitle}</p>
            <p><b className="text-white">OpenRouter:</b> {settings.openRouterMasked}</p>
            <p><b className="text-white">Publisher key:</b> {settings.adsenseMasked}</p>
            <p><b className="text-white">Maintenance:</b> {settings.maintenanceMode ? "On" : "Off"}</p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <AdminReportsPanel reports={communityReports} />
      </section>
    </main>
  );
}
