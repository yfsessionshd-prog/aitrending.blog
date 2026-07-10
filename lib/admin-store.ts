import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

export type Campaign = {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  startsAt: string;
  endsAt: string;
  impressions: number;
  clicks: number;
  active: boolean;
};

export type SiteSettings = {
  siteName: string;
  logoText: string;
  favicon: string;
  seoTitle: string;
  seoDescription: string;
  analyticsId: string;
  maintenanceMode: boolean;
  openRouterMasked: string;
  adsenseMasked: string;
};

const campaignsPath = join(process.cwd(), "data", "campaigns.json");
const settingsPath = join(process.cwd(), "data", "settings.json");

function ensureFile(path: string, fallback: unknown) {
  const directory = dirname(path);
  if (!existsSync(directory)) mkdirSync(directory, { recursive: true });
  if (!existsSync(path)) writeFileSync(path, JSON.stringify(fallback, null, 2), "utf8");
}

function readJson<T>(path: string, fallback: T): T {
  ensureFile(path, fallback);
  try {
    const raw = readFileSync(path, "utf8").replace(/^\uFEFF/, "").trim();
    return raw ? JSON.parse(raw) as T : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(path: string, data: unknown) {
  writeFileSync(path, JSON.stringify(data, null, 2), "utf8");
}

const seedCampaigns: Campaign[] = [
  {
    id: "ai-workflow-platform",
    title: "AI workflow platform",
    description: "Native sponsored placement for AI builders and software teams.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
    url: "/tools",
    startsAt: new Date().toISOString(),
    endsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    impressions: 18420,
    clicks: 712,
    active: true
  }
];

const seedSettings: SiteSettings = {
  siteName: "AITrending",
  logoText: "AITrending",
  favicon: "/favicon.ico",
  seoTitle: "AITrending | Premium AI News & Trends",
  seoDescription: "Automated AI news, trends, models, tools and explainers.",
  analyticsId: "",
  maintenanceMode: false,
  openRouterMasked: "not configured",
  adsenseMasked: "not configured"
};

export function getCampaigns() {
  return readJson<Campaign[]>(campaignsPath, seedCampaigns);
}

export function saveCampaigns(campaigns: Campaign[]) {
  writeJson(campaignsPath, campaigns);
  return campaigns;
}

export function getSettings() {
  return readJson<SiteSettings>(settingsPath, seedSettings);
}

export function saveSettings(settings: SiteSettings) {
  writeJson(settingsPath, settings);
  return settings;
}

export function maskSecret(value: string) {
  if (!value) return "not configured";
  return value.length <= 6 ? "******" : `******${value.slice(-4)}`;
}
