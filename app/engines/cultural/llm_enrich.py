"""LLM-driven personalization of cultural packs.

Responsibilities:
- `async personalize(base: CulturalPack, profile) -> CulturalPack`
    Uses the Anthropic client with prompt caching:
        - System prompt: "You personalize cultural guidance for relocators."
          (cached for massive reuse since it rarely changes)
        - User prompt: JSON of the base pack + profile segment fields.
    LLM is asked to:
        - Rewrite communication_style to reflect the user's role (e.g. more
          software-workplace examples for engineers).
        - Expand first_week tasks with role-specific tips.
        - Adjust examples in etiquette notes for family_with_kids vs single.
    Output is validated by ai/guards.py against CulturalPack schema; on
    validation failure, return the base pack unchanged.

Public API:
- async personalize(base, profile) -> CulturalPack

Design notes:
- LLM may NOT add new fields or remove mandatory ones — the guard strips
  anything outside the schema.
- Token-cost conscious: batches all enrichment into one call per country.
"""
