import { confirmOrder, listQuotes, setQuoteStatus } from "@/lib/admin/actions";

export const metadata = { title: "Quotes" };

const statuses = ["new", "contacted", "quoted", "won", "lost"];

export default async function QuotesPage() {
  const rows = await listQuotes();
  return (
    <>
      <h1 className="font-display text-4xl">Quotes</h1>
      <div className="mt-6 space-y-3">
        {rows.length === 0 ? <p className="font-body text-[14px] text-ink/50">No submissions yet. Public quote requests land here when the database is connected.</p> : null}
        {rows.map((quote) => (
          <article key={quote.id} className="rounded-2xl bg-cream/50 p-4 ring-1 ring-black/5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-body text-[16px] font-medium">{quote.full_name} {quote.unread ? "· new" : ""}</h2>
              <p className="font-body text-[13px] text-ink/50">${quote.subtotal} · {quote.event_date ?? "no date"} · {quote.venue ?? "no venue"}</p>
            </div>
            <p className="font-body text-[13px] text-ink/60">{quote.email}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <form action={setQuoteStatus} className="flex gap-2">
                <input type="hidden" name="id" value={quote.id} />
                <select name="status" defaultValue={quote.status} className="rounded-lg border border-ink/10 px-2 py-1 font-body text-[13px]">
                  {statuses.map((status) => <option key={status}>{status}</option>)}
                </select>
                <button className="rounded-full px-3 py-1 font-body text-[12px] ring-1 ring-ink/15">Update</button>
              </form>
              <form action={confirmOrder}>
                <input type="hidden" name="quote_id" value={quote.id} />
                <button className="rounded-full bg-ink px-3 py-1 font-body text-[12px] text-ivory">Confirm order</button>
              </form>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
