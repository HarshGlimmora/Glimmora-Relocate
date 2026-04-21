"""Per-section formatter — converts engine outputs into SummarySection objects.

Responsibilities:
- `build_sections(aggregator) -> list[SummarySection]`
    For each engine output in the aggregator, produce a SummarySection with:
        - key: "jobs" | "relocation" | "financial" | "documents" | "cultural"
               | "timeline" | "recommendation"
        - title: human-readable section title
        - summary_text: one sentence distilling the section
        - payload: the engine output, trimmed to UI-relevant fields

- Sub-formatters per key, each a pure function:
    format_jobs(job_matches) -> SummarySection
    format_relocation(relocation_fit) -> SummarySection
    format_financial(financial_assessment) -> SummarySection
    format_documents(document_checklist) -> SummarySection
    format_cultural(cultural_pack) -> SummarySection
    format_timeline(timeline) -> SummarySection
    format_recommendation(recommendation) -> SummarySection

Design notes:
- The UI is the primary contract consumer. Any UI-driven shape change lives
  here, not in schema files.
- Missing engine output -> placeholder section with summary_text="not_run".
"""
