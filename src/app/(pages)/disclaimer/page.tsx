import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import site from "@/content/site.json" assert { type: "json" };
import { buildMetadata } from "@/lib/seo";

const title = "Disclaimer";
const description = "Attorney advertising disclosures and limitations for the Cece Law website.";

export const metadata: Metadata = buildMetadata(
  `${title} | Cece Law`,
  description,
  "/disclaimer"
);

export default function DisclaimerPage() {
  return (
    <>
      <Hero
        title="Disclaimer"
        subtitle="Important notices about this website and attorney advertising."
        ctaLabel="Contact"
        ctaHref="/contact"
      />

      <section className="section">
        <div className="container space-y-3 text-text-secondary">
          {site.disclaimers.map((text) => (
            <p key={text} className="quote-block text-left text-text-secondary">{text}</p>
          ))}
          <p className="text-text-secondary">
            Prior results do not guarantee a similar outcome. Testimonials do not constitute a guarantee, warranty, or prediction regarding the outcome of your legal matter.
          </p>
        </div>
      </section>
    </>
  );
}
