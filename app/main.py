"""FastAPI application entrypoint.

Responsibilities:
- Build the FastAPI app instance via a `create_app()` factory.
- Mount all routers from `app/api/` (profile, intent, analysis, jobs, financial,
  documents, timeline, report, cases).
- Register middleware: CORS, request-id injection, structured access logging,
  exception-to-HTTP translator (maps orchestrator errors to 4xx/5xx).
- Wire FastAPI lifespan to `app/lifecycle.py` so DB pool, Redis client, and the
  knowledge registry are initialized on startup and cleanly torn down on shutdown.
- Expose /healthz (liveness) and /readyz (readiness — checks DB, Redis, KB loaded).
- Expose /docs and /openapi.json for contract discovery.

Notes:
- No business logic lives here. This file is the composition root only.
- Run via `uvicorn app.main:app --reload` in dev, via `scripts/run_dev.py` as shortcut.
"""
