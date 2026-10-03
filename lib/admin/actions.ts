"use server";

import { randomBytes } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createStaff, currentStaff, signIn, signOut, staffCount } from "@/lib/admin/auth";
import { ensureSchema, hasDatabase, sql } from "@/lib/admin/db";

async function requireStaff() {
  const staff = await currentStaff();
  if (!staff) redirect("/admin/login");
  return staff;
}

export async function loginAction(formData: FormData) {
  if (!hasDatabase()) redirect("/admin/login?error=Database+is+not+configured");
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const name = String(formData.get("name") ?? "JM Decor");
  const count = await staffCount();
  if (count === 0) {
    if (password.length < 8) redirect("/admin/login?error=Use+at+least+8+characters");
    await createStaff({ email, name, password, role: "admin" });
  }
  const staff = await signIn(email, password);
  if (!staff) redirect("/admin/login?error=Email+or+password+is+incorrect");
  redirect("/admin");
}

export async function logoutAction() {
  await signOut();
  redirect("/admin/login");
}

export async function dashboardData() {
  const staff = await requireStaff();
  await ensureSchema();
  const [quotes, orders, products, low] = await Promise.all([
    sql<{ status: string; n: number }>("select status, count(*)::int as n from quotes where archived = false group by status"),
    sql<{ status: string; n: number }>("select status, count(*)::int as n from orders group by status"),
    sql<{ n: number }>("select count(*)::int as n from products where archived = false"),
    sql<{ n: number }>("select count(*)::int as n from variants where active and qty_on_hand <= low_stock"),
  ]);
  const recent = await sql<{ id: number; full_name: string; email: string; status: string; created_at: string }>(
    "select id, full_name, email, status, created_at from quotes order by created_at desc limit 6",
  );
  return { staff, quotes, orders, products: products[0]?.n ?? 0, low: low[0]?.n ?? 0, recent };
}

export async function listProducts() {
  await requireStaff();
  return sql<{
    slug: string;
    name_en: string;
    name_fr: string;
    category_id: string;
    image: string;
    published: boolean;
    archived: boolean;
    price: string | null;
    type: string | null;
  }>(
    `select p.slug, p.name_en, p.name_fr, p.category_id, p.image, p.published, p.archived,
            v.price::text, v.type
     from products p
     left join variants v on v.product_slug = p.slug
     order by p.archived, p.sort_order, p.name_en, v.type`,
  );
}

export async function listCategories() {
  await requireStaff();
  return sql<{ id: string; name_en: string }>("select id, name_en from categories order by sort_order");
}

export async function saveProduct(formData: FormData) {
  const staff = await requireStaff();
  const slug = String(formData.get("slug") || randomBytes(6).toString("hex"));
  const nameEn = String(formData.get("name_en") ?? "").trim();
  const nameFr = String(formData.get("name_fr") ?? nameEn).trim();
  const category = String(formData.get("category_id") ?? "venue-decor");
  const image = String(formData.get("image") ?? "/images/hero.jpg");
  const description = String(formData.get("description_en") ?? "");
  const price = Number(formData.get("price") ?? 0);
  const type = String(formData.get("type") ?? "rental") === "purchase" ? "purchase" : "rental";
  const published = formData.get("published") === "on";
  if (!nameEn) return;
  await sql(
    `insert into products (slug, name_en, name_fr, description_en, description_fr, category_id, image, published)
     values ($1, $2, $3, $4, $4, $5, $6, $7)
     on conflict (slug) do update set
       name_en = excluded.name_en, name_fr = excluded.name_fr, description_en = excluded.description_en,
       description_fr = excluded.description_fr, category_id = excluded.category_id, image = excluded.image,
       published = excluded.published, updated_at = now()`,
    [slug, nameEn, nameFr, description, category, image, published],
  );
  await sql(
    `insert into variants (product_slug, type, price, unit_en, unit_fr, description_en, description_fr, qty_on_hand)
     values ($1, $2, $3, $4, $5, $6, $6, $7)
     on conflict (product_slug, type) do update set price = excluded.price, description_en = excluded.description_en, description_fr = excluded.description_fr`,
    [slug, type, price, type === "rental" ? "/ day" : "buy", type === "rental" ? "/ jour" : "achat", description, type === "rental" ? 2 : 20],
  );
  revalidatePath("/admin/products");
  revalidatePath("/shop");
  return;
}

