"""Job engine tests.

Files to add:
- test_role_normalizer.py  — alias handling, seniority banding from years.
- test_matcher.py          — each dimension function, edge cases (missing
                             skills, salary overlap boundaries).
- test_scorer.py           — weight override behavior, composite math.
- test_visa_filter.py      — sponsorship required, degree requirement fail,
                             diagnostics populated.
- test_explainer.py        — template strings correct, LLM polish mocked.
- test_service.py          — end-to-end with seed repo; reproducible weights;
                             rerank_only path.
"""
