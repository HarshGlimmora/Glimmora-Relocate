"""Case envelope + final summary schemas.

Models:
- CaseStatus (enum): RUNNING, OK, PARTIAL, FAILED, ARCHIVED.

- HeroMetric:
    label: str                      (e.g. "Monthly surplus")
    value: str                      (preformatted for display)
    tone: Literal["positive","neutral","warning","negative"]

- SummarySection (container for each engine's user-facing slice):
    key: Literal["jobs","relocation","financial","documents","cultural",
                 "timeline","recommendation"]
    title: str
    summary_text: str
    payload: dict                   (engine-specific drill-down payload)

- CaseSummary (UI-ready final payload):
    case_id: str
    headline: str                   (one sentence verdict)
    verdict: str                    (mirrors recommendation.verdict)
    hero_metrics: list[HeroMetric]  (3–5 hero numbers)
    top_warnings: list[str]
    next_actions: list[str]
    sections: list[SummarySection]
    generated_at: datetime
    degraded: bool                  (true if any soft failure)

- Case (storage envelope):
    case_id: str
    profile_id: str
    intent: Intent
    status: CaseStatus
    artifacts: dict[Stage, dict]    (per-stage persisted outputs)
    summary: CaseSummary | None
    created_at: datetime
    updated_at: datetime
"""
