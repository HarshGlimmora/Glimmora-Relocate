"""SQLAlchemy ORM models — the three MVP tables.

Tables:
- Profile
    profile_id (uuid, pk), user_id (str, nullable for MVP anon use),
    raw_input (jsonb, original ProfileInput), normalized (jsonb, UserProfile),
    created_at, updated_at.

- Case
    case_id (uuid, pk), profile_id (fk), intent (jsonb, Intent),
    status (enum), summary (jsonb, CaseSummary, nullable),
    stage_records (jsonb, list[StageRecord]),
    kb_version (str, snapshot hash at run-time for reproducibility),
    created_at, updated_at, deleted_at (nullable soft-delete).

- CaseArtifact
    artifact_id (uuid, pk), case_id (fk, indexed), stage (enum),
    payload (jsonb, engine output), input_hash (str, for cache correlation),
    created_at.
    UNIQUE(case_id, stage) — one artifact per stage per case.

Public API:
- the ORM classes themselves, plus mapping helpers to/from schema types:
    Profile.from_schema(user_profile) / Profile.to_schema()
    Case.to_schema() / Case.from_aggregator(aggregator)
    CaseArtifact.from_stage_result(stage, result)

Design notes:
- JSONB columns over separate columns for engine outputs: the schemas evolve;
  we want backwards-compatible storage without migrations for every field add.
- `stage_records` is denormalized on Case for fast GET /status reads (no join).
"""
