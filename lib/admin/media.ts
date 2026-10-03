import { randomBytes } from "node:crypto";
import { ensureSchema, sql } from "@/lib/admin/db";

export async function saveImage(file: File) {
  await ensureSchema();
  await sql(`create table if not exists media (
    id text primary key,
    mime text not null,
    bytes bytea not null,
    name text not null default '',
    created_at timestamptz not null default now()
  )`);
  if (!file.size || file.size > 4_000_000) throw new Error("Use an image under 4 MB.");
  if (!file.type.startsWith("image/")) throw new Error("File must be an image.");
  const id = randomBytes(8).toString("hex");
  const bytes = Buffer.from(await file.arrayBuffer());
  await sql("insert into media (id, mime, bytes, name) values ($1, $2, $3, $4)", [id, file.type, bytes, file.name.slice(0, 120)]);
  return `/api/media/${id}`;
}

export async function readImage(id: string) {
  await ensureSchema();
  await sql(`create table if not exists media (
    id text primary key,
    mime text not null,
    bytes bytea not null,
    name text not null default '',
    created_at timestamptz not null default now()
  )`);
  const rows = await sql<{ mime: string; bytes: Buffer }>("select mime, bytes from media where id = $1", [id]);
  return rows[0] ?? null;
}

export async function listImages() {
  await ensureSchema();
  await sql(`create table if not exists media (
    id text primary key,
    mime text not null,
    bytes bytea not null,
    name text not null default '',
    created_at timestamptz not null default now()
  )`);
  return sql<{ id: string; name: string; mime: string }>("select id, name, mime from media order by created_at desc limit 60");
}
