import { cn } from "@/lib/utils";

// Pill toggle buttons shared by the homepage inspiration wall and the gallery page.
export function FilterChips<K extends string>({
  label,
  filters,
  value,
  onChange,
  className,
}: {
  label: string;
  filters: { key: K; label: string }[];
  value: K;
  onChange: (next: K) => void;
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)} aria-label={label}>
      {filters.map((item) => (
        <li key={item.key}>
          <button
            type="button"
            aria-pressed={value === item.key}
            onClick={() => onChange(item.key)}
            className={cn(
              "min-h-[44px] rounded-full border px-4 font-body text-[14px] transition",
              value === item.key ? "border-ink bg-ink text-ivory" : "border-ink/30 hover:border-ink",
            )}
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
}
