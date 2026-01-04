import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { CTA } from "@/components/CTA";
import { FAQ } from "@/components/FAQ";
import { buildMetadata } from "@/lib/seo";
import { buildFAQSchema, buildLegalServiceSchema } from "@/lib/schema";

const title = "Reckless Homicide";
const description = "Careful, experienced handling of reckless homicide cases with respectful communication and disciplined courtroom preparation.";

export const metadata: Metadata = buildMetadata(
  `${title} | Cece Law`,
  description,
  "/criminal-defense/reckless-homicide"
);

const faqs = [
  {
    q: "How do you manage complex evidence?",
    a: "We coordinate investigation, consult experts when needed, and file motions that challenge improper evidence, all while preparing for negotiation or trial without guaranteeing outcomes.",
  },
];

export default function RecklessHomicidePage() {
  const schema = buildLegalServiceSchema(title, description);
  const faqSchema = buildFAQSchema(faqs);

  return (
    <>
      <Hero
        title="Reckless Homicide Defense"
        subtitle="Measured, respectful advocacy for serious charges. We focus on evidence, procedure, and clear communication with families."
      />

      <section className="section">
        <div className="container space-y-4">
          <h2 className="text-3xl tracking-widest">Stability in high-pressure matters</h2>
          <p className="text-text-secondary">
            These cases require sensitivity and rigor. We coordinate investigations, preserve evidence, and engage experts when appropriate to build the defense record while keeping families informed.
          </p>
        </div>
      </section>

      <FAQ items={faqs} />
      <CTA
        title="Need counsel on a reckless homicide case?"
        subtitle="Call for a respectful, direct consultation on next steps."
        ctaLabel="Call (312) 922-0400"
        ctaHref="tel:3129220400"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
