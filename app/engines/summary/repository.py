"""Persistence for Case summary and per-stage artifacts.

Responsibilities:
- `async save_case(case: Case) -> None`
    Upserts the cases row plus per-stage rows in case_artifacts
    (one row per stage with the JSON output).
- `async save_summary(case_id, summary) -> None`
    Updates the summary column on the case row + refreshes updated_at.
- `async get_case(case_id) -> Case | None`
    Reads the full case envelope, inflating artifacts into their schema types.
- `async list_cases_for_profile(profile_id, limit, offset) -> list[Case]`
    Thin-row variant for the history UI; artifacts excluded.

Design notes:
- This is the single place the summary engine touches the DB. Other engines
  persist their own stage artifacts via the orchestrator, not via this
  repository.
- Artifact JSON is validated against its schema on read, catching any drift
  after KB/schema changes.
"""
