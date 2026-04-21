"""JobService — public interface for the Job Intelligence engine.

Methods:
- async match(profile: UserProfile, target_country: CountryCode | None,
              limit: int = 10) -> JobMatches
    Pipeline:
        1. Normalize the profile's role via role_normalizer if not already
           canonical (belt & braces).
        2. Fetch candidate jobs via repository.fetch_candidates(
             role_category, country, seniority).
        3. Run visa_filter.filter(candidates, profile.visa_status_code) to drop
           jobs requiring visa paths the user can't access.
        4. Run matcher.match(profile, candidate) for per-job dimension scores.
        5. Run scorer.score(matches, weights) — composite score from weights in
           knowledge/scoring_weights.json.
        6. Sort by composite descending; cap to `limit`.
        7. Run explainer.explain(profile, match) to produce JobExplanation
           (deterministic + optional LLM polish on the top-N).
        8. Return a JobMatches bundle with weights_used snapshot for
           reproducibility.

- async rerank_only(existing: JobMatches, weights: ScoringWeights) -> JobMatches
    Used by POST /cases/{id}/jobs/rerank. Skips fetch + visa filter, re-runs
    scorer with the custom weights, re-sorts. Fast path.

Design notes:
- Engine is stateless. All data comes from the KB or the repository.
- No LLM for matching/scoring — LLM is used only for explanation prose on the
  top results, behind a feature flag.
"""
