import { Quote } from "lucide-react";
import { SectionLabel } from "@/components/patterns/section-label";

export function ExplanationPanel({
  narrative,
  tradeoffs,
  confidence,
}: {
  narrative: string;
  tradeoffs?: string[];
  confidence?: number;
}) {
  return (
    <section className="bg-paper-soft border border-rule p-7 md:p-9">
      <SectionLabel number="07" className="mb-6">Why this result</SectionLabel>
      <div className="flex gap-5">
        <Quote
          className="shrink-0 size-6 text-rule-strong -mt-1"
          strokeWidth={1.25}
        />
        <p className="font-display text-[19px] md:text-[20px] leading-[1.55] text-ink max-w-2xl">
          {narrative}
        </p>
      </div>

      {tradeoffs && tradeoffs.length > 0 ? (
        <div className="mt-8 grid sm:grid-cols-2 gap-x-10 gap-y-3">
          <div className="label col-span-full mb-1">Tradeoffs considered</div>
          {tradeoffs.map((t) => (
            <div key={t} className="flex gap-3 text-[13.5px] text-ink-soft leading-relaxed">
              <span className="mt-[9px] size-[3px] bg-ink shrink-0" />
              <span>{t}</span>
            </div>
          ))}
        </div>
      ) : null}

      {confidence !== undefined ? (
        <div className="mt-8 pt-6 border-t border-rule flex items-center justify-between">
          <span className="label">Confidence</span>
          <span className="font-mono text-[13px] text-ink tnum">
            {Math.round(confidence * 100)}&nbsp;%
          </span>
        </div>
      ) : null}
    </section>
  );
}
