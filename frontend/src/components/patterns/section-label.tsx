import { cn } from "@/lib/utils";

export function SectionLabel({
  number,
  children,
  className,
}: {
  number?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {number ? (
        <span className="font-mono text-[10.5px] text-muted tracking-[0.16em] uppercase tnum">
          §&nbsp;{number}
        </span>
      ) : null}
      <span className="label">{children}</span>
      <span className="flex-1 h-px bg-rule" />
    </div>
  );
}
