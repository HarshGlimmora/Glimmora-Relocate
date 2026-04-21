"""Application lifespan management (startup + shutdown).

Responsibilities:
- Provide an async context manager consumed by FastAPI's `lifespan=` parameter.
- On startup:
    1. Initialize SQLAlchemy async engine + session factory (see persistence/db.py).
    2. Initialize Redis connection pool (see core/cache.py).
    3. Preload the knowledge base from JSON into memory (see knowledge/loader.py).
       This is CRITICAL — engines assume KB is in-memory; no disk reads at runtime.
    4. Initialize the Anthropic client (see ai/client.py) with prompt caching on.
    5. Warm telemetry/metrics registry.
- On shutdown:
    1. Drain in-flight orchestrator runs (short grace period).
    2. Close Redis pool, DB engine, HTTPX clients.
    3. Flush logs.
- Expose readiness probes (`is_ready()`) used by /readyz in main.py.

Notes:
- Keep startup idempotent — tests import `create_app()` repeatedly.
- Fail fast on startup: if KB or DB can't initialize, raise — do not serve traffic
  with a half-initialized pipeline.
"""
