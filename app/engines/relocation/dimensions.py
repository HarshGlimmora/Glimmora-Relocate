"""Per-dimension scoring of a destination.

Functions (each reads KB country metadata and profile; returns DimensionScore):
- score_housing(profile, country_meta)
    Considers: rental market tightness, avg rent vs salary, deposit norms,
    foreigner friendliness.
- score_transport(profile, country_meta)
    Considers: public transport coverage, car dependency, international airport
    access, commute times.
- score_healthcare(profile, country_meta)
    Considers: public vs private access for non-citizens, English/major
    language support, wait times, family-suitable.
- score_lifestyle(profile, country_meta)
    Considers: climate, safety, cultural match with profile.work_preference,
    internet/infra, social fabric.
- score_family(profile, country_meta)
    Only weighted when profile.family_status != SINGLE. Considers: school
    access, dependent visa availability, childcare cost, spouse employment.

Public API:
- score_all(profile, country_code) -> list[DimensionScore]

Design notes:
- Each function produces evidence strings that flow into the explanation layer.
  Keep them short, factual, and sourced from KB data (e.g. "rent_to_salary
  ratio: 0.42" -> "Rents consume ~42% of target salary").
"""
