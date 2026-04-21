"""Internal event bus — optional, in-process only for MVP.

Responsibilities:
- Simple pub/sub on named events: `stage.started`, `stage.completed`,
  `stage.failed`, `case.finalized`.
- Used by telemetry.py to record timings and by logging.py to emit structured
  audit lines without the orchestrator having to know about either.
- Synchronous fan-out inside the current asyncio loop; no external queues.

Why it exists:
- Keeps the orchestrator free of cross-cutting side effects. The runner emits
  events; subscribers (telemetry, audit log, future webhook notifier) listen.

Notes:
- If an event handler raises, the bus logs and continues — never let a metric
  emitter break the pipeline.
- Deferred: moving this to Redis pub/sub or a proper queue is a post-MVP call.
"""
