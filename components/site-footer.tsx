"use client";

import Link from "next/link";
import { copy, t } from "@/lib/i18n";
import { useLanguage } from "@/lib/language";
import { BrandLogo } from "@/components/brand-logo";

const links = [
  { href: "/shop", label: copy.nav.shop },
  { href: "/gallery", label: copy.nav.gallery },
  { href: "/quote", label: copy.nav.quote },
  { href: "/wedding-decor-montreal", label: copy.footer.areasPage },
];

function localizedHref(href: string, locale: "en" | "fr") {
  if (locale !== "fr") return href;
  return href === "/" ? "/fr" : `/fr${href}`;
}

export function SiteFooter() {
  const { locale } = useLanguage();
  return (
    <footer className="border-t border-ink/10">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <BrandLogo className="h-16" />
          <p className="mt-4 max-w-sm font-body text-[13px] leading-relaxed text-ink/60">
            {t(copy.footer.blurb, locale)}
          </p>
        </div>
        <nav className="flex flex-col gap-2 font-body text-[13px] font-medium tracking-wide text-ink/70">
          <p className="text-[11px] uppercase tracking-[0.22em] text-sage">{t(copy.footer.visit, locale)}</p>
          {links.map((link) => (
            <Link key={link.href} href={localizedHref(link.href, locale)} className="hover:text-ink">
              {t(link.label, locale)}
            </Link>
          ))}
          <a href={`mailto:${copy.email}`} className="hover:text-ink">
            {copy.email}
          </a>
        </nav>
        <div>
          <p className="font-body text-[11px] uppercase tracking-[0.22em] text-sage">
            {t(copy.footer.areasTitle, locale)}
          </p>
          <p className="mt-3 font-body text-[13px] leading-relaxed text-ink/60">
            {t(copy.footer.areas, locale)}
          </p>
        </div>
      </div>
    </footer>
  );
}
