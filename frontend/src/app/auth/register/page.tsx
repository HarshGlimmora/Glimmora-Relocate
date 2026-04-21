"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SectionLabel } from "@/components/patterns/section-label";
import { Field, Input } from "@/components/ui/input";
import { FadeIn } from "@/components/motion/fade-in";
import { ResumeDropzone } from "@/components/patterns/resume-dropzone";
import {
  identitySchema,
  credentialsSchema,
  type IdentityFormValues,
  type CredentialsFormValues,
  type ResumeMeta,
} from "@/lib/schemas/auth";
import { registerAccount } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/state/auth-store";
import { cn } from "@/lib/utils";

const STEPS = [
  { key: "identity", number: "01", label: "Identity" },
  { key: "security", number: "02", label: "Security" },
  { key: "resume", number: "03", label: "Resume" },
] as const;

type StepKey = (typeof STEPS)[number]["key"];

export default function RegisterPage() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const setResume = useAuthStore((s) => s.setResume);
  const resumeFromStore = useAuthStore((s) => s.resume);

  const [step, setStep] = useState<StepKey>("identity");
  const [identity, setIdentity] = useState<IdentityFormValues | null>(null);
  const [credentials, setCredentials] = useState<CredentialsFormValues | null>(null);
  const [resume, setLocalResume] = useState<ResumeMeta | undefined>(resumeFromStore);
  const [finishing, setFinishing] = useState(false);
  const [submitError, setSubmitError] = useState<string | undefined>();

  const identityForm = useForm<IdentityFormValues>({
    resolver: zodResolver(identitySchema),
    defaultValues: identity ?? { fullName: "", email: "", phone: "" },
    mode: "onBlur",
  });

  const credentialsForm = useForm<CredentialsFormValues>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: credentials ?? { password: "", confirmPassword: "" },
    mode: "onBlur",
  });

  const onIdentitySubmit = (v: IdentityFormValues) => {
    setIdentity(v);
    setStep("security");
  };

  const onCredentialsSubmit = (v: CredentialsFormValues) => {
    setCredentials(v);
    setStep("resume");
  };

  const finish = async () => {
    if (!identity || !credentials || !resume) return;
    setSubmitError(undefined);
    setFinishing(true);
    try {
      const user = await registerAccount(identity, credentials);
      setUser(user);
      setResume(resume);
      router.push("/intent");
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setFinishing(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12 lg:gap-20">
      {/* Left rail — stepper + context */}
      <aside className="lg:sticky lg:top-28 h-max">
        <SectionLabel className="mb-6">New account</SectionLabel>
        <h1 className="font-display text-[40px] lg:text-[44px] text-ink tracking-tight leading-[1.05]">
          Open your
          <br />
          case file.
        </h1>
        <p className="mt-5 max-w-sm text-[15px] text-muted-strong leading-relaxed">
          Three short steps. Your resume seeds the profile so we don't ask for
          things we can already read.
        </p>

        <ol className="mt-12 space-y-px bg-rule border border-rule">
          {STEPS.map((s) => {
            const active = step === s.key;
            const done =
              (s.key === "identity" && identity) ||
              (s.key === "security" && credentials) ||
              (s.key === "resume" && resume);
            return (
              <li
                key={s.key}
                className={cn(
                  "bg-canvas px-5 py-4 flex items-center gap-4 transition-colors",
                  active ? "bg-accent-soft" : done ? "bg-paper-soft" : ""
                )}
              >
                <span
                  className={cn(
                    "font-mono text-[11px] tracking-[0.14em] tnum w-6",
                    active
                      ? "text-accent"
                      : done
                      ? "text-ink-soft"
                      : "text-muted"
                  )}
                >
                  {s.number}
                </span>
                <span
                  className={cn(
                    "h-px w-6 shrink-0",
                    active ? "bg-accent" : "bg-rule-strong"
                  )}
                />
                <span
                  className={cn(
                    "text-[15px]",
                    active
                      ? "text-ink font-medium"
                      : done
                      ? "text-ink-soft"
                      : "text-muted"
                  )}
                >
                  {s.label}
                </span>
              </li>
            );
          })}
        </ol>

        <div className="mt-10 pt-6 border-t border-rule dateline">
          Already registered?&nbsp;
          <Link
            href="/auth/login"
            className="text-ink-soft underline underline-offset-4 decoration-rule-strong hover:decoration-accent"
          >
            Sign in
          </Link>
        </div>
      </aside>

      {/* Right: active step panel */}
      <div className="min-w-0 max-w-2xl">
        {step === "identity" && (
          <FadeIn key="identity">
            <div className="bg-canvas border border-rule shadow-dossier">
              <PanelHeader number="01" title="Identity" caption="Your name and how we reach you." />
              <form
                onSubmit={identityForm.handleSubmit(onIdentitySubmit)}
                className="px-7 md:px-9 py-8 space-y-5"
              >
                <Field
                  label="Full name"
                  required
                  error={identityForm.formState.errors.fullName?.message}
                >
                  <Input
                    autoFocus
                    autoComplete="name"
                    placeholder="e.g. Alex Morgan"
                    {...identityForm.register("fullName")}
                  />
                </Field>

                <Field
                  label="Email"
                  required
                  help="We send your case summaries and important document reminders here."
                  error={identityForm.formState.errors.email?.message}
                >
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    {...identityForm.register("email")}
                  />
                </Field>

                <Field
                  label="Phone"
                  required
                  help="Include your country code."
                  error={identityForm.formState.errors.phone?.message}
                >
                  <Input
                    type="tel"
                    autoComplete="tel"
                    placeholder="+1 (555) 010-1234"
                    {...identityForm.register("phone")}
                  />
                </Field>

                <FormNav
                  backLabel="Cancel"
                  backHref="/"
                  primaryLabel="Continue"
                  primaryDisabled={identityForm.formState.isSubmitting}
                />
              </form>
            </div>
          </FadeIn>
        )}

        {step === "security" && (
          <FadeIn key="security">
            <div className="bg-canvas border border-rule shadow-dossier">
              <PanelHeader
                number="02"
                title="Security"
                caption="Create a strong password. We hash it server-side — never stored in the clear."
              />
              <form
                onSubmit={credentialsForm.handleSubmit(onCredentialsSubmit)}
                className="px-7 md:px-9 py-8 space-y-5"
              >
                <Field
                  label="Password"
                  required
                  help="At least 10 characters, mixed case, and a number."
                  error={credentialsForm.formState.errors.password?.message}
                >
                  <Input
                    type="password"
                    autoComplete="new-password"
                    autoFocus
                    placeholder="••••••••••"
                    {...credentialsForm.register("password")}
                  />
                </Field>

                <Field
                  label="Confirm password"
                  required
                  error={credentialsForm.formState.errors.confirmPassword?.message}
                >
                  <Input
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••••••"
                    {...credentialsForm.register("confirmPassword")}
                  />
                </Field>

                <div className="mt-3 flex items-start gap-3 bg-paper-soft border border-rule p-4">
                  <Lock
                    className="shrink-0 size-4 mt-0.5 text-accent-ink"
                    strokeWidth={1.75}
                  />
                  <p className="text-[13.5px] text-ink-soft leading-relaxed">
                    Your dossier is tied to this account. Choose something you
                    won't need to reset often — we keep case data for years.
                  </p>
                </div>

                <FormNav
                  backLabel="Back"
                  onBack={() => setStep("identity")}
                  primaryLabel="Continue"
                  primaryDisabled={credentialsForm.formState.isSubmitting}
                />
              </form>
            </div>
          </FadeIn>
        )}

        {step === "resume" && (
          <FadeIn key="resume">
            <div className="bg-canvas border border-rule shadow-dossier">
              <PanelHeader
                number="03"
                title="Resume"
                caption="We read role, experience, employer, education, and languages from here — so the rest of the flow is short."
              />
              <div className="px-7 md:px-9 py-8">
                <ResumeDropzone
                  value={resume}
                  onUploaded={(meta) => {
                    setLocalResume(meta);
                    setResume(meta);
                  }}
                  onCleared={() => {
                    setLocalResume(undefined);
                  }}
                />

                <ul className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-2">
                  {[
                    "Role + seniority",
                    "Employer history",
                    "Years of experience",
                    "Education level",
                    "Languages known",
                    "Industry + tools",
                  ].map((t) => (
                    <li
                      key={t}
                      className="flex items-center gap-2.5 text-[13.5px] text-muted-strong"
                    >
                      <span className="size-[3px] bg-ink" />
                      {t}
                    </li>
                  ))}
                </ul>

                {submitError ? (
                  <div className="mt-5 bg-danger-soft border border-danger/30 text-danger text-[14px] p-3.5">
                    {submitError}
                  </div>
                ) : null}

                <div className="mt-8 flex items-center justify-between border-t border-rule pt-6">
                  <button
                    type="button"
                    onClick={() => setStep("security")}
                    className="inline-flex items-center gap-2 text-[14px] text-ink-soft hover:text-ink transition-colors"
                  >
                    <ArrowLeft className="size-4" strokeWidth={1.5} />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={finish}
                    disabled={!resume || finishing}
                    className="inline-flex h-14 items-center px-8 text-[15px] text-paper bg-accent hover:bg-accent-ink disabled:bg-rule-strong disabled:cursor-not-allowed transition-colors"
                  >
                    {finishing
                      ? "Creating your case file…"
                      : resume
                      ? "Finish · Begin assessment"
                      : "Upload a resume to continue"}
                    {!finishing && resume ? (
                      <ArrowRight className="ml-2 size-4" strokeWidth={1.5} />
                    ) : null}
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
}

function PanelHeader({
  number,
  title,
  caption,
}: {
  number: string;
  title: string;
  caption: string;
}) {
  return (
    <div className="px-7 md:px-9 pt-7 pb-5 border-b border-rule bg-paper-soft/60">
      <div className="flex items-center gap-3 mb-3">
        <span className="font-mono text-[11px] tracking-[0.14em] text-muted tnum">
          STEP {number}
        </span>
        <span className="h-px w-8 bg-rule-strong" />
      </div>
      <div className="font-display text-[26px] text-ink tracking-tight leading-tight">
        {title}
      </div>
      <p className="mt-1.5 text-[14px] text-muted-strong leading-relaxed max-w-lg">
        {caption}
      </p>
    </div>
  );
}

function FormNav({
  backLabel,
  backHref,
  onBack,
  primaryLabel,
  primaryDisabled,
}: {
  backLabel: string;
  backHref?: string;
  onBack?: () => void;
  primaryLabel: string;
  primaryDisabled?: boolean;
}) {
  return (
    <div className="mt-6 flex items-center justify-between border-t border-rule pt-6">
      {backHref ? (
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-[14px] text-ink-soft hover:text-ink transition-colors"
        >
          <ArrowLeft className="size-4" strokeWidth={1.5} />
          {backLabel}
        </Link>
      ) : (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-[14px] text-ink-soft hover:text-ink transition-colors"
        >
          <ArrowLeft className="size-4" strokeWidth={1.5} />
          {backLabel}
        </button>
      )}
      <button
        type="submit"
        disabled={primaryDisabled}
        className="inline-flex h-12 items-center px-7 text-[15px] text-paper bg-ink hover:bg-accent-ink disabled:bg-rule-strong transition-colors"
      >
        {primaryLabel}
        <ArrowRight className="ml-2 size-4" strokeWidth={1.5} />
      </button>
    </div>
  );
}
