"""Stage registry + the static dependency DAG for the full pipeline.

Responsibilities:
- Define the `Stage` enum covering every engine stage:
    INTAKE, INTENT, JOB, RELOCATION, FINANCIAL, DOCUMENT, CULTURAL,
    TIMELINE, RECOMMENDATION, SUMMARY.
- Define `STAGE_DEPENDENCIES: dict[Stage, set[Stage]]` — the DAG:
    INTAKE        -> {}
    INTENT        -> {INTAKE}
    JOB           -> {INTENT}
    RELOCATION    -> {INTENT}
    FINANCIAL     -> {INTENT}
    DOCUMENT      -> {INTENT}
    CULTURAL      -> {INTENT}                 # country-only, independent
    TIMELINE      -> {DOCUMENT, JOB}          # needs doc checklist + job offer path
    RECOMMENDATION-> {JOB, RELOCATION, FINANCIAL, DOCUMENT, CULTURAL, TIMELINE}
    SUMMARY       -> {RECOMMENDATION}
- Map each Stage to its service factory. This is the one place that ties the
  enum to actual engine code — runner.py stays stage-agnostic.
- Declare which stages are "hard-required" (pipeline aborts on failure) vs
  "soft" (pipeline continues with a warning). INTAKE and INTENT are hard;
  all analysis engines are soft; SUMMARY is hard.

Notes:
- Adding a new engine = add one enum value + one dict entry + one factory binding.
  No other file changes needed in the orchestrator.
"""
