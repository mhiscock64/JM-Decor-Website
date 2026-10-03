import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { ensureSchema, hasDatabase, sql } from "@/lib/admin/db";

const COOKIE = "jm_staff";

export type Staff = { id: string; email: string; name: string; role: "admin" | "staff" };

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 32).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const next = scryptSync(password, salt, 32);
  const prev = Buffer.from(hash, "hex");
  if (next.length !== prev.length) return false;
  return timingSafeEqual(next, prev);
}

export async function staffCount() {
  await ensureSchema();
  const rows = await sql<{ n: number }>("select count(*)::int as n from staff");
  return rows[0]?.n ?? 0;
}

export async function currentStaff(): Promise<Staff | null> {
  if (!hasDatabase()) return null;
  await ensureSchema();
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return null;
  const rows = await sql<Staff>(
    `select s.id, s.email, s.name, s.role
     from staff_sessions ss
     join staff s on s.id = ss.staff_id
     where ss.token = $1 and ss.expires_at > now()`,
    [token],
  );
  return rows[0] ?? null;
}

export async function signIn(email: string, password: string) {
  await ensureSchema();
  const rows = await sql<Staff & { password_hash: string }>(
    "select id, email, name, role, password_hash from staff where lower(email) = lower($1)",
    [email.trim()],
  );
  const staff = rows[0];
  if (!staff || !verifyPassword(password, staff.password_hash)) return null;
  const token = randomBytes(32).toString("hex");
  await sql(
    "insert into staff_sessions (token, staff_id, expires_at) values ($1, $2, now() + interval '14 days')",
    [token, staff.id],
  );
  const jar = await cookies();
  jar.set(COOKIE, token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 14 });
  return { id: staff.id, email: staff.email, name: staff.name, role: staff.role };
}

export async function signOut() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (token && hasDatabase()) {
    await sql("delete from staff_sessions where token = $1", [token]);
  }
  jar.delete(COOKIE);
}

export async function createStaff(input: { email: string; name: string; password: string; role: "admin" | "staff" }) {
  await ensureSchema();
  const id = randomBytes(12).toString("hex");
  await sql(
    "insert into staff (id, email, name, password_hash, role) values ($1, $2, $3, $4, $5)",
    [id, input.email.trim().toLowerCase(), input.name.trim(), hashPassword(input.password), input.role],
  );
  return id;
}
