"""RecommendationService — turns aggregated engine outputs into explanations.

Methods:
- async explain(aggregator) -> Recommendation
    Pipeline:
        1. score_explainer.explain(aggregator) -> list[ScoreExplanation]
           Deterministic mapping: every numeric score becomes prose with its
           top drivers.
        2. tradeoff.surface(aggregator) -> list[Tradeoff]
           Detect standard tradeoff patterns ("Higher salary but tighter
           runway", "Best job country has weakest healthcare").
        3. blockers.collect(aggregator) -> list[Blocker]
           Drawn from document checklist blocking_missing, financial
           affordability.band=="not_viable", visa ineligibility, etc.
        4. next_actions.build(aggregator, blockers) -> list[NextAction]
           Deterministic prioritized list — e.g., missing passport = priority 1.
        5. verdict.derive(aggregator, blockers) -> Literal[...] — rule-based.
        6. If FEATURE_LLM_RECOMMENDATION_NARRATION is on, call
           llm_narrator.compose(the above) to produce the human-friendly
           `narrative` paragraph. Otherwise narrative is a deterministic
           stitched-together summary.

Design notes:
- Deterministic layers run first and are always present. LLM only adds polish.
- This engine produces the highest user-visible value and is the right place
  to invest in prompt quality post-MVP.
"""
