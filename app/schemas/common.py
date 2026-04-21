"""Common primitive types reused across schemas.

Contents:
- BaseSchema            — parent class with strict pydantic config (frozen,
                          extra="forbid", whitespace-stripping).
- Money                 — { amount: Decimal, currency: ISO-4217 str }.
- CountryCode           — NewType over str, validated against ISO-3166-1 alpha-2.
- Score                 — bounded float 0.0–1.0 with helper `.band()` → low/med/high.
- UrgencyBand           — enum: IMMEDIATE, THREE_MONTHS, SIX_MONTHS, TWELVE_PLUS.
- FamilyStatus          — enum: SINGLE, COUPLE, FAMILY_WITH_KIDS, EXTENDED.
- WorkPreference        — enum: ONSITE, HYBRID, REMOTE, ANY.
- ExperienceLevel       — enum: JUNIOR, MID, SENIOR, LEAD, PRINCIPAL.
- DateRange             — { earliest: date, latest: date }.
- Warning               — mirrored from orchestrator/errors.py for API exposure.

Notes:
- Enums are serialized as their string values for stable JSON contracts.
- Validators here are pure — no I/O, no KB lookups (KB lives in engines).
"""
