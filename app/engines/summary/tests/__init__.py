"""Summary engine tests.

Files to add:
- test_formatter.py    — per-engine sub-formatter shape; missing engine ->
                          placeholder section.
- test_highlights.py   — hero metric ordering; top_warnings trimmed to 3;
                          next_actions deduped.
- test_service.py      — assemble() with complete aggregator produces full
                          CaseSummary; assemble() with partial aggregator
                          sets degraded=True.
- test_repository.py   — round-trip save/load; artifact schema validation on
                          read.
"""
