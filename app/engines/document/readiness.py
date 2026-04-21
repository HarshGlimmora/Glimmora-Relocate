"""Readiness score + blocker identification.

Responsibilities:
- `compute(items) -> ReadinessResult`
    ReadinessResult = {
        readiness_pct,        # OK count / applicable count (EXPIRING counts 0.5)
        blocking_missing,     # doc_ids that block the fastest visa path
        expiring_soon,        # doc_ids expiring within 180 days
        category_summary,     # per-category readiness: identity 100%, financial 60%, ...
    }
- `blocking_for_path(items, visa_path) -> list[str]`
    Cross-references required_for against status to find items that actually
    block this specific path.

Public API:
- compute(items) -> ReadinessResult
- blocking_for_path(items, visa_path) -> list[str]

Design notes:
- NOT_APPLICABLE items are excluded from the denominator — important so family
  users don't get penalized for missing child documents if they're single.
"""
