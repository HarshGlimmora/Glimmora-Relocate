"""Milestone DAG builder.

Responsibilities:
- `build_dag(milestones) -> MilestoneGraph`
    Wires depends_on relations from the KB template. Validates: no cycles,
    no dangling references, every terminal milestone converges on MOVE.
- `topological_order(graph) -> list[Milestone]`
- `critical_path(graph, durations) -> list[str]`
    Standard longest-path algorithm over the DAG where weights are
    expected_duration_days.

Public API:
- build_dag(milestones) -> MilestoneGraph
- topological_order(graph) -> list[Milestone]
- critical_path(graph, durations) -> list[str]

Design notes:
- Graph representation is adjacency dict keyed by milestone_id. Easy to test
  and serialize.
"""
