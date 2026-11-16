"""Common utility functions for the FaceAI Studio backend."""

import logging
import time
import uuid
from functools import wraps
from pathlib import Path
from typing import Any, Callable

logger = logging.getLogger("faceai")

# ── Paths ──────────────────────────────────────────────────────────────
BACKEND_DIR = Path(__file__).resolve().parents[1]  # backend directory
_parent = BACKEND_DIR.parent
ROOT_DIR = _parent if (_parent / "frontend").exists() else BACKEND_DIR

# Check inside backend first, then fallback to root
MODELS_DIR = BACKEND_DIR / "models" if (BACKEND_DIR / "models").exists() else (ROOT_DIR / "models")
MODULES_DIR = BACKEND_DIR / "modules" if (BACKEND_DIR / "modules").exists() else (ROOT_DIR / "modules")


def request_id() -> str:
    """Generate a short unique request identifier for logging."""
    return uuid.uuid4().hex[:12]


def timed(label: str | None = None) -> Callable:
    """Decorator that logs execution time of a function."""

    def decorator(func: Callable) -> Callable:
        tag = label or func.__name__

        @wraps(func)
        def wrapper(*args: Any, **kwargs: Any) -> Any:
            start = time.perf_counter()
            try:
                result = func(*args, **kwargs)
                elapsed = time.perf_counter() - start
                logger.info("%s completed in %.3fs", tag, elapsed)
                return result
            except Exception:
                elapsed = time.perf_counter() - start
                logger.error("%s failed after %.3fs", tag, elapsed)
                raise

        return wrapper

    return decorator


def safe_filename(name: str) -> str:
    """Sanitise a filename to prevent path traversal."""
    return "".join(c for c in name if c.isalnum() or c in "._- ")[:128]


def clamp(value: float, lo: float, hi: float) -> float:
    """Clamp *value* between *lo* and *hi*."""
    return max(lo, min(hi, value))
