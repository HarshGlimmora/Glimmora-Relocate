"""LLM-based intent classifier — fallback when rules are inconclusive.

Responsibilities:
- `async llm_classify(profile, freeform) -> Intent`
- Build a prompt from a template in ai/prompts/intent_classify.md that includes:
    - the list of allowed JourneyType values (enum serialization)
    - a short profile summary (role, current/target countries, urgency)
    - the freeform text, if any
- Call ai.client.complete() with JSON-mode enforced, low temperature (0.2).
- Run the response through ai/guards.py to coerce into JourneyType; raise
  LLMUnavailable on unrecoverable parse failure.

Caching:
- Cache by sha256(profile_slice + freeform) in Redis with a long TTL (24h).
  Profile classifications rarely change unless the profile does.

Design notes:
- Never fall through silently to a wrong enum — unknown classes must raise, and
  IntentService will fall back to its safe default.
"""
