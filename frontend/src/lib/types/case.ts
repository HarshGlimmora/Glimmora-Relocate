// Shared frontend types — mirror backend schemas but stay frontend-friendly.
// These are the shapes returned by the API layer (see lib/api/cases.ts).

export type JourneyType =
  | "find_better_job_abroad"
  | "relocate_with_offer"
  | "compare_countries"
  | "check_feasibility"
  | "prepare_documents";

export type CaseStatus = "running" | "ok" | "partial" | "failed" | "archived";

export type RiskSeverity = "low" | "medium" | "high";
export type Tone = "positive" | "neutral" | "warning" | "negative";

export interface Money {
  amount: number;
  currency: string;
}

export interface UserProfile {
  profileId: string;
  currentCountry: string;
  targetCountries: string[];
  role: string;
  roleCategory: string;
  yearsExperience: number;
  experienceLevel: "junior" | "mid" | "senior" | "lead" | "principal";
  currentSalary: Money;
  targetSalary?: Money;
  familyStatus: "single" | "couple" | "family_with_kids" | "extended";
  urgency: "immediate" | "3m" | "6m" | "12m+";
  visaStatus?: string;
  budgetCeiling?: Money;
  workPreference: "onsite" | "hybrid" | "remote" | "any";
  relocationWillingness: number;
  priority?: "salary" | "lifestyle" | "stability" | "speed";
  notes?: string;
}

export interface Intent {
  journey: JourneyType;
  confidence: number;
  reasoning?: string;
}

export interface ModuleBase {
  status: "ok" | "partial" | "failed" | "not_run";
  score: number;
  summary: string;
  reasoning?: string[];
  risks?: { severity: RiskSeverity; message: string }[];
  nextActions?: string[];
  confidence?: number;
  metadata?: Record<string, unknown>;
}

export interface JobMatch {
  jobId: string;
  title: string;
  company: string;
  city: string;
  country: string;
  salary: { min: number; max: number; currency: string };
  score: number;
  seniority: string;
  visaSponsorship: boolean;
  remoteOk: boolean;
  rank: number;
  strengths: string[];
  gaps: string[];
  why: string;
}

export interface JobsModule extends ModuleBase {
  matches: JobMatch[];
  totalConsidered: number;
}

export interface RelocationDestination {
  country: string;
  city?: string;
  overall: number;
  dimensions: { name: string; score: number; evidence: string[] }[];
  frictions: { code: string; severity: RiskSeverity; note: string }[];
}

export interface RelocationModule extends ModuleBase {
  top: RelocationDestination;
  destinations: RelocationDestination[];
  comparisonNotes: string[];
}

export interface FinancialModule extends ModuleBase {
  salaryVsCost: number;
  monthlyCost: {
    rent: Money;
    food: Money;
    transport: Money;
    utilities: Money;
    healthcare: Money;
    other: Money;
    total: Money;
  };
  monthlySurplus: Money;
  runwayMonths: number;
  affordabilityBand: "comfortable" | "tight" | "risky" | "not_viable";
  relocationCostTotal: Money;
  assumptions: string[];
}

export interface DocItem {
  docId: string;
  label: string;
  category: "identity" | "employment" | "education" | "financial" | "residence" | "other";
  status: "required" | "missing" | "ok" | "expiring" | "not_applicable";
  requiredFor: string[];
  expiresOn?: string;
  howToObtain?: string;
}

export interface DocumentModule extends ModuleBase {
  items: DocItem[];
  readinessPct: number;
  blockingMissing: string[];
  expiringSoon: string[];
}

export interface Milestone {
  milestoneId: string;
  title: string;
  category: "APPLICATION" | "DOCUMENT" | "VISA" | "HOUSING" | "JOB" | "MOVE" | "SETTLEMENT";
  dependsOn: string[];
  earliestStart: string;
  earliestFinish: string;
  latestFinish?: string;
  durationDays: number;
  critical: boolean;
  status: "not_started" | "in_progress" | "blocked" | "done";
}

export interface TimelineModule extends ModuleBase {
  milestones: Milestone[];
  criticalPath: string[];
  earliestMoveDate: string;
  latestMoveDate: string;
  totalWeeks: number;
}

export interface CulturalModule extends ModuleBase {
  country: string;
  languageBasics: { phrase: string; translation: string; context: string }[];
  workplaceEtiquette: { topic: string; do: string[]; dont: string[] }[];
  socialEtiquette: { topic: string; do: string[]; dont: string[] }[];
  communicationStyle: string;
  firstWeek: { day: number; task: string; whyItMatters: string }[];
  dosAndDonts: string[];
}

export interface CaseSummary {
  caseId: string;
  headline: string;
  verdict: "go" | "go_with_caveats" | "delay" | "reconsider";
  heroMetrics: { label: string; value: string; tone: Tone }[];
  topWarnings: string[];
  nextActions: string[];
  narrative: string;
  degraded: boolean;
  generatedAt: string;
}

export interface CaseEnvelope {
  caseId: string;
  profileId: string;
  intent: Intent;
  status: CaseStatus;
  profile: UserProfile;
  summary?: CaseSummary;
  modules: {
    jobs?: JobsModule;
    relocation?: RelocationModule;
    financial?: FinancialModule;
    documents?: DocumentModule;
    timeline?: TimelineModule;
    cultural?: CulturalModule;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ProgressSnapshot {
  caseId: string;
  overallStatus: CaseStatus;
  stages: {
    stage: string;
    status: "pending" | "running" | "ok" | "skipped" | "failed";
    startedAt?: string;
    finishedAt?: string;
  }[];
}

export interface ApiError {
  message: string;
  code: string;
  recoverable: boolean;
  details?: string;
  fieldErrors?: Record<string, string>;
}
