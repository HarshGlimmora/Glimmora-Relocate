"use client";

import { cn } from "@/lib/utils";

export function ScoreBar({
  value,
  label,
  tone = "accent",
  showValue = true,
  className,
}: {
  value: number;
  label?: string;
  tone?: "accent" | "success" | "warning" | "danger" | "ink";
  showValue?: boolean;
  className?: string;
}) {
  const toneClass = {
    accent: "bg-accent",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
    ink: "bg-ink",
  }[tone];

  return (
    <div className={cn("w-full", className)}>
      {label ? (
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-[13px] text-ink-soft">{label}</span>
          {showValue ? (
            <span className="font-mono text-[12px] text-ink tnum">
              {Math.round(value * 100)}
            </span>
          ) : null}
        </div>
      ) : null}
      <div className="relative h-[6px] w-full bg-paper-soft border border-rule">
        <div
          className={cn("absolute inset-y-0 left-0", toneClass)}
          style={{
            width: `${Math.max(2, value * 100)}%`,
            transition: "width 700ms cubic-bezier(0.2,0.8,0.2,1)",
          }}
        />
      </div>
    </div>
  );
}
