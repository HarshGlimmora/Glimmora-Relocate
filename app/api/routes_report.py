"""Final report HTTP route — UI-ready payload.

Endpoints:
- GET /v1/cases/{case_id}/report
    Returns the CaseSummary assembled by the summary engine:
        { headline, hero_metrics, top_warnings, next_actions, sections: {
            jobs, relocation, financial, documents, cultural, timeline,
            recommendation
          } }.
    Shape is frontend-ready — UI renders it with minimal transformation.

- GET /v1/cases/{case_id}/report/pdf
    Optional: streams a PDF render of the report. Deferred for post-MVP; stub
    returning 501 Not Implemented for now.
"""
