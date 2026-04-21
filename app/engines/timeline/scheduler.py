"""Date computation for milestones.

Responsibilities:
- `compute_dates(graph, urgency, target_date=None) -> ScheduledGraph`
    Forward pass:
        - earliest_start[root] = today (or user-provided start_date)
        - earliest_start[n] = max(earliest_finish[p] for p in parents(n))
        - earliest_finish[n] = earliest_start[n] + duration[n]
    Backward pass (if target_date provided):
        - latest_finish[MOVE] = target_date
        - latest_finish[n] = min(latest_start[c] for c in children(n))
        - latest_start[n] = latest_finish[n] - duration[n]
    Identifies critical path as nodes where earliest_finish == latest_finish.
- `feasibility_check(graph, target_date) -> FeasibilityReport`
    Flags if target_date violates KB-enforced minimum lead times.

Public API:
- compute_dates(graph, urgency, target_date=None) -> ScheduledGraph
- feasibility_check(graph, target_date) -> FeasibilityReport

Design notes:
- Working days vs calendar days: default calendar days. Per-country switch
  to working days is configurable in KB (some jurisdictions count business
  days for processing).
"""
