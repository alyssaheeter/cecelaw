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
  { label: "Contact", href: "/contact", cta: true },
];

const utilityNav = [
  { label: "Privacy", href: "/privacy" },
  { label: "Disclaimer", href: "/disclaimer" },
];

export function Nav() {
  return (
    <header className="border-b border-white/10 sticky top-0 z-30 backdrop-blur bg-charcoal/80">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full border border-steel flex items-center justify-center text-steel font-heading text-xl tracking-widest">
            CL
          </div>
          <div className="leading-tight">
            <p className="text-sm text-text-secondary uppercase tracking-widest">{site.tagline}</p>
            <p className="text-lg font-semibold text-text-primary">{site.siteName}</p>
          </div>
        </div>
        <nav className="flex items-center gap-2">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${item.cta ? "nav-cta" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3 text-sm text-text-secondary uppercase tracking-wider">
          {utilityNav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-steel">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
