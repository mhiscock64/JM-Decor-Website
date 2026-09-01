"use client";

import { copy, t } from "@/lib/i18n";
import { useLanguage } from "@/lib/language";
import { GALLERY } from "@/lib/products";
import { LightboxImage } from "@/components/lightbox-image";

export function GalleryPage() {
  const { locale } = useLanguage();

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <p className="font-body text-[12px] font-medium uppercase tracking-[0.3em] text-sage">
        {t(copy.gallery.kicker, locale)}
      </p>
      <h1 className="mt-5 font-display text-5xl font-medium text-balance">
        {t(copy.gallery.title, locale)}
      </h1>
      <p className="mt-4 max-w-[52ch] font-body text-[15px] leading-relaxed text-pretty text-ink/65">
        {t(copy.gallery.lede, locale)}
      </p>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {GALLERY.map((item) => (
          <figure key={item.src} className="space-y-3">
            <LightboxImage
              src={item.src}
              alt={item.caption[locale]}
              caption={item.caption[locale]}
              width={1024}
              height={1280}
              loading="lazy"
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
              className="aspect-[4/5] w-full rounded-2xl object-cover ring-1 ring-black/5 transition-transform duration-500 hover:scale-[1.02]"
            />
            <figcaption className="font-body text-[13px] text-ink/50">
              {item.caption[locale]}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
