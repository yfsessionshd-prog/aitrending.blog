import type { Metadata } from "next";
import "./globals.css";
import { CookieBanner } from "@/components/CookieBanner";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-6334111208159981";

export const metadata: Metadata = {
  title: "AITrending | Premium AI News & Trends",
  description: "Automated AI news, trends, model releases, tools and analysis.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  icons: {
    icon: "/aitrending-logo.png",
    shortcut: "/aitrending-logo.png",
    apple: "/aitrending-logo.png"
  },
  openGraph: {
    title: "AITrending",
    description: "Premium automated AI news and trends platform.",
    type: "website",
    images: ["/aitrending-logo.png"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {ADSENSE_CLIENT && ADSENSE_CLIENT !== "ca-pub-XXXX" ? (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
          />
        ) : null}
      </head>
      <body suppressHydrationWarning>
        <Header />
        {children}
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
