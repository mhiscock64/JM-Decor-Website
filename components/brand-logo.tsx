import Image from "next/image";
import { cn } from "@/lib/utils";

export function BrandLogo({
  className,
  priority,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/images/logo.png"
      alt="JM Decor"
      width={1201}
      height={1274}
      sizes="96px"
      priority={priority}
      className={cn("h-20 w-auto object-contain sm:h-24", className)}
    />
  );
}
