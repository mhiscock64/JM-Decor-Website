import { Check } from "lucide-react";

export function BenefitsStrip({ label, items }: { label: string; items: string[] }) {
  return (
    <section aria-label={label} className="px-4 pt-10 sm:px-8 sm:pt-14">
      <ul className="mx-auto grid max-w-7xl grid-cols-1 border-y border-ink/10 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-0 lg:divide-x lg:divide-ink/10 lg:py-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 py-3 font-body text-[14px] leading-snug lg:px-6 lg:first:pl-0"
          >
            <Check aria-hidden="true" strokeWidth={1.6} className="mt-0.5 size-[18px] shrink-0 text-sage" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
