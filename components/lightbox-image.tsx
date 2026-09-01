"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View larger image: ${alt}`}
        className="block w-full cursor-zoom-in overflow-hidden rounded-2xl"
      >
        <Image
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
      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-6 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-ivory/90 font-body text-[18px] leading-none text-ink transition-colors hover:bg-ivory"
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
        </div>
      ) : null}
    </>
  );
}
