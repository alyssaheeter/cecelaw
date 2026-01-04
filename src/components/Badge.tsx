interface BadgeProps {
  label: string;
}

export function Badge({ label }: BadgeProps) {
  return (
    <span className="inline-flex items-center uppercase tracking-widest text-xs text-steel px-3 py-1 border border-steel rounded-full">
      {label}
    </span>
  );
}
