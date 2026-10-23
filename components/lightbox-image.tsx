"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { copy, t } from "@/lib/i18n";
import { useLanguage } from "@/lib/language";

export function LightboxImage({
  src,
  alt,
  width,
  height,
  loading,
  className,
  caption,
  sizes,
  priority,
  frameClassName = "rounded-2xl",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  loading?: "lazy" | "eager";
  className?: string;
  caption?: string;
  sizes?: string;
  priority?: boolean;
  /** Classes for the zoom button that frames the image (rounding must match the image). */
  frameClassName?: string;
}) {
  const { locale } = useLanguage();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    const trigger = triggerRef.current;
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
      trigger?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={copy.lightbox.open[locale](alt)}
        className={`block w-full cursor-zoom-in overflow-hidden ${frameClassName}`}
      >
        <Image
          unoptimized={src.startsWith("/api/")}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? undefined : loading}
          priority={priority}
          sizes={sizes}
          className={className}
        />
      </button>
      {/* Portalled to <body> so no ancestor (multi-column layout, transforms) can trap the fixed overlay. */}
      {open ? createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-6 backdrop-blur-sm"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t(copy.lightbox.close, locale)}
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-ivory/90 font-body text-[18px] leading-none text-ink transition-colors hover:bg-ivory"
          >
            ×
          </button>
          <figure
            onClick={(event) => event.stopPropagation()}
            className="max-h-full w-full max-w-4xl space-y-3"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="max-h-[80vh] w-full rounded-2xl object-contain"
            />
            {caption ? (
              <figcaption className="text-center font-body text-[13px] text-ivory/70">
                {caption}
              </figcaption>
            ) : null}
          </figure>
        </div>,
        document.body,
      ) : null}
    </>
  );
}
