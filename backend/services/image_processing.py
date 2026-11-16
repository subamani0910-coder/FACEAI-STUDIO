"""Shared image-processing utilities for the FaceAI Studio backend."""

from __future__ import annotations

import base64
import io
import logging
from typing import Dict, Optional, Tuple

from PIL import Image, UnidentifiedImageError

logger = logging.getLogger("faceai.image_processing")

MAX_BYTES = 10 * 1024 * 1024  # 10 MB
ALLOWED_TYPES = {"image/jpeg", "image/png"}


def validate_image(
    file_bytes: bytes,
    content_type: Optional[str] = None,
) -> Dict:
    """Validate raw image bytes and return a dict with metadata + errors list.

    Keys: ``valid``, ``width``, ``height``, ``format``, ``file_size_bytes``,
    ``errors``.
    """
    errors: list[str] = []
    result: Dict = {
        "valid": True,
        "width": None,
        "height": None,
        "format": None,
        "file_size_bytes": len(file_bytes) if file_bytes else 0,
        "errors": errors,
    }

    if not file_bytes:
        errors.append("File is empty.")
        result["valid"] = False
        return result

    if len(file_bytes) > MAX_BYTES:
        errors.append(f"File exceeds the maximum allowed size of {MAX_BYTES // (1024 * 1024)} MB.")
        result["valid"] = False
        return result

    if content_type and content_type not in ALLOWED_TYPES:
        errors.append(f"Unsupported content type '{content_type}'. Allowed: JPEG, PNG.")
        result["valid"] = False
        return result

    try:
        image = Image.open(io.BytesIO(file_bytes))
        image.verify()  # verify but don't fully load
        # Re-open for actual metadata (verify() leaves the file in an unusable state)
        image = Image.open(io.BytesIO(file_bytes))
        result["width"] = image.width
        result["height"] = image.height
        result["format"] = image.format
    except (UnidentifiedImageError, Exception) as exc:
        errors.append(f"Not a valid image file: {type(exc).__name__}")
        result["valid"] = False
        return result

    if image.width < 64 or image.height < 64:
        errors.append("Image is too small. Minimum size is 64×64 pixels.")
        result["valid"] = False

    fmt_lower = (image.format or "").upper()
    if fmt_lower not in ("JPEG", "PNG", "MPO"):
        errors.append(f"Unsupported image format '{fmt_lower}'. Allowed: JPEG, PNG.")
        result["valid"] = False

    return result


def resize_for_model(image: Image.Image, target_size: Tuple[int, int] = (224, 224)) -> Image.Image:
    """Resize an image to the target dimensions using high-quality Lanczos resampling."""
    return image.convert("RGB").resize(target_size, Image.LANCZOS)


def image_to_base64(image: Image.Image, fmt: str = "PNG") -> str:
    """Encode a PIL Image to a base64 string (no data-URI prefix)."""
    buf = io.BytesIO()
    image.save(buf, format=fmt)
    return base64.b64encode(buf.getvalue()).decode("ascii")


def base64_to_image(b64_str: str) -> Image.Image:
    """Decode a base64 string to a PIL Image."""
    raw = base64.b64decode(b64_str)
    return Image.open(io.BytesIO(raw)).convert("RGB")
