import { listOrders, setOrderStatus } from "@/lib/admin/actions";

export const metadata = { title: "Orders" };

const statuses = ["draft", "confirmed", "out", "returned", "cancelled"];

export default async function OrdersPage() {
  const rows = await listOrders();
  return (
    <>
      <h1 className="font-display text-4xl">Orders</h1>
      <p className="mt-2 font-body text-[14px] text-ink/60">Confirming a quote creates the order and reserves rental pieces. Cancelling or marking returned releases them.</p>
      <div className="mt-6 space-y-3">
        {rows.length === 0 ? <p className="font-body text-[14px] text-ink/50">No orders yet.</p> : null}
        {rows.map((order) => (
          <form key={order.id} action={setOrderStatus} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-cream/50 p-4">
            <input type="hidden" name="id" value={order.id} />
            <div className="font-body text-[14px]">
              <p className="font-medium">{order.full_name}</p>
              <p className="text-ink/55">{order.email} · {order.venue ?? "venue tbc"} · {order.event_date ?? "date tbc"} · ${order.subtotal}</p>
            </div>
            <select name="status" defaultValue={order.status} className="rounded-lg border border-ink/10 px-2 py-1 font-body text-[13px]">
              {statuses.map((status) => <option key={status}>{status}</option>)}
            </select>
            <button className="rounded-full bg-ink px-3 py-1.5 font-body text-[12px] text-ivory">Save</button>
          </form>
        ))}
      </div>
    </>
  );
}
