"""Financial engine tests.

Files to add:
- test_cost_of_living.py    — index scaling; family multiplier; relocation_cost.
- test_budget.py            — tax from gross; surplus math; pressure bounds.
- test_runway.py            — positive surplus -> 999; burn scenarios; band cuts.
- test_affordability.py     — composite computation; urgency penalty edge cases.
- test_fx.py                — seed load; unknown currency raises; refresh cycle.
- test_service.py           — assess() end-to-end with fixture profile + KB;
                              simulate() does not mutate base.
"""
