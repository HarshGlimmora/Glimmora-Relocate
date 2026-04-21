"""SQLAlchemy async engine + session factory.

Responsibilities:
- Build the async engine from settings.POSTGRES_DSN with a sensible pool config
  (pool_size=10, max_overflow=10, pool_pre_ping=True).
- Expose `async_session_maker` and `get_session()` async generator for use as
  a FastAPI dependency (see api/deps.py).
- Provide `with_session(func)` decorator for non-request contexts (e.g. the
  seed script, tests).
- Lifespan hooks: `init_engine()` on startup, `dispose_engine()` on shutdown.

Public API:
- async_session_maker, get_session, with_session, init_engine, dispose_engine.

Design notes:
- No ORM models here — they live in models.py. This file is only plumbing.
"""
