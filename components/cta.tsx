import Link from "next/link";
import { cn } from "@/lib/utils";

const solid =
  "inline-flex items-center justify-center gap-2 bg-ink px-5 py-3 font-body text-[13px] font-medium tracking-wide text-ivory transition-colors hover:bg-sage disabled:opacity-60";

const outline =
  "inline-flex items-center justify-center gap-2 px-5 py-3 font-body text-[13px] font-medium tracking-wide text-ink ring-1 ring-ink/20 transition-colors hover:ring-sage hover:text-sage";

export function CtaLink({
  href,
  children,
  variant = "solid",
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(variant === "solid" ? solid : outline, className)}
    >
      {children}
    </Link>
  );
}

export function CtaButton({
  children,
  variant = "solid",
  className,
  type = "button",
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  variant?: "solid" | "outline";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(variant === "solid" ? solid : outline, className)}
    >
      {children}
    </button>
  );
}
