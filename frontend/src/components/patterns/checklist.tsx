"use client";

import { AlertTriangle, Check, CircleDashed, Hourglass, MinusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DocItem } from "@/lib/types/case";
import { formatDate } from "@/lib/formatters";

const STATUS_UI = {
  ok: { Icon: Check, className: "text-success", label: "Ready" },
  missing: { Icon: AlertTriangle, className: "text-danger", label: "Missing" },
  required: { Icon: CircleDashed, className: "text-muted-strong", label: "Required" },
  expiring: { Icon: Hourglass, className: "text-warning", label: "Expiring" },
  not_applicable: { Icon: MinusCircle, className: "text-muted", label: "N/A" },
} satisfies Record<DocItem["status"], { Icon: typeof Check; className: string; label: string }>;

export function Checklist({
  items,
  groupByCategory = true,
}: {
  items: DocItem[];
  groupByCategory?: boolean;
}) {
  if (!groupByCategory) {
    return (
      <ul className="divide-y divide-rule border-y border-rule">
        {items.map((item) => (
          <ChecklistRow key={item.docId} item={item} />
        ))}
      </ul>
    );
  }

  const groups = items.reduce<Record<string, DocItem[]>>((acc, item) => {
    (acc[item.category] ||= []).push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {Object.entries(groups).map(([cat, arr]) => (
        <div key={cat}>
          <div className="flex items-baseline justify-between mb-3">
            <span className="label">{cat.replace(/_/g, " ")}</span>
            <span className="dateline">
              {arr.filter((i) => i.status === "ok").length}&nbsp;/&nbsp;{arr.length}
            </span>
          </div>
          <ul className="divide-y divide-rule border-y border-rule">
            {arr.map((item) => (
              <ChecklistRow key={item.docId} item={item} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function ChecklistRow({ item }: { item: DocItem }) {
  const ui = STATUS_UI[item.status];
  return (
    <li className="grid grid-cols-[24px_1fr_auto] items-start gap-4 px-1 py-4">
      <ui.Icon className={cn("size-4 mt-0.5", ui.className)} strokeWidth={1.75} />
      <div className="min-w-0">
        <div className="text-[14px] text-ink">{item.label}</div>
        <div className="mt-1 text-[12.5px] text-muted leading-relaxed">
          {item.requiredFor.length > 0
            ? `Required for ${item.requiredFor.join(", ")}`
            : "Supporting document"}
          {item.expiresOn ? (
            <>
              <span className="rule-dot" />
              <span className={cn(item.status === "expiring" && "text-warning")}>
                Expires {formatDate(item.expiresOn, "long")}
              </span>
            </>
          ) : null}
        </div>
        {item.howToObtain ? (
          <div className="mt-2 text-[12.5px] text-muted-strong leading-relaxed">
            {item.howToObtain}
          </div>
        ) : null}
      </div>
      <span className={cn("font-mono text-[10.5px] tracking-[0.14em] uppercase pt-1", ui.className)}>
        {ui.label}
      </span>
    </li>
  );
}
