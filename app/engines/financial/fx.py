"""Currency conversion helper — shared across engines.

Responsibilities:
- `convert(amount: Money, to_currency: str) -> Money`
- `describe(src: str, dst: str, salary_delta_local: Money) -> CurrencyImpact`
    Narrative + numeric impact for the financial engine's output.
- Refreshable rates:
    - Loaded on startup from knowledge/data/fx_rates.json (seed).
    - If FX_PROVIDER_URL is set, a background refresh task (lifecycle.py)
      pulls fresh rates every FX_REFRESH_TTL_SECONDS.
    - Fallback to seed if the provider fails.

Public API:
- convert(amount, to_currency) -> Money
- rate(from_ccy, to_ccy) -> Decimal
- describe(...) -> CurrencyImpact

Design notes:
- FX is stateful at module level (a cached dict). Every engine that needs
  currency conversion goes through this file — not via its own HTTP call.
- Unknown currencies raise a specific error surfaced to the user ("We don't
  support XYZ yet"), rather than silently using a default.
"""
