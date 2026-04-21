"""Recommendation & explanation schemas.

Models:
- ScoreExplanation:
    metric: str                     (e.g. "affordability_score")
    value: Score
    plain_language: str             (e.g. "Comfortable — you'd save ~$900/mo")
    top_drivers: list[str]          (what pushed it up or down)

- Tradeoff:
    axis: str                       (e.g. "salary_vs_lifestyle")
    option_a: str, option_b: str
    which_wins: str                 (AI-narrated when LLM layer is on)
    why: str

- Blocker:
    code: str                       (e.g. "VISA_INELIGIBLE", "INSUFFICIENT_SAVINGS")
    severity: Literal["info","warning","critical"]
    message: str
    unblock_actions: list[str]

- NextAction:
    priority: int (1..5)
    action: str
    est_effort: Literal["minutes","hours","days","weeks"]
    due_within_days: int | None

- Recommendation (engine output):
    verdict: Literal["go","go_with_caveats","delay","reconsider"]
    top_country: CountryCode
    top_job_id: str | None
    score_explanations: list[ScoreExplanation]
    tradeoffs: list[Tradeoff]
    blockers: list[Blocker]
    next_actions: list[NextAction]
    narrative: str                  (LLM-authored paragraph, optional)
"""
