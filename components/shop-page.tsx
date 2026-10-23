"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/lib/cart";
import { copy, t } from "@/lib/i18n";
import { useLanguage } from "@/lib/language";
import {
  CATEGORIES,
  PRODUCTS,
  categoryLabel,
  formatCad,
  productCategory,
} from "@/lib/products";
import type { Product, VariantType } from "@/lib/types";
import { CtaLink } from "@/components/cta";
import { ProductCard } from "@/components/product-card";
import { localizedHref } from "@/lib/locale-path";

type Availability = "all" | VariantType;

export function ShopPage({
  catalogue = PRODUCTS,
  initialCategory = "all",
}: {
  catalogue?: Product[];
  initialCategory?: string;
}) {
  const [availability, setAvailability] = useState<Availability>("all");
  const [category, setCategory] = useState(
    CATEGORIES.some((item) => item.id === initialCategory) ? initialCategory : "all",
  );
  const cart = useCart();
  const { locale } = useLanguage();

  const products = useMemo(() => {
    return catalogue.filter((product) => {
      const matchesCategory =
        category === "all" || productCategory(product) === category;
      const matchesAvailability =
        availability === "all" ||
        product.variants.some((variant) => variant.type === availability);
      return matchesCategory && matchesAvailability;
    });
  }, [availability, category, catalogue]);

  const sections = useMemo(() => {
    if (category !== "all") {
      return [{ id: category, name: categoryLabel(category, locale), items: products }];
    }
    return CATEGORIES.map((item) => ({
      id: item.id,
      name: item.name[locale],
      items: products.filter((product) => productCategory(product) === item.id),
    })).filter((section) => section.items.length > 0);
  }, [category, locale, products]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-5xl font-medium text-balance">
            {t(copy.shop.title, locale)}
          </h1>
          <p className="mt-4 max-w-[52ch] font-body text-[15px] leading-relaxed text-pretty text-ink/75">
            {t(copy.shop.lede, locale)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 font-body text-[13px] font-medium tracking-wide">
          {(["all", "rental", "purchase"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setAvailability(value)}
              className={
                availability === value
                  ? "min-h-[44px] bg-ink px-4 text-ivory"
                  : "min-h-[44px] px-4 text-ink/75 ring-1 ring-ink/20 hover:text-ink"
              }
            >
              {value === "all"
                ? t(copy.shop.all, locale)
                : value === "rental"
                  ? t(copy.shop.rental, locale)
                  : t(copy.shop.purchase, locale)}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-8 flex flex-wrap gap-2 font-body text-[13px] font-medium tracking-wide">
        <span className="self-center text-ink/75">{t(copy.shop.categories, locale)}</span>
        <button
          type="button"
          onClick={() => setCategory("all")}
          className={
            category === "all"
              ? "min-h-[44px] bg-sage px-4 text-ivory"
              : "min-h-[44px] px-4 text-ink/75 ring-1 ring-ink/20 hover:text-ink"
          }
        >
          {t(copy.shop.all, locale)}
        </button>
        {CATEGORIES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setCategory(item.id)}
            className={
              category === item.id
                ? "min-h-[44px] bg-sage px-4 text-ivory"
                : "min-h-[44px] px-4 text-ink/75 ring-1 ring-ink/20 hover:text-ink"
            }
          >
            {item.name[locale]}
          </button>
        ))}
      </div>
      {sections.map((section) => (
        <div key={section.id} className="mt-12">
          <h2 className="font-display text-3xl font-medium">{section.name}</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {section.items.map((product) => (
              <ProductCard
                key={`${product.id}-${availability}`}
                product={product}
                preferred={availability === "all" ? undefined : availability}
              />
            ))}
          </div>
        </div>
      ))}
      {products.length === 0 ? (
        <p className="mt-12 font-body text-[14px] text-ink/75">
          {t(copy.shop.emptyHint, locale)}
        </p>
      ) : null}
      <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-8">
        <p className="font-body text-[14px] text-ink/75">
          {cart.count > 0
            ? copy.shop.selected[locale](cart.count, formatCad(cart.subtotal, locale))
            : t(copy.shop.emptyHint, locale)}
        </p>
        <CtaLink href={localizedHref("/quote", locale)}>{t(copy.cart.request, locale)}</CtaLink>
      </div>
    </section>
  );
}
