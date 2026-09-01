"use client";

import { copy, t } from "@/lib/i18n";
import { useLanguage } from "@/lib/language";

export function SiteFooter() {
  const { locale } = useLanguage();
  return (
    <footer className="border-t border-ink/10">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 py-10 font-body text-[13px] text-ink/55 sm:flex-row sm:items-center">
        <span className="font-medium uppercase tracking-[0.2em] text-ink">
          {copy.brand}
        </span>
        <span>
          {t(copy.city, locale)} · {copy.email}
        </span>
      </div>
    </footer>
  );
}
