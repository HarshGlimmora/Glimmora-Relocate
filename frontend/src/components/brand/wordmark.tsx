import Link from "next/link";
import { cn } from "@/lib/utils";

// The wordmark is the product's signature — an editorial two-word mark with
// a small-caps suffix. Resists scaling like a logo; feels like a masthead.
export function Wordmark({
  className,
  href = "/",
  muted,
}: {
  className?: string;
  href?: string;
  muted?: boolean;
}) {
  const content = (
    <span
      className={cn(
        "inline-flex items-baseline gap-2 leading-none select-none",
        className
      )}
    >
      <span
        className={cn(
          "font-display text-[20px] tracking-[-0.02em]",
          muted ? "text-ink-soft" : "text-ink"
        )}
      >
        Glimmora
      </span>
      <span className="h-3 w-px bg-rule-strong mx-0.5" aria-hidden />
      <span
        className={cn(
          "font-sans text-[10px] tracking-[0.22em] uppercase pt-0.5",
          muted ? "text-muted" : "text-muted-strong"
        )}
      >
        Relocate
      </span>
    </span>
  );
  return href ? <Link href={href}>{content}</Link> : content;
}
