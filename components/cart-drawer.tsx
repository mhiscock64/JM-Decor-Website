"use client";

import { useCart } from "@/lib/cart";
import { copy, t } from "@/lib/i18n";
import { useLanguage } from "@/lib/language";
import { displayLine, formatCad } from "@/lib/products";
import { CtaLink } from "@/components/cta";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const cart = useCart();
  const { locale } = useLanguage();

  return (
    <Sheet open={open} onOpenChange={(next) => !next && onClose()}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full max-w-md gap-0 bg-ivory p-0 sm:max-w-md"
      >
        <SheetHeader className="flex flex-row items-center justify-between space-y-0 border-b border-ink/10 px-6 py-5">
          <SheetTitle className="font-display text-2xl font-medium text-ink">
            {t(copy.cart.title, locale)}
          </SheetTitle>
          <button
            type="button"
            onClick={onClose}
            className="font-body text-[13px] tracking-wide text-ink/60 hover:text-ink"
          >
            {t(copy.cart.close, locale)}
          </button>
          <SheetDescription className="sr-only">
            {t(copy.cart.title, locale)}
          </SheetDescription>
        </SheetHeader>
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
              className="mt-4 block w-full"
            >
              {t(copy.cart.request, locale)}
            </CtaLink>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
