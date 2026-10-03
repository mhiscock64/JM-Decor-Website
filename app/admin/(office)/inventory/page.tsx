import { listInventory, updateQty } from "@/lib/admin/actions";

export const metadata = { title: "Inventory" };

export default async function InventoryPage() {
  const rows = await listInventory();
  return (
    <>
      <h1 className="font-display text-4xl">Inventory</h1>
      <p className="mt-2 max-w-2xl font-body text-[14px] text-ink/60">On-hand quantity, low-stock warning, and date blackouts. Confirming an order reserves rentals for the event date.</p>
      <div className="mt-6 space-y-3">
        {rows.map((row) => (
          <form key={row.id} action={updateQty} className="grid items-end gap-2 rounded-xl bg-cream/50 p-3 md:grid-cols-7">
            <input type="hidden" name="id" value={row.id} />
            <div className="md:col-span-2 font-body text-[14px]">{row.name_en}<span className="block text-[12px] text-ink/50">{row.type} · reserved today {row.reserved}</span></div>
            <label className="font-body text-[12px]">On hand<input name="qty_on_hand" type="number" defaultValue={row.qty_on_hand} className="mt-1 w-full rounded-lg border border-ink/10 px-2 py-1" /></label>
            <label className="font-body text-[12px]">Low at<input name="low_stock" type="number" defaultValue={row.low_stock} className="mt-1 w-full rounded-lg border border-ink/10 px-2 py-1" /></label>
            <label className="font-body text-[12px]">Blackout from<input name="starts_on" type="date" className="mt-1 w-full rounded-lg border border-ink/10 px-2 py-1" /></label>
            <label className="font-body text-[12px]">Until<input name="ends_on" type="date" className="mt-1 w-full rounded-lg border border-ink/10 px-2 py-1" /></label>
            <button className="rounded-full bg-ink px-3 py-1.5 font-body text-[12px] text-ivory">Save</button>
          </form>
        ))}
      </div>
    </>
  );
}
