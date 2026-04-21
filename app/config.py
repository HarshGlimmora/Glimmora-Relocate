"""Centralized settings loader.

Responsibilities:
- Define a `Settings` class (Pydantic BaseSettings) that reads every env var
  documented in `.env.example`.
- Provide a cached singleton accessor `get_settings()` so no module re-parses env.
- Group settings by concern: app, db, redis, anthropic, fx, feature_flags.
- Validate critical values at import-time (e.g. POSTGRES_DSN parses, model name
  is in the allowed set).
- Offer `Settings.is_feature_enabled(name)` helper for feature-flag checks so
  engines don't read raw env vars.

Notes:
- Never import this from `schemas/` — schemas must stay dependency-free.
- Downstream modules import `from app.config import get_settings` only.
"""
