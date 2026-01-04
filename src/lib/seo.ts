import type { Metadata } from "next";
import site from "@/content/site.json" assert { type: "json" };

const baseUrl = "https://www.cecelaw.com";

export const buildMetadata = (title: string, description: string, path: string): Metadata => {
  const url = new URL(path || "/", baseUrl).toString();
  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.siteName,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
};
