"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileSchema,
  type ProfileFormValues,
} from "@/lib/schemas/profile";
import { SectionLabel } from "@/components/patterns/section-label";
import { Field, Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAssessmentStore } from "@/lib/state/assessment-store";

const COUNTRIES = [
  ["US", "United States"],
  ["GB", "United Kingdom"],
  ["IN", "India"],
  ["DE", "Germany"],
  ["NL", "Netherlands"],
  ["PT", "Portugal"],
  ["CA", "Canada"],
  ["AU", "Australia"],
  ["SG", "Singapore"],
  ["AE", "United Arab Emirates"],
  ["IE", "Ireland"],
];

const STORAGE_DEFAULTS: Partial<ProfileFormValues> = {
  currentCountry: "",
  currentCity: "",
  targetCountries: [],
  targetCity: "",
  undecided: false,
  role: "",
  yearsExperience: 0,
  currentSalary: { amount: 0, currency: "USD" },
  workPreference: "hybrid",
  familyStatus: "single",
  childrenCount: undefined,
  urgency: "6m",
  visaStatus: "",
  priority: "stability",
};

export default function IntakePage() {
  const router = useRouter();
  const { profile, patchProfile } = useAssessmentStore();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { ...STORAGE_DEFAULTS, ...profile },
    mode: "onBlur",
  });

  const [openSection, setOpenSection] = useState<"a" | "b" | "c">("a");

  const aComplete =
    !!form.watch("currentCountry") &&
    (form.watch("undecided") || form.watch("targetCountries")?.length > 0);
  const bComplete =
    !!form.watch("role") &&
    Number(form.watch("yearsExperience") ?? 0) >= 0 &&
    Number(form.watch("currentSalary")?.amount ?? 0) > 0;

  const onSubmit = (v: ProfileFormValues) => {
    patchProfile(v);
    router.push("/refine");
  };

  return (
    <div className="max-w-4xl">
      <SectionLabel number="02" className="mb-6">
        Profile
      </SectionLabel>

      <h1 className="font-display text-display-xl text-ink tracking-tight leading-[1.05]">
        Tell us what we need,
        <br />
        nothing more.
      </h1>
      <p className="mt-5 max-w-2xl text-[16px] text-muted-strong leading-relaxed">
        Three short sections. We infer as much as we can — defaults are
        reasonable.
      </p>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-12 space-y-4"
      >
        {/* SECTION A — Direction */}
        <Section
          number="A"
          title="Direction"
          caption="Where you are, and where you're considering."
          open={openSection === "a"}
          onToggle={() => setOpenSection("a")}
          complete={aComplete}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Current country" required>
              <Controller
                control={form.control}
                name="currentCountry"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRIES.map(([code, name]) => (
                        <SelectItem key={code} value={code}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>

            <Field
              label="Current city"
              help="Helps us price your current cost baseline more accurately."
            >
              <Input placeholder="e.g. Bangalore" {...form.register("currentCity")} />
            </Field>

            <Field label="Primary target country" help="Pick the likeliest one — you can add more later.">
              <Controller
                control={form.control}
                name="targetCountries"
                render={({ field }) => {
                  const v = field.value?.[0] ?? "";
                  return (
                    <Select
                      value={v}
                      onValueChange={(val) => field.onChange([val])}
                      disabled={form.watch("undecided")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={form.watch("undecided") ? "Undecided" : "Select country"} />
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTRIES.filter(
                          ([c]) => c !== form.watch("currentCountry")
                        ).map(([code, name]) => (
                          <SelectItem key={code} value={code}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  );
                }}
              />
            </Field>

            <Field
              label="Target city"
              help="Optional — if you have one in mind. We'll use the country otherwise."
            >
              <Input
                placeholder="e.g. Berlin"
                disabled={form.watch("undecided")}
                {...form.register("targetCity")}
              />
            </Field>
          </div>

          <label className="mt-6 inline-flex items-center gap-3 text-[14px] text-ink-soft cursor-pointer">
            <input
              type="checkbox"
              {...form.register("undecided")}
              className="size-4 border border-rule-strong accent-accent"
            />
            I'm not decided yet — compare options for me.
          </label>
        </Section>

        {/* SECTION B — Career */}
        <Section
          number="B"
          title="Career"
          caption="Your role, experience, and what you earn today."
          open={openSection === "b"}
          onToggle={() => setOpenSection("b")}
          complete={bComplete}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <Field
              label="Current role"
              help="A freeform title is fine — we'll canonicalize it."
              required
              error={form.formState.errors.role?.message}
            >
              <Input
                {...form.register("role")}
                placeholder="e.g. Senior Backend Engineer"
              />
            </Field>

            <Field label="Years of experience" required>
              <Input
                type="number"
                min={0}
                max={60}
                {...form.register("yearsExperience", { valueAsNumber: true })}
              />
            </Field>

            <Field label="Current annual salary" required>
              <div className="grid grid-cols-[88px_1fr] gap-0">
                <Controller
                  control={form.control}
                  name="currentSalary.currency"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="border-r-0 rounded-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["USD", "EUR", "GBP", "INR", "AED", "SGD"].map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <Input
                  type="number"
                  min={0}
                  className="rounded-none"
                  placeholder="Amount"
                  {...form.register("currentSalary.amount", { valueAsNumber: true })}
                />
              </div>
            </Field>

            <Field label="Target annual salary" help="Optional — we'll use your current if blank.">
              <div className="grid grid-cols-[88px_1fr] gap-0">
                <Controller
                  control={form.control}
                  name="targetSalary.currency"
                  render={({ field }) => (
                    <Select value={field.value ?? "USD"} onValueChange={field.onChange}>
                      <SelectTrigger className="border-r-0 rounded-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["USD", "EUR", "GBP", "INR", "AED", "SGD"].map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <Input
                  type="number"
                  min={0}
                  className="rounded-none"
                  placeholder="Amount"
                  {...form.register("targetSalary.amount", { valueAsNumber: true })}
                />
              </div>
            </Field>

            <Field label="Work preference">
              <Controller
                control={form.control}
                name="workPreference"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="onsite">On-site</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="any">Any</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>

            <Field label="Visa status or awareness" help="Optional. A best guess is fine.">
              <Input
                placeholder="e.g. none, EU Blue Card eligible"
                {...form.register("visaStatus")}
              />
            </Field>
          </div>
        </Section>

        {/* SECTION C — Life */}
        <Section
          number="C"
          title="Life"
          caption="Family, urgency, and what you're optimizing for."
          open={openSection === "c"}
          onToggle={() => setOpenSection("c")}
          complete={false}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Family status">
              <Controller
                control={form.control}
                name="familyStatus"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="couple">Couple</SelectItem>
                      <SelectItem value="family_with_kids">Family with children</SelectItem>
                      <SelectItem value="extended">Extended family</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>

            {form.watch("familyStatus") === "family_with_kids" ? (
              <Field
                label="Children moving with you"
                help="Affects school availability, dependent visas, and housing size."
              >
                <Input
                  type="number"
                  min={1}
                  max={10}
                  placeholder="e.g. 2"
                  {...form.register("childrenCount", { valueAsNumber: true })}
                />
              </Field>
            ) : null}

            <Field label="Move urgency">
              <Controller
                control={form.control}
                name="urgency"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediately</SelectItem>
                      <SelectItem value="3m">Within three months</SelectItem>
                      <SelectItem value="6m">Within six months</SelectItem>
                      <SelectItem value="12m+">Twelve months or later</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>

            <Field label="What matters most?">
              <Controller
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salary">Salary upgrade</SelectItem>
                      <SelectItem value="lifestyle">Lifestyle</SelectItem>
                      <SelectItem value="stability">Long-term stability</SelectItem>
                      <SelectItem value="speed">Moving quickly</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>

            <Field label="Relocation budget ceiling" help="Optional. A rough number helps the plan.">
              <div className="grid grid-cols-[88px_1fr] gap-0">
                <Controller
                  control={form.control}
                  name="budgetCeiling.currency"
                  render={({ field }) => (
                    <Select value={field.value ?? "USD"} onValueChange={field.onChange}>
                      <SelectTrigger className="border-r-0 rounded-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["USD", "EUR", "GBP", "INR"].map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <Input
                  type="number"
                  min={0}
                  className="rounded-none"
                  placeholder="Amount"
                  {...form.register("budgetCeiling.amount", { valueAsNumber: true })}
                />
              </div>
            </Field>
          </div>
        </Section>

        <div className="flex items-center justify-between border-t border-rule pt-8">
          <button
            type="button"
            onClick={() => router.push("/intent")}
            className="inline-flex items-center gap-2 text-[13.5px] text-ink-soft hover:text-ink transition-colors"
          >
            <ArrowLeft className="size-4" strokeWidth={1.5} />
            Back
          </button>
          <button
            type="submit"
            className="inline-flex h-12 items-center px-7 text-[14px] text-paper bg-ink hover:bg-accent-ink transition-colors"
          >
            Continue
            <ArrowRight className="ml-2 size-4" strokeWidth={1.5} />
          </button>
        </div>
      </form>
    </div>
  );
}

function Section({
  number,
  title,
  caption,
  open,
  onToggle,
  complete,
  children,
}: {
  number: string;
  title: string;
  caption: string;
  open: boolean;
  onToggle: () => void;
  complete: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-canvas border border-rule">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-6 px-6 py-5 text-left"
      >
        <div className="flex items-center gap-5">
          <span className="font-mono text-[11px] tracking-[0.14em] text-muted tnum">
            SECTION {number}
          </span>
          <div>
            <div className="font-display text-[20px] text-ink tracking-tight leading-tight">
              {title}
            </div>
            <div className="mt-0.5 text-[12.5px] text-muted-strong">{caption}</div>
          </div>
        </div>
        <span
          className={`font-mono text-[10.5px] tracking-[0.14em] uppercase ${
            complete ? "text-success" : "text-muted"
          }`}
        >
          {complete ? "Captured" : open ? "Open" : "Tap to open"}
        </span>
      </button>
      {open ? (
        <div className="border-t border-rule px-6 py-7 animate-rise-in">
          {children}
        </div>
      ) : null}
    </div>
  );
}
