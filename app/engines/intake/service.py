"""IntakeService — public interface for the intake engine.

Methods:
- async build_profile(raw: ProfileInput) -> UserProfile
    1. Run validators.validate_input(raw) — raises OrchestratorError.HardStageFailure
       on invalid input.
    2. Run normalizers.normalize(raw) — returns UserProfile.
    3. Persist via IntakeRepository.save().
    4. Emit event: "profile.created" (for any listeners).
    5. Return the canonical UserProfile.

- async update_profile(profile_id, patch: dict) -> UserProfile
    1. Load existing profile; merge patch with Pydantic's model_copy.
    2. Re-validate + re-normalize (normalization is idempotent).
    3. Persist updated version.
    4. Invalidate cache for every case derived from this profile
       (core/cache.py invalidate_case).
    5. Return the new profile.

- async get_profile(profile_id) -> UserProfile
    Simple read-through the repository; 404-worthy error if missing.

Design notes:
- The service is the ONLY thing routes call. Validators/normalizers are
  module-private from the rest of the codebase.
- Pure function behavior — no global state.
"""
