"use client";

import { use } from "react";
import { useRelocation } from "@/lib/api/hooks/use-case";
import { DetailHeader } from "@/components/patterns/detail-header";
import { SectionLabel } from "@/components/patterns/section-label";
import { ScoreRing } from "@/components/patterns/score-ring";
import { ScoreBar } from "@/components/patterns/score-bar";
import { RiskIndicator } from "@/components/patterns/risk-indicator";
import { DossierSkeleton } from "@/components/patterns/skeletons/dossier-skeleton";

export default function RelocationDetailPage({
  params,
}: {
  params: Promise<{ caseId: string }>;
}) {
  const { caseId } = use(params);
  const { data, isLoading } = useRelocation(caseId);
  if (isLoading || !data) return <DossierSkeleton />;

  const top = data.top;

  return (
    <div className="space-y-12">
      <DetailHeader
        caseId={caseId}
        eyebrow="Relocation fit"
        title={`${top.city ?? top.country} scores best on practical move conditions.`}
        lead={data.summary}
        meta={`Confidence ${Math.round((data.confidence ?? 0) * 100)}%`}
      />

      <section className="grid lg:grid-cols-[360px_1fr] gap-8 items-start">
        <div className="bg-canvas border border-rule p-8 flex flex-col items-center">
          <div className="label mb-4">Destination — {top.city ?? top.country}</div>
          <ScoreRing value={top.overall} size={200} />
          <div className="mt-6 text-center text-[13px] text-muted-strong leading-relaxed max-w-[240px]">
            Overall relocation suitability, weighted across five dimensions.
          </div>
        </div>

        <div className="bg-canvas border border-rule p-8 space-y-5">
          <SectionLabel number="01" className="mb-2">Dimension breakdown</SectionLabel>
          {top.dimensions.map((d) => (
            <div key={d.name}>
              <ScoreBar
                value={d.score}
                label={d.name.charAt(0).toUpperCase() + d.name.slice(1)}
                tone={d.score > 0.75 ? "success" : d.score > 0.55 ? "accent" : "warning"}
              />
              {d.evidence.length > 0 ? (
                <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[12.5px] text-muted">
                  {d.evidence.map((e) => (
                    <span key={e} className="flex items-center gap-2">
                      <span className="size-[3px] bg-rule-strong" />
                      {e}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionLabel number="02" className="mb-5">
          Friction flags
        </SectionLabel>
        <div className="grid sm:grid-cols-2 gap-4">
          {top.frictions.map((f) => (
            <RiskIndicator key={f.code} severity={f.severity}>
              <span className="font-mono text-[11px] tracking-[0.1em] text-muted block mb-1">
                {f.code}
              </span>
              {f.note}
            </RiskIndicator>
          ))}
        </div>
      </section>

      <section>
        <SectionLabel number="03" className="mb-5">
          Cross-destination notes
        </SectionLabel>
        <ul className="bg-canvas border border-rule divide-y divide-rule">
          {data.comparisonNotes.map((n) => (
            <li key={n} className="px-6 py-4 text-[14px] text-ink-soft">
              {n}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
