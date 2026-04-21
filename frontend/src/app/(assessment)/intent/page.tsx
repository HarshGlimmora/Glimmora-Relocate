"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Globe2,
  Scale,
  Search,
  FileClock,
  ArrowRight,
} from "lucide-react";
import { IntentCard } from "@/components/patterns/intent-card";
import { SectionLabel } from "@/components/patterns/section-label";
import { useAssessmentStore } from "@/lib/state/assessment-store";
import type { JourneyType } from "@/lib/types/case";
import { Stagger, StaggerItem } from "@/components/motion/fade-in";

const OPTIONS: {
  key: JourneyType;
  title: string;
  description: string;
  icon: typeof Briefcase;
}[] = [
  {
    key: "find_better_job_abroad",
    title: "Find a better job abroad",
    description:
      "Match your role to stronger markets and see if the salary upgrade holds after cost of living.",
    icon: Search,
  },
  {
    key: "relocate_with_offer",
    title: "Relocate with a job in hand",
    description:
      "You have the offer. We build the move around it — visa, documents, timeline, readiness.",
    icon: Briefcase,
  },
  {
    key: "compare_countries",
    title: "Compare countries",
    description:
      "Weigh two or three destinations against each other on jobs, cost, lifestyle, and friction.",
    icon: Scale,
  },
  {
    key: "check_feasibility",
    title: "Check if a move is feasible",
    description:
      "A fast viability read — affordability, visa eligibility, and the honest timeline.",
    icon: Globe2,
  },
  {
    key: "prepare_documents",
    title: "Prepare documents and timeline",
    description:
      "You've decided. We build the checklist and the week-by-week plan to arrive on time.",
    icon: FileClock,
  },
];

export default function IntentPage() {
  const router = useRouter();
  const journey = useAssessmentStore((s) => s.journey);
  const setJourney = useAssessmentStore((s) => s.setJourney);
  const [selected, setSelected] = useState<JourneyType | undefined>(journey);

  const canContinue = Boolean(selected);

  const onContinue = () => {
    if (!selected) return;
    setJourney(selected);
    router.push("/intake");
  };

  return (
    <div className="max-w-5xl">
      <SectionLabel number="01" className="mb-6">
        Intent
      </SectionLabel>

      <h1 className="font-display text-display-xl text-ink tracking-tight leading-[1.05]">
        What are you trying
        <br />
        to do?
      </h1>
      <p className="mt-5 max-w-2xl text-[16px] text-muted-strong leading-relaxed">
        Choose one. Your pick shapes which of our engines run — we won't ask
        questions that don't apply to you.
      </p>

      <Stagger className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {OPTIONS.map((opt, i) => (
          <StaggerItem key={opt.key}>
            <IntentCard
              number={String(i + 1)}
              icon={opt.icon}
              title={opt.title}
              description={opt.description}
              selected={selected === opt.key}
              onSelect={() => setSelected(opt.key)}
            />
          </StaggerItem>
        ))}
      </Stagger>

      <div className="mt-14 flex items-center justify-between border-t border-rule pt-8">
        <span className="dateline">
          {canContinue ? "Selection captured" : "Pick one to continue"}
        </span>
        <button
          type="button"
          disabled={!canContinue}
          onClick={onContinue}
          className="inline-flex h-12 items-center px-7 text-[14px] text-paper bg-ink hover:bg-accent-ink disabled:bg-rule-strong disabled:cursor-not-allowed transition-colors"
        >
          Continue
          <ArrowRight className="ml-2 size-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
