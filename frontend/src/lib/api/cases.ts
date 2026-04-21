import { apiFetch, isMock } from "./client";
import type {
  CaseEnvelope,
  ProgressSnapshot,
  JobsModule,
  RelocationModule,
  FinancialModule,
  DocumentModule,
  TimelineModule,
  CulturalModule,
  Intent,
} from "@/lib/types/case";
import { MOCK_CASE, MOCK_CASE_LIST, makeMockProgress } from "./mock-data";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function createCase(): Promise<{ caseId: string }> {
  if (isMock()) {
    await delay(240);
    return { caseId: MOCK_CASE.caseId };
  }
  return apiFetch<{ caseId: string }>(`/cases`, { method: "POST" });
}

export async function submitIntake(
  caseId: string,
  profile: Record<string, unknown>
): Promise<{ ok: true }> {
  if (isMock()) {
    await delay(260);
    return { ok: true };
  }
  return apiFetch(`/cases/${caseId}/intake`, {
    method: "POST",
    body: JSON.stringify(profile),
  });
}

export async function inferIntent(
  caseId: string,
  freeform?: string
): Promise<Intent> {
  if (isMock()) {
    await delay(220);
    return MOCK_CASE.intent;
  }
  return apiFetch(`/cases/${caseId}/infer-intent`, {
    method: "POST",
    body: JSON.stringify({ freeform }),
  });
}

export async function runAnalysis(caseId: string): Promise<{ ok: true }> {
  if (isMock()) {
    await delay(280);
    return { ok: true };
  }
  return apiFetch(`/cases/${caseId}/run-analysis`, { method: "POST" });
}

export async function getCase(caseId: string): Promise<CaseEnvelope> {
  if (isMock()) {
    await delay(180);
    return MOCK_CASE;
  }
  return apiFetch(`/cases/${caseId}`);
}

export async function getResults(caseId: string): Promise<CaseEnvelope> {
  if (isMock()) {
    await delay(180);
    return MOCK_CASE;
  }
  return apiFetch(`/cases/${caseId}/results`);
}

export async function getProgress(caseId: string): Promise<ProgressSnapshot> {
  if (isMock()) {
    await delay(120);
    return makeMockProgress();
  }
  return apiFetch(`/cases/${caseId}/progress`);
}

export async function getJobs(caseId: string): Promise<JobsModule> {
  if (isMock()) {
    await delay(140);
    return MOCK_CASE.modules.jobs!;
  }
  return apiFetch(`/cases/${caseId}/jobs`);
}

export async function getRelocation(
  caseId: string
): Promise<RelocationModule> {
  if (isMock()) {
    await delay(140);
    return MOCK_CASE.modules.relocation!;
  }
  return apiFetch(`/cases/${caseId}/relocation`);
}

export async function getFinance(caseId: string): Promise<FinancialModule> {
  if (isMock()) {
    await delay(140);
    return MOCK_CASE.modules.financial!;
  }
  return apiFetch(`/cases/${caseId}/finance`);
}

export async function getDocuments(caseId: string): Promise<DocumentModule> {
  if (isMock()) {
    await delay(140);
    return MOCK_CASE.modules.documents!;
  }
  return apiFetch(`/cases/${caseId}/documents`);
}

export async function getTimeline(caseId: string): Promise<TimelineModule> {
  if (isMock()) {
    await delay(140);
    return MOCK_CASE.modules.timeline!;
  }
  return apiFetch(`/cases/${caseId}/timeline`);
}

export async function getCultural(caseId: string): Promise<CulturalModule> {
  if (isMock()) {
    await delay(140);
    return MOCK_CASE.modules.cultural!;
  }
  return apiFetch(`/cases/${caseId}/cultural`);
}

export async function listCases() {
  if (isMock()) {
    await delay(120);
    return MOCK_CASE_LIST;
  }
  return apiFetch<typeof MOCK_CASE_LIST>(`/cases`);
}
