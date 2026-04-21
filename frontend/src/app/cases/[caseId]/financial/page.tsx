"use client";

import { use } from "react";
import { useFinance } from "@/lib/api/hooks/use-case";
import { DetailHeader } from "@/components/patterns/detail-header";
import { SectionLabel } from "@/components/patterns/section-label";
import { MetricCard } from "@/components/patterns/metric-card";
import { DossierSkeleton } from "@/components/patterns/skeletons/dossier-skeleton";
import { formatMoney } from "@/lib/formatters";
import type { Tone } from "@/lib/types/case";

const BAND_TONE: Record<string, Tone> = {
  comfortable: "positive",
  tight: "warning",
  risky: "warning",
  not_viable: "negative",
};

export default function FinancialDetailPage({
  params,
}: {
  params: Promise<{ caseId: string }>;
}) {
  const { caseId } = use(params);
  const { data, isLoading } = useFinance(caseId);
  if (isLoading || !data) return <DossierSkeleton />;

  const items = [
    ["Rent", data.monthlyCost.rent],
    ["Food", data.monthlyCost.food],
    ["Transport", data.monthlyCost.transport],
    ["Utilities", data.monthlyCost.utilities],
    ["Healthcare", data.monthlyCost.healthcare],
    ["Other", data.monthlyCost.other],
  ] as const;

  return (
    <div className="space-y-12">
      <DetailHeader
        caseId={caseId}
        eyebrow="Financial view"
        title="Affordability clears with a comfortable margin."
        lead={data.summary}
        meta={`Confidence ${Math.round((data.confidence ?? 0) * 100)}%`}
      />

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-rule border border-rule">
        <MetricCard
          label="Monthly surplus"
          value={formatMoney(data.monthlySurplus.amount, data.monthlySurplus.currency)}
          tone="positive"
          caption="After all monthly expenses at destination."
          className="border-0"
        />
        <MetricCard
          label="Runway"
          value={`${data.runwayMonths}`}
          unit="mo"
          tone="neutral"
          caption="Months of savings cover if income pauses."
          className="border-0"
        />
        <MetricCard
          label="Salary vs cost"
          value={`${Math.round(data.salaryVsCost * 100)}`}
          unit="%"
          tone="positive"
          caption="Take-home relative to monthly living cost."
          className="border-0"
        />
        <MetricCard
          label="Affordability"
          value={data.affordabilityBand.replace(/_/g, " ")}
          tone={BAND_TONE[data.affordabilityBand] ?? "neutral"}
          caption="Composite rating of financial viability."
          className="border-0 capitalize"
        />
      </section>

      <section className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
        <div>
          <SectionLabel number="01" className="mb-5">
            Monthly cost breakdown
          </SectionLabel>
          <div className="bg-canvas border border-rule divide-y divide-rule">
            {items.map(([label, money]) => (
              <div
                key={label}
                className="grid grid-cols-[1fr_auto_120px] items-center px-6 py-4"
              >
                <span className="text-[14px] text-ink-soft">{label}</span>
                <span className="font-mono text-[13px] text-ink tnum">
                  {formatMoney(money.amount, money.currency)}
                </span>
                <div className="ml-6 relative h-[6px] bg-paper-soft border border-rule">
                  <div
                    className="absolute inset-y-0 left-0 bg-ink"
                    style={{
                      width: `${Math.min(100, (money.amount / data.monthlyCost.total.amount) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
            <div className="grid grid-cols-[1fr_auto] items-center px-6 py-4 bg-paper-soft">
              <span className="label">Total</span>
              <span className="font-mono text-[14px] text-ink tnum">
                {formatMoney(data.monthlyCost.total.amount, data.monthlyCost.total.currency)}
              </span>
            </div>
          </div>
        </div>

        <aside className="bg-paper-soft border border-rule p-6">
          <SectionLabel number="02" className="mb-4">
            One-off relocation cost
          </SectionLabel>
          <div className="font-display text-[36px] text-ink leading-none tnum">
            {formatMoney(data.relocationCostTotal.amount, data.relocationCostTotal.currency)}
          </div>
          <div className="mt-4 dateline">
            Flights · shipping · deposits · visa fees · buffer
          </div>
        </aside>
      </section>

      <section>
        <SectionLabel number="03" className="mb-5">
          Assumptions we made
        </SectionLabel>
        <ul className="bg-canvas border border-rule divide-y divide-rule">
          {data.assumptions.map((a) => (
            <li key={a} className="px-6 py-4 text-[13.5px] text-ink-soft leading-relaxed">
              {a}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
