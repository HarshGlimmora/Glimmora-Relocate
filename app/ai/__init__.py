"""Shared AI/LLM client package — only intent/cultural/recommendation touch it.

Exposes:
- `client` — the Anthropic async client configured with prompt caching.
- `guards` — output validation helpers (JSON coerce, enum coerce, schema fit).

Design rule: engines never instantiate their own LLM clients; they import from
here so prompt caching and telemetry are consistent.
"""
