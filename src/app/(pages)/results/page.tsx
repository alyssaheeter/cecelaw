import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { CTA } from "@/components/CTA";
import { buildMetadata } from "@/lib/seo";

const title = "Results";
const description = "Representative matters highlighting process, preparation, and advocacy. Prior results do not guarantee a similar outcome.";

export const metadata: Metadata = buildMetadata(
  `${title} | Cece Law`,
  description,
  "/results"
);

const matters = [
  {
    heading: "Felony defense",
    body: "Challenged search and statements through motions; negotiated reduced exposure after building trial readiness.",
  },
  {
    heading: "DUI license defense",
    body: "Acted quickly on summary suspension deadlines; contested testing issues and preserved driving privileges during the case.",
  },
  {
    heading: "Injury litigation",
    body: "Documented treatment and damages thoroughly; engaged insurers with evidence-driven negotiation while preparing for trial if needed.",
  },
];

export default function ResultsPage() {
  return (
    <>
      <Hero
        title="Results"
        subtitle="Process and preparation drive negotiation and trial readiness. Prior results do not guarantee a similar outcome."
      />

      <section className="section">
        <div className="container space-y-6">
          <p className="quote-block text-text-secondary text-sm">
            Prior results do not guarantee a similar outcome.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {matters.map((matter) => (
              <div key={matter.heading} className="card">
                <p className="text-steel uppercase tracking-widest text-sm">{matter.heading}</p>
                <p className="text-text-secondary mt-2">{matter.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Want to understand the process for your case?"
        subtitle="Call for a candid assessment and next steps."
        ctaLabel="Call (312) 922-0400"
        ctaHref="tel:3129220400"
      />
    </>
  );
}
