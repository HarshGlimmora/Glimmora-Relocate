"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SectionLabel } from "@/components/patterns/section-label";
import { Field, Input } from "@/components/ui/input";
import { FadeIn } from "@/components/motion/fade-in";
import { loginSchema, type LoginFormValues } from "@/lib/schemas/auth";
import { login } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/state/auth-store";

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const [submitError, setSubmitError] = useState<string | undefined>();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: true },
  });

  const onSubmit = async (v: LoginFormValues) => {
    setSubmitError(undefined);
    try {
      const user = await login(v);
      setUser(user);
      router.push("/cases");
    } catch {
      setSubmitError("We couldn't sign you in with those details.");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-12 lg:gap-24 items-start">
      {/* Left: editorial brief */}
      <FadeIn>
        <SectionLabel className="mb-6">Returning client</SectionLabel>
        <h1 className="font-display text-display-xl text-ink tracking-tight leading-[1.04]">
          Welcome back.
        </h1>
        <p className="mt-6 max-w-md text-[17px] text-ink-soft leading-[1.65]">
          Sign in to reopen your case files, continue an assessment in progress,
          or begin a new dossier.
        </p>

        <div className="mt-12 space-y-5 max-w-md">
          <Pillar
            number="I"
            title="Everything where you left it"
            body="Cases, document status, and timeline progress persist across sessions."
          />
          <Pillar
            number="II"
            title="Private by design"
            body="Your dossier is tied to your account — no broadcast, no shared visibility."
          />
        </div>
      </FadeIn>

      {/* Right: login panel */}
      <FadeIn delay={0.08}>
        <div className="bg-canvas border border-rule shadow-dossier">
          <div className="px-7 py-5 border-b border-rule bg-paper-soft flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Lock className="size-4 text-accent-ink" strokeWidth={1.75} />
              <span className="label">Authenticate</span>
            </div>
            <span className="dateline">GLM-SEC-01</span>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="px-7 py-8 space-y-5">
            <Field
              label="Email"
              required
              error={form.formState.errors.email?.message}
            >
              <Input
                type="email"
                autoComplete="email"
                autoFocus
                placeholder="you@example.com"
                {...form.register("email")}
              />
            </Field>

            <Field
              label="Password"
              required
              error={form.formState.errors.password?.message}
            >
              <Input
                type="password"
                autoComplete="current-password"
                placeholder="••••••••••"
                {...form.register("password")}
              />
            </Field>

            <label className="flex items-center justify-between pt-2">
              <span className="flex items-center gap-3 text-[14px] text-ink-soft cursor-pointer">
                <input
                  type="checkbox"
                  {...form.register("remember")}
                  className="size-4 border border-rule-strong accent-accent"
                />
                Remember this device
              </span>
              <Link
                href="/auth/login"
                className="text-[13px] text-muted-strong hover:text-ink underline underline-offset-4 decoration-rule-strong"
              >
                Forgot password?
              </Link>
            </label>

            {submitError ? (
              <div className="bg-danger-soft border border-danger/30 text-danger text-[14px] p-3.5">
                {submitError}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="mt-2 inline-flex h-14 w-full items-center justify-center gap-2 text-[15px] text-paper bg-ink hover:bg-accent-ink disabled:bg-rule-strong transition-colors"
            >
              {form.formState.isSubmitting ? "Verifying…" : "Sign in"}
              {!form.formState.isSubmitting ? (
                <ArrowRight className="size-4" strokeWidth={1.5} />
              ) : null}
            </button>

            <div className="pt-5 border-t border-rule text-center">
              <span className="text-[13.5px] text-muted">
                New to Glimmora?&nbsp;
              </span>
              <Link
                href="/auth/register"
                className="text-[13.5px] text-accent-ink underline underline-offset-4 decoration-rule-strong hover:decoration-accent"
              >
                Create an account
              </Link>
            </div>
          </form>
        </div>
      </FadeIn>
    </div>
  );
}

function Pillar({ number, title, body }: { number: string; title: string; body: string }) {
  return (
    <div className="flex gap-5">
      <span className="font-mono text-[11px] tracking-[0.14em] tnum text-muted pt-[5px] min-w-6">
        {number}
      </span>
      <div>
        <div className="font-display text-[18px] text-ink tracking-tight leading-snug">
          {title}
        </div>
        <p className="mt-1.5 text-[14px] text-muted-strong leading-relaxed">{body}</p>
      </div>
    </div>
  );
}
