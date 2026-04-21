"""Structured logging setup.

Responsibilities:
- Configure the root logger with a JSON formatter (orjson-backed) on stdout.
- Inject request_id and case_id from contextvars so every log line carries trace
  context without explicit passing.
- Provide `get_logger(name)` — a thin wrapper that binds module name.
- Provide helper `log_stage(stage, status, duration_ms, extras)` consumed by
  orchestrator/runner.py for consistent per-stage log lines.

Notes:
- Log levels: DEBUG for engine internals, INFO for stage transitions, WARNING
  for soft-failures, ERROR for hard failures. Avoid CRITICAL.
- Never log raw user PII (email, passport numbers). Redact via a filter.
"""
