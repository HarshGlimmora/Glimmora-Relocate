"""Pipeline runner — executes an ExecutionPlan wave by wave.

Responsibilities:
- `async def run(plan, profile, ctx) -> CaseResult` — the main entrypoint.
- For each wave in the plan:
    1. Start all stages in the wave concurrently via `asyncio.gather`
       (return_exceptions=True so one stage's failure doesn't cancel siblings).
    2. For each stage:
        - Check cache (core/cache.py) for a hit on (case_id, stage, input_hash).
        - On hit: load typed result, mark SKIPPED, emit telemetry event.
        - On miss: call the stage's service (via factory from stages.py),
          capture duration, write result to cache + persistence/case_artifacts.
    3. Write per-stage StageResult into the Aggregator.
    4. Emit events: stage.started, stage.completed, or stage.failed.
- Short-circuit on hard-required stage failure (INTAKE, INTENT, SUMMARY) — raise
  a typed orchestrator error (errors.py).
- Continue on soft failures — attach warnings to the aggregator, keep running.
- After the final wave, call SummaryService.assemble(aggregator) to produce the
  final CaseSummary.

Ctx includes:
- case_id, request_id, db session, redis, kb registry, feature_flags.

Concurrency guarantees:
- Two stages in the same wave see the same snapshot of prior waves' outputs.
- No stage mutates shared state — aggregator writes are single-writer per stage.
"""
