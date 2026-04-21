"""Knowledge Base package — deterministic reference data for every engine.

This is the 12th "engine" of the design, deliberately kept as a sibling of
app/engines/ because it has no active logic — it is pure data + a read-only
registry around it.

Golden rules:
- All files in knowledge/data/*.json are loaded ONCE on startup (loader.py).
- Every engine reads via knowledge.registry (never reads the JSON itself).
- No engine writes to KB; updates go through data files + a restart (or
  POST /v1/kb/reload in admin mode).
"""
