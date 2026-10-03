import Link from "next/link";
import { logoutAction } from "@/lib/admin/actions";
import type { Staff } from "@/lib/admin/auth";

const links = [
  ["/admin", "Overview"],
  ["/admin/products", "Products"],
  ["/admin/inventory", "Inventory"],
  ["/admin/quotes", "Quotes"],
  ["/admin/orders", "Orders"],
] as const;

export function AdminShell({ staff, children }: { staff: Staff; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <header className="border-b border-ink/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div>
            <p className="font-body text-[11px] uppercase tracking-[0.22em] text-sage">Staff office</p>
            <p className="font-body text-[13px] text-ink/70">{staff.name} · {staff.role}</p>
          </div>
          <nav className="flex flex-wrap gap-4 font-body text-[13px]">
            {links.map(([href, label]) => (
              <Link key={href} href={href} className="hover:text-sage">{label}</Link>
            ))}
            <Link href="/" className="text-ink/50 hover:text-ink">Public site</Link>
          </nav>
          <form action={logoutAction}>
            <button type="submit" className="font-body text-[13px] text-ink/60 hover:text-ink">Sign out</button>
          </form>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
    </div>
  );
}
