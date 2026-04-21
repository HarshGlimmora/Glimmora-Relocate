"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DETAIL_MODULES } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

export function CaseSidebar({ caseId }: { caseId: string }) {
  const pathname = usePathname();
  const basePath = `/cases/${caseId}`;

  const items = [
    { label: "Dossier", href: basePath, exact: true },
    ...DETAIL_MODULES.map((m) => ({
      label: m.label,
      href: `${basePath}/${m.href}`,
      exact: false,
    })),
  ];

  return (
    <aside className="w-full lg:w-[230px] lg:shrink-0">
      <div className="lg:sticky lg:top-24">
        <div className="label mb-4 pl-3">Case modules</div>
        <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible -mx-3 px-3 lg:mx-0 lg:px-0">
          {items.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 px-3 py-2.5 text-[13.5px] whitespace-nowrap lg:whitespace-normal transition-colors",
                  active
                    ? "text-ink bg-canvas lg:bg-transparent"
                    : "text-muted-strong hover:text-ink"
                )}
              >
                <span
                  className={cn(
                    "hidden lg:block h-[18px] w-px transition-colors",
                    active ? "bg-accent" : "bg-rule group-hover:bg-rule-strong"
                  )}
                />
                <span className="flex-1">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
