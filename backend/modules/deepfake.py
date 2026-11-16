from pathlib import Path
import numpy as np
import torch
import torch.nn as nn
from PIL import Image
from torchvision import transforms

MODEL_PATH = Path("models/deepfake_cnn_fft.pth")

class CNNFFTDetector(nn.Module):
    """Baseline two-branch model: spatial RGB features + FFT magnitude features."""
    def __init__(self):
        super().__init__()
        self.spatial = nn.Sequential(
            nn.Conv2d(3, 32, 3, padding=1), nn.BatchNorm2d(32), nn.ReLU(), nn.MaxPool2d(2),
            nn.Conv2d(32, 64, 3, padding=1), nn.BatchNorm2d(64), nn.ReLU(), nn.MaxPool2d(2),
            nn.Conv2d(64, 128, 3, padding=1), nn.BatchNorm2d(128), nn.ReLU(),
            nn.AdaptiveAvgPool2d(1), nn.Flatten()
        )
        self.frequency = nn.Sequential(
            nn.Conv2d(3, 16, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),
            nn.Conv2d(16, 32, 3, padding=1), nn.ReLU(),
            nn.AdaptiveAvgPool2d(1), nn.Flatten()
        )
        self.classifier = nn.Sequential(nn.Linear(160, 64), nn.ReLU(), nn.Dropout(.3), nn.Linear(64, 2))

    def forward(self, x):
        spatial = self.spatial(x)
        gray = x.mean(dim=1, keepdim=True)
        fft = torch.fft.fft2(gray)
        magnitude = torch.log1p(torch.abs(torch.fft.fftshift(fft)))
        magnitude = magnitude.repeat(1, 3, 1, 1)
        frequency = self.frequency(magnitude)
        return self.classifier(torch.cat([spatial, frequency], dim=1))

_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

def predict_deepfake(image: Image.Image):
    if not MODEL_PATH.exists():
        return {
            "status": "untrained",
            "message": "No trained checkpoint found at models/deepfake_cnn_fft.pth. This prototype includes the CNN + FFT architecture, but it needs training on a labelled real/fake dataset before predictions are meaningful."
        }
    device = "cuda" if torch.cuda.is_available() else "cpu"
    model = CNNFFTDetector().to(device)
    checkpoint = torch.load(MODEL_PATH, map_location=device)
    model.load_state_dict(checkpoint)
    model.eval()
    x = _transform(image.convert("RGB")).unsqueeze(0).to(device)
    with torch.no_grad():
        probs = torch.softmax(model(x), dim=1)[0]
    # Dataset convention: class 0 = REAL, class 1 = FAKE
    idx = int(torch.argmax(probs).item())
    return {"status": "model", "label": "FAKE" if idx == 1 else "REAL",
            "confidence": float(probs[idx].item() * 100), "heatmap": None}
