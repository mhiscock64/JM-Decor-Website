import Form from "next/form";

export function QuoteStarter({
  action,
  title,
  intro,
  dateLabel,
  venueLabel,
  venuePlaceholder,
  submitLabel,
}: {
  action: string;
  title: string;
  intro: string;
  dateLabel: string;
  venueLabel: string;
  venuePlaceholder: string;
  submitLabel: string;
}) {
  const field =
    "mt-1.5 block h-12 w-full min-w-0 rounded-none border border-ink/30 bg-white px-3 font-body text-[16px] text-ink placeholder:text-ink/70 hover:border-ink";
  return (
    <section
      id="soumission"
      aria-labelledby="starter-title"
      className="relative z-10 px-4 sm:px-8 lg:-mt-14"
    >
      <div className="mx-auto max-w-7xl">
        <div className="border border-ink/10 bg-white p-5 shadow-[0_20px_50px_-30px_rgba(36,33,31,.35)] sm:p-7 lg:grid lg:grid-cols-12 lg:items-end lg:gap-10 lg:p-8">
          <div className="lg:col-span-4">
            <h2 id="starter-title" className="font-display text-[28px] leading-tight font-normal sm:text-[32px]">
              {title}
            </h2>
            <p className="mt-2 font-body text-[14px] leading-relaxed text-ink/75">{intro}</p>
          </div>
          {/* A plain GET form: works without JavaScript and pre-fills the quote page. */}
          <Form
            action={action}
            className="mt-5 grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end lg:col-span-8 lg:mt-0"
          >
            <div>
              <label htmlFor="starter-date" className="block font-body text-[13px] font-medium">
                {dateLabel}
              </label>
              <input id="starter-date" name="date" type="date" className={field} />
            </div>
            <div>
              <label htmlFor="starter-venue" className="block font-body text-[13px] font-medium">
                {venueLabel}
              </label>
              <input
                id="starter-venue"
                name="venue"
                type="text"
                maxLength={120}
                autoComplete="off"
                placeholder={venuePlaceholder}
                className={field}
              />
            </div>
            <button
              type="submit"
              className="h-12 bg-ink px-7 font-body text-[15px] font-medium tracking-wide text-ivory transition-colors hover:bg-sage"
            >
              {submitLabel}
            </button>
          </Form>
        </div>
      </div>
    </section>
  );
}
