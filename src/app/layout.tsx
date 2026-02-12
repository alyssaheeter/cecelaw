import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import "@/styles/globals.css";
import site from "@/content/site.json" assert { type: "json" };
import { buildMetadata } from "@/lib/seo";
import { buildLocalBusinessSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata(
  `${site.siteName} | Criminal Defense & Injury Lawyer`,
  "Cece Law provides calm counsel and relentless advocacy for criminal defense and personal injury matters in Chicago and the South/Southwest suburbs.",
  "/"
);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = buildLocalBusinessSchema();
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
