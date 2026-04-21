"""KB loader — reads every JSON in data/ and hands it to the registry.

Responsibilities:
- `async load_all() -> KnowledgeSnapshot`
    Reads every JSON file under knowledge/data/:
        countries.json, visa_rules.json, document_templates.json,
        timeline_templates.json, job_categories.json, scoring_weights.json,
        cultural_snippets.json, fx_rates.json.
    Validates each against its Pydantic schema (co-located in loader.py or
    a separate `schemas.py` inside knowledge/).
    Computes a version hash (sha256 of the concatenated sorted JSON bytes)
    — used as part of cache keys so KB edits implicitly invalidate cached
    stage results.
- `async reload() -> None`
    Used by POST /v1/kb/reload (admin). Fully replaces the in-memory snapshot
    atomically — never serves half-loaded data.

Public API:
- async load_all() -> KnowledgeSnapshot
- async reload() -> None

Design notes:
- Fails fast at startup on any invalid JSON — the app refuses to serve traffic
  with a broken KB.
- The loader is the only thing in the codebase allowed to do disk I/O on KB.
"""
