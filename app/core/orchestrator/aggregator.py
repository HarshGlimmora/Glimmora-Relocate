"""Typed result aggregator — the shared bucket for a single Case run.

Responsibilities:
- Define `Aggregator` with typed slots for every engine's output:
    profile: UserProfile
    intent: Intent
    jobs: JobMatches | None
    relocation: RelocationFit | None
    financial: FinancialAssessment | None
    document: DocumentChecklist | None
    cultural: CulturalPack | None
    timeline: Timeline | None
    recommendation: Recommendation | None
    warnings: list[Warning]
- Thread-safe-ish writes: each stage writes its own slot exactly once. Attempts
  to double-write raise — catches orchestration bugs early.
- Read helpers: `has(stage)`, `get(stage)`, `get_or_raise(stage)` for downstream
  stages that truly require a prior stage's output.
- Serialization: `to_artifact_dict()` produces the persistable dict written to
  case_artifacts, and `to_summary_input()` produces the reduced view the summary
  engine consumes.

Why it exists:
- Central typed contract means the runner never juggles `Any` and engines never
  reach into each other's internals.
"""
