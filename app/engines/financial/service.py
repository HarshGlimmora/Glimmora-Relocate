"""FinancialService — computes affordability for a move.

Methods:
- async assess(profile, target_country, target_salary_override=None,
               target_city=None, overrides=None) -> FinancialAssessment
    Pipeline:
        1. Resolve effective target salary (profile.target_salary_usd or
           override or current_salary_usd).
        2. Build monthly CostBreakdown via cost_of_living.build(country, city,
           family_status).
        3. Convert salary to local currency via fx.convert().
        4. budget.compute_surplus(salary_local, cost) -> monthly_surplus.
        5. runway.compute(profile_savings_estimate, monthly_surplus) ->
           runway_months.
        6. affordability.score(surplus, cost_total, urgency) -> AffordabilityScore.
        7. relocation_cost_estimate = cost_of_living.relocation_cost(
             profile, target_country) — one-off upfront cost estimate.
        8. currency_impact = fx.describe(source, target, salary delta).
        9. Assemble FinancialAssessment with assumptions list.

- async simulate(base_assessment, overrides) -> FinancialAssessment
    Re-runs with overrides for the what-if UX; does not persist.

Design notes:
- No LLM. This engine is pure deterministic math.
- Savings estimate: MVP assumes savings = current_salary_usd * 6 months unless
  profile provides a better hint. Future: dedicated savings field in ProfileInput.
"""
