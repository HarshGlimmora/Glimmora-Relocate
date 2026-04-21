"""Timeline template loader (per country).

Responsibilities:
- `load(country_code, visa_path) -> list[MilestoneTemplate]`
    MilestoneTemplate = {
        milestone_id, title, category, typical_duration_days,
        min_lead_days, max_delay_days, depends_on, critical_hint
    }
- Reads from knowledge/data/timeline_templates.json.
- Variants by visa path (e.g. EU Blue Card vs Skilled Worker) yield different
  milestone sets even for the same country.

Public API:
- load(country_code, visa_path) -> list[MilestoneTemplate]

Design notes:
- Templates are pure data. Any per-profile customization happens in service.py,
  never in this loader.
"""
