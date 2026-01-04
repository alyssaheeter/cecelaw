interface TestimonialCardProps {
  title: string;
  body: string;
}

export function TestimonialCard({ title, body }: TestimonialCardProps) {
  return (
    <div className="card h-full flex flex-col gap-3">
      <p className="text-steel uppercase tracking-widest text-sm">{title}</p>
      <p className="text-text-secondary">{body}</p>
    </div>
  );
}
