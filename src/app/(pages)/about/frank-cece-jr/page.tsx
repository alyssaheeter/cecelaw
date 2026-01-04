import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Badge } from "@/components/Badge";
import { CTA } from "@/components/CTA";
import attorney from "@/content/attorney.frank-cece-jr.json" assert { type: "json" };
import { buildMetadata } from "@/lib/seo";
import { buildAttorneySchema } from "@/lib/schema";

const title = "About Frank Cece, Jr.";
const description = "Learn about Frank Cece, Jr.’s courtroom background, admissions, and approach to criminal defense and injury matters.";

export const metadata: Metadata = buildMetadata(
  `${title} | Cece Law`,
  description,
  "/about/frank-cece-jr"
);

export default function FrankCecePage() {
  const schema = buildAttorneySchema();

  return (
    <>
      <Hero
        title={attorney.name}
        subtitle={attorney.bioShort}
        ctaLabel="Request a Consultation"
        ctaHref="/contact"
        secondaryText={attorney.title}
      />

      <section className="section">
        <div className="container space-y-6">
          <div className="flex flex-wrap gap-3">
            {attorney.focus.map((item) => (
              <Badge key={item} label={item} />
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-3xl tracking-widest">Background</h2>
              <p className="text-text-secondary">Former Cook County felony prosecutor; first-chair trial experience in serious felony cases.</p>
              <div>
                <h3 className="text-steel uppercase tracking-widest text-sm">Education</h3>
                <ul className="list-disc list-inside text-text-secondary space-y-1">
                  {attorney.education.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-steel uppercase tracking-widest text-sm">Admissions</h3>
                <ul className="list-disc list-inside text-text-secondary space-y-1">
                  {attorney.admissions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl tracking-widest">Approach</h2>
              {attorney.bioLongSections.map((section) => (
                <div key={section.heading} className="card">
                  <p className="text-steel uppercase tracking-widest text-sm">{section.heading}</p>
                  <p className="text-text-secondary mt-2">{section.body}</p>
                </div>
              ))}
              <div>
                <h3 className="text-steel uppercase tracking-widest text-sm">Memberships & Recognition</h3>
                <p className="text-text-secondary">Memberships: {attorney.memberships.join(", ")}</p>
                <p className="text-text-secondary">Recognition: {attorney.recognition.join(", ")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA
        title="Ready to talk with Frank Cece, Jr.?"
        subtitle="Call or send a note for a direct conversation about your matter."
        ctaLabel="Call (312) 922-0400"
        ctaHref="tel:3129220400"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
