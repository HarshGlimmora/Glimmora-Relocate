"""Explainable matching — produces JobExplanation strings per match.

Responsibilities:
- `explain(profile, candidate, score) -> JobExplanation`
    Deterministic path (default):
        - strengths: iterate dimensions where score >= 0.7, emit template string
          ("Matches your {years} years of {stack}").
        - gaps: dimensions with score <= 0.4, emit what's missing.
        - why_ranked_here: short one-line summary from the top two drivers.
    Optional LLM polish (feature-flagged, only for the top-N results):
        - Send strengths+gaps to ai.client to rewrite as one natural paragraph.

Public API:
- explain(profile, candidate, score) -> JobExplanation
- batch_explain(profile, matches, top_n_llm=3) -> list[JobExplanation]

Design notes:
- Templates live alongside this file (strings module) not in KB — they are
  implementation detail, not reference data.
- LLM polish is strictly cosmetic; the underlying strengths/gaps are already
  deterministic and testable.
"""
