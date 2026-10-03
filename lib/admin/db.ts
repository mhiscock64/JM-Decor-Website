import { Pool, type QueryResultRow } from "pg";

const globalPool = globalThis as typeof globalThis & { __jmPool?: Pool };

export function databaseUrl() {
  return process.env.DATABASE_URL?.trim() || "";
}

export function hasDatabase() {
  return databaseUrl().length > 0;
}

export function pool() {
  if (!hasDatabase()) throw new Error("DATABASE_URL is not set.");
  globalPool.__jmPool ??= new Pool({
    connectionString: databaseUrl(),
    max: 3,
    ssl: databaseUrl().includes("localhost") ? undefined : { rejectUnauthorized: false },
  });
  return globalPool.__jmPool;
}

export async function sql<T extends QueryResultRow = QueryResultRow>(
  text: string,
  values: unknown[] = [],
) {
  const result = await pool().query<T>(text, values);
  return result.rows;
}

const SCHEMA = `
create table if not exists categories (
  id text primary key,
  name_en text not null,
  name_fr text not null,
  sort_order integer not null default 0
);
create table if not exists products (
  slug text primary key,
  name_en text not null,
  name_fr text not null,
  description_en text not null default '',
  description_fr text not null default '',
  category_id text not null references categories (id),
  image text not null,
  published boolean not null default true,
  archived boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists variants (
  id serial primary key,
  product_slug text not null references products (slug) on delete cascade,
  type text not null check (type in ('rental', 'purchase')),
  price numeric(10, 2) not null,
  unit_en text not null,
  unit_fr text not null,
  description_en text not null default '',
  description_fr text not null default '',
  active boolean not null default true,
  qty_on_hand integer not null default 1,
  low_stock integer not null default 1,
  unique (product_slug, type)
);
create table if not exists blackouts (
  id serial primary key,
  variant_id integer not null references variants (id) on delete cascade,
  starts_on date not null,
  ends_on date not null,
  reason text not null default ''
);
create table if not exists quotes (
  id serial primary key,
  full_name text not null,
  email text not null,
  phone text,
  event_date date,
  venue text,
  guest_count integer,
  notes text,
  locale text not null default 'en',
  subtotal numeric(10, 2) not null default 0,
  status text not null default 'new' check (status in ('new', 'contacted', 'quoted', 'won', 'lost')),
  archived boolean not null default false,
  unread boolean not null default true,
  internal_note text not null default '',
  created_at timestamptz not null default now()
);
create table if not exists quote_lines (
  id serial primary key,
  quote_id integer not null references quotes (id) on delete cascade,
  variant_id integer,
  name text not null,
  type text not null,
  price numeric(10, 2) not null,
  unit text not null,
  quantity integer not null,
  image text
);
create table if not exists orders (
  id serial primary key,
  quote_id integer references quotes (id),
  full_name text not null,
  email text not null,
  phone text,
  event_date date,
  venue text,
  delivery_notes text not null default '',
  status text not null default 'draft' check (status in ('draft', 'confirmed', 'out', 'returned', 'cancelled')),
  subtotal numeric(10, 2) not null default 0,
  stock_applied boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists order_lines (
  id serial primary key,
  order_id integer not null references orders (id) on delete cascade,
  variant_id integer,
  name text not null,
  type text not null,
  price numeric(10, 2) not null,
  unit text not null,
  quantity integer not null,
  image text
);
create table if not exists reservations (
  id serial primary key,
  order_id integer not null references orders (id) on delete cascade,
  variant_id integer not null references variants (id),
  quantity integer not null,
  starts_on date not null,
  ends_on date not null
);
create table if not exists staff (
  id text primary key,
  email text not null unique,
  name text not null,
  password_hash text not null,
  role text not null check (role in ('admin', 'staff')),
  created_at timestamptz not null default now()
);
create table if not exists staff_sessions (
  token text primary key,
  staff_id text not null references staff (id) on delete cascade,
  expires_at timestamptz not null
);
`;

let ready: Promise<void> | null = null;

export function ensureSchema() {
  if (!hasDatabase()) return Promise.resolve();
  ready ??= (async () => {
    await pool().query(SCHEMA);
    const { seedCatalog } = await import("@/lib/admin/seed");
    await seedCatalog();
  })().catch((error) => {
    ready = null;
    throw error;
  });
  return ready;
}
