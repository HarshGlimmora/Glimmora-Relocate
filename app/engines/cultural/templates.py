"""Deterministic template loader for cultural packs.

Responsibilities:
- `load(country_code) -> CulturalPack`
    Reads knowledge/data/cultural_snippets.json for the country. Returns a
    fully-populated CulturalPack:
        - language_basics (10-20 phrases curated per country)
        - workplace_etiquette (5-8 do/don't items)
        - social_etiquette (5-8 items)
        - communication_style (short paragraph)
        - first_week (7 day-by-day tasks)
        - dos_and_donts (concise list)

Public API:
- load(country_code) -> CulturalPack

Design notes:
- No I/O at call time — the snippets JSON is already loaded into KB registry
  on startup.
- Returns a copy (defensive) so the LLM enrich step can mutate safely.
"""
