"use client";

import { use } from "react";
import { useTimeline } from "@/lib/api/hooks/use-case";
import { DetailHeader } from "@/components/patterns/detail-header";
import { SectionLabel } from "@/components/patterns/section-label";
import { TimelineList } from "@/components/patterns/timeline-list";
import { MetricCard } from "@/components/patterns/metric-card";
import { DossierSkeleton } from "@/components/patterns/skeletons/dossier-skeleton";
import { formatDate } from "@/lib/formatters";

export default function TimelineDetailPage({
  params,
}: {
  params: Promise<{ caseId: string }>;
}) {
  const { caseId } = use(params);
  const { data, isLoading } = useTimeline(caseId);
  if (isLoading || !data) return <DossierSkeleton />;

  return (
    <div className="space-y-12">
      <DetailHeader
        caseId={caseId}
        eyebrow="Timeline"
        title="Six months is achievable with an early document start."
        lead={data.summary}
        meta={`Confidence ${Math.round((data.confidence ?? 0) * 100)}%`}
      />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-px bg-rule border border-rule">
        <MetricCard
          label="Earliest move"
          value={formatDate(data.earliestMoveDate, "short")}
          caption="If every milestone stays on its earliest track."
          className="border-0"
          tone="positive"
        />
        <MetricCard
          label="Latest move"
          value={formatDate(data.latestMoveDate, "short")}
          caption="Given your urgency and visa lead times."
          className="border-0"
          tone="neutral"
        />
        <MetricCard
          label="Total duration"
          value={`${data.totalWeeks}`}
          unit="weeks"
          caption="End-to-end, first action to arrival."
          className="border-0"
          tone="neutral"
        />
      </section>

      <section>
        <SectionLabel number="01" className="mb-5">
          Milestones
        </SectionLabel>
        <div className="bg-canvas border border-rule px-5 md:px-8">
          <TimelineList milestones={data.milestones} />
        </div>
      </section>

      <section className="bg-paper-soft border border-rule p-7">
        <SectionLabel number="02" className="mb-4">
          Critical path
        </SectionLabel>
        <p className="text-[14px] text-ink-soft leading-relaxed max-w-2xl">
          The following milestones cannot slip without shifting the move date.
          Any delay in one propagates to all downstream stages.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {data.criticalPath.map((id) => {
            const m = data.milestones.find((x) => x.milestoneId === id);
            if (!m) return null;
            return (
              <span
                key={id}
                className="inline-flex items-center px-3 py-1.5 text-[12.5px] text-accent-ink bg-canvas border border-accent/30"
              >
                {m.title}
              </span>
            );
          })}
        </div>
      </section>
    </div>
  );
}
