import { CATEGORIES, PRODUCTS } from "@/lib/products";
import { sql } from "@/lib/admin/db";

export async function seedCatalog() {
  const existing = await sql<{ n: number }>("select count(*)::int as n from products");
  if ((existing[0]?.n ?? 0) > 0) return;
  for (let i = 0; i < CATEGORIES.length; i++) {
    const category = CATEGORIES[i];
    await sql(
      `insert into categories (id, name_en, name_fr, sort_order) values ($1, $2, $3, $4) on conflict (id) do nothing`,
      [category.id, category.name.en, category.name.fr, i],
    );
  }
  for (let i = 0; i < PRODUCTS.length; i++) {
    const product = PRODUCTS[i];
    const category = product.category ?? "venue-decor";
    const description = product.variants[0]?.description;
    await sql(
      `insert into products (slug, name_en, name_fr, description_en, description_fr, category_id, image, published, sort_order)
       values ($1, $2, $3, $4, $5, $6, $7, true, $8)
       on conflict (slug) do nothing`,
      [
        product.id,
        product.name.en,
        product.name.fr,
        description?.en ?? "",
        description?.fr ?? "",
        category,
        product.image,
        i,
      ],
    );
    for (const variant of product.variants) {
      await sql(
        `insert into variants (product_slug, type, price, unit_en, unit_fr, description_en, description_fr, qty_on_hand)
         values ($1, $2, $3, $4, $5, $6, $7, $8)
         on conflict (product_slug, type) do nothing`,
        [
          product.id,
          variant.type,
          variant.price,
          variant.unit.en,
          variant.unit.fr,
          variant.description.en,
          variant.description.fr,
          variant.type === "rental" ? 2 : 20,
        ],
      );
    }
  }
}
