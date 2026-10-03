import { listQuotes, setQuoteStatus } from "@/lib/admin/actions";

export const metadata = { title: "Forms" };

export default async function FormsPage() {
  const rows = await listQuotes();
  return (
    <>
      <h1 className="font-display text-4xl">Forms</h1>
      <p className="mt-1 font-body text-sm text-[oklch(50%_0.02_258)]">Quote submissions from the public site.</p>
      <div className="mt-6 space-y-3">
        {rows.length === 0 ? <p className="font-body text-sm text-[oklch(50%_0.02_258)]">No submissions yet.</p> : null}
        {rows.map((quote) => (
          <article key={quote.id} className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-[oklch(90%_0.01_255)]">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-body text-base font-semibold">{quote.full_name} {quote.unread ? "· unread" : ""}</h2>
              <p className="font-body text-sm text-[oklch(50%_0.02_258)]">{quote.venue ?? "no venue"} · {quote.event_date ?? "no date"}</p>
            </div>
            <p className="font-body text-sm text-[oklch(50%_0.02_258)]">{quote.email}</p>
            <form action={setQuoteStatus} className="mt-3 flex gap-2">
              <input type="hidden" name="id" value={quote.id} />
              <select name="status" defaultValue={quote.status} className="rounded-md border border-[oklch(90%_0.01_255)] px-2 py-1 font-body text-sm">
                {["new", "contacted", "quoted", "won", "lost"].map((status) => <option key={status}>{status}</option>)}
              </select>
              <button className="rounded-md bg-[oklch(27%_0.035_258)] px-3 py-1 font-body text-xs text-ivory">Mark read</button>
            </form>
          </article>
        ))}
      </div>
    </>
  );
}
