import { TopNav } from "@/components/shell/top-nav";
import { FooterDateline } from "@/components/shell/footer-dateline";
import { CaseSidebar } from "@/components/shell/case-sidebar";

export default async function CaseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ caseId: string }>;
}) {
  const { caseId } = await params;
  return (
    <>
      <TopNav />
      <main className="mx-auto max-w-[1280px] px-6 md:px-10 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[230px_1fr] gap-10 lg:gap-14">
          <CaseSidebar caseId={caseId} />
          <div className="min-w-0">{children}</div>
        </div>
      </main>
      <FooterDateline />
    </>
  );
}
