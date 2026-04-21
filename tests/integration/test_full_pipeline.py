"""End-to-end orchestrated pipeline test.

Scenarios:
- Happy path: FIND_BETTER_JOB_ABROAD journey, full pipeline runs, CaseSummary
  returned with all sections present, degraded=False.
- Parallel fan-out: assert that Job/Relocation/Financial/Document ran
  concurrently (total elapsed < sum of individual durations).
- Cache reuse: second run with same profile returns identical summary; only
  cache-miss stages re-execute when one profile field changes.
- Soft failure: mock one engine (e.g. job) to raise; pipeline completes with
  degraded=True, that section's payload=not_available, recommendation still
  renders.
- Hard failure: mock intake to fail validation; /analysis/run returns 422
  and no Case is persisted.

Fixtures loaded from tests/fixtures/sample_profiles.json and a minimal KB
snapshot injected via monkeypatch of knowledge.registry.
"""
