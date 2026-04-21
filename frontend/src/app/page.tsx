import Link from "next/link";
import { ArrowUpRight, Compass, FileSpreadsheet, ShieldCheck } from "lucide-react";
import { TopNav } from "@/components/shell/top-nav";
import { FooterDateline } from "@/components/shell/footer-dateline";
import { DossierPreview } from "@/components/patterns/dossier-preview";
import { SectionLabel } from "@/components/patterns/section-label";
import { FadeIn } from "@/components/motion/fade-in";

const PILLARS = [
  {
    icon: Compass,
    title: "Directional clarity",
    body: "Ten engines cross-check your intent against country rules, roles, and real cost data — and tell you plainly whether the move holds up.",
  },
  {
    icon: FileSpreadsheet,
    title: "Deterministic first",
    body: "Scores and checklists come from explicit rules and templates, not hidden models. Every number shows its working.",
  },
  {
    icon: ShieldCheck,
    title: "Private by design",
    body: "Your dossier lives in a single case file you control. No broadcast, no account sharing, no noise.",
  },
];

export default function LandingPage() {
  return (
    <>
      <TopNav transparent />

      {/* Hero */}
      <section className="relative border-b border-rule">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10 pt-12 md:pt-20 pb-16 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-14 lg:gap-20 items-start">
            <div>
              <FadeIn>
                <div className="flex items-center gap-4 mb-8">
                  <span className="label">A private intelligence service</span>
                  <span className="h-px w-16 bg-rule-strong" />
                </div>
              </FadeIn>

              <FadeIn delay={0.06}>
                <h1 className="font-display text-display-2xl text-ink tracking-[-0.025em] leading-[0.98]">
                  Move with
                  <br />
                  <span className="italic text-accent-ink">clarity.</span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.14}>
                <p className="mt-8 max-w-[52ch] text-[17px] text-ink-soft leading-[1.6]">
                  Glimmora Relocate helps you choose, plan, and begin an
                  international move. One short intake, one dossier, the full
                  picture — jobs, affordability, documents, timeline, and what
                  to do next.
                </p>
              </FadeIn>

              <FadeIn delay={0.22}>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Link
                    href="/intent"
                    className="inline-flex h-12 items-center px-7 text-[14px] text-paper bg-ink hover:bg-accent-ink transition-colors"
                  >
                    Start assessment
                    <ArrowUpRight className="ml-2 size-4" strokeWidth={1.5} />
                  </Link>
                  <Link
                    href="#how-it-works"
                    className="text-[14px] text-ink-soft underline-offset-[6px] decoration-rule-strong hover:decoration-accent underline"
                  >
                    See how it works
                  </Link>
                </div>
              </FadeIn>

              <FadeIn delay={0.32}>
                <div className="mt-14 flex flex-wrap gap-8">
                  <Stat number="6 min" label="Typical intake" />
                  <Stat number="12" label="Intelligence engines" />
                  <Stat number="10" label="Destinations covered" />
                </div>
              </FadeIn>
            </div>

            <div className="lg:pt-4 flex justify-center lg:justify-end">
              <DossierPreview />
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10 py-20">
          <SectionLabel number="I" className="mb-10">
            What you receive
          </SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-rule border border-rule">
            {PILLARS.map((p, i) => (
              <article
                key={p.title}
                className="bg-canvas p-8 md:p-10 flex flex-col gap-5"
              >
                <div className="flex items-center justify-between">
                  <span className="size-9 border border-rule flex items-center justify-center">
                    <p.icon className="size-4 text-ink-soft" strokeWidth={1.5} />
                  </span>
                  <span className="font-mono text-[10.5px] tracking-[0.14em] text-muted tnum">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="font-display text-[24px] text-ink tracking-tight leading-tight">
                  {p.title}
                </h3>
                <p className="text-[14px] text-muted-strong leading-relaxed">
                  {p.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10 py-20">
          <SectionLabel number="II" className="mb-12">
            The six-minute dossier
          </SectionLabel>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-rule">
            {[
              {
                step: "01",
                title: "Intent",
                body: "One tap to tell us what you're actually trying to do.",
              },
              {
                step: "02",
                title: "Profile",
                body: "A minimal set of questions — role, target, urgency, family.",
              },
              {
                step: "03",
                title: "Analysis",
                body: "Ten engines run in parallel against your profile.",
              },
              {
                step: "04",
                title: "Dossier",
                body: "A single case file: verdict, numbers, checklist, next move.",
              },
            ].map((s, i) => (
              <div
                key={s.step}
                className={`py-6 ${i > 0 ? "md:px-8" : "md:pr-8"}`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-mono text-[11px] tracking-[0.14em] text-muted tnum">
                    {s.step}
                  </span>
                  <span className="h-px w-8 bg-rule-strong" />
                </div>
                <div className="font-display text-[22px] text-ink tracking-tight leading-tight mb-2">
                  {s.title}
                </div>
                <p className="text-[13.5px] text-muted-strong leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 flex items-center gap-5">
            <Link
              href="/intent"
              className="inline-flex h-12 items-center px-7 text-[14px] text-paper bg-accent hover:bg-accent-ink transition-colors"
            >
              Begin your case
              <ArrowUpRight className="ml-2 size-4" strokeWidth={1.5} />
            </Link>
            <span className="dateline">No sign-up required to start</span>
          </div>
        </div>
      </section>

      <FooterDateline />
    </>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="font-display text-[30px] text-ink tnum leading-none tracking-tight">
        {number}
      </div>
      <div className="mt-2 label">{label}</div>
    </div>
  );
}