export async function bulkProducts(formData: FormData) {
  await requireStaff();
  const slugs = formData.getAll("slug").map(String).filter(Boolean);
  const action = String(formData.get("action") ?? "");
  if (slugs.length === 0) return;
  if (action === "archive") {
    await sql("update products set archived = true, published = false, updated_at = now() where slug = any($1)", [slugs]);
  } else if (action === "restore") {
    await sql("update products set archived = false, published = true, updated_at = now() where slug = any($1)", [slugs]);
  } else if (action === "delete") {
    const blocked = await sql<{ slug: string }>(
      `select distinct p.slug from products p
       join variants v on v.product_slug = p.slug
       join reservations r on r.variant_id = v.id
       where p.slug = any($1)`,
      [slugs],
    );
    const blockedSet = new Set(blocked.map((row) => row.slug));
    const removable = slugs.filter((slug) => !blockedSet.has(slug));
    if (removable.length) await sql("delete from products where slug = any($1)", [removable]);
    if (blockedSet.size) return;
  } else if (action === "edit") {
    const category = String(formData.get("category_id") ?? "");
    const published = String(formData.get("published") ?? "");
    const percent = Number(formData.get("percent") ?? 0);
    const setPrice = String(formData.get("set_price") ?? "");
    if (category) await sql("update products set category_id = $2, updated_at = now() where slug = any($1)", [slugs, category]);
    if (published === "yes" || published === "no") {
      await sql("update products set published = $2, updated_at = now() where slug = any($1)", [slugs, published === "yes"]);
    }
    if (percent) {
      await sql("update variants set price = round(price * (1 + $2::numeric / 100), 2) where product_slug = any($1)", [slugs, percent]);
    }
    if (setPrice) {
      await sql("update variants set price = $2 where product_slug = any($1)", [slugs, Number(setPrice)]);
    }
  }
  revalidatePath("/admin/products");
  revalidatePath("/shop");
  return;
}

export async function listInventory() {
  await requireStaff();
  return sql<{
    id: number;
    slug: string;
    name_en: string;
    type: string;
    qty_on_hand: number;
    low_stock: number;
    reserved: number;
  }>(
    `select v.id, p.slug, p.name_en, v.type, v.qty_on_hand, v.low_stock,
            coalesce((select sum(quantity) from reservations r where r.variant_id = v.id and r.starts_on <= current_date and r.ends_on >= current_date), 0)::int as reserved
     from variants v
     join products p on p.slug = v.product_slug
     where p.archived = false
     order by p.name_en, v.type`,
  );
}

export async function updateQty(formData: FormData) {
  await requireStaff();
  const id = Number(formData.get("id"));
  const qty = Number(formData.get("qty_on_hand"));
  const low = Number(formData.get("low_stock"));
  await sql("update variants set qty_on_hand = $2, low_stock = $3 where id = $1", [id, qty, low]);
  const start = String(formData.get("starts_on") ?? "");
  const end = String(formData.get("ends_on") ?? "");
  if (start && end) {
    await sql("insert into blackouts (variant_id, starts_on, ends_on, reason) values ($1, $2, $3, $4)", [
      id,
      start,
      end,
      String(formData.get("reason") ?? "Unavailable"),
    ]);
  }
  revalidatePath("/admin/inventory");
}

export async function listQuotes() {
  await requireStaff();
  return sql<{ id: number; full_name: string; email: string; venue: string | null; event_date: string | null; status: string; subtotal: string; unread: boolean }>(
    "select id, full_name, email, venue, event_date::text, status, subtotal::text, unread from quotes order by created_at desc limit 100",
  );
}

export async function setQuoteStatus(formData: FormData) {
  await requireStaff();
  await sql("update quotes set status = $2, unread = false where id = $1", [Number(formData.get("id")), String(formData.get("status"))]);
  revalidatePath("/admin/quotes");
}

