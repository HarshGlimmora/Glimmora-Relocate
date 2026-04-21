"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowUpRight, AlertTriangle, Sparkles } from "lucide-react";
import { useCase } from "@/lib/api/hooks/use-case";
import { VerdictBanner } from "@/components/patterns/verdict-banner";
import { MetricCard } from "@/components/patterns/metric-card";
import { SectionLabel } from "@/components/patterns/section-label";
import { RecommendationCard } from "@/components/patterns/recommendation-card";
import { ScoreRing } from "@/components/patterns/score-ring";
import { ScoreBar } from "@/components/patterns/score-bar";
import { ExplanationPanel } from "@/components/patterns/explanation-panel";
import { DossierSkeleton } from "@/components/patterns/skeletons/dossier-skeleton";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/fade-in";
import { CaseNumber } from "@/components/brand/case-number";
import { formatDate, formatMoney } from "@/lib/formatters";
import { DETAIL_MODULES } from "@/lib/design-tokens";

export default function CaseDashboardPage({
  params,
}: {
  params: Promise<{ caseId: string }>;
}) {
  const { caseId } = use(params);
  const { data, isLoading, isError, refetch } = useCase(caseId);

  if (isLoading) return <DossierSkeleton />;
  if (isError || !data) return <DashboardError onRetry={() => refetch()} />;

  const s = data.summary!;
  const fin = data.modules.financial!;
  const docs = data.modules.documents!;
  const jobs = data.modules.jobs!;
  const reloc = data.modules.relocation!;
  const timeline = data.modules.timeline!;

  const overallScore =
    (fin.score + docs.score + jobs.score + reloc.score + timeline.score) / 5;

  return (
    <div className="space-y-12">
      {/* Top meta strip */}
      <FadeIn>
        <div className="flex flex-wrap items-center gap-4 justify-between">
          <CaseNumber value={caseId.replace(/^RL-/, "")} size="lg" />
          <span className="dateline">
            Generated · {formatDate(s.generatedAt, "dateline")}
            <span className="rule-dot" />
            Status · {data.status.toUpperCase()}
          </span>
        </div>
      </FadeIn>

      {/* Hero verdict */}
      <FadeIn delay={0.05}>
        <VerdictBanner
          verdict={s.verdict}
          headline={s.headline}
          caseNumber={caseId}
        />
      </FadeIn>

      {/* Hero grid: metrics + readiness ring */}
      <section>
        <SectionLabel number="01" className="mb-6">
          Decision summary
        </SectionLabel>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
          <Stagger className="grid grid-cols-2 lg:grid-cols-2 gap-px bg-rule border border-rule">
            {s.heroMetrics.map((m) => (
              <StaggerItem key={m.label}>
                <MetricCard
                  label={m.label}
                  value={m.value}
                  tone={m.tone}
                  caption={undefined}
                  className="border-0 h-full"
                />
              </StaggerItem>
            ))}
          </Stagger>

          <div className="bg-canvas border border-rule p-8 flex flex-col items-center">
            <div className="label mb-4">Overall readiness</div>
            <ScoreRing value={overallScore} size={200} unit="%" />
            <div className="mt-6 pt-5 border-t border-rule w-full space-y-3">
              <ScoreBar value={jobs.score} label="Job fit" />
              <ScoreBar value={reloc.score} label="Destination" tone="success" />
              <ScoreBar value={fin.score} label="Affordability" tone="success" />
              <ScoreBar value={docs.score} label="Documents" tone="warning" />
            </div>
          </div>
        </div>
      </section>

      {/* Key warnings */}
      {s.topWarnings.length > 0 ? (
        <section>
          <SectionLabel number="02" className="mb-5">
            Risks worth reviewing
          </SectionLabel>
          <div className="bg-canvas border border-rule divide-y divide-rule">
            {s.topWarnings.map((w) => (
              <div key={w} className="flex items-start gap-4 px-6 py-5">
                <AlertTriangle
                  className="shrink-0 size-4 mt-0.5 text-warning"
                  strokeWidth={1.75}
                />
                <p className="text-[14px] text-ink-soft leading-relaxed">{w}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Top recommendation */}
      {jobs.matches[0] ? (
        <section>
          <SectionLabel number="03" className="mb-5">
            Top recommendation
          </SectionLabel>
          <RecommendationCard
            rank={jobs.matches[0].rank}
            title={jobs.matches[0].title}
            subtitle={`${jobs.matches[0].company} · ${jobs.matches[0].city}, ${jobs.matches[0].country}`}
            score={jobs.matches[0].score}
            salary={`${formatMoney(jobs.matches[0].salary.min, jobs.matches[0].salary.currency)} – ${formatMoney(jobs.matches[0].salary.max, jobs.matches[0].salary.currency)}`}
            badges={[
              jobs.matches[0].visaSponsorship
                ? { label: "Visa sponsorship", variant: "accent" as const }
                : null,
              jobs.matches[0].remoteOk
                ? { label: "Hybrid-friendly", variant: "success" as const }
                : null,
            ].filter(Boolean) as { label: string; variant?: "accent" | "success" }[]}
            reasons={jobs.matches[0].strengths}
            href={`/cases/${caseId}/jobs`}
          />
        </section>
      ) : null}

      {/* Module quicklinks */}
      <section>
        <SectionLabel number="04" className="mb-5">
          Case file
        </SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-rule border border-rule">
          {DETAIL_MODULES.map((m, i) => (
            <Link
              key={m.key}
              href={`/cases/${caseId}/${m.href}`}
              className="group relative bg-canvas p-6 transition-colors hover:bg-paper-soft"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="font-mono text-[10.5px] tracking-[0.14em] text-muted tnum">
                  0{i + 1}
                </span>
                <ArrowUpRight
                  className="size-4 text-muted-strong group-hover:text-accent transition-colors"
                  strokeWidth={1.5}
                />
              </div>
              <div className="font-display text-[20px] text-ink tracking-tight leading-tight">
                {m.label}
              </div>
              <p className="mt-2 text-[12.5px] text-muted-strong leading-relaxed">
                {moduleCaption(m.key)}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Next actions */}
      <section>
        <SectionLabel number="05" className="mb-5">
          Next actions
        </SectionLabel>
        <ol className="bg-canvas border border-rule divide-y divide-rule">
          {s.nextActions.map((a, i) => (
            <li key={a} className="grid grid-cols-[60px_1fr_auto] items-center gap-4 px-6 py-5">
              <span className="font-mono text-[11px] tracking-[0.14em] text-muted tnum">
                0{i + 1}
              </span>
              <span className="text-[14px] text-ink">{a}</span>
              <Sparkles className="size-3.5 text-accent" strokeWidth={1.5} />
            </li>
          ))}
        </ol>
      </section>

      <ExplanationPanel
        narrative={s.narrative}
        tradeoffs={[
          "Higher salary in Berlin partially offset by tighter housing market.",
          "Six-month timeline depends on document work starting early.",
          "Amsterdam offers smoother English workplace but narrower pay band.",
        ]}
        confidence={0.83}
      />
    </div>
  );
}

function moduleCaption(key: string) {
  return {
    jobs: "Ranked matches, salary fit, and why each was chosen.",
    relocation: "Destination scores on housing, transport, healthcare, and lifestyle.",
    financial: "Monthly budget, surplus, runway, and relocation costs.",
    documents: "Per-category checklist, status, and expiry watch.",
    timeline: "Milestone DAG, critical path, and the earliest move date.",
    cultural: "Language basics, workplace etiquette, and the first-week plan.",
  }[key] ?? "";
}

function DashboardError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="bg-canvas border border-rule p-10 text-center">
      <div className="label mb-4">Temporary error</div>
      <h2 className="font-display text-[28px] text-ink tracking-tight">
        We couldn't load this case.
      </h2>
      <p className="mt-3 text-[14px] text-muted-strong max-w-md mx-auto leading-relaxed">
        The pipeline may still be running, or the connection briefly dropped.
        Retrying is safe.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-6 inline-flex h-11 items-center px-6 text-[13.5px] text-paper bg-ink hover:bg-accent-ink transition-colors"
      >
        Retry
      </button>
    </div>
  );
}
