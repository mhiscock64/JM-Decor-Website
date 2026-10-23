import type { Locale, ProductVariant } from "@/lib/types";

const formatters: Record<Locale, Intl.NumberFormat> = {
  fr: new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }),
  en: new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  }),
};

/** "325 $" in French (Quebec style), "$325" in English. */
export function formatPrice(amount: number, locale: Locale) {
  return formatters[locale].format(amount);
}

/** "325 $ / jour", "$325 / day", or "65 $ · achat" for purchases. */
export function formatVariantPrice(
  variant: Pick<ProductVariant, "price" | "unit">,
  locale: Locale,
) {
  const unit = variant.unit[locale].trim();
  const price = formatPrice(variant.price, locale);
  if (!unit) return price;
  return unit.startsWith("/") ? `${price} ${unit}` : `${price} · ${unit}`;
}
