"""Role normalization — freeform title -> canonical role + seniority.

Responsibilities:
- `normalize(role_text, years_experience) -> NormalizedRole`
    NormalizedRole = { canonical_title, role_category, seniority: ExperienceLevel }
- Rules-first:
    - Lowercase + strip modifiers (Sr./Senior/Lead/II/III).
    - Substring + alias match against knowledge/job_categories.json.
    - Seniority from title prefix ("Senior X") OR years bands (0-2 junior,
      3-5 mid, 6-9 senior, 10-14 lead, 15+ principal).
- LLM fallback (under FEATURE_LLM_INTENT_FALLBACK) for exotic titles, with
  output validated against the known role_category set.

Public API:
- normalize(role_text: str, years_experience: int) -> NormalizedRole

Design notes:
- Called both by intake (preferred, once) and by job.service (safety net).
- Never raises — unknown roles return category="other" with a warning.
"""
