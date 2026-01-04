import Link from "next/link";
import { Hero } from "@/components/Hero";
import { PracticeGrid } from "@/components/PracticeGrid";
import { CTA } from "@/components/CTA";
import { FAQ } from "@/components/FAQ";
import practiceAreas from "@/content/practice-areas.json" assert { type: "json" };
import { buildMetadata } from "@/lib/seo";
import { buildFAQSchema, buildLegalServiceSchema } from "@/lib/schema";
import type { Metadata } from "next";

const title = "Criminal Defense";
const description = "Strategic, process-driven criminal defense for DUI, misdemeanors, serious felonies, and reckless homicide matters in the Chicago area.";

export const metadata: Metadata = buildMetadata(
  `${title} | Cece Law`,
  description,
  "/criminal-defense"
);

const cards = practiceAreas.criminalDefense.map((item) => ({
  title: item.name,
  description: item.summary,
  href: `/criminal-defense/${item.slug}`,
}));

const faqItems = [
  {
    q: "What does an aggressive criminal defense look like?",
    a: "Investigation, motion practice, and trial readiness. We move quickly on evidence, challenge the record, negotiate from strength, and keep you informed without promising outcomes.",
  },
  {
    q: "How quickly can you start?",
    a: "Immediately. Early steps include reviewing charging documents, court dates, and any deadlines that affect your license, employment, or bond conditions.",
  },
];

export default function CriminalDefensePage() {
  const schema = buildLegalServiceSchema(title, description);
  const faqSchema = buildFAQSchema(faqItems);

  return (
    <>
      <Hero
        title="Criminal Defense"
        subtitle="Battle-tested advocacy for DUI, misdemeanors, and serious felony charges. We move quickly, keep you informed, and prepare each case for negotiation or trial without guaranteeing outcomes."
      />

      <section className="section">
        <div className="container grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl tracking-widest">Calm counsel, relentless process</h2>
            <p className="text-text-secondary">
              Your freedom and record demand disciplined defense. Expect straight talk on timelines, clear next steps, and filings that protect your rights while we investigate facts, video, police reports, and discovery.
            </p>
            <p className="text-text-secondary">
              We engage prosecutors with preparation and trial readiness. Motions and negotiations are used to shape the record and pursue the best available resolution without promising outcomes.
            </p>
          </div>
          <div className="card space-y-2">
            <p className="text-steel uppercase tracking-widest text-sm">Focused coverage</p>
            <ul className="list-disc list-inside text-text-secondary space-y-2">
              <li>DUI defense with license protection strategies</li>
              <li>Felony and misdemeanor charges across Cook, Will, and DuPage</li>
              <li>Violent crime and reckless homicide matters requiring rapid investigation</li>
              <li>Expungement guidance when eligible</li>
            </ul>
            <Link href="/contact" className="btn-primary w-fit">Schedule a call</Link>
          </div>
        </div>
      </section>

      <PracticeGrid heading="Defense Focus Areas" items={cards} />
      <FAQ items={faqItems} />
      <CTA
        title="Need urgent criminal defense help?"
        subtitle="Call now for a focused plan before your next court date."
        ctaLabel="Call (312) 922-0400"
        ctaHref="tel:3129220400"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
