"""Savings runway projection.

Responsibilities:
- `compute(savings_usd, monthly_surplus, relocation_cost) -> RunwayResult`
    If surplus >= 0:
        runway_months = 999 (effectively unbounded)
        burn_rate = 0
    Else (surplus < 0):
        adjusted_savings = savings - relocation_cost.total
        runway_months = adjusted_savings / abs(surplus)
        burn_rate = abs(surplus)
    Returns RunwayResult { runway_months, burn_rate, adjusted_savings }.
- `categorize(runway_months) -> Literal["comfortable","tight","risky","not_viable"]`
    Bands from KB scoring_weights.json (tunable thresholds).

Public API:
- compute(savings, surplus, relocation_cost) -> RunwayResult
- categorize(runway_months) -> str

Design notes:
- Runway is the primary "is this safe?" number the UI leads with. Keep the
  math transparent and boring.
"""
