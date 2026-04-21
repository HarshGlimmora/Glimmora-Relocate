"""Orchestrator unit tests.

Coverage targets:
- test_plan.py            — plan generation per journey type; cycle detection.
- test_stages.py          — dependency graph correctness; topological sort.
- test_runner.py          — wave execution, cache hits, soft/hard failure paths.
- test_aggregator.py      — single-writer enforcement; serialization round-trip.
- test_status.py          — overall_status derivation from stage records.
- test_errors.py          — error-to-HTTP mapping.

Uses fake engine stubs so the orchestrator can be tested without real engine code.
"""
