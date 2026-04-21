"use client";

import { motion } from "framer-motion";
import { ScoreRing } from "@/components/patterns/score-ring";
import { CaseNumber } from "@/components/brand/case-number";

// A living mini-dossier used on the landing hero. Not a screenshot — a real
// composition that tells the product story at a glance: a case number, a
// readiness arc, a verdict line, a short list of what the system found.
export function DossierPreview() {
  return (
    <div className="relative">
      {/* Offset back card — "previous revision" */}
      <div
        aria-hidden
        className="absolute -right-4 -top-5 h-[330px] w-[320px] bg-paper-soft border border-rule -rotate-1 hidden md:block"
      />
      <div
        aria-hidden
        className="absolute -right-2 -top-2 h-[360px] w-[360px] bg-canvas border border-rule rotate-1 hidden md:block"
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative bg-canvas border border-rule shadow-dossier w-full md:w-[420px]"
      >
        {/* Meta rail */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-rule bg-paper-soft">
          <CaseNumber value="00427" />
          <span className="dateline">CONFIDENTIAL</span>
        </div>

        {/* Headline block */}
        <div className="px-5 pt-6 pb-5">
          <div className="label mb-3">Assessment — Germany</div>
          <h3 className="font-display text-[24px] text-ink leading-[1.15] tracking-tight">
            Berlin is feasible within six&nbsp;months.
          </h3>
          <p className="mt-2 text-[12.5px] text-muted-strong leading-relaxed">
            EU Blue Card path clears; document readiness is the main gate.
          </p>
        </div>

        {/* Ring + stats */}
        <div className="px-5 pb-5 grid grid-cols-[140px_1fr] gap-5">
          <ScoreRing value={0.74} size={140} label="Readiness" />
          <div className="flex flex-col justify-center gap-3">
            <MiniStat label="Monthly surplus" value="+ $1,640" tone="pos" />
            <MiniStat label="Runway" value="14 mo" />
            <MiniStat label="Docs ready" value="61 %" tone="warn" />
            <MiniStat label="Move window" value="Oct – Dec" />
          </div>
        </div>

        {/* Footer dateline */}
        <div className="px-5 py-3 border-t border-rule flex items-center justify-between">
          <span className="dateline">Assembled · 3 min 28 s</span>
          <span className="font-mono text-[11px] text-accent-ink tracking-[0.08em]">
            PROCEED · CAVEATS
          </span>
        </div>
      </motion.div>
    </div>
  );
}

function MiniStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "pos" | "warn";
}) {
  return (
    <div className="flex items-baseline justify-between border-b border-rule pb-2 last:border-b-0 last:pb-0">
      <span className="text-[11.5px] text-muted tracking-tight">{label}</span>
      <span
        className={`font-mono text-[13px] tnum ${
          tone === "pos"
            ? "text-success"
            : tone === "warn"
            ? "text-warning"
            : "text-ink"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
