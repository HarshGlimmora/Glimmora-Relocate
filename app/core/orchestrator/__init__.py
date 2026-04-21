"""Orchestrator package — the conductor of the MVP pipeline.

Exports:
- `build_plan(intent) -> ExecutionPlan`  (see plan.py)
- `run(plan, profile) -> CaseResult`     (see runner.py)
- `Stage` enum                           (see stages.py)
- `Aggregator`                           (see aggregator.py)

Engines never import this module. The api layer (routes_analysis.py) is the
sole consumer.
"""
