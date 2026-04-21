"""Intake normalizers — convert ProfileInput to canonical UserProfile.

Normalization steps:
- Role normalization:
    "sr software dev", "Software Developer II", "Backend Engineer" -> canonical
    role via a rules-first lookup against knowledge/job_categories.json, with
    a small LLM fallback behind FEATURE_LLM_INTENT_FALLBACK for exotic titles.
    Sets experience_level from (role + years_experience) using KB bands.

- Salary normalization:
    All salary amounts converted to USD via engines/financial/fx.py (shared FX
    helper). Preserve original currency in the repository row for audit, but
    every engine downstream sees USD.

- Country normalization:
    Upper-case ISO-3166-1 alpha-2. Accept common aliases ("UK" -> "GB",
    "USA" -> "US") via KB alias list.

- Urgency banding:
    Freeform urgency ("ASAP", "within 3 months") -> UrgencyBand enum.

- Visa status normalization:
    Freeform -> KB visa_status_code via fuzzy match; defaults to "none" with
    a warning attached.

- Relocation willingness:
    Clamp into [0.0, 1.0]; accept both 0-1 and 0-100 input formats.

Public API:
- normalize(raw: ProfileInput, kb) -> UserProfile

Design notes:
- Every normalization step is idempotent: normalize(normalize(x)) == normalize(x).
  This is what makes update_profile safe to call repeatedly.
"""
