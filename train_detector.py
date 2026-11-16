"""
Baseline training script for the CNN + FFT detector.

Expected folder structure:
data/
  real/  (genuine face images)
  fake/  (manipulated/synthetic face images)

For research, use a documented dataset such as FaceForensics++ with its terms,
proper train/validation/test split, and subject/video-level separation to avoid leakage.
This starter script is a simple baseline, not a complete benchmark protocol.
"""
from pathlib import Path
import torch
import torch.nn as nn
from torch.utils.data import DataLoader, random_split
from torchvision import datasets, transforms
from modules.deepfake import CNNFFTDetector

ROOT = Path("data")
OUT = Path("models/deepfake_cnn_fft.pth")
BATCH = 16
EPOCHS = 5
transform = transforms.Compose([transforms.Resize((224,224)), transforms.ToTensor()])
dataset = datasets.ImageFolder(ROOT, transform=transform)
if len(dataset.classes) != 2 or set(dataset.classes) != {"fake", "real"}:
    raise SystemExit("Create data/real and data/fake folders. ImageFolder class order is alphabetical: fake=0, real=1.")
# Re-map labels to model convention: real=0, fake=1
# ImageFolder gives fake=0, real=1; invert labels in training loop.
train_n = int(.8 * len(dataset))
train_ds, val_ds = random_split(dataset, [train_n, len(dataset)-train_n])
loader = DataLoader(train_ds, batch_size=BATCH, shuffle=True, num_workers=0)
device = "cuda" if torch.cuda.is_available() else "cpu"
model = CNNFFTDetector().to(device)
opt = torch.optim.AdamW(model.parameters(), lr=1e-4)
criterion = nn.CrossEntropyLoss()
for epoch in range(EPOCHS):
    model.train()
    total, correct, loss_sum = 0, 0, 0.0
    for x, y in loader:
        x, y = x.to(device), (1-y).to(device)  # real=0, fake=1
        opt.zero_grad()
        logits = model(x)
        loss = criterion(logits, y)
        loss.backward()
        opt.step()
        loss_sum += loss.item()
        correct += (logits.argmax(1) == y).sum().item()
        total += y.size(0)
    print(f"Epoch {epoch+1}/{EPOCHS} loss={loss_sum/max(1,len(loader)):.4f} train_acc={correct/max(1,total):.3f}")
OUT.parent.mkdir(exist_ok=True)
torch.save(model.state_dict(), OUT)
print(f"Saved checkpoint: {OUT}")
print("Important: evaluate on a held-out test set and report precision, recall, F1, ROC-AUC and cross-dataset performance.")
