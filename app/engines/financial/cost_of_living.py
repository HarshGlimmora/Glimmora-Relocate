"""Cost-of-living estimator.

Responsibilities:
- `build(country, city, family_status) -> CostBreakdown`
    Reads KB countries.json cost index (rent_index, food_index, etc.) +
    city-level multiplier. Scales a reference-city baseline (NYC=100) to the
    target city. Adjusts rent and food for family_status.
- `relocation_cost(profile, target_country) -> RelocationCostEstimate`
    Flights (from current country), shipping (bucketed by family_status),
    visa fees (from knowledge/visa_rules.json), initial deposit (rent * deposit
    months from KB), 1-month buffer. All in USD.

Public API:
- build(country, city, family_status) -> CostBreakdown
- relocation_cost(profile, target_country) -> RelocationCostEstimate

Design notes:
- Keep the index model simple and inspectable; UI may want to show each line
  item's provenance ("rent based on Berlin-index 0.68 of NYC baseline").
"""
