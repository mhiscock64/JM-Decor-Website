import { redirect } from "next/navigation";
import { currentStaff } from "@/lib/admin/auth";
import { hasDatabase } from "@/lib/admin/db";
import { AdminShell } from "@/components/admin-shell";

export default async function OfficeLayout({ children }: { children: React.ReactNode }) {
  if (!hasDatabase()) redirect("/admin/login");
  const staff = await currentStaff();
  if (!staff) redirect("/admin/login");
  return <AdminShell staff={staff}>{children}</AdminShell>;
}
