import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { CookieBanner } from "@/components/CookieBanner";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "AITrending | Premium AI News & Trends",
  description: "Automated AI news, trends, model releases, tools and analysis.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "AITrending",
    description: "Premium automated AI news and trends platform.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {adsenseClient && adsenseClient !== "ca-pub-XXXX" ? (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        ) : null}
        <Header />
        {children}
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
