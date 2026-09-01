"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { copy, t } from "@/lib/i18n";
import { useLanguage } from "@/lib/language";
import { displayLine, formatCad } from "@/lib/products";
import { CtaLink } from "@/components/cta";

export function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const cart = useCart();
  const { locale } = useLanguage();

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-ink/30 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-ivory shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
        aria-hidden={!open}
        aria-label={t(copy.cart.title, locale)}
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <h2 className="font-display text-2xl font-medium">
            {t(copy.cart.title, locale)}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="font-body text-[13px] tracking-wide text-ink/60 hover:text-ink"
          >
            {t(copy.cart.close, locale)}
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.lines.length === 0 ? (
            <p className="mt-8 text-center font-body text-[14px] text-ink/50">
              {t(copy.cart.empty, locale)}
            </p>
          ) : (
            <ul className="space-y-4">
              {cart.lines.map((line) => {
                const shown = displayLine(line, locale);
                return (
                  <li key={line.id} className="flex gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={line.image}
                      alt={shown.name}
                      width={64}
                      height={64}
                      className="size-16 rounded-lg object-cover ring-1 ring-black/5"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between font-body text-[14px] font-medium">
                        <span>{shown.name}</span>
                        <span>{formatCad(line.price * line.quantity)}</span>
                      </div>
                      <p className="font-body text-[12px] uppercase tracking-wide text-ink/45">
                        {shown.typeLabel} · {shown.unit}
                      </p>
                      <div className="mt-2 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            cart.setQuantity(line.id, line.quantity - 1)
                          }
                          className="grid size-6 place-items-center rounded-full text-ink/70 ring-1 ring-ink/15 hover:text-ink"
                          aria-label={t(copy.cart.decrease, locale)}
                        >
                          −
                        </button>
                        <span className="font-body text-[13px]">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            cart.setQuantity(line.id, line.quantity + 1)
                          }
                          className="grid size-6 place-items-center rounded-full text-ink/70 ring-1 ring-ink/15 hover:text-ink"
                          aria-label={t(copy.cart.increase, locale)}
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() => cart.remove(line.id)}
                          className="ml-auto font-body text-[12px] text-ink/45 hover:text-ink"
                        >
                          {t(copy.cart.remove, locale)}
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        {cart.lines.length > 0 ? (
          <div className="border-t border-ink/10 px-6 py-5">
            <div className="flex justify-between font-body text-[15px] font-medium">
              <span>{t(copy.cart.estimated, locale)}</span>
              <span>{formatCad(cart.subtotal)}</span>
            </div>
            <CtaLink
              href="/quote"
              onClick={onClose}
              className="mt-4 w-full"
            >
              {t(copy.cart.request, locale)}
            </CtaLink>
          </div>
        ) : null}
      </aside>
    </>
  );
}
