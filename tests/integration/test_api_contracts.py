"""API contract tests — exercise every HTTP endpoint.

Coverage:
- POST /v1/profiles — valid payload returns 201 + UserProfile; invalid returns
  422 with field-level errors.
- PATCH /v1/profiles/{id} — partial update applies; cache invalidation side
  effect observable via subsequent /analysis/run cache miss.
- POST /v1/intent/infer — rule path and LLM-mocked path both return valid
  Intent shape.
- POST /v1/analysis/run — sync and async modes; polling via /cases/{id}/status
  converges.
- GET /v1/cases/{id}/jobs, /financial, /documents, /timeline, /report —
  shape matches schema; 404 when case missing.
- POST /v1/cases/{id}/jobs/rerank — custom weights change the order.
- POST /v1/cases/{id}/financial/simulate — does not mutate the persisted case.
- DELETE /v1/cases/{id} — soft-deletes; subsequent GET returns 404 by default,
  but ?include_deleted=true surfaces the record.
- /healthz and /readyz — both return 200 in a fully initialized test app.

Uses FastAPI's TestClient (httpx) against a full app instance.
"""
