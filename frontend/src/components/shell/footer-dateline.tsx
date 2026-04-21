import { Wordmark } from "@/components/brand/wordmark";

export function FooterDateline() {
  return (
    <footer className="mt-24 border-t border-rule">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 py-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Wordmark muted />
          <p className="mt-3 max-w-md text-[13px] text-muted-strong leading-relaxed">
            A private intelligence service helping people choose, plan, and begin
            an international move with clarity.
          </p>
        </div>
        <div className="dateline">
          © {new Date().getFullYear()} Glimmora Intelligence&nbsp;·&nbsp;Confidential
        </div>
      </div>
    </footer>
  );
}
