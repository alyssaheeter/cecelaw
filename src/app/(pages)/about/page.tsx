import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { CTA } from "@/components/CTA";
import { buildMetadata } from "@/lib/seo";

const title = "About";
const description = "Learn about Cece Law’s mission, communication standards, and process-driven advocacy for criminal defense and injury clients.";

export const metadata: Metadata = buildMetadata(
  `${title} | Cece Law`,
  description,
  "/about"
);

export default function AboutPage() {
  return (
    <>
      <Hero
        title="About Cece Law"
        subtitle="Accessible Warrior: aggressive in the arena, accessible to you."
        ctaLabel="Meet Frank Cece, Jr."
        ctaHref="/about/frank-cece-jr"
      />

      <section className="section">
        <div className="container grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl tracking-widest">Our approach</h2>
            <p className="text-text-secondary">
              We combine courtroom experience with calm counsel. You get clear options, straight talk, and disciplined preparation—from investigation and motions to negotiation strategy and trial readiness. No promises of results, just relentless process.
            </p>
            <p className="text-text-secondary">
              Communication is a priority. Calls and emails are returned quickly, and you will always know what to expect before each court date or milestone.
            </p>
          </div>
          <div className="card space-y-3">
            <p className="text-steel uppercase tracking-widest text-sm">Fast facts</p>
            <ul className="list-disc list-inside text-text-secondary space-y-2">
              <li>Serving Chicago and the South/Southwest suburbs</li>
              <li>Criminal defense and personal injury focus</li>
              <li>Process-driven advocacy; no guarantees of outcomes</li>
            </ul>
            <Link href="/contact" className="btn-primary w-fit">Talk with us</Link>
          </div>
        </div>
      </section>

      <CTA
        title="Want to know the attorney leading your case?"
        subtitle="Read about Frank Cece, Jr.’s background and trial experience."
        ctaLabel="View Attorney Profile"
        ctaHref="/about/frank-cece-jr"
      />
    </>
  );
}
