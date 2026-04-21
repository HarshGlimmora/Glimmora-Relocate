import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RiskSeverity } from "@/lib/types/case";

const CONFIG = {
  low: { Icon: Info, cls: "text-muted-strong border-rule-strong bg-paper-soft", label: "Low" },
  medium: { Icon: AlertCircle, cls: "text-warning border-warning/30 bg-warning-soft", label: "Medium" },
  high: { Icon: AlertTriangle, cls: "text-danger border-danger/30 bg-danger-soft", label: "High" },
};

export function RiskIndicator({
  severity,
  children,
  className,
}: {
  severity: RiskSeverity;
  children: React.ReactNode;
  className?: string;
}) {
  const c = CONFIG[severity];
  return (
    <div
      className={cn(
        "flex items-start gap-3 border p-4",
        c.cls,
        className
      )}
    >
      <c.Icon className="size-4 mt-0.5 shrink-0" strokeWidth={1.75} />
      <div className="flex-1">
        <div className="font-mono text-[10.5px] tracking-[0.14em] uppercase mb-1">
          {c.label}&nbsp;risk
        </div>
        <div className="text-[13.5px] text-ink-soft leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
