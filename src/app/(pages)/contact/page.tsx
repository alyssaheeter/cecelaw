import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import site from "@/content/site.json" assert { type: "json" };
import { buildMetadata } from "@/lib/seo";

const title = "Contact";
const description = "Contact Cece Law for criminal defense or personal injury matters. Expect a fast response and clear next steps.";

export const metadata: Metadata = buildMetadata(
  `${title} | Cece Law`,
  description,
  "/contact"
);

export default function ContactPage() {
  return (
    <>
      <Hero
        title="Contact"
        subtitle="Call, email, or send a message. We respond quickly with clear options and expectations."
        ctaLabel="Call (312) 922-0400"
        ctaHref="tel:3129220400"
      />

      <section className="section">
        <div className="container grid gap-8 md:grid-cols-2 md:items-start">
          <div className="space-y-4">
            <h2 className="text-3xl tracking-widest">Reach us</h2>
            <p className="text-text-secondary">Main: {site.primaryPhone}</p>
            <p className="text-text-secondary">Mobile: {site.mobilePhone}</p>
            <p className="text-text-secondary">Email: <a href={`mailto:${site.email}`} className="hover:text-steel">{site.email}</a></p>
            <p className="text-text-secondary">
              Expect a prompt reply with next-step guidance tailored to your court date, insurance deadline, or urgent concern.
            </p>
            <div className="space-y-3 text-text-secondary">
              {site.offices.map((office) => (
                <div key={office.label}>
                  <p className="font-semibold text-text-primary">{office.label}</p>
                  <p>{office.address}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <h3 className="text-steel uppercase tracking-widest text-sm">Send a message</h3>
            <p className="text-text-secondary mt-2">Submitting this form does not create an attorney-client relationship. Do not include confidential information.</p>
            <form className="mt-4 space-y-4" action={`mailto:${site.email}`} method="post" encType="text/plain">
              <div className="space-y-1">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" required />
              </div>
              <div className="space-y-1">
                <label htmlFor="phone">Phone</label>
                <input id="phone" name="phone" />
              </div>
              <div className="space-y-1">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required />
              </div>
              <div className="space-y-1">
                <label htmlFor="message">How can we help?</label>
                <textarea id="message" name="message" rows={4} />
              </div>
              <button type="submit" className="btn-primary">Send</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
