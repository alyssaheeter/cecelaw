import Link from "next/link";
import site from "@/content/site.json" assert { type: "json" };

const primaryNav = [
  { label: "Home", href: "/" },
  { label: "Criminal Defense", href: "/criminal-defense" },
  { label: "Personal Injury", href: "/personal-injury" },
  { label: "About", href: "/about" },
  { label: "Results", href: "/results" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" }
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-charcoal">
      <div className="container py-12 grid gap-10 md:grid-cols-4">
        <div>
          <h3 className="text-steel text-sm uppercase tracking-widest mb-2">Firm</h3>
          <p className="text-xl font-heading tracking-widest">{site.siteName}</p>
          <p className="text-text-secondary mt-3">{site.tagline}</p>
          <div className="mt-4 space-y-1 text-text-secondary">
            <p>Main: {site.primaryPhone}</p>
            <p>Mobile: {site.mobilePhone}</p>
            <p>Email: <a href={`mailto:${site.email}`} className="hover:text-steel">{site.email}</a></p>
          </div>
        </div>
        <div>
          <h3 className="text-steel text-sm uppercase tracking-widest mb-2">Navigate</h3>
          <ul className="space-y-2">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-steel text-text-secondary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-steel text-sm uppercase tracking-widest mb-2">Offices</h3>
          <ul className="space-y-3 text-text-secondary">
            {site.offices.map((office) => (
              <li key={office.label}>
                <p className="font-semibold text-text-primary">{office.label}</p>
                <p>{office.address}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-steel text-sm uppercase tracking-widest mb-2">Service Area</h3>
          <p className="text-text-secondary">Cities: {site.serviceArea.primaryCities.join(", ")}</p>
          <p className="text-text-secondary mt-2">Counties: {site.serviceArea.counties.join(", ")}</p>
          <div className="mt-4 space-y-1 text-xs text-text-secondary">
            {site.disclaimers.map((disclaimer) => (
              <p key={disclaimer} className="quote-block text-left text-[11px] font-semibold leading-relaxed">
                {disclaimer}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-sm text-text-secondary">
        © {new Date().getFullYear()} {site.siteName}. All rights reserved.
      </div>
    </footer>
  );
}
