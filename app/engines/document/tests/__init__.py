"""Document engine tests.

Files to add:
- test_checklist_builder.py — template merging, dedup, required_for propagation.
- test_expiry.py            — expired / expiring / valid transitions; passport
                               6-month rule; frozen time.
- test_readiness.py         — percent math with EXPIRING=0.5; NOT_APPLICABLE
                               excluded from denominator; blocking_for_path.
- test_service.py           — build_checklist merges user-recorded statuses;
                               update_item invalidates Timeline cache.
"""
