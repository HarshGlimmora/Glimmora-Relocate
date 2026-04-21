"""Orchestrated analysis HTTP route — the primary MVP endpoint.

Endpoints:
- POST /v1/analysis/run
    Body: { profile_id, target_country?, intent?, options? }
    Flow:
        1. Load UserProfile from repository.
        2. If intent not provided, call IntentService.classify().
        3. Build ExecutionPlan via orchestrator.plan.build_plan(intent).
        4. Call orchestrator.runner.run(plan, profile) — fans out engines per
           the DAG defined in orchestrator/stages.py.
        5. Return the final CaseSummary assembled by the summary engine.
    Response modes:
        - Synchronous (default): waits for completion, returns final summary.
          Target latency < 4s with parallel fan-out + Redis cache + prompt caching.
        - Async (when `options.async=true`): returns 202 + case_id, caller polls
          GET /v1/cases/{id}/status.

Errors:
- 404 if profile missing
- 422 on bad input
- 503 if a hard-required engine fails (e.g. Intake) — see core/orchestrator/errors.py
- 200 with partial summary + warnings when soft-failures occur
"""
