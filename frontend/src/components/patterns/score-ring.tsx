"use client";

import { cn } from "@/lib/utils";

// A quiet, precise arc — not a chunky progress donut. Uses the accent color
// sparingly, draws on a subtle paper track.
export function ScoreRing({
  value, // 0..1
  size = 160,
  label,
  unit = "",
  tone = "accent",
  className,
}: {
  value: number;
  size?: number;
  label?: string;
  unit?: string;
  tone?: "accent" | "success" | "warning" | "danger";
  className?: string;
}) {
  const stroke = 3.5;
  const r = size / 2 - stroke;
  const circumference = 2 * Math.PI * r;
  const dash = circumference * value;
  const remaining = circumference - dash;

  const toneClass = {
    accent: "stroke-accent",
    success: "stroke-success",
    warning: "stroke-warning",
    danger: "stroke-danger",
  }[tone];

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          className="stroke-rule"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          className={toneClass}
          strokeWidth={stroke}
          strokeLinecap="butt"
          strokeDasharray={`${dash} ${remaining}`}
          style={{ transition: "stroke-dasharray 800ms cubic-bezier(0.2,0.8,0.2,1)" }}
        />
        {/* Tick marks — 12 hairline notches on the inner track */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i / 24) * 2 * Math.PI;
          const cx = size / 2 + Math.cos(angle) * (r - stroke * 2 - 2);
          const cy = size / 2 + Math.sin(angle) * (r - stroke * 2 - 2);
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={0.5}
              className="fill-rule-strong"
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="metric text-[44px] text-ink leading-none">
          {Math.round(value * 100)}
          <span className="text-muted text-[20px] ml-0.5">{unit || ""}</span>
        </span>
        {label ? (
          <span className="mt-2 label">{label}</span>
        ) : null}
      </div>
    </div>
  );
}
