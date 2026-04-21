"""Composes the DocItem list for a (country, visa_path) pair.

Responsibilities:
- Load the base checklist template for the chosen visa_path from
  knowledge/document_templates.json.
- Layer in:
    - identity docs (always required) — passport, ID photo, birth cert if family.
    - employment proof docs — offer letter, past employment cert, references.
    - education docs — degrees, transcripts, apostille if destination requires.
    - financial proof docs — bank statements (last N months per KB), tax returns.
    - residence/support docs — current address proof, dependent relationships.
- Deduplicate items by doc_id (a doc can satisfy multiple requirements).
- Populate `required_for` on each item so the UI can show WHY each doc is
  needed.
- Populate `how_to_obtain` from KB snippets when available.

Public API:
- build(profile, country, visa_path) -> list[DocItem]

Design notes:
- Templates in KB are additive. Builder composes; it never invents new doc
  categories. Adding a doc = editing KB JSON.
"""
