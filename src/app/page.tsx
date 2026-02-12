import Link from "next/link";
import { Hero } from "@/components/Hero";
import { PracticeGrid } from "@/components/PracticeGrid";
import { CTA } from "@/components/CTA";
import { TestimonialCard } from "@/components/TestimonialCard";
import { FAQ } from "@/components/FAQ";
import practiceAreas from "@/content/practice-areas.json" assert { type: "json" };
import site from "@/content/site.json" assert { type: "json" };
import testimonials from "@/content/testimonials.json" assert { type: "json" };
import { buildAttorneySchema, buildFAQSchema, buildLegalServiceSchema } from "@/lib/schema";

const criminalCards = practiceAreas.criminalDefense.map((item) => ({
  title: item.name,
  description: item.summary,
  href: `/criminal-defense/${item.slug}`,
}));

const injuryCards = practiceAreas.personalInjury.map((item) => ({
  title: item.name,
  description: item.summary,
  href: `/personal-injury/${item.slug}`,
}));

export default function HomePage() {
  const faqItems = practiceAreas.criminalDefense[0].faqs || [];
  const legalServiceSchema = buildLegalServiceSchema(
    "Criminal Defense & Personal Injury",
    "Calm counsel and relentless advocacy for criminal and injury matters in Chicago and the South/Southwest suburbs."
  );
  const attorneySchema = buildAttorneySchema();
  const faqSchema = buildFAQSchema(faqItems);

  return (
    <>
      <Hero
        title="Aggressive in the arena. Accessible to you."
        subtitle="Calm counsel and courtroom-ready advocacy for criminal defense and personal injury matters in Chicago’s South and Southwest suburbs."
        secondaryText="Call for straight talk, fast next steps, and a plan you can follow."
      />

      <section className="section">
        <div className="container grid gap-6 md:grid-cols-2 md:items-start">
          <div className="space-y-4">
            <h2 className="text-3xl tracking-widest">What to expect</h2>
            <p className="text-text-secondary">
              Straight talk, clear options, and a process-first strategy. We investigate early, file motions that protect your rights,
              negotiate from strength, and maintain trial readiness without promising outcomes.
            </p>
            <p className="text-text-secondary">
              You get responsive communication that respects the pressure you are under. Calls and messages are returned quickly, and you
              will always know the next step before a court date, meeting, or filing.
            </p>
          </div>
          <div className="card space-y-3">
            <p className="text-steel uppercase tracking-widest text-sm">Local presence</p>
            <p className="text-text-secondary">Primary cities: {site.serviceArea.primaryCities.join(", ")}</p>
            <p className="text-text-secondary">Counties served: {site.serviceArea.counties.join(", ")}</p>
            <div className="grid grid-cols-2 gap-3 text-text-secondary">
              {site.offices.map((office) => (
                <div key={office.label}>
                  <p className="font-semibold text-text-primary">{office.label}</p>
                  <p>{office.address}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PracticeGrid heading="Criminal Defense" items={criminalCards} />
      <PracticeGrid heading="Personal Injury" items={injuryCards} />

      <section className="section">
        <div className="container space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-3xl tracking-widest">Testimonials</h2>
            <Link href="/testimonials" className="btn-primary">View All</Link>
          </div>
          <p className="text-text-secondary">Testimonials do not constitute a guarantee, warranty, or prediction regarding the outcome of your legal matter.</p>
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.items.slice(0, 3).map((item) => (
              <TestimonialCard key={item.title} title={item.title} body={item.body} />
            ))}
          </div>
        </div>
      </section>

      <FAQ items={faqItems} />

      <CTA
        title="Ready for straight talk and a clear plan?"
        subtitle="Call or send a message. Expect a quick response, a review of your situation, and next steps tailored to your goals."
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(attorneySchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
