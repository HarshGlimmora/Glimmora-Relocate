"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getCase,
  getCultural,
  getDocuments,
  getFinance,
  getJobs,
  getProgress,
  getRelocation,
  getResults,
  getTimeline,
  listCases,
} from "@/lib/api/cases";

export function useCase(caseId: string | undefined) {
  return useQuery({
    queryKey: ["case", caseId],
    queryFn: () => getCase(caseId!),
    enabled: Boolean(caseId),
  });
}

export function useResults(caseId: string | undefined) {
  return useQuery({
    queryKey: ["results", caseId],
    queryFn: () => getResults(caseId!),
    enabled: Boolean(caseId),
  });
}

export function useProgress(caseId: string | undefined, polling = true) {
  return useQuery({
    queryKey: ["progress", caseId],
    queryFn: () => getProgress(caseId!),
    enabled: Boolean(caseId),
    refetchInterval: polling ? 1200 : false,
  });
}

export const useJobs = (id?: string) =>
  useQuery({ queryKey: ["jobs", id], queryFn: () => getJobs(id!), enabled: !!id });
export const useRelocation = (id?: string) =>
  useQuery({ queryKey: ["reloc", id], queryFn: () => getRelocation(id!), enabled: !!id });
export const useFinance = (id?: string) =>
  useQuery({ queryKey: ["fin", id], queryFn: () => getFinance(id!), enabled: !!id });
export const useDocuments = (id?: string) =>
  useQuery({ queryKey: ["docs", id], queryFn: () => getDocuments(id!), enabled: !!id });
export const useTimeline = (id?: string) =>
  useQuery({ queryKey: ["tl", id], queryFn: () => getTimeline(id!), enabled: !!id });
export const useCultural = (id?: string) =>
  useQuery({ queryKey: ["cult", id], queryFn: () => getCultural(id!), enabled: !!id });

export const useCaseList = () =>
  useQuery({ queryKey: ["case-list"], queryFn: listCases });
