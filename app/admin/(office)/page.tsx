import Link from "next/link";
import { StatCard } from "@/components/admin-shell";
import { dashboardData } from "@/lib/admin/actions";

export const metadata = { title: "Dashboard" };

export default async function AdminHome() {
  const data = await dashboardData();
  const openQuotes = data.quotes.filter((row) => row.status !== "won" && row.status !== "lost").reduce((sum, row) => sum + row.n, 0);
  return (
    <>
      <h1 className="font-display text-4xl">Dashboard</h1>
      <p className="mt-1 font-body text-sm text-[oklch(50%_0.02_258)]">Catalogue, quotes, and bookings for the team.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Products" value={String(data.products)} tone="blue" />
        <StatCard label="Low stock" value={String(data.low)} tone="coral" />
        <StatCard label="Open quotes" value={String(openQuotes)} tone="violet" />
        <StatCard label="Orders" value={String(data.orders.reduce((sum, row) => sum + row.n, 0))} tone="green" />
      </div>
      <section className="mt-8 rounded-lg bg-white shadow-sm ring-1 ring-[oklch(90%_0.01_255)]">
        <div className="flex items-center justify-between border-b border-[oklch(90%_0.01_255)] px-5 py-4">
          <h2 className="font-body text-base font-semibold">Recent quotes</h2>
          <Link href="/admin/quotes" className="font-body text-sm text-[oklch(55%_0.13_255)]">View all</Link>
        </div>
        <ul className="divide-y divide-[oklch(90%_0.01_255)] font-body text-sm">
          {data.recent.length === 0 ? <li className="px-5 py-4 text-[oklch(50%_0.02_258)]">No quote requests yet.</li> : null}
          {data.recent.map((quote) => (
            <li key={quote.id} className="flex justify-between gap-4 px-5 py-3">
              <span>{quote.full_name} · {quote.email}</span>
              <span className="capitalize text-[oklch(55%_0.13_255)]">{quote.status}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
