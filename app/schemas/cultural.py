"""Cultural & language preparation schemas.

Models:
- LanguageTip:
    phrase: str, translation: str, context: str       (e.g. "ordering food")

- EtiquetteNote:
    topic: Literal["greeting","workplace","dining","public","transport"]
    do: list[str]
    dont: list[str]

- FirstWeekTip:
    day: int (1..7), task: str, why_it_matters: str

- CulturalPack (engine output):
    country: CountryCode
    language_basics: list[LanguageTip]
    workplace_etiquette: list[EtiquetteNote]
    social_etiquette: list[EtiquetteNote]
    communication_style: str     (paragraph, possibly LLM-enriched)
    first_week: list[FirstWeekTip]
    dos_and_donts: list[str]
    source: Literal["template","template+llm"]   (transparency for the UI)
"""
