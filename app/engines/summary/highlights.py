"""Headline extraction — hero_metrics, top_warnings, next_actions.

Responsibilities:
- `extract(aggregator) -> HighlightsResult`
    HighlightsResult = {
        hero_metrics: list[HeroMetric],   # 3-5 cards for the top of the UI
        top_warnings: list[str],          # up to 3 most urgent issues
        next_actions: list[str],          # up to 5, deduped across engines
    }
- Heuristics:
    Hero metrics (in order of priority if available):
        - Top country verdict ("Germany looks Go")
        - Monthly surplus (Money)
        - Affordability band
        - Document readiness pct
        - Earliest move date
    Top warnings are the highest-severity items from recommendation.blockers
    + any soft-failure warnings from the aggregator.
    Next actions are recommendation.next_actions sorted by priority and
    capped at 5.

Public API:
- extract(aggregator) -> HighlightsResult

Design notes:
- Pure function. No I/O.
- Stable ordering — same inputs produce the same highlight sequence, which
  makes UI snapshots deterministic.
"""
