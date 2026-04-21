"use client";

import { use } from "react";
import { useCultural } from "@/lib/api/hooks/use-case";
import { DetailHeader } from "@/components/patterns/detail-header";
import { SectionLabel } from "@/components/patterns/section-label";
import { DossierSkeleton } from "@/components/patterns/skeletons/dossier-skeleton";

export default function CulturalDetailPage({
  params,
}: {
  params: Promise<{ caseId: string }>;
}) {
  const { caseId } = use(params);
  const { data, isLoading } = useCultural(caseId);
  if (isLoading || !data) return <DossierSkeleton />;

  return (
    <div className="space-y-12">
      <DetailHeader
        caseId={caseId}
        eyebrow="Cultural preparation"
        title={`A short field manual for arriving in ${data.country}.`}
        lead={data.summary}
        meta={`Confidence ${Math.round((data.confidence ?? 0) * 100)}%`}
      />

      {/* Communication style — editorial pull quote */}
      <section className="bg-paper-soft border border-rule p-8 md:p-10">
        <SectionLabel number="01" className="mb-5">
          Communication style
        </SectionLabel>
        <p className="font-display text-[22px] md:text-[24px] text-ink leading-[1.45] max-w-2xl">
          {data.communicationStyle}
        </p>
      </section>

      <section className="grid lg:grid-cols-2 gap-5">
        <div className="bg-canvas border border-rule p-7">
          <SectionLabel number="02" className="mb-5">
            Language starters
          </SectionLabel>
          <ul className="divide-y divide-rule">
            {data.languageBasics.map((l) => (
              <li key={l.phrase} className="grid grid-cols-[1fr_1fr_1fr] gap-4 py-3">
                <span className="font-display text-[17px] text-ink">{l.phrase}</span>
                <span className="text-[13.5px] text-ink-soft">{l.translation}</span>
                <span className="text-[12.5px] text-muted">{l.context}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-canvas border border-rule p-7">
          <SectionLabel number="03" className="mb-5">
            Workplace etiquette
          </SectionLabel>
          <div className="space-y-6">
            {data.workplaceEtiquette.map((e) => (
              <div key={e.topic}>
                <div className="label mb-3">{e.topic}</div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <ul className="space-y-1.5">
                    {e.do.map((d) => (
                      <li key={d} className="text-[13px] text-ink-soft flex gap-2">
                        <span className="text-success">+</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-1.5">
                    {e.dont.map((d) => (
                      <li key={d} className="text-[13px] text-ink-soft flex gap-2">
                        <span className="text-danger">−</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionLabel number="04" className="mb-5">
          The first week
        </SectionLabel>
        <div className="bg-canvas border border-rule divide-y divide-rule">
          {data.firstWeek.map((f) => (
            <div
              key={f.day}
              className="grid grid-cols-[56px_1fr_2fr] items-start gap-5 px-6 py-4"
            >
              <div>
                <div className="label">Day</div>
                <div className="mt-1 font-display text-[24px] text-ink leading-none tnum">
                  {f.day}
                </div>
              </div>
              <div className="text-[14px] text-ink leading-snug pt-1">
                {f.task}
              </div>
              <div className="text-[12.5px] text-muted-strong leading-relaxed pt-1.5">
                {f.whyItMatters}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-paper-soft border border-rule p-7">
        <SectionLabel number="05" className="mb-4">
          Do's and don'ts
        </SectionLabel>
        <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-2">
          {data.dosAndDonts.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-[13.5px] text-ink-soft leading-relaxed"
            >
              <span className="mt-[9px] size-[3px] bg-ink shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
