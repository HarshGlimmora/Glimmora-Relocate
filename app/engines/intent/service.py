"""IntentService — classifies a profile's journey and produces an ExecutionPlan.

Methods:
- async classify(profile: UserProfile, freeform: str | None) -> Intent
    1. Run rules.classify_by_rules(profile, freeform) first — cheap, deterministic.
    2. If rule confidence >= threshold, return that Intent with source="rules".
    3. Else, if FEATURE_LLM_INTENT_FALLBACK is on, call classifier.llm_classify().
       Coerce the LLM output into the JourneyType enum via guard (ai/guards.py).
    4. Else, fall back to the safe default: JourneyType.GENERATE_PLAN with
       confidence=0.4, source="rules", note="ambiguous — running full pipeline".

- async build_plan(intent: Intent, profile: UserProfile) -> ExecutionPlan
    Delegates to core/orchestrator/plan.build_plan using journey_map.py for
    the stage list.

Design notes:
- Determinism comes first. LLM only disambiguates freeform text when rules fail.
- Multi-intent support: `intent.sub_intents` is populated by rules when the
  user's freeform text clearly spans two journeys (e.g. compare + plan).
"""
