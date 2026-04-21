"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark } from "@/components/brand/wordmark";
import { formatDate } from "@/lib/formatters";
import { cn } from "@/lib/utils";

const NAV_LINKS: Array<{ label: string; href: "/" | "/cases" }> = [
  { label: "Overview", href: "/" },
  { label: "Cases", href: "/cases" },
];

export function TopNav({ transparent }: { transparent?: boolean }) {
  const pathname = usePathname();
  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-rule",
        transparent ? "bg-paper/80 backdrop-blur-sm" : "bg-paper"
      )}
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-10">
            <Wordmark />
            <span
              className="hidden md:inline dateline"
              suppressHydrationWarning
            >
              Issued · {formatDate(new Date(), "dateline")}
            </span>
          </div>

          <nav className="flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-3 py-2 text-[13px] tracking-tight transition-colors",
                    active ? "text-ink" : "text-muted-strong hover:text-ink"
                  )}
                >
                  {link.label}
                  {active ? (
                    <span className="absolute left-3 right-3 -bottom-[17px] h-px bg-accent" />
                  ) : null}
                </Link>
              );
            })}
            <Link
              href="/intent"
              className="ml-4 inline-flex h-9 items-center px-4 text-[13px] text-paper bg-ink hover:bg-accent-ink transition-colors"
            >
              Start assessment
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
