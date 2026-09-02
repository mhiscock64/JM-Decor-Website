"use client";

import Link from "next/link";
import { copy, t } from "@/lib/i18n";
import { useLanguage } from "@/lib/language";
import { GALLERY, HERO } from "@/lib/products";
import { CtaLink } from "@/components/cta";
import { LightboxImage } from "@/components/lightbox-image";

export function HomePage() {
  const { locale } = useLanguage();

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-24">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-body text-[12px] font-medium uppercase tracking-[0.3em] text-sage">
              {t(copy.home.kicker, locale)}
            </p>
            <h1 className="mt-6 font-display text-5xl font-medium leading-[1.02] text-balance sm:text-6xl md:text-7xl">
              {t(copy.home.title, locale)}
            </h1>
            <p className="mt-6 max-w-[46ch] font-body text-[15px] leading-relaxed text-pretty text-ink/65">
              {t(copy.home.lede, locale)}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <CtaLink href="/shop">{t(copy.home.browse, locale)}</CtaLink>
              <CtaLink href="/gallery" variant="outline">
                {t(copy.home.past, locale)}
              </CtaLink>
            </div>
          </div>
          <div className="md:col-span-7">
            <LightboxImage
              src={HERO.src}
              alt={HERO.alt[locale]}
              width={1440}
              height={1120}
              priority
              sizes="(min-width: 768px) 58vw, 100vw"
              className="aspect-[4/5] w-full rounded-2xl object-cover ring-1 ring-black/5"
            />
          </div>
        </div>
      </section>
      <section className="bg-cream/60">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-3xl font-medium text-balance sm:text-4xl">
              {t(copy.home.glimpse, locale)}
            </h2>
            <Link
              href="/gallery"
              className="font-body text-[13px] font-medium tracking-wide text-sage hover:text-ink"
            >
              {t(copy.home.fullGallery, locale)}
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {GALLERY.map((item) => (
              <figure key={item.src} className="space-y-3">
                <LightboxImage
                  src={item.src}
                  alt={item.caption[locale]}
                  caption={item.caption[locale]}
                  width={1024}
                  height={1280}
                  loading="lazy"
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                  className="aspect-[4/5] w-full rounded-2xl object-cover ring-1 ring-black/5"
                />
                <figcaption className="font-body text-[13px] text-ink/50">
                  {item.caption[locale]}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h2 className="font-display text-4xl font-medium text-balance">
          {t(copy.home.tell, locale)}
        </h2>
        <p className="mx-auto mt-4 max-w-[48ch] font-body text-[15px] leading-relaxed text-pretty text-ink/65">
          {t(copy.home.ctaLede, locale)}
        </p>
        <CtaLink href="/quote" className="mt-8">
          {t(copy.home.request, locale)}
        </CtaLink>
      </section>
    </>
  );
}
