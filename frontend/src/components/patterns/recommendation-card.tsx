import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScoreBar } from "@/components/patterns/score-bar";
import { cn } from "@/lib/utils";

export function RecommendationCard({
  rank,
  title,
  subtitle,
  score,
  salary,
  badges,
  reasons,
  href,
  className,
}: {
  rank: number;
  title: string;
  subtitle: string;
  score: number;
  salary?: string;
  badges?: Array<{ label: string; variant?: "accent" | "success" | "warning" | "neutral" }>;
  reasons: string[];
  href?: string;
  className?: string;
}) {
  return (
    <article className={cn("bg-canvas border border-rule", className)}>
      <div className="flex items-start gap-6 p-6">
        <div className="flex flex-col items-center gap-2 pt-1 min-w-[44px]">
          <span className="font-mono text-[10.5px] tracking-[0.12em] text-muted">RANK</span>
          <span className="font-display text-[32px] leading-none text-ink tnum">
            {String(rank).padStart(2, "0")}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-[24px] leading-tight text-ink tracking-tight">
                {title}
              </h3>
              <p className="mt-1.5 text-[14.5px] text-muted-strong">{subtitle}</p>
            </div>
            {salary ? (
              <div className="text-right shrink-0">
                <div className="label mb-1.5">Pay band</div>
                <div className="font-mono text-[14px] text-ink tnum">{salary}</div>
              </div>
            ) : null}
          </div>

          {badges && badges.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {badges.map((b) => (
                <Badge key={b.label} variant={b.variant ?? "neutral"}>
                  {b.label}
                </Badge>
              ))}
            </div>
          ) : null}

          <div className="mt-6">
            <ScoreBar value={score} label="Match quality" tone="accent" />
          </div>

          <ul className="mt-5 space-y-2">
            {reasons.map((r) => (
              <li
                key={r}
                className="flex gap-3 text-[14px] text-ink-soft leading-relaxed"
              >
                <span className="mt-[9px] size-[3px] bg-accent shrink-0" />
                <span>{r}</span>
              </li>
            ))}
          </ul>

          {href ? (
            <Link
              href={href}
              className="mt-6 inline-flex items-center gap-1.5 text-[13px] text-accent-ink underline-offset-4 decoration-rule-strong hover:decoration-accent"
            >
              Open case file
              <ArrowUpRight className="size-3.5" strokeWidth={1.75} />
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
