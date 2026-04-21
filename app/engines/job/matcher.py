"""Per-candidate dimension matching — pure functions, no I/O.

Functions (each returns a Score in [0,1] and evidence strings):
- role_fit(profile, candidate)      — canonical role match + category adjacency.
- skill_fit(profile, candidate)     — Jaccard over skill sets; synonyms via KB.
- salary_fit(profile, candidate)    — target salary vs candidate range overlap.
- location_fit(profile, candidate)  — work_preference × candidate.remote_ok +
                                      city desirability from KB.
- seniority_fit(profile, candidate) — exact/adjacent/mismatch.
- visa_fit(profile, candidate)      — 1.0 if sponsorship available AND profile
                                      qualifies; 0.0 if hard mismatch.

Public API:
- match(profile, candidate) -> JobScore
    Delegates to each dimension function; returns JobScore without composite
    (composite is computed in scorer.py to keep weights configurable).

Design notes:
- No KB writes; all reference lookups are read-only on the in-memory registry.
- Fully unit-testable without a DB.
"""
