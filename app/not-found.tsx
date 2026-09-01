"use client";

import Link from "next/link";
import { copy, t } from "@/lib/i18n";
import { useLanguage } from "@/lib/language";

export default function NotFound() {
  const { locale } = useLanguage();
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-display text-7xl font-medium text-ink">404</p>
      <h1 className="mt-4 font-display text-3xl font-medium">
        {t(copy.notFound.title, locale)}
      </h1>
      <p className="mt-3 font-body text-[15px] text-ink/65">
        {t(copy.notFound.lede, locale)}
      </p>
      <Link
        href="/"
        className="mt-8 bg-ink px-5 py-3 font-body text-[13px] font-medium tracking-wide text-ivory hover:bg-sage"
      >
        {t(copy.notFound.home, locale)}
      </Link>
    </section>
  );
}
