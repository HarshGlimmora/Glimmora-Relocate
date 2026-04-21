"""Timeline / milestone schemas.

Models:
- MilestoneCategory (enum): APPLICATION, DOCUMENT, VISA, HOUSING, JOB,
  MOVE, SETTLEMENT.

- MilestoneStatus (enum): NOT_STARTED, IN_PROGRESS, BLOCKED, DONE.

- Milestone:
    milestone_id: str
    title: str
    category: MilestoneCategory
    depends_on: list[str]           (other milestone_ids)
    earliest_start: date
    expected_duration_days: int
    earliest_finish: date
    latest_finish: date | None      (driven by urgency)
    status: MilestoneStatus
    critical: bool                  (on critical path)
    notes: str | None

- DelayRisk:
    milestone_id: str
    risk: Score
    reason: str                     (e.g. "visa processing time highly variable")

- Timeline (engine output):
    milestones: list[Milestone]
    critical_path: list[str]        (milestone_ids in order)
    earliest_move_date: date
    latest_move_date: date
    total_weeks: int
    delay_risks: list[DelayRisk]
"""
