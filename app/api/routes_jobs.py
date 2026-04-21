"""Job matches HTTP route — per-case drill-down.

Endpoints:
- GET /v1/cases/{case_id}/jobs?limit=10&offset=0
    Reads the persisted JobMatch list from the case artifact store.
    Supports pagination.
    Returns: { matches: JobMatch[], total: int, explanations_included: bool }.

- POST /v1/cases/{case_id}/jobs/rerank
    Body: { weights?: ScoringWeights }
    Triggers JobService.rerank_only() using a custom weight override — useful
    for "what if I prioritize salary over location?" UX without re-running the
    full pipeline. Does NOT refetch job candidates.

Notes:
- Pure read endpoint for the main GET; no engine invocation unless /rerank is used.
- All job data is sourced from persisted case_artifacts, not re-executed.
"""
