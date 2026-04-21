"""Relocation engine tests.

Files to add:
- test_dimensions.py    — per-dimension scoring with fixture country metadata.
- test_comparators.py   — summarize produces stable, ordered output; pairwise
                          math is symmetric.
- test_friction.py      — each friction rule fires on matching KB data and
                          stays silent otherwise.
- test_service.py       — evaluate() end-to-end with 3 destinations; ordering
                          matches expected composite scores.
"""
