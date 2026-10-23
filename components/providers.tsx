"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CartDrawer } from "@/components/cart-drawer";
import { CartProvider } from "@/lib/cart";
import { LanguageProvider } from "@/lib/language";
import { ConsentBanner } from "@/components/consent-banner";
import { copy, t } from "@/lib/i18n";
import { useLanguage } from "@/lib/language";
import type { Locale } from "@/lib/types";

function Shell({ children, consentSet }: { children: React.ReactNode; consentSet: boolean }) {
  const [cartOpen, setCartOpen] = useState(false);
  const pathname = usePathname();
  const { locale } = useLanguage();
  if (pathname.startsWith("/admin")) return children;
  return (
    <div className="flex min-h-screen flex-col bg-ivory text-ink antialiased">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-ink focus:px-5 focus:py-3 focus:font-body focus:text-[14px] focus:font-medium focus:text-ivory"
      >
        {t(copy.nav.skip, locale)}
      </a>
      <SiteHeader onCartClick={() => setCartOpen(true)} />
      <main id="contenu" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <SiteFooter />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <ConsentBanner initialHidden={consentSet} />
    </div>
  );
}

export function Providers({
  children,
  initialLocale = "fr",
  consentSet = false,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
  consentSet?: boolean;
}) {
  return (
    <LanguageProvider initialLocale={initialLocale}>
      <CartProvider>
        <Shell consentSet={consentSet}>{children}</Shell>
      </CartProvider>
    </LanguageProvider>
  );
}
