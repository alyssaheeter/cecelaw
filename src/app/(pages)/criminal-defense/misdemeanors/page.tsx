import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { CTA } from "@/components/CTA";
import { FAQ } from "@/components/FAQ";
import { buildMetadata } from "@/lib/seo";
import { buildFAQSchema, buildLegalServiceSchema } from "@/lib/schema";

const title = "Misdemeanor Defense";
const description = "Measured misdemeanor defense focused on minimizing long-term consequences and protecting your record.";

export const metadata: Metadata = buildMetadata(
  `${title} | Cece Law`,
  description,
  "/criminal-defense/misdemeanors"
);

const faqs = [
  {
    q: "Why take misdemeanor charges seriously?",
    a: "They can affect employment, licensing, and immigration. Early strategy can reduce exposure and protect your future without promising specific outcomes.",
  },
  {
    q: "What is your process?",
    a: "We review the complaint and discovery, pursue motions where appropriate, and negotiate or set for trial based on your goals and the evidence.",
  },
];

export default function MisdemeanorsPage() {
  const schema = buildLegalServiceSchema(title, description);
  const faqSchema = buildFAQSchema(faqs);

  return (
    <>
      <Hero
        title="Misdemeanor Defense"
        subtitle="Protect your record with a process-driven approach that addresses court requirements, negotiations, and trial readiness."
      />

      <section className="section">
        <div className="container space-y-4">
          <h2 className="text-3xl tracking-widest">Focused on the details that matter</h2>
          <p className="text-text-secondary">
            From battery and retail theft to traffic-related misdemeanors, we work to minimize long-term impact. Expect clear updates and direct guidance on options so you always know the next filing or court date.
          </p>
        </div>
      </section>

      <FAQ items={faqs} />
      <CTA
        title="Need help with a misdemeanor?"
        subtitle="Call for a quick review of charges, deadlines, and next steps."
        ctaLabel="Call (312) 922-0400"
        ctaHref="tel:3129220400"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
