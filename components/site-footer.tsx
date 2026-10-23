"use client";

import Link from "next/link";
import { copy, t } from "@/lib/i18n";
import { useLanguage } from "@/lib/language";
import { localizedHref } from "@/lib/locale-path";

import { BrandLogo } from "@/components/brand-logo";

const links = [
  { href: "/plan", label: copy.nav.plan },
  { href: "/shop", label: copy.nav.shop },
  { href: "/gallery", label: copy.nav.gallery },
  { href: "/quote", label: copy.nav.quote },
  { href: "/wedding-decor-montreal", label: copy.footer.areasPage },
];

const linkClass = "inline-flex min-h-[44px] min-w-[44px] items-center hover:text-ink hover:underline";

export function SiteFooter() {
  const { locale } = useLanguage();
  return (
    <footer className="border-t border-ink/10 bg-ivory px-4 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 pt-12 pb-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <BrandLogo locale={locale} className="h-14 sm:h-16" />
          <p className="mt-4 max-w-sm font-body text-[14px] leading-relaxed text-ink/75">
            {t(copy.footer.blurb, locale)}
          </p>
        </div>
        <nav aria-label={t(copy.footer.footerNav, locale)} className="lg:col-span-3">
          <h2 className="font-body text-[12px] font-medium uppercase tracking-[0.22em] text-sage">
            {t(copy.footer.visit, locale)}
          </h2>
          <ul className="mt-2 font-body text-[14px] text-ink/80">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={localizedHref(link.href, locale)} className={linkClass}>
                  {t(link.label, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="lg:col-span-4">
          <h2 className="font-body text-[12px] font-medium uppercase tracking-[0.22em] text-sage">
            {t(copy.footer.areasTitle, locale)}
          </h2>
          <p className="mt-4 font-body text-[14px] leading-relaxed text-ink/75">
            {t(copy.footer.areas, locale)}
          </p>
          <a
            href={`mailto:${copy.email}`}
            className="mt-2 inline-flex min-h-[44px] items-center font-body text-[14px] break-all text-ink underline underline-offset-4 hover:text-sage"
          >
            {copy.email}
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 border-t border-ink/10 pt-2 pb-6 font-body text-[13px] text-ink/75">
        <p className="py-3">© {t(copy.brand, locale)}</p>
        <ul className="flex flex-wrap gap-x-4">
          <li>
            <Link href={localizedHref("/privacy", locale)} className={linkClass}>
              {t(copy.footer.privacy, locale)}
            </Link>
          </li>
          <li>
            <Link href="/admin/login" className={linkClass}>
              {t(copy.footer.staff, locale)}
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
