"""Numeric scores -> plain language explanations.

Responsibilities:
- `explain(aggregator) -> list[ScoreExplanation]`
    For each headline score across engines:
        - affordability_score            (financial)
        - relocation_composite           (relocation top destination)
        - job_composite                  (job top match)
        - document_readiness_pct         (document)
        - timeline_feasibility           (timeline delay risk avg)
    Each becomes a ScoreExplanation with:
        - plain_language: templated string with the actual number
        - top_drivers: the two dimensions that contributed most (positively or
          negatively) based on the engine's score breakdown.

Public API:
- explain(aggregator) -> list[ScoreExplanation]

Design notes:
- Drivers are identified by sorting the dimension scores; no LLM. Consistent
  across runs for the same inputs.
"""
