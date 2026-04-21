"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Wordmark } from "@/components/brand/wordmark";
import { formatDate } from "@/lib/formatters";
import { useAuthStore } from "@/lib/state/auth-store";
import { cn } from "@/lib/utils";

const NAV_LINKS: Array<{ label: string; href: "/" | "/cases" }> = [
  { label: "Overview", href: "/" },
  { label: "Cases", href: "/cases" },
];

export function TopNav({ transparent }: { transparent?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);

  const initials = user?.fullName
    ? user.fullName
        .split(/\s+/)
        .slice(0, 2)
        .map((p) => p[0]?.toUpperCase() ?? "")
        .join("")
    : "";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-rule",
        transparent ? "bg-paper/85 backdrop-blur-sm" : "bg-paper"
      )}
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="flex h-[76px] items-center justify-between">
          <div className="flex items-center gap-12">
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
                    "relative px-4 py-2.5 text-[14px] tracking-tight transition-colors",
                    active ? "text-ink" : "text-muted-strong hover:text-ink"
                  )}
                >
                  {link.label}
                  {active ? (
                    <span className="absolute left-4 right-4 -bottom-[21px] h-px bg-accent" />
                  ) : null}
                </Link>
              );
            })}

            {user ? (
              <div className="ml-3 flex items-center gap-4 pl-4 border-l border-rule">
                <div className="hidden sm:flex flex-col items-end leading-none">
                  <span className="text-[13px] text-ink">{user.fullName}</span>
                  <span className="mt-0.5 dateline">{user.userId}</span>
                </div>
                <span className="inline-flex size-10 items-center justify-center bg-accent-soft border border-accent/25 font-mono text-[12px] tracking-[0.04em] text-accent-ink">
                  {initials}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    signOut();
                    router.push("/");
                  }}
                  className="text-[13px] text-muted-strong hover:text-ink transition-colors"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="ml-2 px-4 py-2.5 text-[14px] text-muted-strong hover:text-ink transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/register"
                  className="ml-3 inline-flex h-11 items-center px-5 text-[14px] text-paper bg-ink hover:bg-accent-ink transition-colors"
                >
                  Start assessment
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
