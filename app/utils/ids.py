"""ID generation helpers.

Responsibilities:
- `new_profile_id()` -> str         (ULID-style, monotonic, URL-safe).
- `new_case_id()`    -> str
- `new_request_id()` -> str
- `new_input_hash(payload)` -> str  deterministic sha256 hex used for cache keys
                                    across engines (core/cache.py calls this).

Design notes:
- ULIDs over UUIDs for human-sortable history UIs. Still 128-bit, still unique.
- Input hashing canonicalizes via orjson with sort_keys to be stable against
  field-order reshuffles.
"""
