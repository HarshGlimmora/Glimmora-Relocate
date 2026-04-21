"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/patterns/section-label";
import { useAssessmentStore } from "@/lib/state/assessment-store";
import type { RefinementFormValues } from "@/lib/schemas/profile";

const QUESTIONS: Array<{
  key: keyof RefinementFormValues;
  question: string;
  why: string;
  options: { value: string; label: string }[];
}> = [
  {
    key: "sponsorshipRequired",
    question: "Do you need visa sponsorship from an employer?",
    why: "Filters out roles that won't consider your profile.",
    options: [
      { value: "true", label: "Yes, sponsorship required" },
      { value: "false", label: "No, I can work without sponsorship" },
    ],
  },
  {
    key: "prioritizing",
    question: "What are you willing to trade off?",
    why: "Tunes how we weight the ranking.",
    options: [
      { value: "cost", label: "Lower cost over everything" },
      { value: "job_quality", label: "Best job, even if pricier" },
      { value: "lifestyle", label: "Quality of life first" },
    ],
  },
  {
    key: "openToMultiple",
    question: "Open to more than one destination?",
    why: "Expands the search beyond a single country.",
    options: [
      { value: "true", label: "Yes, show me alternatives" },
      { value: "false", label: "No, focus on my primary choice" },
    ],
  },
  {
    key: "movingWithFamily",
    question: "Are dependants moving with you?",
    why: "Shapes document, timeline, and cost calculations.",
    options: [
      { value: "true", label: "Yes" },
      { value: "false", label: "No, solo for now" },
    ],
  },
];

export default function RefinePage() {
  const router = useRouter();
  const { refinement, patchRefinement } = useAssessmentStore();
  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    Object.entries(refinement ?? {}).forEach(([k, v]) => {
      if (v !== undefined) initial[k] = String(v);
    });
    return initial;
  });

  const setValue = (key: string, value: string) =>
    setValues((p) => ({ ...p, [key]: value }));

  const proceed = () => {
    const patch: Partial<RefinementFormValues> = {};
    Object.entries(values).forEach(([k, v]) => {
      if (v === "true" || v === "false") {
        (patch as Record<string, unknown>)[k] = v === "true";
      } else {
        (patch as Record<string, unknown>)[k] = v;
      }
    });
    patchRefinement(patch);
    router.push("/review");
  };

  const answeredCount = Object.values(values).filter(Boolean).length;

  return (
    <div className="max-w-4xl">
      <SectionLabel number="03" className="mb-6">
        Refinement
      </SectionLabel>

      <div className="grid lg:grid-cols-[1fr_320px] gap-14 items-start">
        <div>
          <h1 className="font-display text-display-xl text-ink tracking-tight leading-[1.05]">
            A few refining
            <br />
            questions.
          </h1>
          <p className="mt-5 max-w-xl text-[16px] text-muted-strong leading-relaxed">
            All optional. Each answer sharpens your dossier — skip whatever
            isn't relevant.
          </p>

          <div className="mt-12 space-y-4">
            {QUESTIONS.map((q, i) => (
              <RefinementCard
                key={q.key}
                index={i + 1}
                question={q.question}
                why={q.why}
                options={q.options}
                value={values[q.key as string]}
                onChange={(v) => setValue(q.key as string, v)}
              />
            ))}
          </div>

          <div className="mt-12 flex items-center justify-between border-t border-rule pt-8">
            <button
              type="button"
              onClick={() => router.push("/intake")}
              className="inline-flex items-center gap-2 text-[13.5px] text-ink-soft hover:text-ink transition-colors"
            >
              <ArrowLeft className="size-4" strokeWidth={1.5} />
              Back
            </button>
            <div className="flex items-center gap-5">
              <button
                type="button"
                onClick={proceed}
                className="text-[13.5px] text-muted-strong hover:text-ink transition-colors underline underline-offset-4 decoration-rule-strong hover:decoration-accent"
              >
                Skip for now
              </button>
              <button
                type="button"
                onClick={proceed}
                className="inline-flex h-12 items-center px-7 text-[14px] text-paper bg-ink hover:bg-accent-ink transition-colors"
              >
                Continue
                <ArrowRight className="ml-2 size-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-32 bg-paper-soft border border-rule p-6">
          <div className="label mb-4">Progress</div>
          <div className="flex items-baseline gap-1.5 mb-5">
            <span className="font-display text-[40px] text-ink leading-none tnum">
              {answeredCount}
            </span>
            <span className="text-[13px] text-muted">/&nbsp;{QUESTIONS.length}</span>
          </div>
          <p className="text-[12.5px] text-muted-strong leading-relaxed">
            These answers narrow the search before the engines run. Skipping
            still produces a useful dossier — with slightly broader assumptions.
          </p>
        </aside>
      </div>
    </div>
  );
}

function RefinementCard({
  index,
  question,
  why,
  options,
  value,
  onChange,
}: {
  index: number;
  question: string;
  why: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="bg-canvas border border-rule p-6">
      <div className="flex items-start justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-[10.5px] tracking-[0.14em] text-muted tnum">
              Q.{String(index).padStart(2, "0")}
            </span>
            <span className="h-px w-8 bg-rule-strong" />
          </div>
          <h3 className="font-display text-[20px] text-ink tracking-tight leading-snug">
            {question}
          </h3>
          <p className="mt-1.5 text-[12.5px] text-muted">{why}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`inline-flex items-center px-4 py-2 text-[13px] border transition-colors ${
                active
                  ? "border-accent bg-accent-soft text-accent-ink"
                  : "border-rule text-ink-soft hover:border-ink hover:bg-paper-soft"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
