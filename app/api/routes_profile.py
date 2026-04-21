"""Profile HTTP routes.

Endpoints:
- POST   /v1/profiles
    Body: ProfileInput (schemas/profile.py)
    Calls IntakeService.build_profile() → persists via IntakeRepository.
    Returns: { profile_id, profile: UserProfile }.
    Errors: 422 on validation; 409 if duplicate idempotency key.

- PATCH  /v1/profiles/{profile_id}
    Body: partial ProfileInput (Pydantic `model_copy(update=...)` semantics).
    Calls IntakeService.update_profile() — re-validates + re-normalizes.
    Returns: updated UserProfile.
    Side effect: invalidates Redis stage cache for any Case derived from this profile
    (delegated to IntakeService; route stays ignorant).

- GET    /v1/profiles/{profile_id}
    Simple read-through repository call. 404 if not found.

This file contains:
- router definition (APIRouter with tags=["profile"])
- three route handlers
- pydantic response models inlined only if they are API-specific wrappers;
  anything reusable belongs in schemas/.
"""
