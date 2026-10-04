"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { useCart } from "@/lib/cart";
import { copy, t } from "@/lib/i18n";
import { useLanguage } from "@/lib/language";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/plan", key: "plan" as const },
  { href: "/gallery", key: "gallery" as const },
  { href: "/shop", key: "shop" as const },
  { href: "/quote", key: "quote" as const },
];

function localizedHref(href: string, locale: "en" | "fr") {
  if (locale !== "fr") return href;
  return href === "/" ? "/fr" : `/fr${href}`;
}

export function SiteHeader({ onCartClick }: { onCartClick: () => void }) {
  const { locale, setLocale } = useLanguage();
  const { count } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const bare = pathname.replace(/^\/fr/, "") || "/";

  function switchLanguage() {
    const next = locale === "en" ? "fr" : "en";
    setLocale(next);
    router.push(localizedHref(bare === "" ? "/" : bare, next));
  }

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header className="border-b border-ink/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3 sm:py-4">
        <Link href={localizedHref("/", locale)} aria-label={copy.brand} className="shrink-0">
          <BrandLogo priority />
        </Link>
        <nav className="hidden items-center gap-9 font-body text-[13px] font-medium tracking-wide text-ink/70 sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={localizedHref(link.href, locale)}
              className={
                bare === link.href
                  ? "text-ink"
                  : "transition-colors hover:text-sage"
              }
            >
              {t(copy.nav[link.key], locale)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-ink hover:bg-cream hover:text-ink sm:hidden"
            aria-label={t(copy.nav.menu, locale)}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="size-4" />
          </Button>
          <button
            type="button"
            onClick={switchLanguage}
            className="font-body text-[13px] font-medium tracking-wide text-ink/70"
            aria-label={t(copy.nav.language, locale)}
          >
            {locale === "en" ? (
              <>
                <span className="text-ink">EN</span>
                {" / "}
                <span>FR</span>
              </>
            ) : (
              <>
                <span>EN</span>
                {" / "}
                <span className="text-ink">FR</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onCartClick}
            className="relative font-body text-[13px] font-medium tracking-wide text-ink"
            aria-label={t(copy.nav.openCart, locale)}
          >
            {t(copy.nav.cart, locale)}
            {count > 0 ? (
              <span className="absolute -right-3 -top-2 grid size-4 place-items-center rounded-full bg-sage text-[10px] font-semibold text-ivory">
                {count}
              </span>
            ) : null}
          </button>
        </div>
      </div>
      {menuOpen ? (
        <>
          <div
            className="fixed inset-0 z-40 bg-ink/30 sm:hidden"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 left-0 z-50 w-72 max-w-[80vw] bg-ivory shadow-2xl sm:hidden">
            <div className="border-b border-ink/10 px-6 py-4">
              <BrandLogo className="h-16" />
            </div>
            <nav className="flex flex-col gap-1 px-4 py-4 font-body text-[15px] font-medium tracking-wide text-ink/80">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={localizedHref(link.href, locale)}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md px-2 py-2.5 hover:bg-cream hover:text-ink"
                >
                  {t(copy.nav[link.key], locale)}
                </Link>
              ))}
            </nav>
          </div>
        </>
      ) : null}
    </header>
  );
}
