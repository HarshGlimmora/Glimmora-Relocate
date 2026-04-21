"""Intent engine tests.

Files to add:
- test_rules.py         — table-driven cases covering every rule branch,
                          including multi-intent detection.
- test_classifier.py    — LLM path with a mocked ai.client; invalid JSON
                          handling; LLMUnavailable raises.
- test_service.py       — rules-first behavior; fallback path triggers only
                          under feature flag; safe default for ambiguous input.
- test_journey_map.py   — every JourneyType maps to a valid stage list;
                          topologically sortable against STAGE_DEPENDENCIES.
"""
