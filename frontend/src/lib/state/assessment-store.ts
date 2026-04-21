"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { JourneyType } from "@/lib/types/case";
import type {
  ProfileFormValues,
  RefinementFormValues,
} from "@/lib/schemas/profile";

interface AssessmentState {
  journey?: JourneyType;
  profile?: Partial<ProfileFormValues>;
  refinement?: Partial<RefinementFormValues>;
  caseId?: string;

  setJourney: (j: JourneyType) => void;
  patchProfile: (p: Partial<ProfileFormValues>) => void;
  patchRefinement: (r: Partial<RefinementFormValues>) => void;
  setCaseId: (id: string) => void;
  reset: () => void;
}

export const useAssessmentStore = create<AssessmentState>()(
  persist(
    (set) => ({
      setJourney: (journey) => set({ journey }),
      patchProfile: (p) =>
        set((s) => ({ profile: { ...(s.profile ?? {}), ...p } })),
      patchRefinement: (r) =>
        set((s) => ({ refinement: { ...(s.refinement ?? {}), ...r } })),
      setCaseId: (caseId) => set({ caseId }),
      reset: () =>
        set({
          journey: undefined,
          profile: undefined,
          refinement: undefined,
          caseId: undefined,
        }),
    }),
    {
      name: "glimmora.assessment",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
