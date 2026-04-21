"""Typed orchestrator errors + partial-failure envelope.

Responsibilities:
- Define the error hierarchy:
    OrchestratorError (base)
      ├── HardStageFailure       — e.g. INTAKE validation failed; pipeline aborts
      ├── SoftStageFailure       — engine threw; pipeline continues w/ warning
      ├── DependencyNotMet       — a stage's prerequisite never completed
      ├── CacheCorruption        — cached payload failed schema validation
      └── LLMUnavailable         — ai/client.py degraded; downstream can fallback
- Define `Warning` model: { stage, code, message, recoverable: bool }.
- Map each error class to an HTTP status in api/deps.py's exception handler:
    HardStageFailure  -> 503 (or 422 when user-correctable)
    SoftStageFailure  -> 200 with warnings (no exception bubbled)
    DependencyNotMet  -> 500 (bug — log loudly)
    LLMUnavailable    -> 200 with degraded=true flag

Notes:
- Engines raise their own domain errors that the runner wraps into these. This
  keeps engine code free of orchestration concerns.
"""
