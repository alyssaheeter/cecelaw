import { FAQItem } from "@/lib/schema";

type FAQProps = {
  items: FAQItem[];
};

export function FAQ({ items }: FAQProps) {
  if (!items.length) return null;
  return (
    <section className="section">
      <div className="container space-y-4">
        <h2 className="text-3xl tracking-widest">FAQs</h2>
        <div className="space-y-3">
          {items.map((faq) => (
            <details key={faq.q} className="card">
              <summary className="cursor-pointer text-steel uppercase tracking-widest text-sm">{faq.q}</summary>
              <p className="mt-2 text-text-secondary">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
