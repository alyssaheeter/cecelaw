import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { CTA } from "@/components/CTA";
import { FAQ } from "@/components/FAQ";
import { buildMetadata } from "@/lib/seo";
import { buildFAQSchema, buildLegalServiceSchema } from "@/lib/schema";

const title = "Wrongful Death";
const description = "Compassionate advocacy for wrongful death matters with careful evidence management and respectful communication.";

export const metadata: Metadata = buildMetadata(
  `${title} | Cece Law`,
  description,
  "/personal-injury/wrongful-death"
);

const faqs: { q: string; a: string }[] = [];

export default function WrongfulDeathPage() {
  const schema = buildLegalServiceSchema(title, description);
  const faqSchema = buildFAQSchema(faqs);

  return (
    <>
      <Hero
        title="Wrongful Death"
        subtitle="We guide families through the legal process with clear updates, respectful communication, and disciplined case work—without promising specific outcomes."
      />

      <section className="section">
        <div className="container space-y-4">
          <h2 className="text-3xl tracking-widest">Structured support</h2>
          <p className="text-text-secondary">
            We coordinate investigations, insurance communication, and litigation steps while honoring your family’s priorities. No promises—just steady advocacy and clarity on options.
          </p>
        </div>
      </section>

      <FAQ items={faqs} />
      <CTA
        title="Need guidance after a loss?"
        subtitle="Call for respectful counsel on next steps."
        ctaLabel="Call (312) 922-0400"
        ctaHref="tel:3129220400"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
