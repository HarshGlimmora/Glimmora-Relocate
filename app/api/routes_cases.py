"""Case CRUD + status HTTP routes.

Endpoints:
- GET /v1/cases?profile_id=...&limit=&offset=
    Lists cases for a profile, sorted by created_at desc.
    Returns thin case rows (no artifacts), for history UIs.

- GET /v1/cases/{case_id}
    Returns the full case envelope:
        { case_id, profile_id, intent, status, created_at, updated_at,
          artifacts: { job, relocation, financial, document, cultural,
                       timeline, recommendation, summary } }.
    Each artifact is present only if the corresponding stage ran successfully.

- GET /v1/cases/{case_id}/status
    Lightweight poll endpoint:
        { case_id, overall_status, stages: [{ name, status, started_at,
          finished_at, error? }] }.
    Used when /analysis/run was called in async mode.

- DELETE /v1/cases/{case_id}
    Soft-deletes the case (sets deleted_at). Does not remove artifacts — those
    are retained for audit and can be hard-purged by a separate admin job.

Notes:
- All endpoints are pure reads against the persistence layer; no engines invoked.
"""
