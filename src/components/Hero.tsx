import Link from "next/link";

type HeroProps = {
  title: string;
  subtitle: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryText?: string;
};

export function Hero({ title, subtitle, ctaLabel = "Request a Consultation", ctaHref = "/contact", secondaryText }: HeroProps) {
  return (
    <section className="section bg-charcoal">
      <div className="container grid gap-6 md:grid-cols-2 md:items-center">
        <div className="space-y-5">
          <p className="text-steel uppercase tracking-widest text-sm">Accessible Warrior</p>
          <h1 className="text-4xl md:text-5xl font-heading tracking-widest">{title}</h1>
          <p className="text-text-secondary text-lg">{subtitle}</p>
          <div className="flex gap-4 items-center flex-wrap">
            <Link href={ctaHref} className="btn-primary">
              {ctaLabel}
            </Link>
            {secondaryText ? <span className="text-text-secondary">{secondaryText}</span> : null}
          </div>
        </div>
        <div className="card">
          <h3 className="text-steel uppercase tracking-widest text-sm">Relentless Process</h3>
          <ul className="mt-4 space-y-3 text-text-secondary">
            <li>Investigation, discovery, and motion practice that pressures the record.</li>
            <li>Negotiation strategies grounded in the facts, timelines, and your goals.</li>
            <li>Trial readiness that signals preparedness without promising outcomes.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
