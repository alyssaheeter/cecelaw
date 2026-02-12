import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { FAQ } from "@/components/FAQ";
import resources from "@/content/resources.json" assert { type: "json" };
import { buildMetadata } from "@/lib/seo";
import { buildFAQSchema } from "@/lib/schema";

const resource = resources.find((item) => item.slug === "what-to-do-after-car-accident-illinois")!;
const description = resource.summary;

export const metadata: Metadata = buildMetadata(
  `${resource.title} | Cece Law`,
  description,
  "/resources/what-to-do-after-car-accident-illinois"
);

export default function CarAccidentResourcePage() {
  const faqSchema = buildFAQSchema(resource.faqs);

  return (
    <>
      <Hero
        title={resource.title}
        subtitle={resource.summary}
        ctaLabel="Call (312) 922-0400"
        ctaHref="tel:3129220400"
      />

      <section className="section">
        <div className="container space-y-3">
          <h2 className="text-3xl tracking-widest">Immediate steps</h2>
          <ul className="list-disc list-inside text-text-secondary space-y-2">
            <li>Check for injuries and call for medical help if needed.</li>
            <li>Call police and obtain an incident report number.</li>
            <li>Document photos of vehicles, scene, and visible injuries.</li>
            <li>Exchange information but avoid recorded statements until you understand your options.</li>
          </ul>
          <p className="text-text-secondary">
            Clear documentation and measured communication with insurers protect your claim while you focus on medical care.
          </p>
        </div>
      </section>

      <FAQ items={resource.faqs} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
