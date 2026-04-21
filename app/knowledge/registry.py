"""KB registry — the single read-access surface for all reference data.

Responsibilities:
- Holds the KnowledgeSnapshot in a module-level variable set by loader.load_all()
  during lifespan startup.
- Typed accessor methods so engine code is clean:
    kb.country(code)            -> CountryMeta
    kb.countries()              -> list[CountryMeta]
    kb.visa_rules(country)      -> list[VisaRule]
    kb.document_templates(country, visa_path) -> list[DocTemplate]
    kb.timeline_template(country, visa_path)  -> list[MilestoneTemplate]
    kb.job_category(role_canonical) -> JobCategory
    kb.scoring_weights(engine)  -> ScoringWeights
    kb.cultural(country)        -> CulturalSnippetPack
    kb.fx_rate(src, dst)        -> Decimal
    kb.version()                -> str  (hash of current snapshot)

- Raises KBMissingError with a clear message when a key is absent — engines
  should never get None from the registry; they get typed data or an error.

Public API:
- The `kb` singleton imported as `from app.knowledge.registry import kb`.

Design notes:
- Keep this file small and boring. All intelligence lives in the JSON data,
  not in access code.
"""
