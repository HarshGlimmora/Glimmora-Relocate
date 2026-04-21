// Number, currency, and date formatters. Keep these boring & deterministic —
// the UI depends on them for stable visual rhythm of metrics.

const compact = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export function formatMoney(amount: number, currency = "USD", compact_ = false) {
  if (compact_) {
    return `${currency === "USD" ? "$" : ""}${compact.format(amount)}`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercent(value: number, digits = 0) {
  return `${(value * 100).toFixed(digits)}%`;
}

export function formatScore(value: number) {
  return (value * 100).toFixed(0);
}

export function formatDate(iso: string | Date, style: "long" | "short" | "dateline" = "long") {
  const d = typeof iso === "string" ? new Date(iso) : iso;
  if (style === "dateline") {
    return d
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .toUpperCase();
  }
  if (style === "short") {
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
  return d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatCaseNumber(id: string) {
  // Normalize a UUID/ULID-ish into "RL-XXXXX" for display.
  const clean = id.replace(/[^A-Z0-9]/gi, "").toUpperCase();
  return `RL-${clean.slice(-5).padStart(5, "0")}`;
}
