import { cn } from "@/lib/utils";

export type Verdict = "go" | "go_with_caveats" | "delay" | "reconsider";

const VERDICT_COPY: Record<Verdict, { label: string; tone: string; dot: string }> = {
  go: { label: "Proceed", tone: "text-success", dot: "bg-success" },
  go_with_caveats: { label: "Proceed with caveats", tone: "text-ink", dot: "bg-accent" },
  delay: { label: "Delay advised", tone: "text-warning", dot: "bg-warning" },
  reconsider: { label: "Reconsider", tone: "text-danger", dot: "bg-danger" },
};

export function VerdictBanner({
  verdict,
  headline,
  caseNumber,
  className,
}: {
  verdict: Verdict;
  headline: string;
  caseNumber?: string;
  className?: string;
}) {
  const copy = VERDICT_COPY[verdict];
  return (
    <div className={cn("relative bg-canvas border border-rule", className)}>
      {/* Top meta rail */}
      <div className="flex items-center justify-between px-6 md:px-8 py-3 border-b border-rule bg-paper-soft">
        <div className="flex items-center gap-3">
          <span className={cn("size-2 rounded-full", copy.dot)} />
          <span className={cn("label", copy.tone)}>{copy.label}</span>
        </div>
        {caseNumber ? (
          <span className="dateline">Dossier · {caseNumber}</span>
        ) : null}
      </div>

      {/* Headline */}
      <div className="px-6 md:px-8 py-8 md:py-10">
        <h1 className="font-display text-display-lg text-ink max-w-4xl">
          {headline}
        </h1>
      </div>
    </div>
  );
}
