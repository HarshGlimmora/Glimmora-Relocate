import Link from "next/link";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProfileSummaryCard({
  title,
  editHref,
  items,
  className,
}: {
  title: string;
  editHref?: string;
  items: Array<{ label: string; value: React.ReactNode }>;
  className?: string;
}) {
  return (
    <div className={cn("bg-canvas border border-rule", className)}>
      <div className="flex items-center justify-between px-6 py-3 border-b border-rule">
        <span className="label">{title}</span>
        {editHref ? (
          <Link
            href={editHref}
            className="inline-flex items-center gap-1.5 text-[12px] text-muted-strong hover:text-ink transition-colors"
          >
            <Pencil className="size-3" strokeWidth={1.5} />
            Edit
          </Link>
        ) : null}
      </div>
      <dl className="divide-y divide-rule">
        {items.map((item) => (
          <div
            key={item.label}
            className="grid grid-cols-[140px_1fr] gap-4 px-6 py-3"
          >
            <dt className="text-[12.5px] text-muted pt-[1px]">{item.label}</dt>
            <dd className="text-[13.5px] text-ink">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
