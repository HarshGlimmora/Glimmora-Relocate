import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SectionLabel } from "@/components/patterns/section-label";

export function DetailHeader({
  eyebrow,
  title,
  lead,
  caseId,
  meta,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  caseId: string;
  meta?: string;
}) {
  return (
    <header>
      <div className="flex items-center justify-between mb-6">
        <Link
          href={`/cases/${caseId}`}
          className="inline-flex items-center gap-2 text-[13px] text-muted-strong hover:text-ink transition-colors"
        >
          <ArrowLeft className="size-3.5" strokeWidth={1.5} />
          Back to dossier
        </Link>
        {meta ? <span className="dateline">{meta}</span> : null}
      </div>

      <SectionLabel className="mb-4">{eyebrow}</SectionLabel>

      <h1 className="font-display text-display-lg text-ink tracking-tight leading-[1.04] max-w-3xl">
        {title}
      </h1>
      <p className="mt-5 max-w-2xl text-[16px] text-muted-strong leading-relaxed">
        {lead}
      </p>
    </header>
  );
}
