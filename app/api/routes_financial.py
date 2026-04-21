"""Financial assessment HTTP route — per-case drill-down.

Endpoints:
- GET /v1/cases/{case_id}/financial
    Returns FinancialAssessment from the case artifact store:
        { salary_vs_col, monthly_budget, runway_months, affordability_score,
          risk_band, relocation_cost_estimate, currency_impact, reasoning }.

- POST /v1/cases/{case_id}/financial/simulate
    Body: { target_salary?, target_city?, monthly_cost_override? }
    Runs FinancialService.assess() again with overrides, WITHOUT mutating the
    persisted case. Purely a what-if preview.

Notes:
- The simulate endpoint is deterministic + fast (<100ms) because cost-of-living
  data lives in the in-memory KB. Safe to call on every slider change from UI.
"""
