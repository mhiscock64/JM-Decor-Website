import Link from "next/link";

export function ClosingCta({
  title,
  body,
  cta,
}: {
  title: React.ReactNode;
  body: string;
  cta: { href: string; label: string };
}) {
  return (
    <section aria-labelledby="closing-title" className="on-dark bg-ink px-4 py-16 text-ivory sm:px-8 sm:py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <h2 id="closing-title" className="font-display text-[36px] leading-tight font-normal sm:text-[48px]">
            {title}
          </h2>
          <p className="mt-4 font-body text-[16px] leading-relaxed text-ivory/85">{body}</p>
        </div>
        <Link
          href={cta.href}
          className="inline-flex min-h-[52px] items-center justify-center self-start bg-ivory px-8 font-body text-[15px] font-medium tracking-wide text-ink transition-colors hover:bg-white lg:self-auto"
        >
          {cta.label}
        </Link>
      </div>
    </section>
  );
}
