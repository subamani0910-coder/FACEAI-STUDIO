"""Sketch generation service wrapping modules/sketch.py.

Adds face detection + alignment before generation and supports both
a GAN mode (if weights exist) and the PIL fallback.
"""

from __future__ import annotations

import logging
from pathlib import Path
from typing import Tuple

from PIL import Image

from backend.services.face_detection import align_face, detect_faces
from backend.utils.helpers import ROOT_DIR, timed

logger = logging.getLogger("faceai.sketch_service")

GAN_WEIGHTS_PATH = ROOT_DIR / "backend" / "models" / "sketch" / "generator.pth"
LEGACY_GAN_PATH = ROOT_DIR / "models" / "sketch" / "generator.pth"


def _gan_weights_exist() -> bool:
    return GAN_WEIGHTS_PATH.exists() or LEGACY_GAN_PATH.exists()


def get_status() -> dict:
    """Return the current status of the sketch service."""
    gan = _gan_weights_exist()
    return {
        "name": "sketch",
        "checkpoint_available": gan,
        "mode": "GAN" if gan else "PIL-fallback",
        "loaded": False,  # PIL mode is stateless; GAN would be cached when implemented
        "detail": None if gan else "Using PIL pencil-sketch fallback. Place GAN weights to enable neural style transfer.",
    }


@timed("sketch_generate")
def generate(image: Image.Image) -> Tuple[Image.Image, str]:
    """Detect face, align, and generate a sketch.

    Returns (output_image, mode_description).
    """
    image = image.convert("RGB")

    # Face detection + alignment
    faces = detect_faces(image)
    face_detected = len(faces) > 0
    if face_detected:
        image = align_face(image)
        logger.info("Face detected and aligned before sketch generation")
    else:
        logger.info("No face detected – generating sketch of full image")

    # GAN mode (future)
    if _gan_weights_exist():
        # Placeholder: when GAN weights exist, load and run the generator.
        # For now fall through to PIL since no GAN implementation ships yet.
        logger.info("GAN weights found – but GAN inference is not yet implemented, using PIL fallback")

    # PIL fallback (uses modules/sketch.py)
    import sys
    sys.path.insert(0, str(ROOT_DIR))
    from modules.sketch import generate_sketch

    output, mode = generate_sketch(image)
    return output, mode
