"use client";

import Link from "next/link";
import { copy, t } from "@/lib/i18n";
import { useLanguage } from "@/lib/language";
import { findProduct, HERO, PRODUCTS, productCategory } from "@/lib/products";
import { formatPrice, formatVariantPrice } from "@/lib/format-price";
import { INSPIRATION } from "@/lib/inspiration";
import { localizedHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/types";
import { Hero } from "@/components/home/hero";
import { QuoteStarter } from "@/components/home/quote-starter";
import { BenefitsStrip } from "@/components/home/benefits-strip";
import { CategoryGrid, type CategoryCardProps } from "@/components/home/category-grid";
import { InspirationWall } from "@/components/home/inspiration-wall";
import { ClosingCta } from "@/components/home/closing-cta";

function shopHref(locale: Locale, category: string, productId?: string) {
  const base = `${localizedHref("/shop", locale)}?category=${category}`;
  return productId ? `${base}#${productId}` : base;
}

function productCard(
  locale: Locale,
  productId: string,
  name: string,
  item?: string,
): CategoryCardProps | null {
  const product = findProduct(productId);
  const variant = product?.variants.find((entry) => entry.type === "rental");
  if (!product || !variant) return null;
  return {
    href: shopHref(locale, productCategory(product), product.id),
    name,
    image: { src: product.image, width: 1408, height: 1408 },
    item: item ?? product.name[locale],
    price: formatVariantPrice(variant, locale),
    cta: t(copy.home.categoryCta, locale),
  };
}

function categories(locale: Locale): CategoryCardProps[] {
  const names = copy.home.categoryNames;
  const tents = PRODUCTS.filter((product) => productCategory(product) === "tents");
  const tentFrom = Math.min(
    ...tents.flatMap((product) =>
      product.variants.filter((variant) => variant.type === "rental").map((variant) => variant.price),
    ),
  );
  const tentCard: CategoryCardProps | null = Number.isFinite(tentFrom)
    ? {
        href: shopHref(locale, "tents"),
        name: t(names.tents, locale),
        image: { src: "/images/full-garden-tent-collection.jpg", width: 1600, height: 900 },
        item: t(copy.home.tentSizes, locale),
        price: `${t(copy.home.from, locale)} ${formatPrice(tentFrom, locale)} ${locale === "fr" ? "/ jour" : "/ day"}`,
        cta: t(copy.home.categoryCta, locale),
      }
    : null;
  return [
    productCard(locale, "ivory-bloom-arch", t(names.arches, locale)),
    productCard(locale, "brass-candle-trio", t(names.candles, locale)),
    productCard(locale, "sheer-drapery-wall", t(names.drapery, locale)),
    tentCard,
  ].filter((card): card is CategoryCardProps => card !== null);
}

export function HomePage() {
  const { locale } = useLanguage();
  const quoteHref = localizedHref("/quote", locale);
  const filters = copy.home.inspirationFilters;

  return (
    <>
      <Hero
        eyebrow={t(copy.home.kicker, locale)}
        title={
          <>
            {t(copy.home.titleLead, locale)} <em className="text-sage">{t(copy.home.titleAccent, locale)}</em>
          </>
        }
        lede={t(copy.home.heroLede, locale)}
        image={{ src: HERO.src, alt: HERO.alt[locale], width: 3456, height: 2304 }}
        primaryCta={{ href: quoteHref, label: t(copy.home.request, locale) }}
        secondaryCta={{ href: localizedHref("/shop", locale), label: t(copy.home.browse, locale) }}
      />
      <QuoteStarter
        action={quoteHref}
        title={t(copy.home.starter.title, locale)}
        intro={t(copy.home.starter.intro, locale)}
        dateLabel={t(copy.home.starter.date, locale)}
        venueLabel={t(copy.home.starter.venue, locale)}
        venuePlaceholder={t(copy.home.starter.venuePlaceholder, locale)}
        submitLabel={t(copy.home.starter.submit, locale)}
      />
      <BenefitsStrip
        label={t(copy.home.benefitsLabel, locale)}
        items={copy.home.benefits.map((item) => t(item, locale))}
      />
      <CategoryGrid
        kicker={t(copy.home.categoriesKicker, locale)}
        title={t(copy.home.categoriesTitle, locale)}
        allHref={localizedHref("/shop", locale)}
        allLabel={t(copy.home.categoriesAll, locale)}
        categories={categories(locale)}
        footnote={t(copy.home.categoriesNote, locale)}
      />
      <InspirationWall
        locale={locale}
        kicker={t(copy.home.inspirationKicker, locale)}
        title={t(copy.home.inspirationTitle, locale)}
        intro={t(copy.home.inspirationIntro, locale)}
        filterLabel={t(copy.home.inspirationFilter, locale)}
        filters={[
          { key: "all", label: t(filters.all, locale) },
          { key: "ceremony", label: t(filters.ceremony, locale) },
          { key: "reception", label: t(filters.reception, locale) },
          { key: "shower", label: t(filters.shower, locale) },
        ]}
        columns={INSPIRATION}
        countLabel={copy.home.inspirationCount[locale]}
        galleryHref={localizedHref("/gallery", locale)}
        galleryLabel={t(copy.home.fullGalleryLabel, locale)}
      />
      {/* Service area + FAQ: kept from the previous homepage (matches the FAQ structured data). */}
      <section aria-labelledby="area-title" className="px-4 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-body text-[12px] font-medium uppercase tracking-[0.28em] text-sage">
              {t(copy.home.areaKicker, locale)}
            </p>
            <h2 id="area-title" className="mt-3 font-display text-[32px] leading-tight font-normal text-balance sm:text-[40px]">
              {t(copy.home.areaTitle, locale)}
            </h2>
            <p className="mt-4 font-body text-[15px] leading-relaxed text-pretty text-ink/75">
              {t(copy.home.areaLede, locale)}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {copy.home.areas.map((area) => (
                <li
                  key={area.en}
                  className="rounded-full px-3 py-1.5 font-body text-[13px] tracking-wide text-ink/75 ring-1 ring-ink/15"
                >
                  {t(area, locale)}
                </li>
              ))}
            </ul>
            <Link
              href={localizedHref("/wedding-decor-montreal", locale)}
              className="mt-4 inline-flex min-h-[44px] items-center font-body text-[14px] underline underline-offset-4 hover:text-sage"
            >
              {t(copy.home.areaMore, locale)}
            </Link>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="font-display text-[32px] leading-tight font-normal sm:text-[40px]">
              {t(copy.home.faqTitle, locale)}
            </h2>
            <dl className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
              {copy.home.faqs.map((item) => (
                <div key={item.q.en} className="py-5">
                  <dt className="font-body text-[15px] font-medium text-ink">{t(item.q, locale)}</dt>
                  <dd className="mt-1.5 font-body text-[14px] leading-relaxed text-ink/75">{t(item.a, locale)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
      <ClosingCta
        title={
          <>
            {t(copy.home.tellLead, locale)} <em>{t(copy.home.tellAccent, locale)}</em>
          </>
        }
        body={t(copy.home.ctaLede, locale)}
        cta={{ href: quoteHref, label: t(copy.home.request, locale) }}
      />
    </>
  );
}
