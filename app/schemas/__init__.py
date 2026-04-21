"""Shared Pydantic schemas — the contract surface between engines.

Golden rule: engines never import from each other; they only import from here.
Adding a field used across engines means adding it to the appropriate schema
file here first.

Import style preferred downstream:
    from app.schemas.profile import UserProfile
    from app.schemas.financial import FinancialAssessment

All models subclass a common `BaseSchema` (in common.py) that sets:
- model_config = ConfigDict(frozen=True, extra="forbid", str_strip_whitespace=True)
- JSON-serializable datetime/Decimal handling.
"""
