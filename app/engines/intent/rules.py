"""Deterministic intent rules — the first and preferred classifier path.

Rules (ordered, first match wins):
- 2+ target_countries + no target_role => COMPARE_COUNTRIES
- target_country + target_role + target_salary > current_salary * 1.15
    => FIND_BETTER_JOB_ABROAD
- target_country + "feasible"/"possible"/"realistic" in freeform
    => CHECK_FEASIBILITY
- freeform contains "documents"/"visa papers"/"paperwork" only
    => VALIDATE_DOCUMENTS
- freeform contains "cost"/"afford"/"budget" only
    => ESTIMATE_COST
- freeform contains "timeline"/"when"/"schedule" only
    => PREPARE_TIMELINE
- Otherwise, if any target_country present => GENERATE_PLAN (the full pipeline)

Public API:
- classify_by_rules(profile, freeform) -> Intent
    Returns Intent with confidence computed from how many signals matched
    (single match: 0.7; multiple corroborating signals: 0.9; ambiguous: 0.4).

Design notes:
- Keep the rule list short and readable. Anything subtle belongs in classifier.py.
- Sub-intent detection: if TWO top-level rules fire, populate sub_intents and
  pick the dominant one as primary. Prevents the LLM path from being invoked
  for the clearly multi-intent cases.
"""
