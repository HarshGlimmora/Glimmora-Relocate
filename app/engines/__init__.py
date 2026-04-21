"""Engines package — 10 isolated logic engines.

Each subpackage owns one engine. Rules:
- One folder per engine. Each folder owns its own service, helpers, tests.
- Engines never import from each other. Shared types live in `app/schemas/`.
- Reference data comes from `app/knowledge/` via the registry — never file I/O
  inside an engine.
- Each engine exposes a single public service class (e.g. `JobService`) with
  one async method the orchestrator calls.

Engines:
    intake         - normalize user input into UserProfile
    intent         - classify journey type + emit execution plan
    job            - rank jobs for the user
    relocation     - score destination suitability
    financial      - compute affordability
    document       - build doc checklist + readiness
    cultural       - build cultural preparation pack
    timeline       - build milestone DAG + dates
    recommendation - narrate + explain the aggregated result
    summary        - assemble final UI payload and persist Case

(The 12th "engine", Knowledge Base, is a sibling package at app/knowledge/.)
"""
