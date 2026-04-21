"""Friction flag detection — surfaces practical move difficulties.

Responsibilities:
- `detect(profile, country_code) -> list[FrictionFlag]`
    Rules (all KB-driven, from knowledge/data/countries.json attributes):
    - HOUSING_TIGHT_MARKET       : rental_vacancy_rate < 2%
    - HIGH_DEPOSIT_REQUIREMENT   : typical_deposit_months > 3
    - NO_ENGLISH_HEALTHCARE      : healthcare.english_support == "poor"
                                   AND profile lacks local language
    - SCHOOL_ACCESS_LIMITED      : family_with_kids AND limited international schools
    - BANKING_HURDLES            : requires residence permit before bank account
    - BUREAUCRACY_SLOW           : avg gov process > 12 weeks
    - CLIMATE_MISMATCH           : climate zone significantly different from current
    - SOCIAL_ISOLATION_RISK      : foreigner_integration_index < 0.4

Public API:
- detect(profile, country_code) -> list[FrictionFlag]

Design notes:
- Severity (low/med/high) comes from a KB-configured threshold per code —
  never hardcoded in this file.
"""
