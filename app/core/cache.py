"""Redis-backed cache wrapper for stage results and cross-request reuse.

Responsibilities:
- Single `Cache` class wrapping a Redis async client.
- Typed get/set: `get(key, model_cls)` and `set(key, value, ttl)` serialize via
  Pydantic + orjson so cached values round-trip cleanly back into schema types.
- Key builder: `stage_key(case_id, stage, input_hash)` — canonical format
  `"stage:{case_id}:{stage}:{input_hash}"`. Engines must call this instead of
  constructing keys manually.
- Input hashing: deterministic hash of the stage's relevant input subset
  (profile slice + knowledge version), so changing unrelated profile fields
  doesn't bust the cache.
- Namespace-wide invalidation: `invalidate_case(case_id)` used by IntakeService
  when the profile changes.
- TTL defaults per stage (short for FX, long for cultural templates).

Notes:
- Tolerate Redis being unavailable: degrade to no-op cache + log a warning, do
  not fail requests.
"""
