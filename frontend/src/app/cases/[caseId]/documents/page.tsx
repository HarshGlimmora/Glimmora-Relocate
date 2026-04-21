"use client";

import { use } from "react";
import { useDocuments } from "@/lib/api/hooks/use-case";
import { DetailHeader } from "@/components/patterns/detail-header";
import { SectionLabel } from "@/components/patterns/section-label";
import { ScoreRing } from "@/components/patterns/score-ring";
import { Checklist } from "@/components/patterns/checklist";
import { DossierSkeleton } from "@/components/patterns/skeletons/dossier-skeleton";

export default function DocumentsDetailPage({
  params,
}: {
  params: Promise<{ caseId: string }>;
}) {
  const { caseId } = use(params);
  const { data, isLoading } = useDocuments(caseId);
  if (isLoading || !data) return <DossierSkeleton />;

  const tone =
    data.readinessPct >= 80
      ? "success"
      : data.readinessPct >= 50
      ? "warning"
      : "danger";

  return (
    <div className="space-y-12">
      <DetailHeader
        caseId={caseId}
        eyebrow="Documents"
        title="Two apostille items are the primary blockers."
        lead={data.summary}
        meta={`${data.items.length} documents tracked`}
      />

      <section className="grid lg:grid-cols-[320px_1fr] gap-8 items-start">
        <div className="bg-canvas border border-rule p-8 flex flex-col items-center">
          <div className="label mb-4">Overall readiness</div>
          <ScoreRing
            value={data.readinessPct / 100}
            size={180}
            unit="%"
            tone={tone as "success" | "warning" | "danger"}
          />
          <div className="mt-5 text-[12.5px] text-muted-strong text-center">
            {data.blockingMissing.length} blocking items
            &nbsp;·&nbsp;{data.expiringSoon.length} expiring soon
          </div>
        </div>

        <div>
          <SectionLabel number="01" className="mb-6">
            Checklist
          </SectionLabel>
          <Checklist items={data.items} />
        </div>
      </section>
    </div>
  );
}
