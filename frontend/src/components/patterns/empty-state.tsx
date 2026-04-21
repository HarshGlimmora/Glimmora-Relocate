import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-canvas border border-rule px-8 py-14 text-center",
        className
      )}
    >
      {Icon ? (
        <div className="mx-auto mb-5 size-10 flex items-center justify-center border border-rule">
          <Icon className="size-4 text-muted-strong" strokeWidth={1.5} />
        </div>
      ) : null}
      <h3 className="font-display text-[20px] text-ink tracking-tight">
        {title}
      </h3>
      {description ? (
        <p className="mt-2 text-[13.5px] text-muted-strong max-w-sm mx-auto leading-relaxed">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
