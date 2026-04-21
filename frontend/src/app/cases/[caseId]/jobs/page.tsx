"use client";

import { use } from "react";
import { useJobs } from "@/lib/api/hooks/use-case";
import { DetailHeader } from "@/components/patterns/detail-header";
import { RecommendationCard } from "@/components/patterns/recommendation-card";
import { SectionLabel } from "@/components/patterns/section-label";
import { DossierSkeleton } from "@/components/patterns/skeletons/dossier-skeleton";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/fade-in";
import { formatMoney } from "@/lib/formatters";

export default function JobsDetailPage({
  params,
}: {
  params: Promise<{ caseId: string }>;
}) {
  const { caseId } = use(params);
  const { data, isLoading } = useJobs(caseId);

  if (isLoading || !data) return <DossierSkeleton />;

  return (
    <div className="space-y-12">
      <DetailHeader
        caseId={caseId}
        eyebrow="Job intelligence"
        title="Three matches stand out."
        lead={data.summary}
        meta={`${data.totalConsidered} roles considered · confidence ${Math.round((data.confidence ?? 0) * 100)}%`}
      />

      <section>
        <SectionLabel number="01" className="mb-5">
          Ranked matches
        </SectionLabel>
        <FadeIn>
          <Stagger className="space-y-5">
            {data.matches.map((m) => (
              <StaggerItem key={m.jobId}>
                <RecommendationCard
                  rank={m.rank}
                  title={m.title}
                  subtitle={`${m.company} · ${m.city}, ${m.country}`}
                  score={m.score}
                  salary={`${formatMoney(m.salary.min, m.salary.currency)} – ${formatMoney(m.salary.max, m.salary.currency)}`}
                  badges={[
                    m.visaSponsorship
                      ? { label: "Visa sponsorship", variant: "accent" as const }
                      : { label: "No sponsorship", variant: "neutral" as const },
                    m.remoteOk
                      ? { label: "Hybrid", variant: "success" as const }
                      : { label: "On-site", variant: "neutral" as const },
                  ]}
                  reasons={[...m.strengths, `Why ranked here — ${m.why}`]}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </FadeIn>
      </section>

      <section className="bg-paper-soft border border-rule p-7 md:p-9">
        <SectionLabel number="02" className="mb-4">
          Inputs used
        </SectionLabel>
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-3">
          <Row label="Role" value="Senior Backend Engineer" />
          <Row label="Experience" value="7 years" />
          <Row label="Target salary" value="USD 92,000" />
          <Row label="Visa status" value="None, sponsorship required" />
          <Row label="Work preference" value="Hybrid" />
          <Row label="Priority" value="Stability" />
        </div>
      </section>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-4 py-1.5">
      <dt className="text-[12.5px] text-muted">{label}</dt>
      <dd className="text-[13.5px] text-ink">{value}</dd>
    </div>
  );
}
