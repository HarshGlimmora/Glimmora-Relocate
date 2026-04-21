"use client";

import Link from "next/link";
import { ArrowUpRight, FolderOpen } from "lucide-react";
import { TopNav } from "@/components/shell/top-nav";
import { FooterDateline } from "@/components/shell/footer-dateline";
import { SectionLabel } from "@/components/patterns/section-label";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/patterns/empty-state";
import { useCaseList } from "@/lib/api/hooks/use-case";
import { formatDate } from "@/lib/formatters";
import { CaseNumber } from "@/components/brand/case-number";

const VERDICT_COPY: Record<string, { label: string; variant: "accent" | "warning" | "danger" | "success" | "neutral" }> = {
  go: { label: "Proceed", variant: "success" },
  go_with_caveats: { label: "Proceed · caveats", variant: "accent" },
  delay: { label: "Delay", variant: "warning" },
  reconsider: { label: "Reconsider", variant: "danger" },
};

const STATUS_COPY: Record<string, { label: string; variant: "success" | "warning" | "neutral" | "danger" }> = {
  ok: { label: "Complete", variant: "success" },
  partial: { label: "Partial", variant: "warning" },
  running: { label: "In progress", variant: "neutral" },
  failed: { label: "Failed", variant: "danger" },
  archived: { label: "Archived", variant: "neutral" },
};

export default function CasesPage() {
  const { data, isLoading } = useCaseList();

  return (
    <>
      <TopNav />
      <main className="mx-auto max-w-[1280px] px-6 md:px-10 py-10 md:py-14">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-6">
          <div>
            <SectionLabel className="mb-4">Archive</SectionLabel>
            <h1 className="font-display text-display-lg text-ink tracking-tight leading-tight">
              Your case files
            </h1>
            <p className="mt-3 max-w-xl text-[15px] text-muted-strong leading-relaxed">
              Every assessment you've run. Open one to continue where you left
              off, or start a new case for a different question.
            </p>
          </div>
          <Link
            href="/intent"
            className="inline-flex h-11 items-center px-6 text-[13.5px] text-paper bg-ink hover:bg-accent-ink transition-colors"
          >
            New case
            <ArrowUpRight className="ml-2 size-4" strokeWidth={1.5} />
          </Link>
        </div>

        {isLoading ? (
          <div className="bg-canvas border border-rule divide-y divide-rule">
            {[0, 1, 2].map((i) => (
              <div key={i} className="px-6 py-5">
                <div className="shimmer h-4 w-40 mb-3" />
                <div className="shimmer h-5 w-3/5" />
              </div>
            ))}
          </div>
        ) : !data || data.length === 0 ? (
          <EmptyState
            icon={FolderOpen}
            title="No cases yet"
            description="Start your first assessment to see it appear here."
            action={
              <Link
                href="/intent"
                className="inline-flex h-10 items-center px-5 text-[13px] text-paper bg-ink hover:bg-accent-ink transition-colors"
              >
                Start assessment
              </Link>
            }
          />
        ) : (
          <div className="bg-canvas border border-rule divide-y divide-rule">
            {data.map((c) => (
              <Link
                key={c.caseId}
                href={`/cases/${c.caseId}`}
                className="group grid grid-cols-1 md:grid-cols-[180px_1fr_auto_160px] items-center gap-4 md:gap-6 px-6 py-5 hover:bg-paper-soft transition-colors"
              >
                <CaseNumber value={c.caseId.replace(/^RL-/, "")} />
                <div className="min-w-0">
                  <div className="font-display text-[19px] text-ink tracking-tight leading-tight truncate">
                    {c.headline}
                  </div>
                  <div className="mt-1 text-[12.5px] text-muted-strong">
                    {c.target}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant={STATUS_COPY[c.status]?.variant ?? "neutral"}>
                    {STATUS_COPY[c.status]?.label ?? c.status}
                  </Badge>
                  <Badge variant={VERDICT_COPY[c.verdict]?.variant ?? "neutral"}>
                    {VERDICT_COPY[c.verdict]?.label ?? c.verdict}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="dateline">
                    Updated {formatDate(c.updatedAt, "dateline")}
                  </div>
                  <ArrowUpRight
                    className="ml-auto mt-2 size-4 text-muted-strong group-hover:text-accent transition-colors"
                    strokeWidth={1.5}
                  />
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <FooterDateline />
    </>
  );
}
