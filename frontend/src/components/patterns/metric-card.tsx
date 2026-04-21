import { cn } from "@/lib/utils";
import type { Tone } from "@/lib/types/case";

export function MetricCard({
  label,
  value,
  unit,
  caption,
  tone = "neutral",
  align = "left",
  className,
}: {
  label: string;
  value: string | number;
  unit?: string;
  caption?: string;
  tone?: Tone | "neutral";
  align?: "left" | "right";
  className?: string;
}) {
  const rail = {
    positive: "before:bg-success",
    neutral: "before:bg-rule-strong",
    warning: "before:bg-warning",
    negative: "before:bg-danger",
  }[tone];

  return (
    <div
      className={cn(
        "relative bg-canvas border border-rule p-6",
        "before:absolute before:left-0 before:top-5 before:bottom-5 before:w-[2px]",
        rail,
        align === "right" && "text-right",
        className
      )}
    >
      <div className="label mb-3">{label}</div>
      <div className="metric text-[40px] leading-none text-ink">
        {value}
        {unit ? (
          <span className="ml-1 text-[18px] text-muted">{unit}</span>
        ) : null}
      </div>
      {caption ? (
        <div className="mt-3 text-[12.5px] text-muted-strong leading-relaxed">
          {caption}
        </div>
      ) : null}
    </div>
  );
}
