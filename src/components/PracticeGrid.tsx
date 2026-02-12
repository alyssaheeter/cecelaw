import Link from "next/link";

type PracticeGridItem = {
  title: string;
  description: string;
  href: string;
};

type PracticeGridProps = {
  heading: string;
  items: PracticeGridItem[];
};

export function PracticeGrid({ heading, items }: PracticeGridProps) {
  return (
    <section className="section">
      <div className="container space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-3xl tracking-widest">{heading}</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="card block">
              <p className="text-sm uppercase tracking-widest text-steel">{item.title}</p>
              <p className="text-text-secondary mt-2">{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
