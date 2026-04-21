"""Document expiry and validity checks.

Responsibilities:
- `apply(items, profile) -> list[DocItem]`
    For each item:
        - If item has expires_on:
            - < today       -> status=MISSING (already expired)
            - < today+180d  -> status=EXPIRING (needs renewal, still valid)
            - else          -> keep current status
        - Passport-specific rule: most destinations require 6 months validity
          beyond intended stay — KB provides per-country minimum. If passport
          expires_on doesn't clear that bar, mark EXPIRING regardless of date.
- `days_until_expiry(item) -> int | None`

Public API:
- apply(items, profile) -> list[DocItem]

Design notes:
- Today is supplied by utils/datetimes.now() so tests can freeze time.
- Destination-specific rules come only from KB; no hardcoded country logic.
"""
