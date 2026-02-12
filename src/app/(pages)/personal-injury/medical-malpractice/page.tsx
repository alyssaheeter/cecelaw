import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { CTA } from "@/components/CTA";
import { FAQ } from "@/components/FAQ";
import { buildMetadata } from "@/lib/seo";
import { buildFAQSchema, buildLegalServiceSchema } from "@/lib/schema";

const title = "Medical Malpractice";
const description = "Selective handling of complex medical negligence matters, sometimes with co-counsel, with careful review of records and timelines.";

export const metadata: Metadata = buildMetadata(
  `${title} | Cece Law`,
  description,
  "/personal-injury/medical-malpractice"
);

const faqs: { q: string; a: string }[] = [];

export default function MedicalMalpracticePage() {
  const schema = buildLegalServiceSchema(title, description);
  const faqSchema = buildFAQSchema(faqs);

  return (
    <>
      <Hero
        title="Medical Malpractice"
        subtitle="We evaluate claims carefully, coordinate experts when appropriate, and set honest expectations about timelines and complexity—no guarantees, just rigorous review."
      />

      <section className="section">
        <div className="container space-y-4">
          <h2 className="text-3xl tracking-widest">Deliberate case selection</h2>
          <p className="text-text-secondary">
            Medical negligence cases require rigorous record review and expert input. We explain viability, next steps, and whether co-counsel involvement is recommended.
          </p>
        </div>
      </section>

      <FAQ items={faqs} />
      <CTA
        title="Exploring a malpractice claim?"
        subtitle="Call to discuss your records and the evaluation process."
        ctaLabel="Call (312) 922-0400"
        ctaHref="tel:3129220400"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
