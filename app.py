import os
import io
import json
import base64
import urllib.request
import urllib.parse
from PIL import Image
import streamlit as st

BACKEND_URL = os.environ.get("BACKEND_URL", "").rstrip("/")

# Local modules fallback
try:
    from modules.deepfake import predict_deepfake as _local_predict_deepfake
    from modules.sketch import generate_sketch as _local_generate_sketch
    from modules.text2face import generate_face as _local_generate_face
except ImportError:
    _local_predict_deepfake = None
    _local_generate_sketch = None
    _local_generate_face = None


def predict_deepfake_fn(image: Image.Image):
    if BACKEND_URL:
        try:
            buf = io.BytesIO()
            image.save(buf, format="JPEG")
            boundary = "----WebKitFormBoundaryFaceAIService"
            body = (
                f"--{boundary}\r\n"
                f'Content-Disposition: form-data; name="file"; filename="face.jpg"\r\n'
                f"Content-Type: image/jpeg\r\n\r\n"
            ).encode("utf-8") + buf.getvalue() + f"\r\n--{boundary}--\r\n".encode("utf-8")
            req = urllib.request.Request(
                f"{BACKEND_URL}/api/deepfake/analyze",
                data=body,
                headers={"Content-Type": f"multipart/form-data; boundary={boundary}"}
            )
            with urllib.request.urlopen(req, timeout=30) as resp:
                data = json.loads(resp.read().decode())
                heatmap = None
                if data.get("gradcam_heatmap_base64"):
                    h_bytes = base64.b64decode(data["gradcam_heatmap_base64"])
                    heatmap = Image.open(io.BytesIO(h_bytes))
                return {
                    "status": "model" if data.get("status") == "ok" else "heuristic",
                    "label": data.get("prediction", "REAL"),
                    "confidence": float(data.get("confidence", 85.0)),
                    "heatmap": heatmap
                }
        except Exception as exc:
            st.warning(f"Backend service call failed ({exc}). Trying local model...")
    if _local_predict_deepfake is not None:
        return _local_predict_deepfake(image)
    return {"status": "error", "message": "Deepfake service unavailable."}


def generate_sketch_fn(image: Image.Image):
    if BACKEND_URL:
        try:
            buf = io.BytesIO()
            image.save(buf, format="JPEG")
            boundary = "----WebKitFormBoundaryFaceAIService"
            body = (
                f"--{boundary}\r\n"
                f'Content-Disposition: form-data; name="file"; filename="photo.jpg"\r\n'
                f"Content-Type: image/jpeg\r\n\r\n"
            ).encode("utf-8") + buf.getvalue() + f"\r\n--{boundary}--\r\n".encode("utf-8")
            req = urllib.request.Request(
                f"{BACKEND_URL}/api/sketch/generate",
                data=body,
                headers={"Content-Type": f"multipart/form-data; boundary={boundary}"}
            )
            with urllib.request.urlopen(req, timeout=30) as resp:
                raw_png = resp.read()
                mode = resp.headers.get("X-FaceAI-Mode", "Realistic Pencil Sketch")
                return Image.open(io.BytesIO(raw_png)), mode
        except Exception as exc:
            st.warning(f"Backend service call failed ({exc}). Trying local generator...")
    if _local_generate_sketch is not None:
        return _local_generate_sketch(image)
    return image, "Fallback"


def generate_face_fn(prompt: str, model_id: str):
    if BACKEND_URL:
        try:
            form_data = urllib.parse.urlencode({"prompt": prompt, "model_id": model_id}).encode("utf-8")
            req = urllib.request.Request(
                f"{BACKEND_URL}/api/text-to-face/generate",
                data=form_data,
                headers={"Content-Type": "application/x-www-form-urlencoded"}
            )
            with urllib.request.urlopen(req, timeout=60) as resp:
                raw_png = resp.read()
                label = resp.headers.get("X-FaceAI-Label", "AI-GENERATED - FICTIONAL FACE")
                return Image.open(io.BytesIO(raw_png)), label
        except Exception as exc:
            st.warning(f"Backend service call failed ({exc}). Trying local generator...")
    if _local_generate_face is not None:
        return _local_generate_face(prompt, model_id)
    raise RuntimeError("Text-to-face generator unavailable.")

st.set_page_config(page_title="FaceAI Studio", page_icon="🧠", layout="wide")
st.markdown("""
<style>
.block-container {padding-top: 1.8rem; max-width: 1250px;}
.hero {padding: 1.5rem 1.8rem; border-radius: 18px; background: linear-gradient(120deg,#101d3a,#155e75); color:white;}
.hero h1 {color:white; margin-bottom:.25rem;}
.small-note {color:#64748b; font-size:.9rem;}
div[data-testid="stMetric"] {background:#f5f8fc; padding:14px; border-radius:12px;}
</style>
""", unsafe_allow_html=True)

