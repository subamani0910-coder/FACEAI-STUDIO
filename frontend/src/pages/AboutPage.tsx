import React from 'react';
import {
  Info,
  Shield,
  Fingerprint,
  Cpu,
  Layers,
  HeartHandshake,
  CheckCircle,
  AlertOctagon,
  Sparkles,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Page Header */}
      <div className="text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ffd1]/10 border border-[#00ffd1]/30 text-[#00ffd1] text-xs font-mono mb-3">
          <Info size={14} />
          <span>PROJECT IDENTITY & RESPONSIBLE AI</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Space_Grotesk'] text-[#f5fbff] tracking-tight">
          ABOUT <span className="text-[#00ffd1]">FACEAI STUDIO</span>
        </h1>
        <p className="mt-3 text-sm text-[#9bb4c5] max-w-3xl leading-relaxed">
          Official Project Title: "An Integrated Framework for Deepfake Detection, Realistic Face Sketch Generation,
          and Text-to-Face Synthesis Using Deep Learning"
        </p>
      </div>

      {/* Identity Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#102638]/70 border border-[#00e5ff]/25 backdrop-blur-md shadow-[0_0_30px_rgba(6,18,31,0.8)] space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#00e5ff]/15 border border-[#00e5ff]/40 flex items-center justify-center text-[#00e5ff]">
            <Fingerprint size={26} />
          </div>
          <div className="text-xs font-mono text-[#00ffd1] font-bold">CORE MOTTO</div>
          <h3 className="text-xl font-bold font-['Space_Grotesk'] text-[#f5fbff]">
            "INTELLIGENCE BEYOND APPEARANCE."
          </h3>
          <p className="text-xs text-[#9bb4c5] leading-relaxed">
            Perceiving beyond the deceptive surface layer to extract authentic biometric signals and generative insights.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#102638]/70 border border-[#00e5ff]/25 backdrop-blur-md shadow-[0_0_30px_rgba(6,18,31,0.8)] space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#00ffd1]/15 border border-[#00ffd1]/40 flex items-center justify-center text-[#00ffd1]">
            <Cpu size={26} />
          </div>
          <div className="text-xs font-mono text-[#00ffd1] font-bold">SECONDARY TAGLINE</div>
          <h3 className="text-xl font-bold font-['Space_Grotesk'] text-[#f5fbff]">
            "DETECT. TRANSFORM. GENERATE."
          </h3>
          <p className="text-xs text-[#9bb4c5] leading-relaxed">
            Uniting forensic defense, artistic identity-preserving stylization, and natural language synthesis in one cohesive platform.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#102638]/70 border border-[#00e5ff]/25 backdrop-blur-md shadow-[0_0_30px_rgba(6,18,31,0.8)] space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#168cff]/15 border border-[#168cff]/40 flex items-center justify-center text-[#00e5ff]">
            <Layers size={26} />
          </div>
          <div className="text-xs font-mono text-[#00ffd1] font-bold">CATEGORY</div>
          <h3 className="text-xl font-bold font-['Space_Grotesk'] text-[#f5fbff]">
            Deep Learning & Generative Vision
          </h3>
          <p className="text-xs text-[#9bb4c5] leading-relaxed">
            Applied Computer Vision, Convolutional Neural Networks, Fourier Analysis, Generative Adversarial Networks, and Latent Diffusion.
          </p>
        </div>
      </div>

      {/* Technology Stack Grid */}
      <section className="p-8 rounded-2xl bg-[#102638]/70 border border-[#00e5ff]/25 backdrop-blur-md shadow-[0_0_30px_rgba(6,18,31,0.8)] space-y-6">
        <h2 className="text-2xl font-bold font-['Space_Grotesk'] text-[#f5fbff]">
          PLATFORM ARCHITECTURE & TECH STACK
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-[#06121f] border border-[#00e5ff]/20 space-y-2">
            <div className="text-[#00ffd1] font-bold">FRONTEND CLIENT</div>
            <p className="text-[#9bb4c5] text-[11px] leading-relaxed">
              • React 18 + TypeScript<br />
              • Three.js + React Three Fiber<br />
              • Tailwind CSS Cyberpunk Theme<br />
              • Lucide React + GSAP motion
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#06121f] border border-[#00e5ff]/20 space-y-2">
            <div className="text-[#00e5ff] font-bold">BACKEND SERVER</div>
            <p className="text-[#9bb4c5] text-[11px] leading-relaxed">
              • Python FastAPI (Asynchronous)<br />
              • Uvicorn ASGI Server<br />
              • OpenCV Facial Landmarks<br />
              • Pydantic Schema Validation
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#06121f] border border-[#00e5ff]/20 space-y-2">
            <div className="text-[#00ffd1] font-bold">DEEP LEARNING</div>
            <p className="text-[#9bb4c5] text-[11px] leading-relaxed">
              • PyTorch 2.x + TorchVision<br />
              • 2D Fast Fourier Transform (FFT)<br />
              • Grad-CAM Explainability<br />
              • Dual-branch Feature Fusion
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#06121f] border border-[#00e5ff]/20 space-y-2">
            <div className="text-[#00e5ff] font-bold">GENERATIVE AI</div>
            <p className="text-[#9bb4c5] text-[11px] leading-relaxed">
              • Hugging Face Diffusers<br />
              • CLIP ViT-L/14 Cross-Attention<br />
              • Pix2Pix / CA-GAN GAN Pipeline<br />
              • Automated AI Watermarking
            </p>
          </div>
        </div>
      </section>

      {/* Responsible AI Framework (CRITICAL REQUIREMENT) */}
      <section className="p-8 rounded-2xl bg-[#06121f]/95 border-2 border-[#00e5ff]/40 shadow-[0_0_40px_rgba(0,229,255,0.15)] space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00ffd1]/20 border border-[#00ffd1] flex items-center justify-center text-[#00ffd1]">
            <HeartHandshake size={24} />
          </div>
          <div>
            <span className="text-xs font-mono text-[#00ffd1] font-bold">ETHICAL AI DIRECTIVE</span>
            <h2 className="text-2xl font-bold font-['Space_Grotesk'] text-[#f5fbff]">
              Responsible Artificial Intelligence Framework
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#9bb4c5] font-mono leading-relaxed">
          <div className="p-5 rounded-xl bg-[#102638]/60 border border-[#00e5ff]/20 space-y-2.5">
            <div className="text-[#00ffd1] font-bold flex items-center gap-2">
              <CheckCircle size={15} />
              <span>1. PROBABILISTIC LIMITATIONS OF FORENSICS</span>
            </div>
            <p className="text-[11px]">
              AI deepfake detection confidence scores are mathematical estimates based on learned feature distributions.
              They are not infallible certificates of authenticity. The platform requires human-in-the-loop validation
              and should never be used as singular legal proof.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#102638]/60 border border-[#00e5ff]/20 space-y-2.5">
            <div className="text-[#00e5ff] font-bold flex items-center gap-2">
              <CheckCircle size={15} />
              <span>2. MANDATORY SYNTHETIC DISCLOSURE</span>
            </div>
            <p className="text-[11px]">
              Every generated portrait generated via the Text-to-Face synthesis module carries an immutable
              "AI-GENERATED — FICTIONAL FACE" provenance watermark and HTTP headers to prevent impersonation and disinformation.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#102638]/60 border border-[#00e5ff]/20 space-y-2.5">
            <div className="text-[#00ffd1] font-bold flex items-center gap-2">
              <CheckCircle size={15} />
              <span>3. CONSENT & PRIVACY PROTECTIONS</span>
            </div>
            <p className="text-[11px]">
              Users must only process photographs they own or have explicit consent to inspect or transform.
              No uploaded biometric data is stored permanently or used for secondary training without user agreement.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#102638]/60 border border-[#00e5ff]/20 space-y-2.5">
            <div className="text-[#ff647e] font-bold flex items-center gap-2">
              <AlertOctagon size={15} />
              <span>4. PROHIBITION OF REAL PERSON IMPERSONATION</span>
            </div>
            <p className="text-[11px]">
              The platform incorporates prompt sanitization to encourage purely fictional person synthesis.
              Impersonation of living public figures or private individuals without consent is strictly prohibited.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
