import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { FAQ } from "@/components/FAQ";
import resources from "@/content/resources.json" assert { type: "json" };
import { buildMetadata } from "@/lib/seo";
import { buildFAQSchema } from "@/lib/schema";

const resource = resources.find((item) => item.slug === "dui-license-suspension-illinois")!;
const description = resource.summary;

export const metadata: Metadata = buildMetadata(
  `${resource.title} | Cece Law`,
  description,
  "/resources/dui-license-suspension-illinois"
);

export default function DuiLicenseSuspensionResourcePage() {
  const faqSchema = buildFAQSchema(resource.faqs);

  return (
    <>
      <Hero
        title={resource.title}
        subtitle={resource.summary}
        ctaLabel="Call (312) 922-0400"
        ctaHref="tel:3129220400"
      />

      <section className="section">
        <div className="container space-y-4">
          <h2 className="text-3xl tracking-widest">Why timing matters</h2>
          <p className="text-text-secondary">
            Illinois DUI arrests trigger administrative license processes separate from the criminal case. Acting quickly can preserve driving privileges and expand defense options.
          </p>
          <p className="text-text-secondary">
            We review the stop, testing, and notice requirements to identify deadlines and motion opportunities. Communication stays clear so you know what is next and how it affects your license.
          </p>
        </div>
      </section>

      <FAQ items={resource.faqs} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
