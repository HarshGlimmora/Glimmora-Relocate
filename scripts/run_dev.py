"""Dev server launcher — thin convenience wrapper around uvicorn.

Usage:
    python scripts/run_dev.py                 # default host/port from .env
    python scripts/run_dev.py --reload        # autoreload on file change
    python scripts/run_dev.py --port 9000

Responsibilities:
- Load .env (if present) via python-dotenv.
- Launch `uvicorn app.main:app` with dev-friendly defaults (reload=True,
  log_level="info", access_log=True).
- Print the mounted route table on startup for quick eyeballing.

Design notes:
- Production entrypoint is NOT this script. Prod uses `gunicorn -k
  uvicorn.workers.UvicornWorker app.main:app` directly.
"""
