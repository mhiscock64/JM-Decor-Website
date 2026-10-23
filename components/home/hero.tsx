import Image from "next/image";
import Link from "next/link";

type LinkProps = { href: string; label: string };

export function Hero({
  eyebrow,
  title,
  lede,
  image,
  primaryCta,
  secondaryCta,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede: string;
  image: { src: string; alt: string; width: number; height: number };
  primaryCta: LinkProps;
  secondaryCta: LinkProps;
}) {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative lg:mx-auto lg:grid lg:max-w-[1440px] lg:grid-cols-12 lg:items-stretch"
    >
      {/* Image first in the DOM so it sits above the headline on mobile.
          50/50 between lg and xl so the headline has room; 7/12 image from xl. */}
      <div className="aspect-[4/3] w-full min-w-0 overflow-hidden sm:aspect-[16/9] lg:order-2 lg:col-span-6 lg:aspect-auto xl:col-span-7 lg:h-[min(640px,calc(100svh-72px-150px))] lg:min-h-[520px]">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          priority
          sizes="(min-width: 1280px) 58vw, (min-width: 1024px) 50vw, 100vw"
          className="h-full w-full object-cover"
        />
      </div>
      {/* Left padding aligns with the 1280px content grid, measured against the
          section's 1440px cap (not the raw viewport, which squeezed the column on wide screens). */}
      <div className="min-w-0 px-5 pt-8 pb-10 sm:px-8 lg:order-1 lg:col-span-6 lg:flex lg:flex-col lg:justify-center lg:pt-10 lg:pr-10 lg:pb-24 lg:pl-[max(2rem,calc((min(100vw,1440px)-1280px)/2+2rem))] xl:col-span-5 xl:pr-12">
        <p className="font-body text-[12px] font-medium uppercase tracking-[0.16em] text-sage sm:tracking-[0.28em]">
          {eyebrow}
        </p>
        <h1
          id="hero-title"
          className="mt-4 font-display text-[clamp(2.5rem,11vw,2.75rem)] font-normal leading-[1.02] [overflow-wrap:anywhere] hyphens-auto sm:text-[60px] lg:text-[clamp(3.5rem,5vw,4.75rem)]"
        >
          {title}
        </h1>
        <p className="mt-5 max-w-md font-body text-[16px] leading-relaxed text-pretty text-ink/75 sm:text-[17px]">
          {lede}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7 sm:gap-y-3">
          <Link
            href={primaryCta.href}
            className="inline-flex min-h-[52px] items-center justify-center bg-ink px-8 font-body text-[15px] font-medium tracking-wide text-ivory transition-colors hover:bg-sage"
          >
            {primaryCta.label}
          </Link>
          <Link
            href={secondaryCta.href}
            className="inline-flex min-h-[44px] items-center justify-center self-start border-b border-ink/40 font-body text-[15px] transition-colors hover:border-ink sm:self-auto"
          >
            {secondaryCta.label}
            <span aria-hidden="true">&nbsp;→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
