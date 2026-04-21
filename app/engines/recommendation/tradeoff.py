"""Tradeoff detection — surfaces tensions between dimensions or engine outputs.

Responsibilities:
- `surface(aggregator) -> list[Tradeoff]`
    Pattern detectors (each returns zero or more Tradeoffs):
        - salary_vs_runway: high salary + negative surplus -> tradeoff between
          headline salary and real affordability.
        - job_country_vs_lifestyle_country: top job country isn't top
          relocation-fit country.
        - urgency_vs_readiness: IMMEDIATE urgency + low readiness_pct.
        - docs_vs_timeline: blocking_missing docs push earliest_move_date out
          past user's target_date.
        - family_vs_destination: family_status != SINGLE but top country has
          low family dimension score.

Public API:
- surface(aggregator) -> list[Tradeoff]

Design notes:
- Each detector is a short pure function; easy to add new patterns. All
  detectors report in a unified Tradeoff schema so the UI renders uniformly.
"""
