"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

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
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          onClick={() => setOpen(false)}
          className="fixed inset-0 top-0 left-0 flex h-dvh w-screen max-w-none translate-x-0 translate-y-0 items-center justify-center rounded-none border-0 bg-ink/80 p-6 shadow-none ring-0 backdrop-blur-sm sm:max-w-none"
        >
          <DialogTitle className="sr-only">{alt}</DialogTitle>
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
        </DialogContent>
      </Dialog>
    </>
  );
}
