import React from 'react';
import {
  BookOpen,
  Layers,
  Cpu,
  Sparkles,
  GitCompare,
  AlertTriangle,
  ArrowRight,
  Shield,
  FileCode,
} from 'lucide-react';

export const ResearchPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Page Header */}
      <div className="text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-[#00e5ff] text-xs font-mono mb-3">
          <BookOpen size={14} />
          <span>RESEARCH & METHODOLOGY SPECIFICATION</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Space_Grotesk'] text-[#f5fbff] tracking-tight">
          RESEARCH <span className="text-[#00e5ff]">ARCHITECTURE</span>
        </h1>
        <p className="mt-3 text-sm text-[#9bb4c5] max-w-3xl leading-relaxed">
          Comprehensive theoretical foundation, neural network layer topologies, mathematical formulations,
          and architectural dataflows behind the FACEAI STUDIO integrated framework.
        </p>
      </div>

      {/* Module 01: Deepfake Detection Deep Dive */}
      <section className="p-8 rounded-2xl bg-[#102638]/70 border border-[#00e5ff]/25 backdrop-blur-md shadow-[0_0_30px_rgba(6,18,31,0.8)] space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00e5ff]/15 border border-[#00e5ff]/40 flex items-center justify-center text-[#00e5ff]">
            <Shield size={22} />
          </div>
          <div>
            <span className="text-xs font-mono text-[#00ffd1] font-bold">MODULE 01 RESEARCH</span>
            <h2 className="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] text-[#f5fbff]">
              Dual-Branch CNN + FFT Spatial-Frequency Feature Fusion
            </h2>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#9bb4c5] leading-relaxed">
          Traditional deepfake detectors rely solely on spatial pixel textures, which are easily corrupted
          by compression (e.g. H.264/H.265 compression artifacts). Our framework proposes an integrated
          dual-branch neural network that simultaneously inspects spatial blending boundaries and frequency-domain
          spectral peaks produced by generative upsampling layers.
        </p>

        {/* Dataflow Pipeline */}
        <div className="p-4 rounded-xl bg-[#06121f] border border-[#00e5ff]/20">
          <div className="text-[10px] font-mono text-[#00e5ff] mb-3">ARCHITECTURAL DATAFLOW:</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 text-center text-[10px] font-mono">
            {[
              { step: '01', title: 'Input RGB', sub: '224×224' },
              { step: '02', title: 'Spatial CNN', sub: 'Conv2D + BN' },
              { step: '03', title: '2D-FFT Shift', sub: 'Log-Magnitude' },
              { step: '04', title: 'Freq Branch', sub: 'Conv2D + Pool' },
              { step: '05', title: 'Fusion Tensor', sub: 'Dim=160' },
              { step: '06', title: 'Classifier', sub: 'Dense + Dropout' },
              { step: '07', title: 'Output Logits', sub: 'REAL / FAKE' },
            ].map((node, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-[#0a1b2b] border border-[#00e5ff]/20 relative">
                <div className="text-[9px] text-[#00ffd1]">{node.step}</div>
                <div className="font-bold text-[#f5fbff] mt-0.5">{node.title}</div>
                <div className="text-[8px] text-[#9bb4c5]">{node.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-[#06121f]/90 border border-[#00e5ff]/15 space-y-2">
            <div className="text-[#00ffd1] font-bold">1. SPATIAL STREAM (RGB DOMAIN)</div>
            <p className="text-[#9bb4c5] leading-relaxed text-[11px]">
              Extracts high-level spatial visual inconsistencies such as mismatched specular highlights,
              irregular pupil shapes, and blurring around facial contours and skin texture transitions.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#06121f]/90 border border-[#00e5ff]/15 space-y-2">
            <div className="text-[#00e5ff] font-bold">2. FREQUENCY STREAM (FOURIER DOMAIN)</div>
            <p className="text-[#9bb4c5] leading-relaxed text-[11px]">
              Computed via 2D Fast Fourier Transform: 2D-FFT converts spatial pixel matrices into orthogonal frequency coefficients.
              Exposes unnatural periodic spectral peaks caused by GAN transpose convolution upsampling.
            </p>
          </div>
        </div>
      </section>

      {/* Module 02: Face Sketch Generation */}
      <section className="p-8 rounded-2xl bg-[#102638]/70 border border-[#00e5ff]/25 backdrop-blur-md shadow-[0_0_30px_rgba(6,18,31,0.8)] space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00ffd1]/15 border border-[#00ffd1]/40 flex items-center justify-center text-[#00ffd1]">
            <Cpu size={22} />
          </div>
          <div>
            <span className="text-xs font-mono text-[#00ffd1] font-bold">MODULE 02 RESEARCH</span>
            <h2 className="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] text-[#f5fbff]">
              Geometry-Preserving Image-to-Image GAN Face Sketch Synthesis
            </h2>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#9bb4c5] leading-relaxed">
          Photo-to-sketch transformation bridges biometric surveillance and forensic facial composite art.
          The generator uses an encoder-decoder architecture with skip connections (U-Net) trained with paired
          L1 pixel loss, perceptual feature loss (VGG-19), and adversarial discriminator loss.
        </p>

        <div className="p-4 rounded-xl bg-[#06121f] border border-[#00ffd1]/20 text-xs font-mono space-y-2">
          <div className="text-[#00ffd1] font-bold">LOSS FUNCTION COMPOSITION:</div>
          <div className="p-3 rounded bg-[#0a1b2b] text-[11px] text-[#00e5ff] overflow-x-auto">
            ℒ_total = ℒ_cGAN(G, D) + λ_L1 · ℒ_L1(G) + λ_perceptual · ℒ_VGG(G(x), y)
          </div>
          <p className="text-[#9bb4c5] text-[11px] leading-relaxed">
            The adversarial objective ensures realistic graphite pencil cross-hatching, while the L1 and
            perceptual components guarantee exact preservation of facial landmarks: inter-ocular distance,
            nose-to-lip ratio, and outer jaw contours.
          </p>
        </div>
      </section>

      {/* Module 03: Text-to-Face Synthesis */}
      <section className="p-8 rounded-2xl bg-[#102638]/70 border border-[#00e5ff]/25 backdrop-blur-md shadow-[0_0_30px_rgba(6,18,31,0.8)] space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#168cff]/15 border border-[#168cff]/40 flex items-center justify-center text-[#00e5ff]">
            <Sparkles size={22} />
          </div>
          <div>
            <span className="text-xs font-mono text-[#00ffd1] font-bold">MODULE 03 RESEARCH</span>
            <h2 className="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] text-[#f5fbff]">
              CLIP-Conditioned Latent Diffusion for Fictional Face Generation
            </h2>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#9bb4c5] leading-relaxed">
          Rather than generating in high-dimensional pixel space (which demands excessive compute),
          the text-to-face module leverages a pre-trained Autoencoder (VAE) that compresses 512×512×3 images
          into a 64×64×4 latent space. A time-conditional U-Net iteratively denoises latent representations
          guided by cross-attention layers conditioned on CLIP ViT-L/14 text embeddings.
        </p>
      </section>

      {/* Comparative Analysis Table */}
      <section className="p-8 rounded-2xl bg-[#102638]/70 border border-[#00e5ff]/25 backdrop-blur-md shadow-[0_0_30px_rgba(6,18,31,0.8)] space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono text-[#00ffd1] font-bold">
          <GitCompare size={16} />
          <span>BENCHMARK & METHODOLOGICAL COMPARISON</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-[#00e5ff]/30 text-[#00ffd1]">
                <th className="py-3 px-4">PARAMETER</th>
                <th className="py-3 px-4">EXISTING CONVENTIONAL SYSTEMS</th>
                <th className="py-3 px-4 text-[#00e5ff]">PROPOSED FACEAI STUDIO FRAMEWORK</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#00e5ff]/10 text-[#9bb4c5]">
              <tr>
                <td className="py-3 px-4 font-bold text-[#f5fbff]">Integration</td>
                <td className="py-3 px-4">Isolated, single-task silo tools</td>
                <td className="py-3 px-4 text-[#00ffd1]">Unified 3-in-1 Facial Intelligence Ecosystem</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-[#f5fbff]">Deepfake Analysis</td>
                <td className="py-3 px-4">Spatial-only RGB heuristics (fragile to compression)</td>
                <td className="py-3 px-4 text-[#00ffd1]">Dual-Branch CNN (Spatial) + FFT (Frequency) Fusion</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-[#f5fbff]">Sketch Synthesis</td>
                <td className="py-3 px-4">Basic Canny edge filters or unaligned photo filters</td>
                <td className="py-3 px-4 text-[#00ffd1]">Face alignment + Geometry-preserving GAN / fallback</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-[#f5fbff]">Text-to-Face</td>
                <td className="py-3 px-4">Generic text-to-image without facial conditioning</td>
                <td className="py-3 px-4 text-[#00ffd1]">CLIP face-conditioned Latent Diffusion + Watermarking</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-[#f5fbff]">Explainability</td>
                <td className="py-3 px-4">Black-box binary percentage outputs</td>
                <td className="py-3 px-4 text-[#00ffd1]">Grad-CAM heatmap overlays + Forensics telemetry</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Limitations & Future Work */}
      <section className="p-6 rounded-2xl bg-[#06121f]/90 border border-[#00e5ff]/20 text-xs font-mono space-y-3">
        <div className="flex items-center gap-2 text-[#f0b84b] font-bold">
          <AlertTriangle size={16} />
          <span>RESEARCH LIMITATIONS & SCIENTIFIC INTEGRITY</span>
        </div>
        <p className="text-[#9bb4c5] text-[11px] leading-relaxed">
          1. <strong>Deepfake Detection Checkpoint:</strong> Classification models require extensive training
          on balanced benchmarks (FaceForensics++, Celeb-DF, DFDC) to generalize across novel generative models.
          Predictions are probabilistic heuristics and should never serve as sole legal evidence.
          <br /><br />
          2. <strong>Hardware Requirements:</strong> Real-time text-to-face diffusion inference demands modern
          GPU accelerators with &gt;4 GB VRAM. CPU execution remains supported as a safe educational fallback.
        </p>
      </section>
    </div>
  );
};

export default ResearchPage;
