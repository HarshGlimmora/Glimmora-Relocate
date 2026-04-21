"""Integration tests — exercise the full pipeline and HTTP contracts.

Rules:
- No mocks for engines — integration tests use the real engine code end to end.
- LLM calls ARE mocked (via ai/client patching) because they're external.
- Uses a real Postgres (docker-compose) or a SQLite-backed test fixture,
  decision deferred to pyproject.toml conftest.
"""
