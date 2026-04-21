"""User profile schemas — input and canonical forms.

Models:
- ProfileInput (wire format from the frontend intake form):
    current_country: CountryCode
    target_countries: list[CountryCode] (1..5)
    current_role: str                   (freeform, normalized later)
    years_experience: int               (0..60)
    current_salary: Money
    target_salary: Money | None
    family_status: FamilyStatus
    urgency: UrgencyBand
    visa_status: str | None             (freeform; e.g. "none", "EU Blue Card pending")
    budget_ceiling: Money | None
    work_preference: WorkPreference
    relocation_willingness: Score       (0.0–1.0 self-reported)
    notes: str | None                   (freeform — consumed by intent engine)

- UserProfile (canonical, post-normalization — the shape other engines consume):
    profile_id: str
    current_country: CountryCode
    target_countries: list[CountryCode]
    normalized_role: str                (canonical title from role_normalizer)
    role_category: str                  (mapped via KB job_categories)
    experience_level: ExperienceLevel
    current_salary_usd: Money           (always USD for cross-engine math)
    target_salary_usd: Money | None
    family_status: FamilyStatus
    urgency: UrgencyBand
    visa_status_code: str               (KB-canonical visa status)
    budget_ceiling_usd: Money | None
    work_preference: WorkPreference
    relocation_willingness: Score
    raw_notes: str | None
    created_at: datetime
    updated_at: datetime

Notes:
- ProfileInput is mutable (pre-validation); UserProfile is frozen (immutable
  snapshot passed to engines).
"""
