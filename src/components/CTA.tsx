import Link from "next/link";

type CTAProps = {
  title: string;
  subtitle: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function CTA({ title, subtitle, ctaLabel = "Call Now", ctaHref = "tel:3129220400" }: CTAProps) {
  return (
    <section className="section bg-white/5">
      <div className="container flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h3 className="text-2xl tracking-widest">{title}</h3>
          <p className="text-text-secondary mt-2">{subtitle}</p>
        </div>
        <Link href={ctaHref} className="btn-primary">
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
