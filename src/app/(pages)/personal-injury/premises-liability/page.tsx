import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { CTA } from "@/components/CTA";
import { FAQ } from "@/components/FAQ";
import { buildMetadata } from "@/lib/seo";
import { buildFAQSchema, buildLegalServiceSchema } from "@/lib/schema";

const title = "Premises Liability";
const description = "Slip-and-fall and unsafe property claims with attention to evidence, notice issues, and clear communication.";

export const metadata: Metadata = buildMetadata(
  `${title} | Cece Law`,
  description,
  "/personal-injury/premises-liability"
);

const faqs: { q: string; a: string }[] = [];

export default function PremisesLiabilityPage() {
  const schema = buildLegalServiceSchema(title, description);
  const faqSchema = buildFAQSchema(faqs);

  return (
    <>
      <Hero
        title="Premises Liability"
        subtitle="We document conditions, notice, and injuries to protect your claim while setting realistic expectations—no promises, just process."
      />

      <section className="section">
        <div className="container space-y-4">
          <h2 className="text-3xl tracking-widest">Document early</h2>
          <p className="text-text-secondary">
            Photos, incident reports, and medical records matter. We coordinate evidence and communicate with insurers while you focus on treatment.
          </p>
        </div>
      </section>

      <FAQ items={faqs} />
      <CTA
        title="Injured on unsafe property?"
        subtitle="Call to discuss documentation steps and next actions."
        ctaLabel="Call (312) 922-0400"
        ctaHref="tel:3129220400"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
