import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import practiceAreas from "@/content/practice-areas.json" assert { type: "json" };
import { buildMetadata } from "@/lib/seo";
import { buildFAQSchema, buildLegalServiceSchema } from "@/lib/schema";

const practice = practiceAreas.criminalDefense.find((area) => area.slug === "dui")!;
const title = "DUI Defense";
const description = "Strategic DUI defense focused on license protection, court readiness, and clear next steps after an arrest in Illinois.";

export const metadata: Metadata = buildMetadata(
  `${title} | Cece Law`,
  description,
  "/criminal-defense/dui"
);

export default function DuiPage() {
  const schema = buildLegalServiceSchema(title, description);
  const faqSchema = buildFAQSchema(practice.faqs);

  return (
    <>
      <Hero
        title="DUI Defense"
        subtitle="Move quickly after a DUI arrest. We review the stop, testing, and license deadlines, then build motions and negotiation strategies without promising outcomes."
        secondaryText="Fast response for court dates and license timelines."
      />

      <section className="section">
        <div className="container grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl tracking-widest">Protect your license and options</h2>
            <p className="text-text-secondary">
              We act on statutory summary suspension issues, examine police reports and video, and prepare to challenge field sobriety and chemical testing. Each step is explained clearly so you know what comes next.
            </p>
            <p className="text-text-secondary">
              Communication is direct and responsive. You will understand court expectations, potential outcomes, and the strategy being pursued before each appearance.
            </p>
          </div>
          <div className="card space-y-2">
            <p className="text-steel uppercase tracking-widest text-sm">Timeline aware</p>
            <ul className="list-disc list-inside text-text-secondary space-y-2">
              <li>License-related deadlines addressed immediately</li>
              <li>Discovery review and motion practice</li>
              <li>Negotiation strategy grounded in facts</li>
              <li>Trial readiness without outcome promises</li>
            </ul>
          </div>
        </div>
      </section>

      <FAQ items={practice.faqs} />
      <CTA
        title="Facing a DUI charge?"
        subtitle="Call now for a focused review of your stop, testing, and license issues."
        ctaLabel="Call (312) 922-0400"
        ctaHref="tel:3129220400"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
