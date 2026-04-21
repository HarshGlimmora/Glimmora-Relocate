import { cn } from "@/lib/utils";

export function CaseNumber({
  value,
  size = "md",
  className,
}: {
  value: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizeClass =
    size === "sm"
      ? "text-[11px]"
      : size === "lg"
      ? "text-[13px]"
      : "text-[12px]";
  return (
    <span
      className={cn(
        "font-mono uppercase tracking-[0.12em] text-ink-soft tnum",
        sizeClass,
        className
      )}
    >
      <span className="text-muted">Case №&nbsp;</span>
      {value}
    </span>
  );
}
