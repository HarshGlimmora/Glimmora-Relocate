"""Execution plan builder — turns an Intent into a concrete stage list.

Responsibilities:
- `build_plan(intent: JourneyType) -> ExecutionPlan` — selects which stages run
  for the given journey. Sources the mapping from
  `engines/intent/journey_map.py`.
- Topologically sort the selected stages against STAGE_DEPENDENCIES (stages.py).
- Group topologically-equal stages into "waves" so runner.py can fan them out
  with asyncio.gather.
- Validate the plan at build time: no cycles, no missing dependencies.

Journey → stages mapping (from journey_map.py):
    find_better_job_abroad : INTAKE, INTENT, JOB, RELOCATION, FINANCIAL,
                             DOCUMENT, CULTURAL, TIMELINE, RECOMMENDATION, SUMMARY
    compare_countries      : INTAKE, INTENT, RELOCATION×N, FINANCIAL×N,
                             RECOMMENDATION, SUMMARY
    check_feasibility      : INTAKE, INTENT, RELOCATION, FINANCIAL, DOCUMENT,
                             RECOMMENDATION, SUMMARY
    generate_plan          : full pipeline
    validate_documents     : INTAKE, INTENT, DOCUMENT, SUMMARY
    estimate_cost          : INTAKE, INTENT, FINANCIAL, SUMMARY

Returns:
- ExecutionPlan (see schemas/intent.py): { journey, waves: list[list[Stage]] }.
"""
