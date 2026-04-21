"""Job data source — MVP reads from a seed JSON; later pluggable for real APIs.

Responsibilities:
- `async fetch_candidates(role_category, country, seniority, limit=200)
     -> list[JobCandidate]`
    MVP: loads from knowledge/data/jobs_seed.json (create alongside if needed)
    or a dedicated `app/engines/job/data/jobs_seed.json`, filtered in-memory.
    Post-MVP: swap in a real data provider behind the same interface — zero
    changes in service.py.

- Adapter interface `JobSource` so the provider can be:
    - SeedJsonSource  (MVP, default)
    - HttpApiSource   (post-MVP, e.g. LinkedIn, Indeed partner API)
    - DbSource        (if we host our own job index)

Public API:
- async fetch_candidates(...) -> list[JobCandidate]
- async fetch_by_id(job_id) -> JobCandidate | None

Design notes:
- Keep the repository thin. No scoring, no filtering beyond the three
  structural dimensions above — that's the matcher/visa_filter's job.
- Seed JSON should have ~50 realistic jobs across 3-5 destination countries so
  the pipeline returns meaningful matches on day one.
"""
