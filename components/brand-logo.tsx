import Image from "next/image";
import { cn } from "@/lib/utils";

export function BrandLogo({
  className,
  priority,
  locale = "en",
}: {
  className?: string;
  priority?: boolean;
  locale?: "en" | "fr";
}) {
  const fr = locale === "fr";
  return (
    <Image
      src={fr ? "/images/logo-fr.png" : "/images/logo-en.png"}
      alt={fr ? "Décorations de Mariage Montréal" : "Montreal Wedding Decorations"}
      width={fr ? 1037 : 971}
      height={fr ? 512 : 530}
      sizes="(min-width: 640px) 280px, 220px"
      priority={priority}
      className={cn("h-16 w-auto object-contain sm:h-20", className)}
    />
  );
}
