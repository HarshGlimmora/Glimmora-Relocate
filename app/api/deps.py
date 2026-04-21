"""Shared FastAPI dependencies for route handlers.

Provides injectable dependencies so routes stay declarative:
- `get_db_session()` — yields an async SQLAlchemy session, commits/rolls back.
- `get_redis()` — yields a Redis client from the pool.
- `get_kb()` — yields the preloaded knowledge registry.
- `get_current_user()` — stub for MVP (returns an anonymous user); swap with real
  auth later (JWT/OAuth) without touching routes.
- `get_request_id()` — pulls X-Request-Id from headers or generates one; used for
  structured logging + case traceability.
- Service factories: `get_intake_service()`, `get_orchestrator()`, etc. Each wires
  the service with its required deps so routes only ask for the service.

Notes:
- Keep this file small. It is the only place HTTP plumbing meets domain services.
- Never put validation logic here — that belongs in schemas/ or engines.
"""
