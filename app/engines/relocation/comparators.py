"""Cross-destination comparators.

Responsibilities:
- `summarize(scores: list[DestinationScore]) -> list[str]`
    Deterministic one-liners highlighting the spread between destinations:
    - "Germany edges out Portugal on healthcare (0.82 vs 0.71)."
    - "Portugal has the lowest housing tightness among your picks."
- `pairwise(a, b) -> PairwiseComparison`
    Per-dimension winner for two destinations — used when journey is
    COMPARE_COUNTRIES.

Public API:
- summarize(scores) -> list[str]
- pairwise(a, b) -> PairwiseComparison

Design notes:
- Templates are simple f-strings here. Any "human voice" polish happens in the
  recommendation engine, not here.
"""
