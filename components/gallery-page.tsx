"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { copy, t } from "@/lib/i18n";
import { useLanguage } from "@/lib/language";
import { localizedHref } from "@/lib/locale-path";
import { GALLERY_HERO, GALLERY_PHOTOS } from "@/lib/gallery";
import type { InspirationCategory } from "@/lib/inspiration";
import { FilterChips } from "@/components/filter-chips";
import { LightboxImage } from "@/components/lightbox-image";

type Filter = "all" | InspirationCategory;

// Columns used at a breakpoint that allows `max` columns. CSS columns balance by height, so a
// filtered set smaller than two rows (e.g. 6 photos in 4 columns) would leave a column empty;
// use ceil(n / 2) columns there instead, and one column per photo when there are fewer than `max`.
function columnsFor(count: number, max: number) {
  if (count <= max) return Math.max(count, 1);
  if (count < max * 2) return Math.ceil(count / 2);
  return max;
}

export function GalleryPage() {
  const { locale } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");
  const [announce, setAnnounce] = useState("");
  const filters = copy.home.inspirationFilters;
  const visible = GALLERY_PHOTOS.filter((item) => filter === "all" || item.category === filter);

  function choose(next: Filter) {
    setFilter(next);
    const count = GALLERY_PHOTOS.filter((item) => next === "all" || item.category === next).length;
    setAnnounce(copy.home.inspirationCount[locale](count));
  }

  return (
    <>
      {/* Full-bleed photo hero. Sits under the sticky site header (65px, 77px from sm), so header + hero fill the viewport. */}
      <section
        aria-labelledby="gallery-title"
        className="on-dark-hero relative isolate h-[calc(100svh-65px)] min-h-[560px] w-full overflow-hidden bg-ink sm:h-[calc(100svh-77px)]"
      >
        <Image
          src={GALLERY_HERO.src}
          alt={GALLERY_HERO.alt[locale]}
          width={GALLERY_HERO.width}
          height={GALLERY_HERO.height}
          priority
          sizes="100vw"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/10 to-black/70"
        />
        {/* Extra shade behind the text block so white copy keeps ≥4.5:1 over the bright drapery. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 -z-10 h-[80%] bg-gradient-to-t from-black/75 via-black/45 to-transparent"
        />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-10 text-white sm:px-10 sm:pb-14">
          <div className="mx-auto max-w-7xl">
            <p className="font-body text-[12px] font-medium uppercase tracking-[0.28em] text-white">
              {t(copy.gallery.heroEyebrow, locale)}
            </p>
            <h1
              id="gallery-title"
              className="mt-3 max-w-3xl font-display text-[46px] leading-none font-medium text-balance text-white sm:text-[84px]"
            >
              {t(copy.gallery.heroTitle, locale)}
            </h1>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#galerie"
                className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-white px-7 font-body text-[14px] font-medium text-ink transition-colors hover:bg-cream"
              >
                {t(copy.gallery.viewWeddings, locale)}
              </a>
              <Link
                href={localizedHref("/quote", locale)}
                className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/80 px-7 font-body text-[14px] font-medium text-white transition-colors hover:bg-white/10"
              >
                {t(copy.nav.quote, locale)}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="galerie" aria-labelledby="gallery-grid-title" className="bg-cream px-3 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto mb-6 flex max-w-7xl flex-wrap items-end justify-between gap-x-6 gap-y-4 px-2 sm:px-0">
          <div>
            <h2 id="gallery-grid-title" className="font-display text-[32px] leading-tight font-normal sm:text-[40px]">
              {t(copy.gallery.gridTitle, locale)}
            </h2>
            <p className="mt-2 max-w-[60ch] font-body text-[15px] leading-relaxed text-pretty text-ink/75">
              {t(copy.gallery.lede, locale)}
            </p>
          </div>
          <FilterChips
            label={t(copy.home.inspirationFilter, locale)}
            filters={[
              { key: "all", label: t(filters.all, locale) },
              { key: "ceremony", label: t(filters.ceremony, locale) },
              { key: "reception", label: t(filters.reception, locale) },
              { key: "shower", label: t(filters.shower, locale) },
            ]}
            value={filter}
            onChange={choose}
          />
        </div>
        <p className="sr-only" aria-live="polite">
          {announce}
        </p>
        <div className="mx-auto max-w-7xl">
          <ul className="gallery-masonry" style={
              {
                "--n": visible.length,
                "--c2": columnsFor(visible.length, 2),
                "--c3": columnsFor(visible.length, 3),
                "--c4": columnsFor(visible.length, 4),
              } as React.CSSProperties
            }>
            {visible.map((item) => (
              <li key={item.src} className="gallery-masonry-item">
                <figure>
                  <LightboxImage
                    src={item.src}
                    alt={item.alt[locale]}
                    caption={item.caption[locale]}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    sizes="(min-width: 1280px) 311px, (min-width: 1024px) 24vw, (min-width: 640px) 32vw, 48vw"
                    frameClassName="rounded-lg"
                    className="h-auto w-full rounded-lg transition-transform duration-500 hover:scale-[1.02]"
                  />
                  <figcaption className="mt-1.5 font-body text-[13px] leading-snug text-ink/75">
                    {item.caption[locale]}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
