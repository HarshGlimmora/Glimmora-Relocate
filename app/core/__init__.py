"""Core cross-cutting primitives: orchestration, cache, logging, telemetry, events.

This package must not import from `engines/` or `api/`. It is the foundation
that they build on. Anything placed here should be useful to at least two
engines or both the api and the orchestrator.
"""
