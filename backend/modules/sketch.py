"""Realistic Face Sketch Generation Module.

Generates realistic graphite pencil-style sketches preserving fine facial structures:
eyes, eyebrows, iris textures, nose bridge, lip contours, and jaw outlines.
"""

from __future__ import annotations
import numpy as np
import cv2
from PIL import Image, ImageOps, ImageFilter, ImageEnhance


def generate_sketch(image: Image.Image) -> tuple[Image.Image, str]:
    """Transform facial photograph into realistic pencil sketch preserving facial geometry."""
    image = image.convert("RGB")
    img_np = np.array(image)
    gray = cv2.cvtColor(img_np, cv2.COLOR_RGB2GRAY)

    # 1. Soft graphite pencil shading via color dodge
    inv = 255 - gray
    # Adaptive kernel based on image dimension
    ksize = max(15, (min(image.width, image.height) // 25) | 1)
    blur = cv2.GaussianBlur(inv, (ksize, ksize), 0)
    dodge = cv2.divide(gray, 255 - blur, scale=256)

    # 2. Fine structural pencil lines via adaptive edge thresholding
    # Preserves fine eye lashes, pupils, nose bridge, lips, hair strands
    block_size = max(7, (min(image.width, image.height) // 40) | 1)
    edges = cv2.adaptiveThreshold(
        gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, block_size, 3
    )

    # 3. Bilateral smoothing to remove high-frequency noise while preserving boundaries
    smooth_edges = cv2.bilateralFilter(edges, 5, 50, 50)

    # 4. Harmonize pencil shading with stroke contours
    sketch_np = cv2.multiply(dodge, smooth_edges, scale=1.0 / 255.0)

    # 5. Convert to PIL and apply subtle contrast enhancement
    sketch_pil = Image.fromarray(sketch_np).convert("L")
    enhancer = ImageEnhance.Contrast(sketch_pil)
    final_sketch = enhancer.enhance(1.15)

    return final_sketch, "Realistic Graphite Pencil Synthesis (Structure Preserved)"