st.markdown('<div class="hero"><h1>🧠 FaceAI Studio</h1><p>Integrated Deepfake Detection · Face Sketch Generation · Text-to-Face Synthesis</p></div>', unsafe_allow_html=True)
st.write("")
def image_to_bytes(img):
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return buf.getvalue()


tabs = st.tabs(["🔍 Deepfake Detection", "✏️ Face Sketch", "✨ Text-to-Face", "ℹ️ About"])

with tabs[0]:
    st.subheader("Deepfake Detection")
    st.write("Upload a face image to inspect it using the CNN + frequency-feature model.")
    uploaded = st.file_uploader("Upload JPG / PNG image", type=["jpg","jpeg","png"], key="detect")
    if uploaded:
        image = Image.open(uploaded).convert("RGB")
        c1, c2 = st.columns([1,1])
        with c1: st.image(image, caption="Uploaded image", use_container_width=True)
        with c2:
            if st.button("Analyze image", type="primary", key="analyze"):
                with st.spinner("Analyzing image..."):
                    result = predict_deepfake_fn(image)
                if result["status"] == "model":
                    st.metric("Prediction", result["label"])
                    st.metric("Model confidence", f'{result["confidence"]:.1f}%')
                    st.info("This is a model prediction, not proof of authenticity.")
                    if result.get("heatmap") is not None:
                        st.image(result["heatmap"], caption="Grad-CAM / explanation map")
                else:
                    st.warning(result["message"])
                    st.caption("The model is not trained yet. Add a trained checkpoint to enable real/fake predictions.")

with tabs[1]:
    st.subheader("Realistic Face Sketch Generation")
    st.write("Upload a clear, front-facing portrait. The demo mode uses image-processing stylization; connect a trained photo-to-sketch GAN for research-grade synthesis.")
    uploaded = st.file_uploader("Upload portrait", type=["jpg","jpeg","png"], key="sketch")
    if uploaded:
        image = Image.open(uploaded).convert("RGB")
        c1, c2 = st.columns(2)
        with c1: st.image(image, caption="Original photo", use_container_width=True)
        if st.button("Generate sketch", type="primary"):
            with st.spinner("Creating sketch..."):
                output, mode = generate_sketch_fn(image)
            with c2:
                st.image(output, caption=f"Generated sketch — {mode}", use_container_width=True)
            st.download_button("Download sketch", data=image_to_bytes(output), file_name="face_sketch.png", mime="image/png")

with tabs[2]:
    st.subheader("Text-to-Face Synthesis")
    st.write("Describe a fictional person. A pretrained text-to-image diffusion model is required for generation.")
    prompt = st.text_area("Describe the fictional face", placeholder="Example: A fictional young adult with curly dark hair, round glasses, warm smile, studio portrait, realistic photography")
    model_id = st.text_input("Diffusion model ID", value="runwayml/stable-diffusion-v1-5", help="Hugging Face model ID or local model path. Model access/licence may apply.")
    if st.button("Generate fictional face", type="primary"):
        if len(prompt.strip()) < 8:
            st.error("Please enter a more detailed description.")
        else:
            with st.spinner("Loading model and generating image. First run may take time and download model weights..."):
                try:
                    output, note = generate_face_fn(prompt, model_id)
                    st.image(output, caption="AI-generated fictional face", use_container_width=True)
                    st.warning("AI-GENERATED — fictional synthetic image. Not a real person's photograph.")
                    st.caption(note)
                    st.download_button("Download generated image", data=image_to_bytes(output), file_name="ai_generated_face.png", mime="image/png")
                except Exception as e:
                    st.error(f"Generation could not start: {e}")
                    st.info("Check the setup instructions in README.md, model access, internet connection and available GPU memory.")

with tabs[3]:
    st.subheader("Project overview")
    st.markdown("""
**Project:** An Integrated Framework for Deepfake Detection, Realistic Face Sketch Generation, and Text-to-Face Synthesis Using Deep Learning.

**Module 1:** Image preprocessing → spatial CNN features + FFT frequency features → feature fusion → classifier → prediction/explanation.

**Module 2:** Face alignment → image-to-image generator → sketch refinement → pencil-style sketch.

**Module 3:** Text preprocessing → CLIP/text encoder → text conditioning → pretrained diffusion/StyleGAN generator → labelled synthetic face.

**Responsible use:** Detection scores are probabilistic and can be wrong. Do not use them as sole evidence. Text-to-face outputs must remain labelled as AI-generated. Use consented images and datasets with appropriate permissions.
""")
