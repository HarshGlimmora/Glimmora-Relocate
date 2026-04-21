"""Intake engine tests.

Files to add:
- test_validators.py    — every rule in validators.py; invalid inputs produce
                          specific FieldError codes.
- test_normalizers.py   — idempotency, salary USD conversion, role + country
                          alias handling, urgency banding edge cases.
- test_service.py       — end-to-end build_profile + update_profile; repository
                          mocked.
- test_repository.py    — ORM round-trip; optimistic lock conflict.
"""
