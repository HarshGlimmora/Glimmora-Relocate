"""SummaryService — assembles the final CaseSummary and persists the Case.

Methods:
- async assemble(aggregator) -> CaseSummary
    Pipeline:
        1. formatter.build_sections(aggregator) -> list[SummarySection]
           One section per engine output, each with a short summary_text and
           a payload shaped for direct UI rendering.
        2. highlights.extract(aggregator) -> (hero_metrics, top_warnings,
           next_actions)
        3. Compose headline from recommendation.verdict + top country name.
        4. Build CaseSummary; set degraded=True if aggregator has any
           soft-failure warnings.
        5. Repository.save_summary(case_id, summary) to persist.

Design notes:
- SummaryService is the final stage — it must run even when the aggregator is
  partial. The formatter handles missing sections by emitting a placeholder
  section with a "not_available" hint so the UI can render gracefully.
- This engine never computes new scores. It only rearranges.
"""
