"""TimelineService — builds the relocation timeline from prior stage outputs.

Methods:
- async build(profile, document_checklist, top_job_match=None,
              target_date=None) -> Timeline
    Pipeline:
        1. Load the per-country timeline template from templates.load(country).
        2. Expand milestones based on profile.urgency, doc readiness, and
           selected visa path.
        3. Merge doc-related milestones: each MISSING doc becomes an
           application/submission milestone; each EXPIRING becomes a renewal
           milestone.
        4. If top_job_match given, inject job-offer-dependent milestones
           (offer acceptance, start date, relocation package negotiation).
        5. Call graph.build_dag(milestones) to wire depends_on relations from
           KB template.
        6. Call scheduler.compute_dates(dag, urgency, target_date) to set
           earliest_start, earliest_finish, latest_finish, and find the
           critical path.
        7. Attach delay_risks (per-milestone uncertainty from KB).

- async reschedule(existing_timeline, target_date | urgency) -> Timeline
    Pure re-scheduling — doesn't change the DAG, only the date layer.

Design notes:
- Deterministic. No LLM.
- The engine refuses to produce timelines shorter than KB-enforced minimums
  (visa processing lead times) — it raises a recoverable warning instead,
  consumed by the recommendation engine.
"""
