"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ResumeMeta } from "@/lib/schemas/auth";

export interface AuthUser {
  userId: string;        // server-issued
  fullName: string;
  email: string;
  phone: string;
  accountStatus: "active" | "pending" | "suspended";
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user?: AuthUser;
  resume?: ResumeMeta;

  setUser: (u: AuthUser) => void;
  setResume: (r: ResumeMeta) => void;
  clearResume: () => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      setUser: (user) => set({ user }),
      setResume: (resume) => set({ resume }),
      clearResume: () => set({ resume: undefined }),
      signOut: () => set({ user: undefined, resume: undefined }),
    }),
    {
      name: "glimmora.auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
