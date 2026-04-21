"""Journey → stage list mapping.

Constants:
- JOURNEY_STAGES: dict[JourneyType, list[Stage]]
    COMPARE_COUNTRIES       : [INTAKE, INTENT, RELOCATION, FINANCIAL,
                               RECOMMENDATION, SUMMARY]
    FIND_BETTER_JOB_ABROAD  : [INTAKE, INTENT, JOB, RELOCATION, FINANCIAL,
                               DOCUMENT, CULTURAL, TIMELINE, RECOMMENDATION,
                               SUMMARY]
    CHECK_FEASIBILITY       : [INTAKE, INTENT, RELOCATION, FINANCIAL, DOCUMENT,
                               RECOMMENDATION, SUMMARY]
    GENERATE_PLAN           : full pipeline (all stages)
    VALIDATE_DOCUMENTS      : [INTAKE, INTENT, DOCUMENT, SUMMARY]
    ESTIMATE_COST           : [INTAKE, INTENT, FINANCIAL, SUMMARY]
    PREPARE_TIMELINE        : [INTAKE, INTENT, DOCUMENT, TIMELINE, SUMMARY]

Public API:
- stages_for(journey: JourneyType) -> list[Stage]
- required_kb_keys(journey) -> list[str]  (for preflight KB sanity checks)

Design notes:
- This is the ONLY place journeys are tied to stages. Orchestrator's plan.py
  imports this map and topologically sorts against STAGE_DEPENDENCIES.
- Adding a new journey type is a one-line change here + a new enum in
  schemas/intent.py.
"""
