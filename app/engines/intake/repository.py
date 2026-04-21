"""IntakeRepository — persistence for UserProfile.

Responsibilities:
- CRUD against the `profiles` table (see persistence/models.py).
- Mapping between ORM Profile and schema UserProfile.
- Concurrent-update safety via an updated_at optimistic lock.

Public API:
- async save(profile: UserProfile) -> UserProfile
- async get(profile_id: str) -> UserProfile | None
- async update(profile_id, patch: dict) -> UserProfile
- async list_for_user(user_id) -> list[UserProfile]     (stub for MVP)

Design notes:
- This is the ONE place engines/intake touches the DB. The rest of the package
  is pure.
- No cross-engine imports: other engines never hit this repository; they receive
  UserProfile through the orchestrator context.
"""
