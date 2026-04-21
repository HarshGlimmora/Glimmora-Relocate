"use client";

import { cn } from "@/lib/utils";
import type { Milestone } from "@/lib/types/case";
import { formatDate } from "@/lib/formatters";

const CATEGORY_LABEL: Record<Milestone["category"], string> = {
  APPLICATION: "Application",
  DOCUMENT: "Document",
  VISA: "Visa",
  HOUSING: "Housing",
  JOB: "Employment",
  MOVE: "Move",
  SETTLEMENT: "Settlement",
};

export function TimelineList({ milestones }: { milestones: Milestone[] }) {
  return (
    <ol className="relative">
      {/* Left rail */}
      <span className="absolute left-[11px] top-2 bottom-2 w-px bg-rule" aria-hidden />
      {milestones.map((m, i) => (
        <li key={m.milestoneId} className="relative pl-10 pr-2 py-5">
          {/* Node */}
          <span
            className={cn(
              "absolute left-[4px] top-7 size-4 border flex items-center justify-center bg-paper",
              m.critical ? "border-accent" : "border-rule-strong"
            )}
          >
            {m.critical ? (
              <span className="size-1.5 bg-accent" />
            ) : (
              <span className="size-1.5 bg-rule-strong" />
            )}
          </span>

          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10.5px] tracking-[0.14em] text-muted tnum">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="label">{CATEGORY_LABEL[m.category]}</span>
                {m.critical ? (
                  <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-accent-ink">
                    Critical path
                  </span>
                ) : null}
              </div>
              <div className="mt-1.5 font-display text-[18px] text-ink tracking-tight">
                {m.title}
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="font-mono text-[12px] text-ink tnum">
                {formatDate(m.earliestStart, "short")}
                <span className="text-muted mx-1.5">→</span>
                {formatDate(m.earliestFinish, "short")}
              </div>
              <div className="mt-0.5 dateline">{m.durationDays}&nbsp;days</div>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
