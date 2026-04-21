"""API layer package — HTTP surface only, zero business logic.

Each module here defines a FastAPI APIRouter. `main.py` is the only place that
imports and mounts them. Route handlers must:
- validate inbound payloads via schemas/
- acquire dependencies (db session, services) via deps.py
- delegate all work to engine services or the orchestrator
- shape responses using schemas/
- never call other route modules directly
"""
