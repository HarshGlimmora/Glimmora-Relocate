"""Financial assessment schemas.

Models:
- CostBreakdown (monthly, in destination local + USD):
    rent: Money, food: Money, transport: Money, utilities: Money,
    healthcare: Money, other: Money, total: Money

- AffordabilityScore:
    composite: Score
    band: Literal["comfortable","tight","risky","not_viable"]
    monthly_surplus: Money
    runway_months: float    (savings / negative surplus, or 999 if positive)

- RelocationCostEstimate:
    flights: Money, shipping: Money, deposits: Money, visa_fees: Money,
    initial_buffer: Money, total: Money

- CurrencyImpact:
    source_currency: str
    target_currency: str
    effective_rate: Decimal
    notes: str              (e.g. "Salary 15% higher in local terms")

- FinancialAssessment (engine output):
    salary_vs_col: float                (ratio: take-home / total_cost)
    monthly_cost: CostBreakdown
    affordability: AffordabilityScore
    currency_impact: CurrencyImpact
    relocation_cost: RelocationCostEstimate
    assumptions: list[str]              (what we assumed when data was thin)
"""
