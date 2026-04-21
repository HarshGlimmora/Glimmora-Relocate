"""Per-stage status tracking for a running Case.

Responsibilities:
- Define `StageStatus` enum: PENDING, RUNNING, OK, SKIPPED, FAILED.
- Define `StageRecord`: { stage, status, started_at, finished_at, duration_ms,
  error_code?, error_message?, cache_hit: bool }.
- Provide `StatusTracker` attached to each Case — maintains per-stage records
  and derives overall_status (RUNNING, OK, PARTIAL, FAILED).
- Persist status transitions to the cases table so GET /cases/{id}/status
  reflects live progress for polling UIs.

Notes:
- The tracker subscribes to the event bus (events.py) — no direct calls from
  engines.
- `overall_status` rules:
    - FAILED if any hard-required stage failed
    - PARTIAL if any soft stage failed but pipeline completed
    - OK if all attempted stages finished clean
    - RUNNING otherwise
"""
