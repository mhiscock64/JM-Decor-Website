"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { copy, t } from "@/lib/i18n";
import { useLanguage } from "@/lib/language";
import { barePath, localizedHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/types";
import { BrandLogo } from "@/components/brand-logo";
import { cn } from "@/lib/utils";

const links = [
  { href: "/plan", key: "plan" as const },
  { href: "/gallery", key: "gallery" as const },
  { href: "/shop", key: "shop" as const },
];

const LANGUAGES: { locale: Locale; label: string; short: string; hrefLang: string }[] = [
  { locale: "fr", label: "Français", short: "FR", hrefLang: "fr-CA" },
  { locale: "en", label: "English", short: "EN", hrefLang: "en-CA" },
];

export function SiteHeader({ onCartClick }: { onCartClick: () => void }) {
  const { locale, setLocale } = useLanguage();
  const { count } = useCart();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const bare = barePath(pathname);
  const other = LANGUAGES.find((item) => item.locale !== locale) ?? LANGUAGES[1];

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const button = menuButtonRef.current;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      button?.focus();
    };
  }, [menuOpen]);

  const languageLink = (item: (typeof LANGUAGES)[number], className: string, compact = false) => (
    <Link
      key={item.locale}
      href={localizedHref(bare, item.locale)}
      hrefLang={item.hrefLang}
      lang={item.locale}
      aria-current={item.locale === locale ? "true" : undefined}
      onClick={() => {
        setLocale(item.locale);
        setMenuOpen(false);
      }}
      className={className}
    >
      {compact ? (
        <>
          <span aria-hidden="true">{item.short}</span>
          <span className="sr-only">{item.label}</span>
        </>
      ) : (
        item.label
      )}
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-ivory/95 backdrop-blur supports-[backdrop-filter]:bg-ivory/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-1 px-4 sm:h-[76px] sm:px-8 lg:gap-4">
        <Link
          href={localizedHref("/", locale)}
          aria-label={`${t(copy.brand, locale)} — ${t(copy.nav.home, locale)}`}
          className="mr-auto flex min-h-[44px] min-w-0 shrink items-center lg:mr-0"
        >
          <BrandLogo priority locale={locale} className="h-12 sm:h-14" />
        </Link>
        <nav aria-label={t(copy.nav.main, locale)} className="mr-auto ml-6 hidden lg:block">
          <ul className="flex items-center gap-1 font-body text-[14px] font-medium tracking-wide">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={localizedHref(link.href, locale)}
                  aria-current={bare === link.href ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-[44px] items-center px-3 transition-colors hover:text-sage",
                    bare === link.href ? "text-ink underline underline-offset-8" : "text-ink/80",
                  )}
                >
                  {t(copy.nav[link.key], locale)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {languageLink(
          other,
          "hidden min-h-[44px] min-w-[44px] items-center justify-center px-3 font-body text-[13px] font-medium text-ink/75 hover:text-ink lg:inline-flex",
          true,
        )}
        <button
          type="button"
          onClick={onCartClick}
          className="relative grid size-11 shrink-0 place-items-center text-ink transition-colors hover:text-sage"
          aria-label={copy.nav.cartCount[locale](count)}
        >
          <ShoppingBag aria-hidden="true" strokeWidth={1.5} className="size-[22px]" />
          {count > 0 ? (
            <span
              aria-hidden="true"
              className="absolute top-1 right-0.5 grid min-w-4 place-items-center rounded-full bg-sage px-1 text-[10px] leading-4 font-semibold text-ivory"
            >
              {count}
            </span>
          ) : null}
        </button>
        <Link
          href={localizedHref("/quote", locale)}
          className="inline-flex min-h-[44px] max-w-[112px] shrink-0 items-center justify-center bg-ink px-3 text-center font-body text-[12px] leading-tight font-medium tracking-wide text-ivory transition-colors hover:bg-sage sm:max-w-none sm:px-5 sm:text-[14px]"
        >
          {t(copy.nav.quote, locale)}
        </Link>
        <button
          ref={menuButtonRef}
          type="button"
          className="grid size-11 shrink-0 place-items-center text-ink lg:hidden"
          aria-label={t(copy.nav.menu, locale)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(true)}
        >
          <Menu aria-hidden="true" strokeWidth={1.5} className="size-[22px]" />
        </button>
      </div>
      {/* Portalled to <body>: the header's backdrop-filter would otherwise trap fixed children. */}
      {menuOpen
        ? createPortal(
            <>
              <div
                className="fixed inset-0 z-40 bg-ink/30 lg:hidden"
                onClick={() => setMenuOpen(false)}
                aria-hidden="true"
              />
              <div
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label={t(copy.nav.menu, locale)}
                className="fixed inset-y-0 right-0 z-50 flex w-80 max-w-[85vw] flex-col overflow-y-auto bg-ivory shadow-2xl lg:hidden"
              >
                <div className="flex items-center justify-between gap-3 border-b border-ink/10 px-5 py-3">
                  <BrandLogo locale={locale} className="h-12 sm:h-12" />
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    aria-label={t(copy.nav.closeMenu, locale)}
                    className="grid size-11 shrink-0 place-items-center text-ink"
                  >
                    <X aria-hidden="true" strokeWidth={1.5} className="size-[22px]" />
                  </button>
                </div>
                <nav aria-label={t(copy.nav.main, locale)} className="px-5">
                  <ul className="divide-y divide-ink/10 font-body text-[16px]">
                    {[...links, { href: "/quote", key: "quote" as const }].map((link) => (
                      <li key={link.href}>
                        <Link
                          href={localizedHref(link.href, locale)}
                          aria-current={bare === link.href ? "page" : undefined}
                          onClick={() => setMenuOpen(false)}
                          className="flex min-h-[48px] items-center hover:text-sage"
                        >
                          {t(copy.nav[link.key], locale)}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          setMenuOpen(false);
                          onCartClick();
                        }}
                        className="flex min-h-[48px] w-full items-center gap-2 text-left hover:text-sage"
                      >
                        <ShoppingBag aria-hidden="true" strokeWidth={1.5} className="size-5" />
                        {t(copy.nav.cart, locale)}
                        {count > 0 ? <span className="text-ink/75">({count})</span> : null}
                      </button>
                    </li>
                  </ul>
                </nav>
                <div className="mt-2 flex items-center gap-2 border-t border-ink/10 px-5 py-2 font-body text-[14px]">
                  <span className="text-ink/75">
                    {t(copy.nav.languageLabel, locale)}
                    {locale === "fr" ? " :" : ":"}
                  </span>
                  {LANGUAGES.map((item) =>
                    languageLink(
                      item,
                      cn(
                        "inline-flex min-h-[44px] min-w-[44px] items-center justify-center px-2",
                        item.locale === locale
                          ? "font-semibold underline underline-offset-4"
                          : "hover:text-sage",
                      ),
                    ),
                  )}
                </div>
              </div>
            </>,
            document.body,
          )
        : null}
    </header>
  );
}
