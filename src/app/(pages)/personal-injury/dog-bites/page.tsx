import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { CTA } from "@/components/CTA";
import { FAQ } from "@/components/FAQ";
import { buildMetadata } from "@/lib/seo";
import { buildFAQSchema, buildLegalServiceSchema } from "@/lib/schema";

const title = "Dog Bites";
const description = "Advocacy for victims of dog bites, focusing on medical documentation, liability, and insurance communication.";

export const metadata: Metadata = buildMetadata(
  `${title} | Cece Law`,
  description,
  "/personal-injury/dog-bites"
);

const faqs: { q: string; a: string }[] = [];

export default function DogBitesPage() {
  const schema = buildLegalServiceSchema(title, description);
  const faqSchema = buildFAQSchema(faqs);

  return (
    <>
      <Hero
        title="Dog Bite Cases"
        subtitle="We help document injuries and handle insurer communication while you focus on healing—always with clear updates and realistic expectations."
      />

      <section className="section">
        <div className="container space-y-4">
          <h2 className="text-3xl tracking-widest">Support through recovery</h2>
          <p className="text-text-secondary">
            Photographs, medical records, and witness statements strengthen your claim. We coordinate the evidence and navigate coverage issues without promising specific recoveries.
          </p>
        </div>
      </section>

      <FAQ items={faqs} />
      <CTA
        title="Bitten by a dog?"
        subtitle="Call for guidance on documenting the incident and your injuries."
        ctaLabel="Call (312) 922-0400"
        ctaHref="tel:3129220400"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
