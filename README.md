# FACEAI STUDIO

> **INTELLIGENCE BEYOND APPEARANCE.**  
> *DETECT. TRANSFORM. GENERATE.*

**Official Project Title:**  
*An Integrated Framework for Deepfake Detection, Realistic Face Sketch Generation, and Text-to-Face Synthesis Using Deep Learning*

**Category:** Artificial Intelligence / Computer Vision / Deep Learning / Generative AI  
**Type:** Full-Stack Integrated Web Application  

---

## ⚡ Executive Summary

**FACEAI STUDIO** is a unified, futuristic 3D cyberpunk artificial intelligence platform uniting three critical facial intelligence paradigms:

1. **Module 01 — Deepfake Detection (Forensics):** Dual-branch deep neural architecture combining Spatial 2D-CNN feature extraction with 2D Fast Fourier Transform (FFT) frequency spectrum anomaly analysis and Grad-CAM explainability.
2. **Module 02 — Realistic Face Sketch (Art Lab):** Geometry-preserving photo-to-sketch transformation preserving inter-ocular distance, nasal contours, and lip landmarks with an interactive Before/After comparison slider.
3. **Module 03 — Text-to-Face Synthesis (Generative Studio):** CLIP-guided latent diffusion pipeline generating high-resolution synthetic fictional portraits from natural language descriptions with automated provenance watermarking.

---

## 🎨 Visual Identity & Architecture

- **Primary Colors:** Electric Cyan (`#00E5FF`), Neon Turquoise (`#00FFD1`), Holographic Blue (`#168CFF`), Midnight Navy (`#06121F`), Cyber Card (`#102638`).
- **3D Interactive Hero:** Three.js / React Three Fiber procedural holographic head with dynamic facial landmark point tracking, orbiting scanning rings, floating HUD metrics, and mouse parallax.
- **Access Model:** Direct platform access — **No login, registration, or authentication required.**

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, Lucide React, Three.js, React Three Fiber |
| **Backend** | Python 3.10+, FastAPI (Async), Uvicorn ASGI, Pydantic, OpenCV YuNet ONNX Deep Learning |
| **Deep Learning** | PyTorch 2.x, TorchVision, 2D-FFT, NumPy, Pillow, Hugging Face Diffusers, CLIP |

---

## 🚀 Quick Start Guide (Windows)

### Option A: One-Click Startup (Recommended)

1. Double-click **`start_backend.bat`**  
   *Initializes Python environment and launches FastAPI API at `http://localhost:8000`*
2. Double-click **`start_frontend.bat`**  
   *Starts Vite development server at `http://localhost:5173`*
3. Open your browser to **`http://localhost:5173`**

---

### Option B: Manual Command-Line Startup

#### 1. Backend Server
```bash
cd Integrated_Face_AI_Prototype
python -m venv .venv
.venv\Scripts\activate
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```
API Documentation (Swagger UI): `http://localhost:8000/docs`

#### 2. Frontend Client
```bash
cd Integrated_Face_AI_Prototype/frontend
npm install
npm run dev -- --host 0.0.0.0
```
Open Website: `http://localhost:5173`

---

## 📡 API Endpoints

- `GET /api/health` — Service health beacon and version metadata
- `GET /api/models/status` — Operational status and checkpoint availability for all 3 modules
- `POST /api/image/validate` — Image format, dimensions, file size, and facial presence validation
- `POST /api/deepfake/analyze` — Spatial + FFT neural inference, prediction label, confidence, and Grad-CAM overlay
- `POST /api/sketch/generate` — Facial alignment and pencil sketch synthesis (PNG Stream)
- `POST /api/text-to-face/generate` — CLIP-guided diffusion face synthesis with provenance watermark (PNG Stream)

---

## 🛡️ Responsible AI Directive

1. **Probabilistic Heuristics:** Detection scores represent statistical pattern matching and are not definitive legal proof of authenticity.
2. **Mandatory Watermarking:** Every synthetic face generated carries an immutable `AI-GENERATED — FICTIONAL FACE` badge.
3. **Impersonation Prevention:** Fictional descriptions are prioritized to safeguard against non-consensual depiction of real individuals.

---

© 2026 FACEAI STUDIO · Built with Deep Learning & Computer Vision
