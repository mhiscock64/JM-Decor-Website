"use client";

import { useState } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CartDrawer } from "@/components/cart-drawer";
import { CartProvider } from "@/lib/cart";
import { LanguageProvider } from "@/lib/language";

function Shell({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <div className="flex min-h-screen flex-col bg-ivory text-ink antialiased">
      <SiteHeader onCartClick={() => setCartOpen(true)} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <CartProvider>
        <Shell>{children}</Shell>
      </CartProvider>
    </LanguageProvider>
  );
}
