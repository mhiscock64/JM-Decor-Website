"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { flushSync } from "react-dom";
import { CtaButton, CtaLink } from "@/components/cta";
import { useCart } from "@/lib/cart";
import { copy, t } from "@/lib/i18n";
import { useLanguage } from "@/lib/language";
import { formatCad } from "@/lib/products";
import { EMPTY_PLAN, MOODS, canAdvance, lookLines, lookSummary, planSteps, readPlan, writePlan, type PlanAnswers } from "@/lib/plan";

function Choice({ selected, title, lede, onClick }: { selected: boolean; title: string; lede?: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={selected} className={selected ? "w-full rounded-2xl bg-ink px-4 py-4 text-left text-ivory" : "w-full rounded-2xl bg-cream/50 px-4 py-4 text-left ring-1 ring-ink/10 hover:ring-sage"}>
      <span className="block font-body text-[14px] font-medium">{title}</span>
      {lede ? <span className={`mt-1 block font-body text-[13px] ${selected ? "text-ivory/70" : "text-ink/50"}`}>{lede}</span> : null}
    </button>
  );
}

export function PlanPage() {
  const cart = useCart();
  const { locale } = useLanguage();
  const router = useRouter();
  const [plan, setPlan] = useState<PlanAnswers>(EMPTY_PLAN);
  const [ready, setReady] = useState(false);
  const [index, setIndex] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const saved = readPlan();
    if (saved) setPlan(saved);
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) writePlan(plan);
  }, [plan, ready]);

  const steps = planSteps(plan, cart.count);
  const step = steps[Math.min(index, steps.length - 1)] ?? "date";
  const lines = useMemo(() => lookLines(plan, locale), [plan, locale]);
  const total = lines.reduce((sum, line) => sum + line.price, 0);

  function patch(next: Partial<PlanAnswers>) {
    setPlan((current) => ({ ...current, ...next }));
    setAdded(false);
  }
  function addLook() {
    writePlan(plan);
    const incoming = plan.keepCart ? lines.filter((line) => !cart.lines.some((item) => item.productId === line.productId)) : lines;
    flushSync(() => cart.applyLook(incoming, !plan.keepCart));
    setAdded(true);
  }
  function goQuote(includeLook: boolean) {
    writePlan(plan);
    if (includeLook && !added) addLook();
    router.push("/quote");
  }

  const titles: Record<string, string> = {
    keep: t(copy.plan.keepTitle, locale),
    date: t(copy.plan.dateTitle, locale),
    guests: t(copy.plan.guestsTitle, locale),
    setting: t(copy.plan.settingTitle, locale),
    tent: t(copy.plan.tentTitle, locale),
    mood: t(copy.plan.moodTitle, locale),
    review: t(copy.plan.reviewTitle, locale),
  };
  const ledes: Record<string, string> = {
    keep: t(copy.plan.keepLede, locale),
    date: t(copy.plan.dateLede, locale),
    guests: t(copy.plan.guestsLede, locale),
    tent: t(copy.plan.tentLede, locale),
    mood: t(copy.plan.moodLede, locale),
    review: t(copy.plan.reviewLede, locale),
  };

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <p className="font-body text-[12px] font-medium uppercase tracking-[0.3em] text-sage">{t(copy.plan.kicker, locale)}</p>
      <h1 className="mt-4 font-display text-5xl font-medium text-balance">{t(copy.plan.title, locale)}</h1>
      <p className="mt-4 max-w-[52ch] font-body text-[15px] leading-relaxed text-pretty text-ink/65">{t(copy.plan.lede, locale)}</p>
      <div className="mt-10 rounded-2xl bg-cream/50 p-7 ring-1 ring-black/5">
        <div className="flex items-center justify-between gap-4">
          <p className="font-body text-[12px] font-medium tracking-wide text-ink/45">{copy.plan.progress[locale](index + 1, steps.length)}</p>
          <div className="flex gap-1" aria-hidden="true">
            {steps.map((item, itemIndex) => <span key={item} className={itemIndex === index ? "h-1.5 w-6 rounded-full bg-sage" : itemIndex < index ? "h-1.5 w-3 rounded-full bg-ink/30" : "h-1.5 w-3 rounded-full bg-ink/10"} />)}
          </div>
        </div>
        <h2 className="mt-6 font-display text-3xl font-medium text-balance">{titles[step]}</h2>
        {ledes[step] ? <p className="mt-2 font-body text-[14px] leading-relaxed text-ink/60">{ledes[step]}</p> : null}
        <div className="mt-6">
          {step === "keep" ? (
            <div className="grid gap-3 sm:grid-cols-2">
              <Choice selected={plan.keepCart} title={t(copy.plan.keepYes, locale)} onClick={() => patch({ keepCart: true })} />
              <Choice selected={!plan.keepCart} title={t(copy.plan.keepNo, locale)} onClick={() => patch({ keepCart: false })} />
            </div>
          ) : null}
          {step === "date" ? <input type="date" value={plan.eventDate} onChange={(event) => patch({ eventDate: event.target.value })} className="w-full rounded-xl bg-ivory px-3 py-2.5 font-body text-[14px] ring-1 ring-ink/10" /> : null}
          {step === "guests" ? (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                {[40, 80, 160].map((count) => <Choice key={count} selected={plan.guestCount === count} title={copy.plan.guestChip[locale](count)} onClick={() => patch({ guestCount: count })} />)}
              </div>
              <label className="block font-body text-[13px] text-ink/60">
                {t(copy.plan.guestsCustom, locale)}
                <input type="number" min={1} value={plan.guestCount} onChange={(event) => patch({ guestCount: event.target.value ? Number(event.target.value) : "" })} className="mt-1 w-full rounded-xl bg-ivory px-3 py-2.5 ring-1 ring-ink/10" />
              </label>
            </div>
          ) : null}
          {step === "setting" ? (
            <div className="grid gap-3">
              <Choice selected={plan.setting === "indoor"} title={t(copy.plan.indoor, locale)} lede={t(copy.plan.indoorLede, locale)} onClick={() => patch({ setting: "indoor", tentNeed: "" })} />
              <Choice selected={plan.setting === "outdoor"} title={t(copy.plan.outdoor, locale)} lede={t(copy.plan.outdoorLede, locale)} onClick={() => patch({ setting: "outdoor" })} />
              <Choice selected={plan.setting === "both"} title={t(copy.plan.both, locale)} lede={t(copy.plan.bothLede, locale)} onClick={() => patch({ setting: "both" })} />
            </div>
          ) : null}
          {step === "tent" ? (
            <div className="grid gap-3">
              <Choice selected={plan.tentNeed === "yes"} title={t(copy.plan.tentYes, locale)} onClick={() => patch({ tentNeed: "yes" })} />
              <Choice selected={plan.tentNeed === "venue"} title={t(copy.plan.tentVenue, locale)} onClick={() => patch({ tentNeed: "venue" })} />
              <Choice selected={plan.tentNeed === "unsure"} title={t(copy.plan.tentSkip, locale)} onClick={() => patch({ tentNeed: "unsure" })} />
            </div>
          ) : null}
          {step === "mood" ? (
            <div className="grid gap-3">
              {MOODS.map((mood) => <Choice key={mood.id} selected={plan.mood === mood.id} title={mood.name[locale]} lede={mood.lede[locale]} onClick={() => patch({ mood: mood.id })} />)}
            </div>
          ) : null}
          {step === "review" ? (
            <div className="space-y-4">
              <p className="font-body text-[14px] leading-relaxed text-ink/70">{lookSummary(plan, locale)}</p>
              {lines.map((line) => (
                <div key={line.id} className="flex gap-3">
                  <img src={line.image} alt="" className="size-16 rounded-lg object-cover" />
                  <div>
                    <p className="font-body text-[14px] font-medium">{line.name}</p>
                    <p className="font-body text-[12px] text-ink/45">{line.description} · {formatCad(line.price)}</p>
                  </div>
                </div>
              ))}
              <p className="flex justify-between font-body text-[15px] font-medium"><span>{t(copy.plan.estimated, locale)}</span><span>{formatCad(total)}</span></p>
              <p className="font-body text-[13px] leading-relaxed text-ink/50">{t(copy.plan.chairsNote, locale)}</p>
              {added ? <p className="font-body text-[13px] text-sage">{t(copy.plan.added, locale)}</p> : null}
              <div className="flex flex-col gap-3">
                <CtaButton onClick={() => goQuote(true)}>{added ? t(copy.plan.quote, locale) : t(copy.plan.addAndQuote, locale)}</CtaButton>
                <CtaButton variant="outline" onClick={() => { if (!added) addLook(); router.push("/shop"); }}>{t(copy.plan.shop, locale)}</CtaButton>
                <button type="button" onClick={() => goQuote(false)} className="font-body text-[13px] tracking-wide text-ink/50 hover:text-ink">{t(copy.plan.skipLook, locale)}</button>
              </div>
            </div>
          ) : null}
        </div>
        {step !== "review" ? (
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            {index > 0 ? <button type="button" onClick={() => setIndex((current) => Math.max(current - 1, 0))} className="font-body text-[13px] text-ink/55 hover:text-ink">{t(copy.plan.back, locale)}</button> : <span />}
            <div className="flex items-center gap-4">
              {step === "date" ? <button type="button" onClick={() => setIndex((current) => current + 1)} className="font-body text-[13px] text-ink/55 hover:text-ink">{t(copy.plan.skip, locale)}</button> : null}
              <CtaButton onClick={() => setIndex((current) => current + 1)} disabled={!canAdvance(step, plan)}>{t(copy.plan.continue, locale)}</CtaButton>
            </div>
          </div>
        ) : <div className="mt-8"><button type="button" onClick={() => setIndex((current) => Math.max(current - 1, 0))} className="font-body text-[13px] text-ink/55 hover:text-ink">{t(copy.plan.back, locale)}</button></div>}
      </div>
    </section>
  );
}
