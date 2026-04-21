"""Document checklist HTTP route — per-case drill-down.

Endpoints:
- GET /v1/cases/{case_id}/documents
    Returns DocumentChecklist with per-item status:
        required | missing | ok | expiring.
    Grouped by category (identity, employment, education, financial, residence).

- PATCH /v1/cases/{case_id}/documents/{doc_id}
    Body: { status: "ok" | "missing", expires_on?: date, note?: str }
    User-driven state update as they gather docs. Delegates to
    DocumentService.update_item() which recomputes the readiness score.

- GET /v1/cases/{case_id}/documents/readiness
    Lightweight summary: { total, ready, missing, expiring_soon, readiness_pct }.
    Fast endpoint intended for the dashboard progress ring.
"""
