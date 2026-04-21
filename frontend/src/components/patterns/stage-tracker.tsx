"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { STAGE_LABELS, STAGE_ORDER } from "@/lib/design-tokens";

export type StageStatus = "pending" | "running" | "ok" | "skipped" | "failed";

export function StageTracker({
  stages,
}: {
  stages: { stage: string; status: StageStatus }[];
}) {
  // Normalize so every listed stage has a row even if the backend skipped it.
  const byStage = new Map(stages.map((s) => [s.stage, s.status]));
  const rows = STAGE_ORDER.map((key) => ({
    key,
    label: STAGE_LABELS[key],
    status: (byStage.get(key) ?? "pending") as StageStatus,
  }));

  return (
    <div className="bg-canvas border border-rule">
      <div className="flex items-center justify-between px-6 py-3 border-b border-rule bg-paper-soft">
        <span className="label">Processing stages</span>
        <span className="dateline">
          {rows.filter((r) => r.status === "ok").length}&nbsp;/&nbsp;{rows.length}
        </span>
      </div>
      <ol className="divide-y divide-rule">
        {rows.map((row, i) => (
          <li
            key={row.key}
            className={cn(
              "flex items-center gap-4 px-6 py-4",
              row.status === "running" && "bg-accent-soft/40"
            )}
          >
            <span
              className={cn(
                "font-mono text-[10.5px] tracking-[0.14em] tnum",
                row.status === "running" ? "text-accent" : "text-muted"
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <StageIndicator status={row.status} />

            <span
              className={cn(
                "flex-1 text-[14px]",
                row.status === "ok" && "text-ink",
                row.status === "running" && "text-ink",
                row.status === "pending" && "text-muted",
                row.status === "skipped" && "text-muted line-through decoration-rule",
                row.status === "failed" && "text-danger"
              )}
            >
              {row.label}
            </span>

            <span
              className={cn(
                "font-mono text-[10.5px] tracking-[0.12em] uppercase",
                row.status === "ok" && "text-success",
                row.status === "running" && "text-accent",
                row.status === "pending" && "text-muted/70",
                row.status === "failed" && "text-danger"
              )}
            >
              {row.status === "running" ? "processing" : row.status}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function StageIndicator({ status }: { status: StageStatus }) {
  if (status === "ok") {
    return (
      <span className="size-5 flex items-center justify-center bg-success/10 border border-success/40">
        <Check className="size-3 text-success" strokeWidth={2.5} />
      </span>
    );
  }
  if (status === "running") {
    return (
      <span className="relative size-5 flex items-center justify-center border border-accent">
        <span className="absolute size-1.5 bg-accent animate-ping opacity-60" />
        <span className="size-1.5 bg-accent" />
      </span>
    );
  }
  if (status === "failed") {
    return (
      <span className="size-5 flex items-center justify-center bg-danger-soft border border-danger/40">
        <span className="size-1.5 bg-danger" />
      </span>
    );
  }
  return <span className="size-5 border border-rule" />;
}
