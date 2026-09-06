export type Locale = "en" | "fr";

export type VariantType = "rental" | "purchase";

export type Localized = {
  en: string;
  fr: string;
};

export type ProductVariant = {
  type: VariantType;
  price: number;
  unit: Localized;
  description: Localized;
};

export type Product = {
  id: string;
  name: Localized;
  image: string;
  category?: string;
  tags?: string[];
  variants: ProductVariant[];
};

export type CartLine = {
  id: string;
  productId: string;
  name: string;
  image: string;
  type: VariantType;
  price: number;
  unit: string;
  description: string;
  quantity: number;
};
