"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { StageTracker } from "@/components/patterns/stage-tracker";
import { SectionLabel } from "@/components/patterns/section-label";
import { STAGE_ORDER, STAGE_LABELS } from "@/lib/design-tokens";

// Walk the stages one-by-one to create a reassuring, deterministic progress
// experience. In real usage this syncs to GET /cases/:id/progress polling.
function useSimulatedProgress(totalMs = 6000) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const perStage = totalMs / STAGE_ORDER.length;
    const timers: NodeJS.Timeout[] = [];
    STAGE_ORDER.forEach((_, i) => {
      timers.push(setTimeout(() => setIndex(i + 1), perStage * (i + 1)));
    });
    return () => timers.forEach(clearTimeout);
  }, [totalMs]);
  return index;
}

function AnalyzingContent() {
  const router = useRouter();
  const params = useSearchParams();
  const caseId = params.get("caseId") ?? "RL-00427";
  const index = useSimulatedProgress();

  const stages = STAGE_ORDER.map((key, i) => ({
    stage: key,
    status:
      i < index
        ? ("ok" as const)
        : i === index
        ? ("running" as const)
        : ("pending" as const),
  }));

  useEffect(() => {
    if (index >= STAGE_ORDER.length) {
      const t = setTimeout(() => router.push(`/cases/${caseId}`), 600);
      return () => clearTimeout(t);
    }
  }, [index, caseId, router]);

  const currentLabel =
    STAGE_LABELS[STAGE_ORDER[Math.min(index, STAGE_ORDER.length - 1)]];

  const pct = Math.min(100, Math.round((index / STAGE_ORDER.length) * 100));

  return (
    <div className="max-w-5xl">
      <SectionLabel number="05" className="mb-6">
        Analysis
      </SectionLabel>

      <div className="grid lg:grid-cols-[1fr_380px] gap-14 items-start">
        <div>
          <h1 className="font-display text-display-xl text-ink tracking-tight leading-[1.05]">
            Compiling your
            <br />
            <span className="italic text-accent-ink">dossier.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] text-muted-strong leading-relaxed">
            Ten engines run against your profile. This is the work: jobs,
            destination fit, affordability, documents, timeline, and the
            recommendation that ties it together.
          </p>

          <div className="mt-12 relative border border-rule bg-canvas p-8 md:p-10">
            <div className="flex items-baseline justify-between mb-6">
              <span className="label">In progress</span>
              <span className="font-mono text-[13px] text-ink tnum">
                {String(pct).padStart(2, "0")}&nbsp;%
              </span>
            </div>
            <h2 className="font-display text-[26px] md:text-[30px] text-ink tracking-tight leading-tight min-h-[72px]">
              {currentLabel}
            </h2>

            {/* Progress rule */}
            <div className="mt-7 relative h-[2px] w-full bg-rule overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-accent"
                style={{
                  width: `${pct}%`,
                  transition: "width 500ms cubic-bezier(0.2,0.8,0.2,1)",
                }}
              />
            </div>

            <p className="mt-8 text-[13px] text-muted-strong leading-relaxed max-w-md">
              Stages run in parallel where possible. Soft failures do not stop
              the run — you'll see any caveats alongside your results.
            </p>
          </div>

          <div className="mt-8">
            <StageTracker stages={stages} />
          </div>
        </div>

        <aside className="lg:sticky lg:top-32 space-y-5">
          <div className="bg-paper-soft border border-rule p-6">
            <div className="label mb-4">Case number</div>
            <div className="font-mono text-[18px] text-ink tnum tracking-[0.06em]">
              {caseId}
            </div>
            <div className="mt-2 dateline">
              You can safely leave — we'll save your progress.
            </div>
          </div>

          <div className="bg-paper-soft border border-rule p-6">
            <div className="label mb-4">Why it takes this long</div>
            <p className="text-[13px] text-muted-strong leading-relaxed">
              We fetch destination rules, price your move against local cost of
              living, and cross-check document requirements — all with
              explanations you can audit.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function AnalyzingPage() {
  return (
    <Suspense fallback={null}>
      <AnalyzingContent />
    </Suspense>
  );
}
