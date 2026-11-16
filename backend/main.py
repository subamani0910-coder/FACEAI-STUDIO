from pathlib import Path
import io
import sys
import logging
from typing import Optional

from fastapi import FastAPI, File, Form, HTTPException, UploadFile, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, JSONResponse
from PIL import Image, UnidentifiedImageError

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from backend.schemas.responses import (
    HealthResponse,
    ModelStatusResponse,
    SingleModelStatus,
    DeepfakeResult,
    ValidationResult,
    ErrorResponse,
)
from backend.services.deepfake_service import analyze as deepfake_analyze_fn, get_status as deepfake_status
from backend.services.sketch_service import generate as sketch_generate_fn, get_status as sketch_status
from backend.services.text2face_service import generate as text2face_generate_fn, get_status as text2face_status
from backend.services.face_detection import detect_faces
from backend.services.image_processing import validate_image, MAX_BYTES, ALLOWED_TYPES
from backend.utils.helpers import request_id

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")
logger = logging.getLogger("faceai.main")

app = FastAPI(
    title="FACEAI STUDIO API",
    description="Backend API for Deepfake Detection, Realistic Face Sketch, and Text-to-Face Synthesis",
    version="2.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    req_id = request_id()
    logger.error("Unhandled exception [req_id=%s]: %s", req_id, exc, exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"detail": "An internal server error occurred.", "error_type": type(exc).__name__, "request_id": req_id},
    )


async def read_and_validate_image(file: UploadFile) -> tuple[Image.Image, bytes]:
    raw = await file.read()
    if not raw or len(raw) > MAX_BYTES:
        raise HTTPException(status_code=413, detail=f"Image must be non-empty and smaller than {MAX_BYTES // (1024*1024)} MB.")
    
    val = validate_image(raw, file.content_type)
    if not val["valid"]:
        raise HTTPException(status_code=422, detail="; ".join(val["errors"]))
    
    try:
        img = Image.open(io.BytesIO(raw)).convert("RGB")
        return img, raw
    except UnidentifiedImageError:
        raise HTTPException(status_code=415, detail="The uploaded file is not a valid image.")


@app.get("/api/health", response_model=HealthResponse)
def health():
    return HealthResponse(status="ok", service="FACEAI STUDIO API", version="2.0.0")


@app.get("/api/models/status", response_model=ModelStatusResponse)
def model_status():
    df_st = deepfake_status()
    sk_st = sketch_status()
    t2f_st = text2face_status()
    return ModelStatusResponse(
        deepfake=SingleModelStatus(**df_st),
        sketch=SingleModelStatus(**sk_st),
        text_to_face=SingleModelStatus(**t2f_st),
    )


@app.post("/api/image/validate", response_model=ValidationResult)
async def validate_image_endpoint(file: UploadFile = File(...)):
    raw = await file.read()
    val = validate_image(raw, file.content_type)
    if not val["valid"]:
        return ValidationResult(
            valid=False,
            file_size_bytes=val.get("file_size_bytes"),
            errors=val.get("errors", []),
        )
    
    try:
        image = Image.open(io.BytesIO(raw)).convert("RGB")
        faces = detect_faces(image)
        return ValidationResult(
            valid=True,
            width=image.width,
            height=image.height,
            format=val.get("format"),
            file_size_bytes=len(raw),
            face_detected=len(faces) > 0,
            faces_count=len(faces),
            faces=faces,
            errors=[],
        )
    except Exception as exc:
        logger.error("Validation error: %s", exc)
        return ValidationResult(
            valid=False,
            file_size_bytes=len(raw),
            errors=[f"Failed to inspect image: {type(exc).__name__}"],
        )


@app.post("/api/deepfake/analyze", response_model=DeepfakeResult)
async def deepfake_analyze(file: UploadFile = File(...)):
    image, _ = await read_and_validate_image(file)
    try:
        result = deepfake_analyze_fn(image)
        return DeepfakeResult(**result)
    except Exception as exc:
        logger.error("Deepfake detection error: %s", exc, exc_info=True)
        raise HTTPException(status_code=500, detail=f"Detection failed: {type(exc).__name__}")


@app.post("/api/sketch/generate")
async def sketch_generate(file: UploadFile = File(...)):
    image, _ = await read_and_validate_image(file)
    try:
        output, mode = sketch_generate_fn(image)
        buffer = io.BytesIO()
        output.save(buffer, format="PNG")
        buffer.seek(0)
        return StreamingResponse(
            buffer,
            media_type="image/png",
            headers={"X-FaceAI-Mode": mode, "Access-Control-Expose-Headers": "X-FaceAI-Mode"}
        )
    except Exception as exc:
        logger.error("Sketch generation error: %s", exc, exc_info=True)
        raise HTTPException(status_code=500, detail=f"Sketch generation failed: {type(exc).__name__}")


@app.post("/api/text-to-face/generate")
async def text_to_face_generate(
    prompt: str = Form(...),
    model_id: str = Form("runwayml/stable-diffusion-v1-5"),
    negative_prompt: Optional[str] = Form(None),
    steps: int = Form(25),
    guidance: float = Form(7.0),
    seed: Optional[int] = Form(None),
    width: int = Form(512),
    height: int = Form(512),
):
    prompt = prompt.strip()
    if len(prompt) < 8:
        raise HTTPException(status_code=422, detail="Enter a more detailed fictional face description (minimum 8 characters).")
    if len(prompt) > 1000:
        raise HTTPException(status_code=422, detail="Prompt must be 1,000 characters or fewer.")
    if not (10 <= steps <= 50):
        raise HTTPException(status_code=422, detail="Steps must be between 10 and 50.")
    if not (1.0 <= guidance <= 15.0):
        raise HTTPException(status_code=422, detail="Guidance must be between 1.0 and 15.0.")

    try:
        output, device, label = text2face_generate_fn(
            prompt=prompt,
            model_id=model_id,
            negative_prompt=negative_prompt,
            steps=steps,
            guidance_scale=guidance,
            seed=seed,
            width=width,
            height=height,
        )
        buffer = io.BytesIO()
        output.save(buffer, format="PNG")
        buffer.seek(0)
        return StreamingResponse(
            buffer,
            media_type="image/png",
            headers={
                "X-FaceAI-Label": label,
                "X-FaceAI-Device": device,
                "Access-Control-Expose-Headers": "X-FaceAI-Label, X-FaceAI-Device",
            },
        )
    except Exception as exc:
        logger.error("Text-to-face error: %s", exc, exc_info=True)
        raise HTTPException(
            status_code=503,
            detail=f"Generation unavailable: {type(exc).__name__}. Check model access, internet, and memory.",
        )
