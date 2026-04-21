"""Visa suitability filter — drops jobs the user cannot realistically take.

Responsibilities:
- `filter(candidates, profile) -> list[JobCandidate]`
    For each candidate:
        - If candidate.visa_sponsorship is False AND user has no right-to-work
          in candidate.country, drop.
        - If candidate requires a visa path (pulled from KB visa_rules.json)
          the profile doesn't qualify for (e.g. degree requirement), drop with
          a reason.
    Returns filtered candidates plus a list of FilteredOut records for
    transparency (exposed in JobMatches.diagnostics).

Public API:
- filter(candidates, profile) -> FilterResult
    FilterResult = { kept, dropped: list[FilteredOut(job_id, reason)] }

Design notes:
- Knowledge-driven, fully deterministic. No LLM.
- Never silently drops — every dropped job has a reason string for UI display.
"""
