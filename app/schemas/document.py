"""Document checklist schemas.

Models:
- DocItemStatus (enum): REQUIRED, MISSING, OK, EXPIRING, NOT_APPLICABLE.

- DocItem:
    doc_id: str             (stable — "passport", "employment_letter", etc.)
    category: Literal["identity","employment","education","financial","residence","other"]
    label: str              (display string)
    status: DocItemStatus
    required_for: list[str] (visa names / purposes this doc supports)
    expires_on: date | None
    notes: str | None
    how_to_obtain: str | None   (KB snippet when available)

- DocumentChecklist (engine output):
    items: list[DocItem]
    readiness_pct: float        (0–100)
    blocking_missing: list[str] (doc_ids that block the earliest visa path)
    expiring_soon: list[str]    (doc_ids expiring within 6 months)
"""
