<<<<<<< HEAD
# Glimmora-Relocate
A platform for global life onboarding: it combines job intelligence, relocation intelligence, financial intelligence, a life setup engine, an AI copilot, marketplace/payments, and a trust/compliance layer into one guided system. The core promise is: from decision to stability, the user is guided end-to-end through relocation and life setup.
=======
# Glimmora Relocate — Backend

MVP backend that helps a user choose, plan, and begin an international move.

See `docs/` (TBD) and module docstrings for architecture details.

## Quickstart (stub)
- `python scripts/seed_knowledge.py` — load knowledge base into cache
- `python scripts/run_dev.py` — start FastAPI dev server
- `pytest tests/` — run integration + unit tests

## Layout
- `app/api/` — HTTP routes (thin layer, no business logic)
- `app/core/orchestrator/` — pipeline DAG runner
- `app/schemas/` — shared Pydantic contracts between engines
- `app/engines/` — the 11 isolated logic engines
- `app/knowledge/` — deterministic rules, templates, reference data (engine #12)
- `app/ai/` — shared LLM client (Anthropic + prompt caching)
- `app/persistence/` — DB session + ORM + migrations
>>>>>>> 25742ca (Basic stable frontend created - iteration 2 initiating post this)
