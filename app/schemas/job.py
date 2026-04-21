"""Job matching schemas.

Models:
- JobCandidate (input to scorer — from job/repository.py):
    job_id, title, company, country, city, salary_range: Money×2,
    required_skills: list[str], visa_sponsorship: bool, remote_ok: bool,
    seniority: ExperienceLevel, posted_at: date.

- JobScore (the breakdown — used by explainer):
    role_fit: Score, skill_fit: Score, salary_fit: Score, location_fit: Score,
    visa_fit: Score, seniority_fit: Score, composite: Score.

- JobExplanation:
    strengths: list[str]     (e.g. "Matches your 5 years of Python experience")
    gaps: list[str]          (e.g. "Requires German B1; you noted none")
    why_ranked_here: str     (one-sentence narrative)

- JobMatch (the thing orchestrator stores):
    candidate: JobCandidate
    score: JobScore
    explanation: JobExplanation
    rank: int

- JobMatches (plural wrapper):
    items: list[JobMatch]
    total_considered: int
    weights_used: ScoringWeights (KB snapshot, for reproducibility)
"""
