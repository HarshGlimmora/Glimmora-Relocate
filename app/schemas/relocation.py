"""Relocation fit / destination evaluation schemas.

Models:
- DimensionScore:
    name: Literal["housing","transport","healthcare","lifestyle","family"]
    score: Score
    evidence: list[str]     (short reasons from KB data)

- FrictionFlag:
    code: str               (e.g. "HOUSING_TIGHT_MARKET", "NO_ENGLISH_HEALTHCARE")
    severity: Literal["low","medium","high"]
    note: str

- DestinationScore (per target country/city):
    country: CountryCode
    city: str | None
    dimensions: list[DimensionScore]
    overall: Score
    frictions: list[FrictionFlag]

- RelocationFit (engine output):
    destinations: list[DestinationScore]    (ranked best-first)
    top_choice: DestinationScore
    comparison_notes: list[str]             (cross-destination highlights)
"""
