"""Timeline HTTP route — per-case drill-down.

Endpoints:
- GET /v1/cases/{case_id}/timeline
    Returns the persisted Timeline:
        { milestones: Milestone[], critical_path: str[], earliest_move_date,
          latest_move_date, delay_risks: DelayRisk[] }.

- POST /v1/cases/{case_id}/timeline/reschedule
    Body: { target_move_date: date } OR { urgency: "immediate"|"3m"|"6m"|"12m+" }
    Calls TimelineService.reschedule() which adjusts milestone dates against the
    critical path. Does not rerun Document or Financial engines.

Notes:
- Timeline is a view over the milestone DAG — actual recomputation is cheap.
- Reschedule never returns timelines that violate deterministic lead times
  pulled from knowledge/timeline_templates.json (e.g. visa processing minimums).
"""
