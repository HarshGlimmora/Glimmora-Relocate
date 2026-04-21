// Non-color tokens that components reference programmatically.
// Color tokens live in globals.css as CSS custom properties.

export const JOURNEYS = {
  find_better_job_abroad: "Find a better job abroad",
  relocate_with_offer: "Relocate with a job in hand",
  compare_countries: "Compare countries",
  check_feasibility: "Check if a move is feasible",
  prepare_documents: "Prepare documents and timeline",
} as const;

export type JourneyKey = keyof typeof JOURNEYS;

export const STAGE_ORDER = [
  "intake",
  "intent",
  "job",
  "relocation",
  "financial",
  "document",
  "cultural",
  "timeline",
  "recommendation",
  "summary",
] as const;

export const STAGE_LABELS: Record<(typeof STAGE_ORDER)[number], string> = {
  intake: "Validating profile",
  intent: "Detecting intent",
  job: "Checking job fit",
  relocation: "Assessing destination",
  financial: "Calculating feasibility",
  document: "Generating checklist",
  cultural: "Drafting cultural prep",
  timeline: "Building timeline",
  recommendation: "Compiling recommendations",
  summary: "Assembling dossier",
};

export const DETAIL_MODULES = [
  { key: "jobs", label: "Job intelligence", href: "jobs" },
  { key: "relocation", label: "Relocation fit", href: "relocation" },
  { key: "financial", label: "Financial view", href: "financial" },
  { key: "documents", label: "Documents", href: "documents" },
  { key: "timeline", label: "Timeline", href: "timeline" },
  { key: "cultural", label: "Cultural prep", href: "cultural" },
] as const;
