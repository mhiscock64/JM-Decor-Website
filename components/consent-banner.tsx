"use client";

import { useState } from "react";
import Link from "next/link";
import { localizedHref } from "@/lib/locale-path";

import { useLanguage } from "@/lib/language";

export function ConsentBanner({ initialHidden }: { initialHidden: boolean }) {
  const { locale } = useLanguage();
  const [hidden, setHidden] = useState(initialHidden);
  if (hidden) return null;

  const fr = locale === "fr";

  function choose(value: "essential" | "all") {
    document.cookie = `jm-consent=${value}; Path=/; Max-Age=31536000; SameSite=Lax`;
    setHidden(true);
  }

  return (
    <aside
      role="region"
      aria-label={fr ? "Consentement aux témoins" : "Cookie consent"}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-ivory px-6 py-4 shadow-[0_-8px_30px_rgba(6,45,57,0.08)]"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-3xl font-body text-[13px] leading-relaxed text-ink/80">
          {fr
            ? "Nous demandons votre consentement avant tout suivi non essentiel. Ce site n’utilise qu’un témoin essentiel pour retenir la langue, et aucun témoin publicitaire ou analytique."
            : "We ask for your consent before any non-essential tracking. This site uses only an essential cookie to remember your language, and no advertising or analytics cookies."}{" "}
          <Link
            href={localizedHref("/privacy", fr ? "fr" : "en")}
            className="py-3.5 underline underline-offset-2 hover:text-ink"
          >
            {fr ? "Confidentialité" : "Privacy"}
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose("essential")}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full px-4 font-body text-[13px] font-medium text-ink ring-1 ring-ink/30 hover:ring-ink"
          >
            {fr ? "Refuser" : "Refuse"}
          </button>
          <button
            type="button"
            onClick={() => choose("all")}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-ink px-5 font-body text-[13px] font-medium text-ivory"
          >
            {fr ? "Accepter" : "Accept"}
          </button>
        </div>
      </div>
    </aside>
  );
}
