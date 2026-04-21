"""CulturalService — generates a CulturalPack for a destination.

Methods:
- async generate_pack(profile, target_country) -> CulturalPack
    Pipeline:
        1. Load the deterministic template pack via templates.load(country).
           This is the minimum, always-available baseline.
        2. If FEATURE_LLM_CULTURAL_ENRICH is on AND LLM is available, call
           llm_enrich.personalize(template, profile) to tailor phrasing to
           profile.role, family_status, and work_preference.
        3. Set pack.source to "template" or "template+llm" for UI transparency.
        4. Return the pack.

Design notes:
- Graceful degradation: if the LLM fails, we still return the base template
  pack — never empty content.
- The pack is heavily cached (key: country + llm_flag + profile-segment hash)
  because content changes slowly.
"""
