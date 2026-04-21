"""Cultural engine tests.

Files to add:
- test_templates.py    — base pack loads for every supported country; defensive
                         copy (mutating result doesn't mutate KB).
- test_llm_enrich.py   — mocked LLM round-trip; schema violation falls back
                         to base pack; prompt-cache headers set.
- test_service.py      — LLM feature flag off returns template source only;
                         flag on returns template+llm when mock returns valid.
"""
