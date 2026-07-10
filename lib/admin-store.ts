import { readStore, writeStore } from "./file-store";

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
  return readStore<Campaign[]>("campaigns.json", seedCampaigns);
}

export function saveCampaigns(campaigns: Campaign[]) {
  writeStore("campaigns.json", campaigns);
  return campaigns;
}

export function getSettings() {
  return readStore<SiteSettings>("settings.json", seedSettings);
}

export function saveSettings(settings: SiteSettings) {
  writeStore("settings.json", settings);
  return settings;
}

export function maskSecret(value: string) {
  if (!value) return "not configured";
  return value.length <= 6 ? "******" : `******${value.slice(-4)}`;
}
