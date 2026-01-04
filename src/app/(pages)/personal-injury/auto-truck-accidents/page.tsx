import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import practiceAreas from "@/content/practice-areas.json" assert { type: "json" };
import { buildMetadata } from "@/lib/seo";
import { buildFAQSchema, buildLegalServiceSchema } from "@/lib/schema";

const practice = practiceAreas.personalInjury.find((area) => area.slug === "auto-truck-accidents")!;
const title = "Auto & Truck Accidents";
const description = "Guidance after car and truck crashes, focusing on evidence preservation, insurer communication, and clear expectations.";

export const metadata: Metadata = buildMetadata(
  `${title} | Cece Law`,
  description,
  "/personal-injury/auto-truck-accidents"
);

export default function AutoTruckAccidentsPage() {
  const schema = buildLegalServiceSchema(title, description);
  const faqSchema = buildFAQSchema(practice.faqs);

  return (
    <>
      <Hero
        title="Auto & Truck Accidents"
        subtitle="Protect your claim with organized evidence, insurer coordination, and steady communication while you recover—without promising specific outcomes."
      />

      <section className="section">
        <div className="container space-y-4">
          <h2 className="text-3xl tracking-widest">Protect the record</h2>
          <p className="text-text-secondary">
            We document scenes, vehicles, medical treatment, and lost wages, then communicate with insurers on your behalf. You receive straight talk on timelines and options without promises about outcomes.
          </p>
        </div>
      </section>

      <FAQ items={practice.faqs} />
      <CTA
        title="After a crash, call early"
        subtitle="Get help coordinating evidence and insurance communication."
        ctaLabel="Call (312) 922-0400"
        ctaHref="tel:3129220400"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
