"""Datetime helpers shared across engines.

Responsibilities:
- `now()` -> datetime (UTC, timezone-aware). The ONE entry point so tests can
  freeze time via a single monkeypatch.
- `today()` -> date (UTC today).
- `add_working_days(d, n)` -> date (skips weekends; MVP ignores holidays).
- `business_days_between(a, b)` -> int.
- `iso(date_or_datetime)` -> str (stable ISO-8601 output for JSON).

Design notes:
- Keep this file timezone-paranoid; naive datetimes are banned.
- Public holiday-aware variants can be added later behind the same function
  names using a KB holiday table — callers won't change.
"""