export async function confirmOrder(formData: FormData) {
  await requireStaff();
  const quoteId = Number(formData.get("quote_id"));
  const quotes = await sql<{ id: number; full_name: string; email: string; phone: string | null; event_date: string | null; venue: string | null; notes: string | null; subtotal: string }>(
    "select id, full_name, email, phone, event_date::text, venue, notes, subtotal::text from quotes where id = $1",
    [quoteId],
  );
  const quote = quotes[0];
  if (!quote) return;
  const lines = await sql<{ name: string; type: string; price: string; unit: string; quantity: number; image: string | null }>(
    "select name, type, price::text, unit, quantity, image from quote_lines where quote_id = $1",
    [quoteId],
  );
  const inserted = await sql<{ id: number }>(
    `insert into orders (quote_id, full_name, email, phone, event_date, venue, delivery_notes, status, subtotal, stock_applied)
     values ($1, $2, $3, $4, $5, $6, $7, 'confirmed', $8, true) returning id`,
    [quote.id, quote.full_name, quote.email, quote.phone, quote.event_date, quote.venue, quote.notes ?? "", quote.subtotal],
  );
  const orderId = inserted[0].id;
  const start = quote.event_date ?? new Date().toISOString().slice(0, 10);
  const end = start;
  for (const line of lines) {
    const variants = await sql<{ id: number }>(
      `select v.id from variants v join products p on p.slug = v.product_slug
       where v.type = $1 and (p.name_en = $2 or p.slug = $2) limit 1`,
      [line.type, line.name],
    );
    const variantId = variants[0]?.id ?? null;
    await sql(
      "insert into order_lines (order_id, variant_id, name, type, price, unit, quantity, image) values ($1, $2, $3, $4, $5, $6, $7, $8)",
      [orderId, variantId, line.name, line.type, line.price, line.unit, line.quantity, line.image],
    );
    if (variantId && line.type === "rental") {
      await sql(
        "insert into reservations (order_id, variant_id, quantity, starts_on, ends_on) values ($1, $2, $3, $4, $5)",
        [orderId, variantId, line.quantity, start, end],
      );
    }
  }
  await sql("update quotes set status = 'won', unread = false where id = $1", [quoteId]);
  revalidatePath("/admin/orders");
  revalidatePath("/admin/quotes");
}

export async function setOrderStatus(formData: FormData) {
  await requireStaff();
  const id = Number(formData.get("id"));
  const status = String(formData.get("status"));
  if (status === "cancelled" || status === "returned") {
    await sql("delete from reservations where order_id = $1", [id]);
    await sql("update orders set stock_applied = false where id = $1", [id]);
  }
  await sql("update orders set status = $2, updated_at = now() where id = $1", [id, status]);
  revalidatePath("/admin/orders");
}

export async function listOrders() {
  await requireStaff();
  return sql<{ id: number; full_name: string; email: string; venue: string | null; event_date: string | null; status: string; subtotal: string }>(
    "select id, full_name, email, venue, event_date::text, status, subtotal::text from orders order by created_at desc limit 100",
  );
}

export async function saveQuote(input: {
  fullName: string;
  email: string;
  phone?: string;
  eventDate?: string;
  venue?: string;
  guestCount?: number;
  notes?: string;
  locale?: string;
  subtotal?: number;
  cartItems?: { name: string; type: string; price: number; unit: string; quantity: number; image?: string }[];
}) {
  if (!hasDatabase()) return;
  await ensureSchema();
  const rows = await sql<{ id: number }>(
    `insert into quotes (full_name, email, phone, event_date, venue, guest_count, notes, locale, subtotal)
     values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning id`,
    [
      input.fullName,
      input.email,
      input.phone ?? null,
      input.eventDate || null,
      input.venue ?? null,
      input.guestCount ?? null,
      input.notes ?? null,
      input.locale ?? "en",
      input.subtotal ?? 0,
    ],
  );
  const id = rows[0].id;
  for (const item of input.cartItems ?? []) {
    await sql(
      "insert into quote_lines (quote_id, name, type, price, unit, quantity, image) values ($1, $2, $3, $4, $5, $6, $7)",
      [id, item.name, item.type, item.price, item.unit, item.quantity, item.image ?? null],
    );
  }
}
