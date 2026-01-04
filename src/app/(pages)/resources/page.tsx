import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import resources from "@/content/resources.json" assert { type: "json" };
import { buildMetadata } from "@/lib/seo";

const title = "Resources";
const description = "Guides and checklists for DUI defense and personal injury clients in Illinois.";

export const metadata: Metadata = buildMetadata(
  `${title} | Cece Law`,
  description,
  "/resources"
);

export default function ResourcesPage() {
  return (
    <>
      <Hero
        title="Resources"
        subtitle="Plain-language guides to help you understand urgent next steps and timelines."
        ctaLabel="Contact"
        ctaHref="/contact"
      />
      <section className="section">
        <div className="container grid gap-4 md:grid-cols-2">
          {resources.map((item) => (
            <Link key={item.slug} href={`/resources/${item.slug}`} className="card block">
              <p className="text-steel uppercase tracking-widest text-sm">{item.type}</p>
              <h2 className="text-2xl tracking-widest">{item.title}</h2>
              <p className="text-text-secondary mt-2">{item.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
