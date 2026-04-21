"""Recommendation engine tests.

Files to add:
- test_score_explainer.py  — driver selection; templated language stability.
- test_tradeoff.py         — each pattern detector fires on crafted aggregator
                              fixtures; silent otherwise.
- test_llm_narrator.py     — mocked LLM; hallucination guard (returns a country
                              not in payload is rejected); deterministic
                              fallback on LLM failure.
- test_service.py          — explain() end-to-end with a fixture Aggregator;
                              verdict rule coverage.
"""
