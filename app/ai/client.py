"""Anthropic client wrapper with prompt caching + telemetry.

Responsibilities:
- Instantiate `anthropic.AsyncAnthropic()` using ANTHROPIC_API_KEY.
- `async complete(system, messages, response_format='text'|'json',
                 cache_system=True, temperature=0.2, max_tokens=...) -> LLMResult`
    - When cache_system=True, adds cache_control to the system block so repeated
      calls with the same system prompt hit the Anthropic prompt cache.
    - Emits telemetry: call_count, latency_ms, input_tokens, output_tokens,
      cache_read_input_tokens, cache_creation_input_tokens.
    - Raises LLMUnavailable on network or API errors (caller decides fallback).
- `async json_complete(system, messages, schema: type[BaseModel]) -> BaseModel`
    Convenience wrapper: forces JSON output, validates via guards.coerce_json.

Public API:
- complete(...), json_complete(...)
- client singleton accessible as `from app.ai.client import client`

Design notes:
- Never fabricate responses on failure — return an error so the engine can
  decide to degrade (e.g. cultural returns template-only pack).
- Model name comes from config.ANTHROPIC_MODEL so we can bump model versions
  via env without code change.
"""
