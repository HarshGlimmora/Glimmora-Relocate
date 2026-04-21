"""RelocationService — public interface for the Relocation Intelligence engine.

Methods:
- async evaluate(profile: UserProfile,
                 destinations: list[CountryCode] | None = None) -> RelocationFit
    Pipeline:
        1. If destinations is None, use profile.target_countries.
        2. For each destination, run dimensions.score_all(profile, country)
           -> list[DimensionScore] across housing/transport/healthcare/
              lifestyle/family.
        3. Run friction.detect(profile, country) -> list[FrictionFlag].
        4. Compute overall score as weighted avg of dimensions (weights from
           knowledge/scoring_weights.json; family-weighted higher when
           family_status != SINGLE).
        5. Build DestinationScore per country; sort desc.
        6. Run comparators.summarize(list_of_destinations) to produce a short
           list of cross-destination comparison_notes (deterministic template).
        7. Return RelocationFit.

Design notes:
- Pure function of (profile, KB). Same inputs -> same outputs, safe to cache.
- No LLM calls. Cultural/recommendation engines handle narrative layers.
"""
