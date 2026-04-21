"""Composite scoring — combines dimension scores into a single ranking score.

Responsibilities:
- `score(match: JobScore, weights: ScoringWeights) -> Score`
    composite = sum(dimension_score * weight) / sum(weights)
- Supports per-journey weight overrides (e.g. a FIND_BETTER_JOB_ABROAD journey
  weighs salary_fit higher than a GENERATE_PLAN journey).
- Supports user-supplied weight overrides for the /rerank endpoint.

Public API:
- score(match: JobScore, weights: ScoringWeights) -> Score
- score_all(matches: list[JobScore], weights) -> list[tuple[int, Score]]

Design notes:
- Weights loaded from knowledge/scoring_weights.json at startup; never hard-coded.
- Deterministic and cheap — O(n) over matches.
"""
