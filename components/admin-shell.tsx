"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, ImageIcon, Inbox, LayoutDashboard, Menu, Package, ShoppingBag, Users, Warehouse, X } from "lucide-react";
import { logoutAction } from "@/lib/admin/actions";
import type { Staff } from "@/lib/admin/auth";

const groups = [
  { label: "Personal", items: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true }] },
  { label: "Catalogue", items: [
    { href: "/admin/products", label: "Products", icon: Package, exact: false },
    { href: "/admin/inventory", label: "Inventory", icon: Warehouse, exact: false },
    { href: "/admin/images", label: "Images", icon: ImageIcon, exact: false },
  ] },
  { label: "Sales", items: [
    { href: "/admin/quotes", label: "Quotes", icon: ClipboardList, exact: false },
    { href: "/admin/orders", label: "Orders", icon: ShoppingBag, exact: false },
    { href: "/admin/forms", label: "Forms", icon: Inbox, exact: false },
  ] },
  { label: "Access", items: [{ href: "/admin/users", label: "Users", icon: Users, exact: false }] },
];

export function AdminShell({ staff, unread = 0, children }: { staff: Staff; unread?: number; children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const sidebar = (
    <aside className="flex h-full w-60 shrink-0 flex-col bg-[oklch(27%_0.035_258)] text-ivory">
      <div className="flex items-center justify-between px-5 py-5">
        <Link href="/admin" className="font-display text-2xl tracking-wide" onClick={() => setOpen(false)}>JM Decor</Link>
        <button type="button" className="lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu"><X className="size-5" /></button>
      </div>
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 pb-6">
        {groups.filter((group) => group.label !== "Access" || staff.role === "admin").map((group) => (
          <div key={group.label}>
            <p className="px-3 pb-2 font-body text-[11px] tracking-[0.18em] text-ivory/40 uppercase">{group.label}</p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={active ? "flex items-center gap-3 rounded-md bg-[oklch(33%_0.03_258)] px-3 py-2.5 font-body text-sm text-ivory" : "flex items-center gap-3 rounded-md px-3 py-2.5 font-body text-sm text-ivory/75 hover:bg-[oklch(33%_0.03_258)] hover:text-ivory"}>
                    <Icon className="size-4" />
                    <span className="flex-1">{item.label}</span>
                    {item.label === "Forms" && unread > 0 ? <span className="grid min-w-5 place-items-center rounded-full bg-[oklch(55%_0.18_27)] px-1.5 text-[11px] text-ivory">{unread}</span> : null}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      <div className="border-t border-ivory/10 px-4 py-4">
        <p className="truncate font-body text-sm">{staff.name}</p>
        <p className="truncate font-body text-xs text-ivory/50">{staff.role}</p>
        <form action={logoutAction} className="mt-3">
          <button type="submit" className="font-body text-xs text-ivory/70 hover:text-ivory">Sign out</button>
        </form>
      </div>
    </aside>
  );
  return (
    <div className="min-h-screen bg-[oklch(96.4%_0.006_255)] text-ink">
      <div className="flex min-h-screen">
        <div className="hidden lg:block">{sidebar}</div>
        {open ? (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button type="button" className="absolute inset-0 bg-ink/40" aria-label="Close menu" onClick={() => setOpen(false)} />
            <div className="relative z-10 h-full w-60">{sidebar}</div>
          </div>
        ) : null}
        <div className="min-w-0 flex-1">
          <header className="flex items-center justify-between border-b border-[oklch(90%_0.01_255)] bg-white px-4 py-3 lg:px-8">
            <button type="button" className="grid size-11 place-items-center lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu className="size-5" /></button>
            <p className="font-body text-sm text-[oklch(50%_0.02_258)]">JM Decor Admin</p>
            <Link href="/" className="font-body text-sm text-[oklch(55%_0.13_255)] hover:underline">View site</Link>
          </header>
          <div className="px-4 py-6 lg:px-8">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function StatCard({ label, value, tone }: { label: string; value: string; tone: "blue" | "green" | "violet" | "coral" }) {
  const bar = { blue: "bg-[oklch(55%_0.14_255)]", green: "bg-[oklch(60%_0.14_155)]", violet: "bg-[oklch(52%_0.14_305)]", coral: "bg-[oklch(62%_0.16_40)]" }[tone];
  return (
    <div className="rounded-lg bg-white px-5 pt-4 pb-3 shadow-sm ring-1 ring-[oklch(90%_0.01_255)]">
      <p className="font-body text-sm text-[oklch(50%_0.02_258)]">{label}</p>
      <p className="mt-2 font-body text-3xl font-semibold tracking-tight">{value}</p>
      <div className={`mt-3 h-1 rounded-full ${bar}`} />
    </div>
  );
}
