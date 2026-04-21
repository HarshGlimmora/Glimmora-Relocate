"""DocumentService — builds the checklist and readiness score.

Methods:
- async build_checklist(profile, target_country,
                        visa_path: str | None = None) -> DocumentChecklist
    Pipeline:
        1. Resolve visa_path: if not provided, pick the best-eligible path from
           knowledge/visa_rules.json for (country, role_category, years_exp).
        2. Call checklist_builder.build(profile, country, visa_path) to compose
           the list of DocItems from templates (knowledge/document_templates.json).
        3. Merge the user's previously-recorded statuses (persisted per case)
           onto the items — so "ok" statuses carry over between runs.
        4. Run expiry.apply(items, profile) to flag EXPIRING / MISSING.
        5. Run readiness.compute(items) for the overall readiness_pct,
           blocking_missing, expiring_soon.

- async update_item(case_id, doc_id, patch) -> DocItem
    User-driven status update. Also invalidates the Timeline stage cache for
    this case (via core/cache.py) because doc status affects milestone dates.

Design notes:
- Fully deterministic. No LLM.
- The checklist is keyed by (country, visa_path), so running for two countries
  produces two separate checklists — handled by caller/orchestrator.
"""
