"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import { copy, t } from "@/lib/i18n";
import { useLanguage } from "@/lib/language";
import { localizeVariant } from "@/lib/products";
import type { Product, VariantType } from "@/lib/types";
import { LightboxImage } from "@/components/lightbox-image";
import { CtaButton } from "@/components/cta";
import { formatCad } from "@/lib/products";

export function ProductCard({
  product,
  preferred,
}: {
  product: Product;
  preferred?: VariantType;
}) {
  const cart = useCart();
  const { locale } = useLanguage();
  const fallback =
    product.variants.find((variant) => variant.type === preferred) ??
    product.variants[0];
  const [override, setOverride] = useState<VariantType | null>(null);
  const selected = override ?? fallback.type;
  const variant =
    product.variants.find((item) => item.type === selected) ??
    product.variants[0];
  const line = localizeVariant(product, variant, locale);
  const inCart = cart.lines.find((item) => item.id === line.id);
  const name = product.name[locale];

  return (
    <article className="flex flex-col rounded-2xl bg-cream/50 p-4 ring-1 ring-black/5">
      <LightboxImage
        src={product.image}
        alt={name}
        caption={`${name} · ${variant.description[locale]}`}
        width={1024}
        height={1024}
        loading="lazy"
        className="aspect-square w-full rounded-xl object-cover ring-1 ring-black/5"
      />
      <div className="mt-4 flex items-center justify-between">
        <span
          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
            variant.type === "rental"
              ? "bg-sage/10 text-sage"
              : "bg-blush/30 text-ink/70"
          }`}
        >
          {variant.type === "rental"
            ? t(copy.shop.rentalTag, locale)
            : t(copy.shop.purchaseTag, locale)}
        </span>
        <span className="font-body text-[14px] font-medium">
          {formatCad(variant.price)}
          <span className="text-ink/40"> · {variant.unit[locale]}</span>
        </span>
      </div>
      <h2 className="mt-3 font-display text-xl font-medium">{name}</h2>
      <p className="mt-1 font-body text-[13px] text-ink/55">
        {variant.description[locale]}
      </p>
      {product.variants.length > 1 ? (
        <div
          role="group"
          aria-label={copy.shop.choose[locale](name)}
          className="mt-4 grid grid-cols-2 gap-1 rounded-full bg-ink/5 p-1 font-body text-[12px] font-medium"
        >
          {product.variants.map((item) => (
            <button
              key={item.type}
              type="button"
              aria-pressed={selected === item.type}
              onClick={() => setOverride(item.type)}
              className={`rounded-full py-1.5 transition-colors ${
                selected === item.type
                  ? "bg-ink text-ivory"
                  : "text-ink/60 hover:text-ink"
              }`}
            >
              {item.type === "rental"
                ? t(copy.shop.rent, locale)
                : t(copy.shop.buy, locale)}
            </button>
          ))}
        </div>
      ) : null}
      <CtaButton
        className="mt-4 w-full py-2.5"
        onClick={() => cart.add(line)}
      >
        {inCart ? copy.shop.inCart[locale](inCart.quantity) : t(copy.shop.add, locale)}
      </CtaButton>
    </article>
  );
}
