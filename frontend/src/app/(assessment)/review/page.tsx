"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { SectionLabel } from "@/components/patterns/section-label";
import { ProfileSummaryCard } from "@/components/patterns/profile-summary-card";
import { useAssessmentStore } from "@/lib/state/assessment-store";
import { createCase, submitIntake, inferIntent, runAnalysis } from "@/lib/api/cases";
import { JOURNEYS } from "@/lib/design-tokens";
import { formatMoney } from "@/lib/formatters";
import { useState } from "react";

export default function ReviewPage() {
  const router = useRouter();
  const { journey, profile, refinement, setCaseId } = useAssessmentStore();
  const [submitting, setSubmitting] = useState(false);

  const confirm = async () => {
    setSubmitting(true);
    try {
      const { caseId } = await createCase();
      setCaseId(caseId);
      await submitIntake(caseId, { ...profile, ...refinement });
      await inferIntent(caseId);
      await runAnalysis(caseId);
      router.push(`/analyzing?caseId=${caseId}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl">
      <SectionLabel number="04" className="mb-6">
        Review
      </SectionLabel>

      <div className="grid lg:grid-cols-[1fr_340px] gap-14 items-start">
        <div>
          <h1 className="font-display text-display-xl text-ink tracking-tight leading-[1.05]">
            Here is what we
            <br />
            understood.
          </h1>
          <p className="mt-5 max-w-xl text-[16px] text-muted-strong leading-relaxed">
            Edit anything that isn't right. Once you confirm, our engines begin
            compiling your dossier.
          </p>

          <div className="mt-10 space-y-5">
            <ProfileSummaryCard
              title="Direction"
              editHref="/intake"
              items={[
                { label: "Current country", value: profile?.currentCountry ?? "—" },
                {
                  label: "Target",
                  value:
                    profile?.undecided
                      ? "Undecided — compare options"
                      : (profile?.targetCountries?.join(", ") || "—"),
                },
                { label: "Intent", value: JOURNEYS[journey ?? "find_better_job_abroad"] },
              ]}
            />

            <ProfileSummaryCard
              title="Career"
              editHref="/intake"
              items={[
                { label: "Role", value: profile?.role ?? "—" },
                {
                  label: "Experience",
                  value: `${profile?.yearsExperience ?? 0} years`,
                },
                {
                  label: "Current salary",
                  value: profile?.currentSalary
                    ? formatMoney(profile.currentSalary.amount, profile.currentSalary.currency)
                    : "—",
                },
                {
                  label: "Target salary",
                  value: profile?.targetSalary
                    ? formatMoney(profile.targetSalary.amount, profile.targetSalary.currency)
                    : "Not specified",
                },
                { label: "Work preference", value: profile?.workPreference ?? "—" },
                { label: "Visa awareness", value: profile?.visaStatus || "Not specified" },
              ]}
            />

            <ProfileSummaryCard
              title="Life"
              editHref="/intake"
              items={[
                { label: "Family", value: profile?.familyStatus?.replace(/_/g, " ") ?? "—" },
                { label: "Urgency", value: profile?.urgency ?? "—" },
                { label: "Priority", value: profile?.priority ?? "—" },
                {
                  label: "Budget ceiling",
                  value: profile?.budgetCeiling
                    ? formatMoney(profile.budgetCeiling.amount, profile.budgetCeiling.currency)
                    : "Not specified",
                },
              ]}
            />

            {refinement && Object.keys(refinement).length > 0 ? (
              <ProfileSummaryCard
                title="Refinement"
                editHref="/refine"
                items={Object.entries(refinement).map(([k, v]) => ({
                  label: k.replace(/_/g, " ").replace(/([A-Z])/g, " $1").toLowerCase(),
                  value: typeof v === "boolean" ? (v ? "Yes" : "No") : String(v),
                }))}
              />
            ) : null}
          </div>

          <div className="mt-12 flex items-center justify-between border-t border-rule pt-8">
            <button
              type="button"
              onClick={() => router.push("/refine")}
              className="inline-flex items-center gap-2 text-[13.5px] text-ink-soft hover:text-ink transition-colors"
            >
              <ArrowLeft className="size-4" strokeWidth={1.5} />
              Back
            </button>
            <button
              type="button"
              onClick={confirm}
              disabled={submitting}
              className="inline-flex h-12 items-center px-7 text-[14px] text-paper bg-accent hover:bg-accent-ink disabled:bg-rule-strong transition-colors"
            >
              {submitting ? "Preparing case…" : "Looks correct · Begin analysis"}
              {!submitting ? <ArrowRight className="ml-2 size-4" strokeWidth={1.5} /> : null}
            </button>
          </div>
        </div>

        {/* What happens next — sticky context card */}
        <aside className="lg:sticky lg:top-32 bg-paper-soft border border-rule p-6">
          <div className="label mb-4">What we'll analyse</div>
          <ul className="space-y-3">
            {[
              "Job fit against your role and target",
              "Destination suitability and friction",
              "Affordability, cost, and runway",
              "Document readiness and visa path",
              "Milestone timeline and critical path",
              "Cultural preparation pack",
            ].map((item) => (
              <li
                key={item}
                className="flex gap-3 text-[13px] text-ink-soft leading-relaxed"
              >
                <CheckCircle2
                  className="shrink-0 size-3.5 mt-[3px] text-accent"
                  strokeWidth={1.75}
                />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-5 border-t border-rule dateline">
            Typical run · 3–5 minutes
          </div>
        </aside>
      </div>
    </div>
  );
}
