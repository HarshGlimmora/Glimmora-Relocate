import * as React from "react";
import { cn } from "@/lib/utils";

type Variant =
  | "neutral"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "outline";

export function Badge({
  variant = "neutral",
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 text-[10.5px] font-medium tracking-[0.08em] uppercase",
        variant === "neutral" && "bg-paper-soft text-muted-strong border border-rule",
        variant === "accent" && "bg-accent-soft text-accent-ink border border-accent/20",
        variant === "success" && "bg-success-soft text-success border border-success/25",
        variant === "warning" && "bg-warning-soft text-warning border border-warning/25",
        variant === "danger" && "bg-danger-soft text-danger border border-danger/25",
        variant === "outline" && "bg-transparent text-muted-strong border border-rule",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
