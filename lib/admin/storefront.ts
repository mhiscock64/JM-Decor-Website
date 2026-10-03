import { PRODUCTS } from "@/lib/products";
import type { Product } from "@/lib/types";
import { ensureSchema, hasDatabase, sql } from "@/lib/admin/db";

export async function storefrontProducts(): Promise<Product[]> {
  if (!hasDatabase()) return PRODUCTS;
  try {
    await ensureSchema();
    const products = await sql<{
      slug: string;
      name_en: string;
      name_fr: string;
      category_id: string;
      image: string;
    }>("select slug, name_en, name_fr, category_id, image from products where published and archived = false order by sort_order, name_en");
    if (products.length === 0) return PRODUCTS;
    const variants = await sql<{
      product_slug: string;
      type: "rental" | "purchase";
      price: string;
      unit_en: string;
      unit_fr: string;
      description_en: string;
      description_fr: string;
    }>(
      `select product_slug, type, price::text, unit_en, unit_fr, description_en, description_fr
       from variants where active order by type`,
    );
    return products.map((product) => ({
      id: product.slug,
      name: { en: product.name_en, fr: product.name_fr },
      image: product.image,
      category: product.category_id,
      variants: variants
        .filter((variant) => variant.product_slug === product.slug)
        .map((variant) => ({
          type: variant.type,
          price: Number(variant.price),
          unit: { en: variant.unit_en, fr: variant.unit_fr },
          description: { en: variant.description_en, fr: variant.description_fr },
        })),
    })).filter((product) => product.variants.length > 0);
  } catch {
    return PRODUCTS;
  }
}
