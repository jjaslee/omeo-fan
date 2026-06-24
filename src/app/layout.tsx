import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { getSiteConfig } from "@/lib/content/load";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const site = getSiteConfig();

export const metadata: Metadata = {
  title: {
    default: `${site.agent.name} | Oʻahu Real Estate Agent`,
    template: `%s | ${site.agent.name}`,
  },
  description: site.seo.default_description.trim(),
  keywords: [
    "Oahu real estate agent",
    "Honolulu realtor",
    "Oahu homes",
    "buying a home in Oahu",
    "selling a home in Oahu",
    "Oahu relocation",
  ],
  openGraph: {
    title: `${site.agent.name} | Oʻahu Real Estate Agent`,
    description: site.seo.default_description.trim(),
    siteName: site.brokerage.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.agent.name} | Oʻahu Real Estate Agent`,
    description: site.seo.default_description.trim(),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col text-foreground">
        <SmoothScroll />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
