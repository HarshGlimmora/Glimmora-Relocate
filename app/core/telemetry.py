"""Timing + metrics for the orchestrator pipeline.

Responsibilities:
- Record per-stage duration histograms (p50/p95/p99) via an in-memory registry
  exposed at GET /metrics (Prometheus format) or just to structured logs for MVP.
- Subscribe to the event bus (events.py) for stage.started/completed/failed.
- Track cache hit/miss ratios per stage.
- Track LLM call latencies and token counts (from ai/client.py callbacks).

Notes:
- Cheap to compute; never itself a hot-path bottleneck.
- For MVP, counts + histograms in memory are fine. Swap to Prometheus client
  library in post-MVP without changing engine code.
"""
