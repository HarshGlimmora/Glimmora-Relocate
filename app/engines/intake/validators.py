"""Intake validators — structural and semantic checks on ProfileInput.

Checks:
- Required fields present (Pydantic-level guardrails).
- current_country and target_countries exist in KB countries.json.
- target_countries contains 1..5 entries, deduplicated.
- years_experience is in range 0..60.
- current_salary.amount > 0.
- target_salary >= current_salary * 0.5 (cheap sanity check against typos).
- budget_ceiling coherent with current_salary if both provided.
- visa_status freeform string maps to a KB-known code via a fuzzy matcher;
  unknown strings are allowed but flagged in the resulting profile's warnings
  (so the document/intent engines can handle gracefully).

Public API:
- validate_input(raw: ProfileInput) -> ValidationReport
    ValidationReport = { ok: bool, errors: list[FieldError], warnings: list[str] }

Design notes:
- Validator functions are pure; no I/O except reading the KB registry (in-memory).
- Errors bubble up to IntakeService which converts them into HardStageFailure
  responses with field-level detail for the UI.
"""
