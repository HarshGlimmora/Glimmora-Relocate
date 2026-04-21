"""Persistence layer — SQLAlchemy async engine, ORM models, Alembic migrations.

Engines should NOT import from here directly. They go through their own
repository files (e.g. engines/intake/repository.py) which depend on this
package. The separation keeps schema changes localized.
"""
