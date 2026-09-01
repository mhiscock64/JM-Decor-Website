"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import { copy, t } from "@/lib/i18n";
import { useLanguage } from "@/lib/language";
import { PRODUCTS, formatCad } from "@/lib/products";
import type { VariantType } from "@/lib/types";
import { CtaLink } from "@/components/cta";
import { ProductCard } from "@/components/product-card";

type Filter = "all" | VariantType;

export function ShopPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const cart = useCart();
  const { locale } = useLanguage();
  const products =
    filter === "all"
      ? PRODUCTS
      : PRODUCTS.filter((product) =>
          product.variants.some((variant) => variant.type === filter),
        );

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-5xl font-medium text-balance">
            {t(copy.shop.title, locale)}
          </h1>
          <p className="mt-4 max-w-[52ch] font-body text-[15px] leading-relaxed text-pretty text-ink/65">
            {t(copy.shop.lede, locale)}
          </p>
        </div>
        <div className="flex gap-2 font-body text-[12px] font-medium tracking-wide">
          {(["all", "rental", "purchase"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={
                filter === value
                  ? "bg-ink px-3 py-1.5 text-ivory"
                  : "px-3 py-1.5 text-ink/60 ring-1 ring-ink/15 hover:text-ink"
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
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={`${product.id}-${filter}`}
            product={product}
            preferred={filter === "all" ? undefined : filter}
          />
        ))}
      </div>
      <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-8">
        <p className="font-body text-[14px] text-ink/60">
          {cart.count > 0
            ? copy.shop.selected[locale](cart.count, formatCad(cart.subtotal))
            : t(copy.shop.emptyHint, locale)}
        </p>
        <CtaLink href="/quote">{t(copy.cart.request, locale)}</CtaLink>
      </div>
    </section>
  );
}
