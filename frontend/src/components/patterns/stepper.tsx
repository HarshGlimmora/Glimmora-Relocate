"use client";

import { cn } from "@/lib/utils";

export interface StepperStep {
  key: string;
  label: string;
  number: string;
}

export const ASSESSMENT_STEPS: StepperStep[] = [
  { key: "intent", label: "Intent", number: "01" },
  { key: "intake", label: "Profile", number: "02" },
  { key: "refine", label: "Refinement", number: "03" },
  { key: "review", label: "Review", number: "04" },
  { key: "analyzing", label: "Analysis", number: "05" },
];

export function Stepper({
  steps,
  activeKey,
}: {
  steps: StepperStep[];
  activeKey: string;
}) {
  const activeIndex = steps.findIndex((s) => s.key === activeKey);
  return (
    <div className="w-full border-y border-rule bg-paper">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <ol className="grid grid-cols-5 divide-x divide-rule">
          {steps.map((step, i) => {
            const isDone = i < activeIndex;
            const isActive = i === activeIndex;
            return (
              <li
                key={step.key}
                className={cn(
                  "relative px-5 py-5 flex flex-col gap-1.5 first:border-l-0",
                  isActive && "bg-canvas",
                  !isActive && !isDone && "text-muted"
                )}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "font-mono text-[10.5px] tracking-[0.12em] tnum",
                      isActive ? "text-accent" : isDone ? "text-ink-soft" : "text-muted"
                    )}
                  >
                    {step.number}
                  </span>
                  {isActive ? (
                    <span className="h-px w-6 bg-accent" aria-hidden />
                  ) : (
                    <span className="h-px w-3 bg-rule-strong" aria-hidden />
                  )}
                </div>
                <div
                  className={cn(
                    "text-[13.5px] tracking-tight",
                    isActive ? "text-ink font-medium" : isDone ? "text-ink-soft" : "text-muted"
                  )}
                >
                  {step.label}
                </div>
                {isActive ? (
                  <span className="absolute inset-x-0 -bottom-px h-px bg-accent" />
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
