import { redirect } from "next/navigation";
import { currentStaff } from "@/lib/admin/auth";
import { hasDatabase, sql } from "@/lib/admin/db";
import { ensureSchema } from "@/lib/admin/db";
import { AdminShell } from "@/components/admin-shell";

export default async function OfficeLayout({ children }: { children: React.ReactNode }) {
  if (!hasDatabase()) redirect("/admin/login");
  const staff = await currentStaff();
  if (!staff) redirect("/admin/login");
  await ensureSchema();
  const unread = await sql<{ n: number }>("select count(*)::int as n from quotes where unread and archived = false");
  return <AdminShell staff={staff} unread={unread[0]?.n ?? 0}>{children}</AdminShell>;
}
