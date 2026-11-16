# MASTER PROMPT — Build and improve FaceAI Studio

You are working inside the existing project folder. Build a polished, fully integrated academic mini-project prototype titled:

**An Integrated Framework for Deepfake Detection, Realistic Face Sketch Generation, and Text-to-Face Synthesis Using Deep Learning**

## Critical instruction
First inspect the existing files and preserve the working setup. Do not delete or recreate the project, do not replace dependencies unnecessarily, and do not claim a model is trained if no trained weights exist. Implement changes incrementally and test after each module.

## Product goal
Create one professional web application with three clearly separated modules in a shared dashboard:
1. Deepfake Detection
2. Realistic Face Sketch Generation (photo-to-sketch)
3. Text-to-Face Synthesis

Use Streamlit + Python + PyTorch + OpenCV/Pillow. Keep modules independent under `modules/`.

## UI requirements
- Premium AI research dashboard, responsive layout.
- White / deep navy / cyan accent palette, clean typography.
- Sidebar or top navigation for the three modules.
- Clear upload zones, preview panels, progress indicators, result cards and download buttons.
- Display the uploaded image beside the processed/generated output.
- Include a project overview, architecture explanation, limitations and responsible-AI note.
- Do not add fake metrics, fabricated accuracy values or decorative results that look like model predictions.

## Module 1: Deepfake Detection
Implement this pipeline:
Image upload → face detection/crop → resize and normalization → spatial CNN branch + FFT/DCT frequency branch → feature fusion → binary classifier → REAL/FAKE label + calibrated confidence where possible + explanation heatmap.

Requirements:
- Use the CNN + FFT model scaffold in `modules/deepfake.py` unless there is a strong technical reason to improve it.
- Load `models/deepfake_cnn_fft.pth` only if it exists and validate checkpoint compatibility.
- If weights are absent, show an explicit “Model not trained / checkpoint missing” state. Never invent a prediction.
- Add Grad-CAM only when it is correctly implemented for the selected CNN layers; otherwise clearly say explanation is unavailable.
- Add image quality checks and warn about tiny, blurred or heavily compressed images.
- Add model metadata and dataset notes.
- Provide evaluation script/report support: confusion matrix, precision, recall, F1, ROC-AUC and held-out test results.
- Use subject/video-level splits to prevent data leakage.

## Module 2: Realistic Face Sketch Generation
Implement:
Photo upload → face alignment/preprocessing → structure-preserving image-to-image generator → refinement → sketch output.
- Preserve identity-related facial geometry and details as much as the model permits.
- Use a trained pix2pix / CA-GAN / suitable photo-to-sketch checkpoint if one is available.
- If no trained checkpoint exists, keep the clearly labelled image-processing fallback and state that it is a demo stylization, not a trained GAN result.
- Add before/after preview and PNG download.
- Do not claim the GAN is trained without checkpoint and training evidence.

## Module 3: Text-to-Face Synthesis
Implement:
Text prompt → text preprocessing → CLIP/text encoder conditioning → pretrained diffusion or StyleGAN generator → synthetic face.
- Use a compatible pretrained model and its documented pipeline.
- Make model ID configurable.
- Show loading progress, handle model download/access errors and GPU/CPU memory errors.
- Add negative prompt support and generation settings (steps, guidance scale, seed) if feasible.
- Display a visible “AI-GENERATED — FICTIONAL FACE” label on every result.
- Never imply the generated person is real or use the system to impersonate a real person.

## Integration and quality
- Keep the three modules in one app and avoid duplicated logic.
- Add validation for file type, file size and empty prompts.
- Add friendly error messages and a download option for generated images.
- Add a `README.md` with exact setup and run commands for Windows and Linux.
- Add `requirements.txt`; avoid unnecessary libraries.
- Add sample tests for model loading, invalid inputs and fallback behavior.
- Ensure the app starts with `streamlit run app.py`.
- Run syntax checks and fix import/runtime errors.
- Keep all generated results clearly distinguished from real model inference.

## Deliverables
1. Working integrated application.
2. Clean Python module structure.
3. Training/inference instructions and model-weight locations.
4. Evaluation instructions and limitations.
5. A short explanation of how each module maps to the project PPT architecture.

At the end, report exactly which modules are genuinely model-backed, which are demo fallbacks, what weights are missing, and the commands used to test the app.

## Existing updated source code note
The project now includes a React + Vite + TypeScript frontend in `frontend/`, a FastAPI backend in `backend/`, a procedural Three.js holographic head, cyberpunk responsive styling, and API wiring for the three module screens. Inspect and improve these files rather than rebuilding them. Preserve the current dark cyan/teal visual system and existing API routes. Complete the remaining model integrations and tests without introducing fake results.
