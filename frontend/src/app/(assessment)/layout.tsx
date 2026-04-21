"use client";

import { usePathname } from "next/navigation";
import { TopNav } from "@/components/shell/top-nav";
import { Stepper, ASSESSMENT_STEPS } from "@/components/patterns/stepper";

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
  const activeKey = keyForPath(pathname);

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
