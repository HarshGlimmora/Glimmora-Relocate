"""Monthly budget calculator.

Responsibilities:
- `compute_surplus(monthly_take_home, cost_breakdown) -> Money`
    surplus = take_home - cost_breakdown.total.
- `take_home_from_gross(gross_salary, country) -> Money`
    Applies KB-provided effective tax + social contribution rates from
    knowledge/data/countries.json. MVP uses flat effective rates; post-MVP
    can add proper bracketed computation.
- `pressure(cost, salary) -> float` — 0..1 float where 1.0 means cost >= salary.

Public API:
- compute_surplus(salary_local, cost) -> Money
- take_home_from_gross(gross, country) -> Money
- pressure(cost_total, salary_take_home) -> float

Design notes:
- Keep tax logic behind take_home_from_gross so the rest of the pipeline only
  reasons in post-tax numbers. Big cognitive win.
"""
