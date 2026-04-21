"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { TopNav } from "@/components/shell/top-nav";
import { Stepper, ASSESSMENT_STEPS } from "@/components/patterns/stepper";
import { useAuthStore } from "@/lib/state/auth-store";

function keyForPath(path: string): string {
  if (path.includes("/intake")) return "intake";
  if (path.includes("/refine")) return "refine";
  if (path.includes("/review")) return "review";
  if (path.includes("/analyzing")) return "analyzing";
  return "intent";
}

export default function AssessmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const activeKey = keyForPath(pathname);

  // Gate the assessment flow behind authentication — the new canonical entry
  // point is /auth/register. Signed-out visitors are redirected there so the
  // resume-driven path is preserved.
  useEffect(() => {
    if (user === undefined) {
      // Zustand is hydrating — wait a tick.
      const id = setTimeout(() => {
        if (!useAuthStore.getState().user) {
          router.replace("/auth/register");
        }
      }, 60);
      return () => clearTimeout(id);
    }
  }, [user, router]);

  return (
    <>
      <TopNav />
      <Stepper steps={ASSESSMENT_STEPS} activeKey={activeKey} />
      <main className="mx-auto max-w-[1280px] px-6 md:px-10 py-10 md:py-14">
        {children}
      </main>
    </>
  );
}
