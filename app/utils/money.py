"""Money helpers — Decimal math, formatting, comparisons.

Responsibilities:
- `add(a: Money, b: Money) -> Money` with currency compatibility check.
- `scale(m: Money, factor: Decimal|float) -> Money`
- `format(m: Money, locale='en') -> str` — display helper for UI payloads.
- `zero(currency)` -> Money
- `ensure_currency(m: Money, expected: str)` raises on mismatch.

Design notes:
- Never do arithmetic on floats for salaries or costs. Everything is Decimal.
- Currency conversion is NOT here — that belongs to engines/financial/fx.py
  because it involves stateful rate lookups. This file is value-ops only.
"""
