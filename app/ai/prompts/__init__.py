"""Versioned prompt templates loaded by engines that use the LLM.

Each prompt lives as a standalone .md file in this directory so prompt edits
are reviewable in diffs, independent of Python code. Expected files:
- intent_classify.md           — system prompt for engines/intent/classifier.py
- cultural_enrich.md           — system prompt for engines/cultural/llm_enrich.py
- recommendation_narrator.md   — system prompt for engines/recommendation/llm_narrator.py
- job_explain.md               — (optional) polish prompt for engines/job/explainer.py
- role_normalize.md            — (optional) fallback for exotic titles

Loader responsibilities (inside this package, typically a loader.py helper):
- Read files at startup and cache as strings keyed by prompt_id.
- Strip YAML frontmatter if present; treat it as metadata (version, purpose).
- Expose `get(prompt_id, variables=None) -> str` with simple {var} substitution.

Design notes:
- Prompts are content, not code. Keep them here to avoid mixing them into
  engine files and to let non-engineers edit them safely.
"""
