"""Timeline engine tests.

Files to add:
- test_graph.py        — cycle detection, topological order, critical path
                         over known toy DAG.
- test_scheduler.py    — forward/backward pass math; feasibility violations
                         surface correctly; working-days mode.
- test_templates.py    — each supported country + visa path loads; shape
                         matches MilestoneTemplate.
- test_service.py      — build() end-to-end using a mock DocumentChecklist;
                         urgency + target_date scenarios; reschedule
                         preserves DAG shape.
"""
