"""Output validation guards for LLM responses.

Responsibilities:
- `coerce_json(raw_text) -> dict`
    Robust JSON extraction: handles triple-backtick fenced blocks, trims
    leading/trailing prose, falls back to the first {...} span. Raises
    LLMParseError on unrecoverable failure.
- `validate_against_schema(data, schema_cls: type[BaseModel]) -> BaseModel`
    Pydantic validation; raises LLMSchemaError on failure.
- `coerce_enum(value, enum_cls) -> Enum`
    Case-insensitive match against enum values; raises on unknown.
- `strip_to_schema(data, schema_cls) -> dict`
    Drops unknown keys so LLM-hallucinated extras don't break Pydantic's
    extra='forbid' config.
- `assert_no_hallucinated_entities(text, allowed_entities: set[str])`
    Used by llm_narrator.py to reject paragraphs that mention countries or
    job titles not present in the deterministic payload.

Public API:
- coerce_json, validate_against_schema, coerce_enum, strip_to_schema,
  assert_no_hallucinated_entities.

Design notes:
- Guards are pure; they raise typed errors the caller can catch to decide the
  fallback (e.g., serve the template pack instead of the enriched one).
"""
