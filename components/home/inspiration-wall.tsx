"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { InspirationCategory, InspirationItem } from "@/lib/inspiration";
import type { Locale } from "@/lib/types";
import { cn } from "@/lib/utils";

type Filter = "all" | InspirationCategory;

// Pick a desktop column count that divides the filtered count, so there is no orphan row.
function desktopColumns(count: number) {
  if (count < 4 || count % 4 === 0) return 4;
  return [5, 3].find((columns) => count % columns === 0) ?? 4;
}

export function InspirationWall({
  locale,
  kicker,
  title,
  intro,
  filterLabel,
  filters,
  columns,
  countLabel,
  galleryHref,
  galleryLabel,
}: {
  locale: Locale;
  kicker: string;
  title: string;
  intro: string;
  filterLabel: string;
  filters: { key: Filter; label: string }[];
  columns: InspirationItem[][];
  countLabel: (count: number) => string;
  galleryHref: string;
  galleryLabel: string;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [announce, setAnnounce] = useState("");
  const filtered = filter !== "all";
  const visible = columns.flat().filter((item) => !filtered || item.category === filter);

  function choose(next: Filter) {
    setFilter(next);
    const count = columns.flat().filter((item) => next === "all" || item.category === next).length;
    setAnnounce(countLabel(count));
  }

  return (
    <section id="inspirations" aria-labelledby="inspiration-title" className="bg-cream px-4 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-5">
          <div>
            <p className="font-body text-[12px] font-medium uppercase tracking-[0.28em] text-sage">{kicker}</p>
            <h2 id="inspiration-title" className="mt-3 font-display text-[36px] leading-tight font-normal sm:text-[48px]">
              {title}
            </h2>
            <p className="mt-2 font-body text-[15px] text-ink/75">{intro}</p>
          </div>
          <ul className="flex flex-wrap gap-2" aria-label={filterLabel}>
            {filters.map((item) => (
              <li key={item.key}>
                <button
                  type="button"
                  aria-pressed={filter === item.key}
                  onClick={() => choose(item.key)}
                  className={cn(
                    "min-h-[44px] rounded-full border px-4 font-body text-[14px] transition",
                    filter === item.key
                      ? "border-ink bg-ink text-ivory"
                      : "border-ink/30 hover:border-ink",
                  )}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <p className="sr-only" aria-live="polite">
          {announce}
        </p>
        {filtered ? (
          <ul
            className="inspiration-filtered mt-8 sm:mt-10"
            data-odd={visible.length > 1 && visible.length % 2 === 1 ? "" : undefined}
            style={{ "--lgc": desktopColumns(visible.length) } as React.CSSProperties}
          >
            {visible.map((item) => (
              <li key={item.src} className="inspiration-item">
                <Tile item={item} locale={locale} shape="short" />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {columns.map((column, index) => (
              <div key={index} className="flex flex-col gap-4 lg:gap-6">
                {column.map((item) => (
                  <Tile key={item.src} item={item} locale={locale} shape={item.shape} />
                ))}
              </div>
            ))}
          </div>
        )}
        <div className="mt-10 text-center">
          <Link
            href={galleryHref}
            className="inline-flex min-h-[48px] items-center justify-center border border-ink px-7 font-body text-[14px] font-medium tracking-wide transition-colors hover:bg-ink hover:text-ivory"
          >
            {galleryLabel}
            <span aria-hidden="true">&nbsp;→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Tile({
  item,
  locale,
  shape,
}: {
  item: InspirationItem;
  locale: Locale;
  shape: "tall" | "short";
}) {
  return (
    <figure>
      <Image
        src={item.src}
        alt={item.alt[locale]}
        width={item.width}
        height={item.height}
        sizes="(min-width: 1280px) 300px, (min-width: 1024px) 23vw, 46vw"
        className={cn(
          "w-full rounded-[2px] object-cover",
          shape === "tall" ? "aspect-[2/3]" : "aspect-[4/5]",
        )}
      />
      <figcaption className="mt-2 min-h-[2.8em] font-body text-[13px] leading-snug text-ink/75 sm:min-h-0">
        {item.caption[locale]}
      </figcaption>
    </figure>
  );
}
