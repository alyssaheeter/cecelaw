import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { buildMetadata } from "@/lib/seo";

const title = "Privacy";
const description = "Privacy practices for the Cece Law website and contact form.";

export const metadata: Metadata = buildMetadata(
  `${title} | Cece Law`,
  description,
  "/privacy"
);

export default function PrivacyPage() {
  return (
    <>
      <Hero
        title="Privacy"
        subtitle="How we handle information submitted through this site."
        ctaLabel="Contact"
        ctaHref="/contact"
      />

      <section className="section">
        <div className="container space-y-3 text-text-secondary">
          <p>Information you submit through the contact form or email is used to respond to your inquiry. Submitting the form does not create an attorney-client relationship.</p>
          <p>We do not sell your information. Standard web analytics may be used to improve the site experience.</p>
          <p>Do not send confidential details until an engagement agreement is executed.</p>
        </div>
      </section>
    </>
  );
}
