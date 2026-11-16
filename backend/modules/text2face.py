import torch
from diffusers import StableDiffusionPipeline

def generate_face(prompt: str, model_id: str):
    """Uses a pretrained diffusion pipeline. First run downloads model weights."""
    device = "cuda" if torch.cuda.is_available() else "cpu"
    dtype = torch.float16 if device == "cuda" else torch.float32
    pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=dtype, safety_checker=None)
    pipe = pipe.to(device)
    pipe.enable_attention_slicing()
    full_prompt = ("photorealistic studio headshot portrait of a fictional person, " + prompt +
                   ", detailed natural skin texture, realistic lighting, centered face")
    result = pipe(full_prompt, num_inference_steps=25, guidance_scale=7.0, height=512, width=512)
    return result.images[0], f"Generated using {model_id} on {device}. Synthetic output; not a real person's photo."
