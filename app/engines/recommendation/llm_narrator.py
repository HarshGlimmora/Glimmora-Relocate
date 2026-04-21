"""LLM composer for the final recommendation narrative.

Responsibilities:
- `async compose(score_explanations, tradeoffs, blockers, next_actions,
                 verdict) -> str`
    Sends a JSON payload of the deterministic findings to the Anthropic
    client. System prompt (cached, versioned in ai/prompts/recommendation.md)
    instructs:
        - Write a short 3–5 sentence narrative.
        - Lead with the verdict.
        - Name the top country + top job (if applicable) once.
        - Mention the single most important tradeoff and the single highest-
          priority next action.
        - No invented numbers; only reuse the ones in the payload.
    Validates output with ai/guards.py: length cap, no markdown bullets
    (the UI wants one paragraph), no hallucinated country names not in the
    payload.

Public API:
- async compose(...) -> str

Design notes:
- Bounded I/O (<200 tokens typical) means call is cheap and fast.
- On LLM failure, return a deterministic fallback paragraph assembled from the
  deterministic pieces — service never fails because of narration.
"""
