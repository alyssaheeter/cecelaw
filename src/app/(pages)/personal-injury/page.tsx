import Link from "next/link";
import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { PracticeGrid } from "@/components/PracticeGrid";
import { CTA } from "@/components/CTA";
import { FAQ } from "@/components/FAQ";
import practiceAreas from "@/content/practice-areas.json" assert { type: "json" };
import { buildMetadata } from "@/lib/seo";
import { buildFAQSchema, buildLegalServiceSchema } from "@/lib/schema";

const title = "Personal Injury";
const description = "Responsive representation for injury clients, focusing on evidence preservation, insurance navigation, and clear expectations.";

export const metadata: Metadata = buildMetadata(
  `${title} | Cece Law`,
  description,
  "/personal-injury"
);

const cards = practiceAreas.personalInjury.map((item) => ({
  title: item.name,
  description: item.summary,
  href: `/personal-injury/${item.slug}`,
}));

const faqs = [
  {
    q: "What is your approach to injury cases?",
    a: "We move quickly on evidence, communicate with insurers, and set expectations about timelines and options without promising results.",
  },
  {
    q: "Will I have direct access to my lawyer?",
    a: "Yes. You get clear updates, straight talk about the process, and prompt responses to calls and emails.",
  },
];

export default function PersonalInjuryPage() {
  const schema = buildLegalServiceSchema(title, description);
  const faqSchema = buildFAQSchema(faqs);

  return (
    <>
      <Hero
        title="Personal Injury"
        subtitle="Responsive advocacy for crash and premises cases. We protect your claim, handle insurers, and keep you informed without promising outcomes."
      />

      <section className="section">
        <div className="container grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl tracking-widest">Clarity and steady communication</h2>
            <p className="text-text-secondary">
              Injury claims move on evidence and deadlines. We help document treatment, coordinate with insurers, and explain each step so you can focus on recovery.
            </p>
            <p className="text-text-secondary">
              Expect responsive updates on negotiations, medical records, and litigation milestones so you always know where your case stands.
            </p>
          </div>
          <div className="card space-y-2">
            <p className="text-steel uppercase tracking-widest text-sm">Evidence focused</p>
            <ul className="list-disc list-inside text-text-secondary space-y-2">
              <li>Scene and vehicle documentation</li>
              <li>Medical records coordination</li>
              <li>Insurance communication handled for you</li>
              <li>Litigation readiness without promises</li>
            </ul>
            <Link href="/contact" className="btn-primary w-fit">Start a conversation</Link>
          </div>
        </div>
      </section>

      <PracticeGrid heading="Injury Matters" items={cards} />
      <FAQ items={faqs} />
      <CTA
        title="Need guidance after an injury?"
        subtitle="Call or message for clear next steps and insurance support."
        ctaLabel="Call (312) 922-0400"
        ctaHref="tel:3129220400"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
