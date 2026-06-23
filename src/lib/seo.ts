import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://omeo-fan.vercel.app";

interface PageMetaOptions {
  title: string;
  description: string;
  path?: string;
}

export function buildPageMetadata({
  title,
  description,
  path = "",
}: PageMetaOptions): Metadata {
  const url = `${siteUrl}${path}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Omeo Fan | 4You Hawaii International Realty",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export const defaultKeywords = [
  "Oahu real estate agent",
  "Honolulu realtor",
  "Oahu homes",
  "buying a home in Oahu",
  "selling a home in Oahu",
  "Oahu relocation",
  "Hawaii international realty",
];
