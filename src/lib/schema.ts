import site from "@/content/site.json" assert { type: "json" };
import attorney from "@/content/attorney.frank-cece-jr.json" assert { type: "json" };

export type FAQItem = { q: string; a: string };

const buildAddress = (address: string) => ({
  "@type": "PostalAddress",
  streetAddress: address,
  addressLocality: "", // Addresses provided as formatted strings
  addressRegion: "IL",
  addressCountry: "USA",
});

export const buildLegalServiceSchema = (service: string, description: string) => {
  const offices = site.offices.map((office) => buildAddress(office.address));
  return {
    "@context": "https://schema.org",
    "@type": ["LegalService", "LocalBusiness"],
    name: `${site.siteName} — ${service}`,
    description,
    areaServed: [...site.serviceArea.primaryCities, ...site.serviceArea.counties],
    telephone: site.primaryPhone,
    email: site.email,
    address: offices,
    url: "https://www.cecelaw.com",
  };
};

export const buildAttorneySchema = () => ({
  "@context": "https://schema.org",
  "@type": "Attorney",
  name: attorney.name,
  jobTitle: attorney.title,
  description: attorney.bioShort,
  alumniOf: attorney.education,
  knowsAbout: attorney.focus,
  memberOf: attorney.memberships,
  url: "https://www.cecelaw.com/about/frank-cece-jr",
  telephone: site.primaryPhone,
  email: site.email,
});

export const buildFAQSchema = (faqs: FAQItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
});

export const buildLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.siteName,
  description: site.tagline,
  telephone: site.primaryPhone,
  email: site.email,
  areaServed: [...site.serviceArea.primaryCities, ...site.serviceArea.counties],
  address: site.offices.map((office) => buildAddress(office.address)),
});
