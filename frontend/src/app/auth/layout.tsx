import Link from "next/link";
import { Wordmark } from "@/components/brand/wordmark";
import { formatDate } from "@/lib/formatters";

// Auth pages use a minimal chrome — no site nav, just the wordmark and a
// dateline, so the page's single task is obvious.
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-rule bg-paper">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <div className="flex h-[76px] items-center justify-between">
            <Wordmark />
            <span className="dateline" suppressHydrationWarning>
              Secure area · {formatDate(new Date(), "dateline")}
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 relative">
        {/* Vertical hairline accents on the gutter — editorial signature */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-[min(50vw,640px)] hidden xl:block"
        >
          <span className="absolute top-12 bottom-12 w-px bg-rule" />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 translate-x-[min(50vw,640px)] hidden xl:block"
        >
          <span className="absolute top-12 bottom-12 w-px bg-rule" />
        </div>

        <div className="mx-auto max-w-[1280px] px-6 md:px-10 py-14 md:py-20">
          {children}
        </div>
      </main>

      <footer className="border-t border-rule">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10 h-[60px] flex items-center justify-between">
          <span className="dateline">
            © {new Date().getFullYear()} Glimmora Intelligence&nbsp;·&nbsp;Confidential
          </span>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-[13px] text-muted-strong hover:text-ink transition-colors"
            >
              Back to overview
            </Link>
            <Link
              href="/auth/login"
              className="text-[13px] text-muted-strong hover:text-ink transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
