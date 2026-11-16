"""Deepfake detection service wrapping modules/deepfake.py.

Adds face detection, model caching, and Grad-CAM heatmap generation.
"""

from __future__ import annotations

import logging
from pathlib import Path
from typing import Any, Dict, Optional

import numpy as np
import torch
import torch.nn.functional as F
from PIL import Image
from torchvision import transforms

from backend.services.face_detection import detect_faces
from backend.services.image_processing import image_to_base64
from backend.utils.helpers import MODELS_DIR, MODULES_DIR, ROOT_DIR, timed

logger = logging.getLogger("faceai.deepfake_service")

# ── Model path ─────────────────────────────────────────────────────────
MODEL_PATH = (
    (MODELS_DIR / "deepfake_cnn_fft.pth")
    if (MODELS_DIR / "deepfake_cnn_fft.pth").exists()
    else (ROOT_DIR / "models" / "deepfake_cnn_fft.pth")
)

# ── Lazy-loaded singleton ─────────────────────────────────────────────
_model: Optional[Any] = None
_device: Optional[str] = None

_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])


def _get_model():
    """Load the CNN+FFT detector once and cache it.  Returns (model, device)."""
    global _model, _device

    if _model is not None:
        return _model, _device

    # Import the architecture from backend.modules or modules
    try:
        from backend.modules.deepfake import CNNFFTDetector
    except ImportError:
        import sys
        sys.path.insert(0, str(ROOT_DIR))
        from modules.deepfake import CNNFFTDetector

    _device = "cuda" if torch.cuda.is_available() else "cpu"
    model = CNNFFTDetector().to(_device)

    if MODEL_PATH.exists():
        checkpoint = torch.load(MODEL_PATH, map_location=_device, weights_only=True)
        model.load_state_dict(checkpoint)
        logger.info("Deepfake checkpoint loaded from %s on %s", MODEL_PATH, _device)
    else:
        logger.warning("No deepfake checkpoint at %s – model_not_ready", MODEL_PATH)

    model.eval()
    _model = model
    return _model, _device


def is_checkpoint_available() -> bool:
    """Check if the trained checkpoint file exists."""
    return MODEL_PATH.exists()


def is_loaded() -> bool:
    """Check if the model is currently loaded in memory."""
    return _model is not None


def get_status() -> dict:
    """Return status of deepfake service."""
    avail = is_checkpoint_available()
    return {
        "name": "deepfake",
        "checkpoint_available": avail,
        "mode": "CNN+FFT" if avail else "untrained",
        "loaded": is_loaded(),
        "detail": None if avail else "No trained checkpoint at models/deepfake_cnn_fft.pth. Training required.",
    }


# ── Grad-CAM ──────────────────────────────────────────────────────────

def _grad_cam(model, input_tensor: torch.Tensor, device: str) -> Optional[np.ndarray]:
    """Compute a basic Grad-CAM heatmap on the last spatial conv layer.

    Returns a (224, 224) numpy array normalised to [0, 255], or None on failure.
    """
    try:
        # Find the last Conv2d in the spatial branch
        target_layer = None
        for module in reversed(list(model.spatial.modules())):
            if isinstance(module, torch.nn.Conv2d):
                target_layer = module
                break

        if target_layer is None:
            return None

        activations: list = []
        gradients: list = []

        def fwd_hook(mod, inp, out):
            activations.append(out.detach())

        def bwd_hook(mod, grad_in, grad_out):
            gradients.append(grad_out[0].detach())

        fwd_handle = target_layer.register_forward_hook(fwd_hook)
        bwd_handle = target_layer.register_full_backward_hook(bwd_hook)

        try:
            output = model(input_tensor)
            pred_class = output.argmax(dim=1)
            model.zero_grad()
            output[0, pred_class].backward()

            if not activations or not gradients:
                return None

            act = activations[0]   # (1, C, H, W)
            grad = gradients[0]    # (1, C, H, W)

            weights = grad.mean(dim=(2, 3), keepdim=True)  # GAP over spatial dims
            cam = (weights * act).sum(dim=1, keepdim=True)  # (1, 1, H, W)
            cam = F.relu(cam)
            cam = F.interpolate(cam, size=(224, 224), mode="bilinear", align_corners=False)
            cam = cam.squeeze().cpu().numpy()

            # Normalise to 0–255
            if cam.max() > cam.min():
                cam = (cam - cam.min()) / (cam.max() - cam.min()) * 255
            cam = cam.astype(np.uint8)
            return cam
        finally:
            fwd_handle.remove()
            bwd_handle.remove()
    except Exception as exc:
        logger.debug("Grad-CAM computation failed: %s", exc)
        return None


def _cam_to_base64(cam: np.ndarray) -> str:
    """Convert a Grad-CAM heatmap array to a base64-encoded PNG."""
    import cv2

    heatmap = cv2.applyColorMap(cam, cv2.COLORMAP_JET)
    heatmap_rgb = cv2.cvtColor(heatmap, cv2.COLOR_BGR2RGB)
    pil = Image.fromarray(heatmap_rgb)
    return image_to_base64(pil, fmt="PNG")


# ── Main analysis entry point ─────────────────────────────────────────

@timed("deepfake_analyze")
def analyze(image: Image.Image) -> Dict:
    """Run deepfake analysis on a PIL Image.

    Returns a dict matching the DeepfakeResult schema.
    """
    image = image.convert("RGB")

    # 1. Face detection
    faces = detect_faces(image)
    face_bbox = None
    face_detected = len(faces) > 0
    if face_detected:
        face_bbox = max(faces, key=lambda f: f["w"] * f["h"])

    image_info = {"width": image.width, "height": image.height, "format": image.format}

    # 2. Check checkpoint
    if not MODEL_PATH.exists():
        return {
            "status": "model_not_ready",
            "prediction": None,
            "confidence": None,
            "face_detected": face_detected,
            "face_bbox": face_bbox,
            "grad_cam_base64": None,
            "image_info": image_info,
            "message": (
                "No trained checkpoint found at models/deepfake_cnn_fft.pth. "
                "The CNN+FFT architecture is ready but needs training on a "
                "labelled real/fake dataset before predictions are meaningful."
            ),
            "notice": None,
        }

    # 3. Run inference
    model, device = _get_model()
    input_tensor = _transform(image).unsqueeze(0).to(device)

    # Grad-CAM requires gradients, so temporarily enable them
    grad_cam_b64: Optional[str] = None
    with torch.enable_grad():
        cam = _grad_cam(model, input_tensor.clone().requires_grad_(True), device)
        if cam is not None:
            grad_cam_b64 = _cam_to_base64(cam)

    # Prediction (no grad needed)
    with torch.no_grad():
        probs = torch.softmax(model(input_tensor), dim=1)[0]
    idx = int(torch.argmax(probs).item())
    label = "FAKE" if idx == 1 else "REAL"
    confidence = round(float(probs[idx].item() * 100), 2)

    return {
        "status": "ok",
        "prediction": label,
        "confidence": confidence,
        "face_detected": face_detected,
        "face_bbox": face_bbox,
        "grad_cam_base64": grad_cam_b64,
        "image_info": image_info,
        "message": None,
        "notice": (
            "A model prediction is not proof of authenticity. "
            "Use Grad-CAM highlights as an interpretability aid, not conclusive evidence."
        ),
    }
