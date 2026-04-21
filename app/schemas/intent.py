"""Intent + execution plan schemas.

Models:
- JourneyType (enum): COMPARE_COUNTRIES, FIND_BETTER_JOB_ABROAD,
  CHECK_FEASIBILITY, GENERATE_PLAN, VALIDATE_DOCUMENTS, ESTIMATE_COST,
  PREPARE_TIMELINE.

- Intent:
    journey: JourneyType
    confidence: Score
    source: Literal["rules", "llm", "user_specified"]
    sub_intents: list[JourneyType]      (multi-intent support)
    reasoning: str | None               (why this was classified; LLM-supplied
                                         if source=="llm")

- ExecutionPlan:
    journey: JourneyType
    waves: list[list[Stage]]            (topologically sorted)
    skipped_stages: list[Stage]         (for audit)
    options: dict[str, Any]             (per-journey tuning knobs)

Notes:
- Stage is imported from core/orchestrator/stages.py — the ONE schema file
  allowed to reach into core.
"""
