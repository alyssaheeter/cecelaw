import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { CTA } from "@/components/CTA";
import { FAQ } from "@/components/FAQ";
import practiceAreas from "@/content/practice-areas.json" assert { type: "json" };
import { buildMetadata } from "@/lib/seo";
import { buildFAQSchema, buildLegalServiceSchema } from "@/lib/schema";

const practice = practiceAreas.criminalDefense.find((area) => area.slug === "serious-felonies")!;
const title = "Serious Felonies";
const description = "Relentless felony defense with focused investigation, motion practice, and courtroom readiness across Cook, Will, and DuPage counties.";

export const metadata: Metadata = buildMetadata(
  `${title} | Cece Law`,
  description,
  "/criminal-defense/serious-felonies"
);

const faqs = [
  {
    q: "How do you approach serious felony cases?",
    a: "We start with rapid fact development: discovery review, investigation, and targeted motions. Negotiations are informed by trial readiness and your goals, without guaranteeing results.",
  },
];

export default function SeriousFeloniesPage() {
  const schema = buildLegalServiceSchema(title, description);
  const faqSchema = buildFAQSchema(faqs);

  return (
    <>
      <Hero
        title="Serious Felony Defense"
        subtitle="Battle-tested courtroom advocacy for high-stakes charges. Expect direct communication, disciplined preparation, and a clear path forward without promises."
      />

      <section className="section">
        <div className="container grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl tracking-widest">Investigation and preparation first</h2>
            <p className="text-text-secondary">
              We scrutinize evidence, police conduct, and constitutional issues, filing motions that protect your rights and shape negotiation leverage. Trial readiness is maintained without promising outcomes.
            </p>
            <p className="text-text-secondary">
              You will always know the next court date, expected filings, and strategic options. Communication stays clear and responsive.
            </p>
          </div>
          <div className="card space-y-2">
            <p className="text-steel uppercase tracking-widest text-sm">Case types</p>
            <ul className="list-disc list-inside text-text-secondary space-y-2">
              <li>Violent crime and weapons charges</li>
              <li>Drug delivery or possession with intent</li>
              <li>Theft and financial crimes</li>
              <li>Probation or parole violations</li>
            </ul>
          </div>
        </div>
      </section>

      <FAQ items={faqs} />
      <CTA
        title="Facing felony charges?"
        subtitle="Call for a direct consult and immediate next steps."
        ctaLabel="Call (312) 922-0400"
        ctaHref="tel:3129220400"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
