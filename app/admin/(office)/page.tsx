import Link from "next/link";
import { dashboardData } from "@/lib/admin/actions";

export const metadata = { title: "Staff overview" };

export default async function AdminHome() {
  const data = await dashboardData();
  const cards = [
    ["Products", String(data.products)],
    ["Low stock", String(data.low)],
    ["Open quotes", String(data.quotes.filter((row) => row.status !== "won" && row.status !== "lost").reduce((sum, row) => sum + row.n, 0))],
    ["Orders", String(data.orders.reduce((sum, row) => sum + row.n, 0))],
  ];
  return (
    <>
      <h1 className="font-display text-4xl">Overview</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        {cards.map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-cream/70 p-4 ring-1 ring-black/5">
            <p className="font-body text-[12px] uppercase tracking-wide text-sage">{label}</p>
            <p className="mt-2 font-display text-3xl">{value}</p>
          </div>
        ))}
      </div>
      <h2 className="mt-10 font-display text-2xl">Recent quotes</h2>
      <ul className="mt-4 divide-y divide-ink/10 font-body text-[14px]">
        {data.recent.length === 0 ? <li className="py-3 text-ink/50">No quote requests yet.</li> : null}
        {data.recent.map((quote) => (
          <li key={quote.id} className="flex justify-between gap-4 py-3">
            <span>{quote.full_name} · {quote.email}</span>
            <Link href="/admin/quotes" className="text-sage">{quote.status}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
