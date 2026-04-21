"""Intent-inference HTTP route.

Endpoints:
- POST /v1/intent/infer
    Body: { profile_id: str, freeform?: str }
    Calls IntentService.classify(profile, freeform) which:
        1. Runs deterministic rules first.
        2. Falls back to LLM classifier only if rules are inconclusive AND
           FEATURE_LLM_INTENT_FALLBACK is enabled.
    Returns: { intent: JourneyType, confidence: float, plan: ExecutionPlan }.

Note:
- This endpoint is optional/standalone — useful for the UI to preview which
  modules will run before committing to /analysis/run. /analysis/run internally
  calls the same service.
"""
