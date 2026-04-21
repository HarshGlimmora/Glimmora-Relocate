"use client";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export function IntentCard({
  number,
  icon: Icon,
  title,
  description,
  selected,
  onSelect,
}: {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
  selected?: boolean;
  onSelect?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "group relative w-full text-left bg-canvas border transition-all duration-200",
        "px-6 py-6",
        selected
          ? "border-accent shadow-[inset_0_0_0_1px_hsl(var(--accent))]"
          : "border-rule hover:border-rule-strong hover:bg-paper-soft"
      )}
    >
      {/* Top row: number + icon */}
      <div className="flex items-start justify-between mb-6">
        <span className="font-mono text-[10.5px] tracking-[0.14em] tnum text-muted">
          0{number}
        </span>
        <span
          className={cn(
            "size-9 flex items-center justify-center border transition-colors",
            selected
              ? "border-accent bg-accent-soft text-accent-ink"
              : "border-rule text-muted-strong group-hover:border-ink group-hover:text-ink"
          )}
        >
          <Icon className="size-4" strokeWidth={1.5} />
        </span>
      </div>

      <h3
        className={cn(
          "font-display text-[24px] leading-tight tracking-tight mb-2.5",
          selected ? "text-ink" : "text-ink"
        )}
      >
        {title}
      </h3>
      <p className="text-[14.5px] text-muted-strong leading-relaxed max-w-[28ch]">
        {description}
      </p>

      {/* Selected indicator — bottom-left accent rail */}
      <span
        className={cn(
          "absolute left-0 bottom-0 h-px transition-all duration-300",
          selected ? "w-full bg-accent" : "w-0 bg-accent"
        )}
      />
    </button>
  );
}
