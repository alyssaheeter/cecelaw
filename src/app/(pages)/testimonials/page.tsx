import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { CTA } from "@/components/CTA";
import { TestimonialCard } from "@/components/TestimonialCard";
import testimonials from "@/content/testimonials.json" assert { type: "json" };
import { buildMetadata } from "@/lib/seo";
import { buildFAQSchema } from "@/lib/schema";

const title = "Testimonials";
const description = "Client feedback about communication, advocacy, and process. Testimonials do not constitute a guarantee, warranty, or prediction regarding the outcome of your legal matter.";

export const metadata: Metadata = buildMetadata(
  `${title} | Cece Law`,
  description,
  "/testimonials"
);

export default function TestimonialsPage() {
  const faqSchema = buildFAQSchema([]);
  return (
    <>
      <Hero
        title="Testimonials"
        subtitle="Feedback from clients about our accessibility, preparation, and courtroom advocacy."
      />

      <section className="section">
        <div className="container space-y-6">
          <p className="quote-block text-text-secondary text-sm">
            {testimonials.disclaimer}
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.items.map((item) => (
              <TestimonialCard key={item.title} title={item.title} body={item.body} />
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Looking for responsive counsel?"
        subtitle="Call for a direct conversation about your matter."
        ctaLabel="Call (312) 922-0400"
        ctaHref="tel:3129220400"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
