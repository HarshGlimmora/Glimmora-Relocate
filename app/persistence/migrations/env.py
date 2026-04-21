"""Alembic migration environment.

Responsibilities:
- Wire Alembic's `context` to the SQLAlchemy metadata from persistence/models.py.
- Read the DSN from app.config at runtime (not hardcoded).
- Run either online (against a real DB) or offline (generating SQL scripts).

This file is stub-only for now. Initialize with:
    alembic init -t async app/persistence/migrations

First migration: create `profiles`, `cases`, `case_artifacts` tables and
necessary indexes (fk on profile_id, index on case_artifacts.case_id).
"""
