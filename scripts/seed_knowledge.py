"""Seed script — validates and preloads the knowledge base from data/ JSONs.

Usage:
    python scripts/seed_knowledge.py              # validate only (CI-safe)
    python scripts/seed_knowledge.py --reload     # hit POST /v1/kb/reload

Responsibilities:
- Call knowledge.loader.load_all() and print a summary:
    - file count
    - country count
    - visa_rule count per country
    - any schema validation failures (with file + JSON path)
- Exit 1 on validation failure so CI catches broken data edits before deploy.
- Optional --reload flag issues an HTTP call to the running app to
  hot-reload without restart.

Design notes:
- The script is the canonical way to verify a KB edit is safe. Curators run it
  locally before committing a data/ JSON change.
"""
