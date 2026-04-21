"""Knowledge Base tests.

Files to add:
- test_loader.py       — every JSON loads; validation errors raise with a
                          helpful message; version hash is stable across
                          equivalent edits (ordering, whitespace).
- test_registry.py     — typed accessors return the right types; KBMissingError
                          on unknown country / visa path / currency.
- test_data_shape.py   — smoke-test each data file against a minimal schema
                          so broken JSON edits fail loudly.
"""
