"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { copy, t } from "@/lib/i18n";
import { useLanguage } from "@/lib/language";
import { displayLine, formatCad } from "@/lib/products";
import { CtaButton } from "@/components/cta";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const fieldClass =
  "mt-1.5 h-auto w-full rounded-none bg-cream/50 px-3 py-2.5 font-body text-[14px] text-ink shadow-none ring-1 ring-ink/10 placeholder:text-ink/30 focus-visible:border-transparent focus-visible:ring-1 focus-visible:ring-sage";

const labelClass =
  "font-body text-[12px] font-medium tracking-wide text-ink/60";

type Captcha = { token: string; question: string };

export function QuoteForm() {
  const cart = useCart();
  const { locale } = useLanguage();
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const [captcha, setCaptcha] = useState<Captcha | null>(null);

  const refreshCaptcha = useCallback(async () => {
    try {
      const response = await fetch(`/api/captcha?lang=${locale}`);
      if (!response.ok) throw new Error("captcha");
      setCaptcha((await response.json()) as Captcha);
    } catch {
      setCaptcha(null);
    }
  }, [locale]);

  useEffect(() => {
    let active = true;
    fetch(`/api/captcha?lang=${locale}`)
      .then((response) => {
        if (!response.ok) throw new Error("captcha");
        return response.json() as Promise<Captcha>;
      })
      .then((data) => {
        if (active) setCaptcha(data);
      })
      .catch(() => {
        if (active) setCaptcha(null);
      });
    return () => {
      active = false;
    };
  }, [locale]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!captcha) return;
    setStatus("sending");
    setError("");
    const form = new FormData(event.currentTarget);
    const optional = (name: string) => String(form.get(name) ?? "") || undefined;
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: String(form.get("fullName") ?? ""),
          email: String(form.get("email") ?? ""),
          phone: optional("phone"),
          eventDate: optional("eventDate"),
          venue: optional("venue"),
          guestCount: Number(form.get("guestCount") || 0) || undefined,
          notes: optional("notes"),
          cartItems: cart.lines.map((line) => ({
            id: line.id,
            name: line.name,
            type: line.type,
            price: line.price,
            unit: line.unit,
            quantity: line.quantity,
          })),
          subtotal: cart.subtotal,
          captchaToken: captcha.token,
          captchaAnswer: String(form.get("captchaAnswer") ?? ""),
          locale,
        }),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error || t(copy.quote.error, locale));
      }
      setStatus("done");
      cart.clear();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : t(copy.quote.error, locale));
      void refreshCaptcha();
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <p className="font-body text-[12px] font-medium uppercase tracking-[0.3em] text-sage">
            {t(copy.quote.kicker, locale)}
          </p>
          <h1 className="mt-4 font-display text-5xl font-medium text-balance">
            {t(copy.quote.title, locale)}
          </h1>
          <p className="mt-4 max-w-[44ch] font-body text-[15px] leading-relaxed text-pretty text-ink/65">
            {t(copy.quote.lede, locale)}
          </p>
          <div className="mt-8 space-y-3 font-body text-[14px] text-ink/70">
            {cart.lines.length === 0 ? (
              <p className="text-ink/40">
                {t(copy.quote.emptyCart, locale)}{" "}
                <Link href="/shop" className="text-sage underline">
                  {t(copy.quote.browse, locale)}
                </Link>
                .
              </p>
            ) : (
              cart.lines.map((line) => {
                const shown = displayLine(line, locale);
                return (
                <p
                  key={line.id}
                  className="flex justify-between border-b border-ink/10 pb-3"
                >
                  <span>
                    {shown.name}{" "}
                    <span className="text-ink/40">
                      · {shown.typeLabel} × {line.quantity}
                    </span>
                  </span>
                  <span>{formatCad(line.price * line.quantity)}</span>
                </p>
                );
              })
            )}
            {cart.lines.length > 0 ? (
              <p className="flex justify-between pt-1 font-body text-[15px] font-medium">
                <span>{t(copy.cart.estimated, locale)}</span>
                <span>{formatCad(cart.subtotal)}</span>
              </p>
            ) : null}
          </div>
        </div>
        {status === "done" ? (
          <div className="flex flex-col items-center justify-center rounded-2xl bg-cream/50 p-10 text-center ring-1 ring-black/5">
            <h2 className="font-display text-3xl font-medium">
              {t(copy.quote.thanks, locale)}
            </h2>
            <p className="mt-3 max-w-sm font-body text-[15px] text-ink/65">
              {t(copy.quote.thanksLede, locale)}
            </p>
            <CtaButton
              className="mt-6"
              onClick={() => {
                setStatus("idle");
                void refreshCaptcha();
              }}
            >
              {t(copy.quote.another, locale)}
            </CtaButton>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="rounded-2xl bg-cream/50 p-7 ring-1 ring-black/5"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Label className={`flex-col items-stretch ${labelClass}`}>
                {t(copy.quote.eventDate, locale)}
                <Input type="date" name="eventDate" className={fieldClass} />
              </Label>
              <Label className={`flex-col items-stretch ${labelClass}`}>
                {t(copy.quote.venue, locale)}
                <Input
                  type="text"
                  name="venue"
                  maxLength={120}
                  placeholder={t(copy.quote.venuePlaceholder, locale)}
                  className={fieldClass}
                />
              </Label>
              <Label className={`sm:col-span-2 flex-col items-stretch ${labelClass}`}>
                {t(copy.quote.fullName, locale)}
                <Input
                  type="text"
                  name="fullName"
                  required
                  maxLength={100}
                  className={fieldClass}
                />
              </Label>
              <Label className={`flex-col items-stretch ${labelClass}`}>
                {t(copy.quote.email, locale)}
                <Input
                  type="email"
                  name="email"
                  required
                  maxLength={255}
                  className={fieldClass}
                />
              </Label>
              <Label className={`flex-col items-stretch ${labelClass}`}>
                {t(copy.quote.phone, locale)}
                <Input
                  type="tel"
                  name="phone"
                  maxLength={30}
                  className={fieldClass}
                />
              </Label>
              <Label className={`flex-col items-stretch ${labelClass}`}>
                {t(copy.quote.guests, locale)}
                <Input
                  type="number"
                  name="guestCount"
                  min={0}
                  max={5000}
                  className={fieldClass}
                />
              </Label>
              <Label className={`sm:col-span-1 flex-col items-stretch ${labelClass}`}>
                {t(copy.quote.spam, locale)} {captcha?.question ?? t(copy.quote.loading, locale)}
                <Input
                  type="text"
                  name="captchaAnswer"
                  required
                  inputMode="numeric"
                  autoComplete="off"
                  maxLength={4}
                  disabled={!captcha}
                  placeholder={t(copy.quote.answer, locale)}
                  className={fieldClass}
                />
              </Label>
              <Label className={`sm:col-span-2 flex-col items-stretch ${labelClass}`}>
                {t(copy.quote.notes, locale)}
                <Textarea
                  name="notes"
                  rows={3}
                  maxLength={1000}
                  placeholder={t(copy.quote.notesPlaceholder, locale)}
                  className={`${fieldClass} min-h-0 resize-none`}
                />
              </Label>
            </div>
            {status === "error" ? (
              <p className="mt-4 font-body text-[13px] text-destructive">{error}</p>
            ) : null}
            <CtaButton
              type="submit"
              disabled={status === "sending" || !captcha}
              className="mt-6 w-full"
            >
              {status === "sending"
                ? t(copy.quote.sending, locale)
                : t(copy.quote.submit, locale)}
            </CtaButton>
          </form>
        )}
      </div>
    </section>
  );
}
