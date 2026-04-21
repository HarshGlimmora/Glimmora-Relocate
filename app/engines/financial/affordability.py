"""Affordability composite scoring.

Responsibilities:
- `score(surplus, cost_total, runway_months, urgency) -> AffordabilityScore`
    Composite from:
        - surplus_ratio = surplus / cost_total (capped 0..1)
        - runway_score  = f(runway_months) sigmoid-like
        - urgency_penalty: IMMEDIATE moves with tight runway dock the score
    Final composite mapped to band:
        >= 0.75 comfortable
        >= 0.55 tight
        >= 0.35 risky
        <  0.35 not_viable

Public API:
- score(surplus, cost_total, runway_months, urgency) -> AffordabilityScore

Design notes:
- Thresholds + sub-weights live in knowledge/scoring_weights.json under
  `financial.affordability`. Keep this file focused on the formula shape.
"""
