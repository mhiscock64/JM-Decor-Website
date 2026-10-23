"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CartDrawer } from "@/components/cart-drawer";
import { CartProvider } from "@/lib/cart";
import { LanguageProvider } from "@/lib/language";
import { ConsentBanner } from "@/components/consent-banner";
import type { Locale } from "@/lib/types";

function Shell({ children, consentSet }: { children: React.ReactNode; consentSet: boolean }) {
  const [cartOpen, setCartOpen] = useState(false);
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return children;
  return (
    <div className="flex min-h-screen flex-col bg-ivory text-ink antialiased">
      <SiteHeader onCartClick={() => setCartOpen(true)} />
      <main className="flex-1">{children}</main>
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
