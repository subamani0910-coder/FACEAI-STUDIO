import React from 'react';
import {
  ArrowRight,
  Shield,
  FileImage,
  Sparkles,
  Cpu,
  Layers,
  ChevronDown,
  Fingerprint,
  Activity,
  Scan,
  Terminal,
} from 'lucide-react';
import HoloHead from '../components/HoloHead';
import { ActiveTab } from '../components/Navbar';

interface HomePageProps {
  onSelectTab: (tab: ActiveTab) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectTab }) => {
  return (
    <div className="pt-20">
      {/* 1. CINEMATIC 3D HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Cyberpunk Grid Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#00e5ff10_1px,transparent_1px),linear-gradient(to_bottom,#00e5ff10_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Ambient Neon Glows */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-[#00e5ff]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-[#00ffd1]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full relative z-10 py-12">
          {/* Left Column: Hero Typography & Actions */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-[#00e5ff] text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-[#00ffd1] animate-ping" />
              <span>FACIAL INTELLIGENCE PLATFORM 3.0</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-['Space_Grotesk'] tracking-tight text-[#f5fbff] leading-[1.08]">
              THE FUTURE OF <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] via-[#00ffd1] to-[#168cff] drop-shadow-[0_0_35px_rgba(0,229,255,0.4)]">
                FACE INTELLIGENCE.
              </span>
            </h1>

            <h2 className="text-lg sm:text-xl font-bold font-['Space_Grotesk'] text-[#00ffd1] tracking-wide">
              BEYOND WHAT YOU SEE.
            </h2>

            <p className="text-sm sm:text-base text-[#9bb4c5] max-w-xl leading-relaxed mx-auto lg:mx-0">
              An integrated deep learning platform unifying spatial and frequency-based deepfake forensics,
              geometry-preserving pencil sketch generation, and generative text-to-face synthesis.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => {
                  const el = document.getElementById('modules-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto py-3.5 px-7 rounded-lg font-bold font-['Space_Grotesk'] text-xs tracking-wider uppercase bg-gradient-to-r from-[#00e5ff]/25 to-[#00ffd1]/20 border border-[#00e5ff] text-[#f5fbff] hover:bg-[#00e5ff]/35 hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>EXPLORE PLATFORM</span>
                <ArrowRight size={16} className="text-[#00ffd1]" />
              </button>

              <button
                onClick={() => onSelectTab('research')}
                className="w-full sm:w-auto py-3.5 px-6 rounded-lg font-bold font-['Space_Grotesk'] text-xs tracking-wider uppercase text-[#9bb4c5] hover:text-[#f5fbff] border border-white/10 hover:border-[#00e5ff]/40 bg-[#06121f]/60 hover:bg-[#102638] transition-all cursor-pointer"
              >
                DISCOVER TECHNOLOGY
              </button>
            </div>

            {/* Metrics Counters */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#00e5ff]/15 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="border-l-2 border-[#00e5ff] pl-3">
                <div className="text-2xl font-bold font-mono text-[#f5fbff]">03</div>
                <div className="text-[9px] font-mono tracking-widest text-[#9bb4c5]">AI MODULES</div>
              </div>
              <div className="border-l-2 border-[#00ffd1] pl-3">
                <div className="text-2xl font-bold font-mono text-[#f5fbff]">01</div>
                <div className="text-[9px] font-mono tracking-widest text-[#9bb4c5]">UNIFIED ENGINE</div>
              </div>
              <div className="border-l-2 border-[#168cff] pl-3">
                <div className="text-2xl font-bold font-mono text-[#f5fbff]">100%</div>
                <div className="text-[9px] font-mono tracking-widest text-[#9bb4c5]">RESEARCH READY</div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Holographic Interactive Face */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="w-full max-w-[560px] aspect-square relative rounded-3xl bg-gradient-to-b from-[#102638]/40 to-[#06121f]/80 border border-[#00e5ff]/30 shadow-[0_0_50px_rgba(0,229,255,0.15)] backdrop-blur-md overflow-hidden">
              <HoloHead />
            </div>
          </div>
        </div>

        {/* Scroll Cue Indicator */}
        <div className="absolute bottom-4 inset-x-0 flex justify-center pointer-events-none">
          <div className="flex flex-col items-center gap-1 text-[9px] font-mono tracking-widest text-[#9bb4c5]">
            <span>SCROLL TO EXPLORE MODULES</span>
            <ChevronDown size={14} className="text-[#00e5ff] animate-bounce" />
          </div>
        </div>
      </section>

      {/* 2. THREE CORE MODULE SHOWCASE */}
      <section id="modules-section" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center sm:text-left mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ffd1]/10 border border-[#00ffd1]/30 text-[#00ffd1] text-xs font-mono mb-3">
            <Cpu size={14} />
            <span>INTEGRATED SYSTEM CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Space_Grotesk'] text-[#f5fbff] tracking-tight">
            THREE DEEP LEARNING <span className="text-[#00e5ff]">MODULES</span>
          </h2>
          <p className="mt-3 text-sm text-[#9bb4c5] max-w-2xl leading-relaxed">
            Engineered as a cohesive tripartite facial intelligence laboratory. Select any capability to begin real-time inference.
          </p>
        </div>

        {/* Module Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Module 01: Deepfake Detection */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#102638]/90 to-[#06121f]/95 border border-[#00e5ff]/30 hover:border-[#00e5ff] hover:shadow-[0_0_35px_rgba(0,229,255,0.3)] transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-[#00ffd1]">
                <span>MODULE // 01</span>
                <span className="w-2 h-2 rounded-full bg-[#00ffd1]" />
              </div>

              <div className="w-16 h-16 rounded-2xl bg-[#00e5ff]/15 border border-[#00e5ff]/40 flex items-center justify-center text-[#00e5ff] group-hover:scale-105 transition-transform">
                <Scan size={32} />
              </div>

              <h3 className="text-2xl font-bold font-['Space_Grotesk'] text-[#f5fbff]">
                DEEPFAKE <br />
                <span className="text-[#00e5ff]">DETECTION</span>
              </h3>

              <p className="text-xs text-[#9bb4c5] leading-relaxed">
                Identify potential facial manipulation using dual spatial and frequency-based deep learning.
                CNN spatial artifact detection fused with 2D Fast Fourier Transform spectral analysis.
              </p>

              <div className="pt-2 flex flex-wrap gap-1.5 text-[9px] font-mono text-[#00ffd1]">
                <span className="px-2 py-0.5 rounded bg-[#00e5ff]/10 border border-[#00e5ff]/20">2D-CNN</span>
                <span className="px-2 py-0.5 rounded bg-[#00e5ff]/10 border border-[#00e5ff]/20">FFT SPECTRUM</span>
                <span className="px-2 py-0.5 rounded bg-[#00e5ff]/10 border border-[#00e5ff]/20">GRAD-CAM</span>
              </div>
            </div>

            <button
              onClick={() => onSelectTab('deepfake')}
              className="mt-8 w-full py-3 px-4 rounded-lg font-bold font-['Space_Grotesk'] text-xs tracking-wider uppercase bg-[#00e5ff]/20 hover:bg-[#00e5ff]/35 text-[#00e5ff] border border-[#00e5ff]/60 group-hover:border-[#00e5ff] flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>START ANALYSIS</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Module 02: Realistic Face Sketch */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#102638]/90 to-[#06121f]/95 border border-[#00ffd1]/30 hover:border-[#00ffd1] hover:shadow-[0_0_35px_rgba(0,255,209,0.3)] transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-[#00ffd1]">
                <span>MODULE // 02</span>
                <span className="w-2 h-2 rounded-full bg-[#00ffd1]" />
              </div>

              <div className="w-16 h-16 rounded-2xl bg-[#00ffd1]/15 border border-[#00ffd1]/40 flex items-center justify-center text-[#00ffd1] group-hover:scale-105 transition-transform">
                <FileImage size={32} />
              </div>

              <h3 className="text-2xl font-bold font-['Space_Grotesk'] text-[#f5fbff]">
                REALISTIC <br />
                <span className="text-[#00ffd1]">FACE SKETCH</span>
              </h3>

              <p className="text-xs text-[#9bb4c5] leading-relaxed">
                Transform facial photographs into realistic pencil-style sketches while strictly preserving
                biometric facial structure, eye contours, nose bridge, and human identity.
              </p>

              <div className="pt-2 flex flex-wrap gap-1.5 text-[9px] font-mono text-[#00ffd1]">
                <span className="px-2 py-0.5 rounded bg-[#00ffd1]/10 border border-[#00ffd1]/20">FACE ALIGNMENT</span>
                <span className="px-2 py-0.5 rounded bg-[#00ffd1]/10 border border-[#00ffd1]/20">PIX2PIX / GAN</span>
                <span className="px-2 py-0.5 rounded bg-[#00ffd1]/10 border border-[#00ffd1]/20">COMPARE SLIDER</span>
              </div>
            </div>

            <button
              onClick={() => onSelectTab('sketch')}
              className="mt-8 w-full py-3 px-4 rounded-lg font-bold font-['Space_Grotesk'] text-xs tracking-wider uppercase bg-[#00ffd1]/20 hover:bg-[#00ffd1]/35 text-[#00ffd1] border border-[#00ffd1]/60 group-hover:border-[#00ffd1] flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>CREATE SKETCH</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Module 03: Text-to-Face Synthesis */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#102638]/90 to-[#06121f]/95 border border-[#168cff]/30 hover:border-[#00e5ff] hover:shadow-[0_0_35px_rgba(22,140,255,0.3)] transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-[#00ffd1]">
                <span>MODULE // 03</span>
                <span className="w-2 h-2 rounded-full bg-[#00ffd1]" />
              </div>

              <div className="w-16 h-16 rounded-2xl bg-[#168cff]/15 border border-[#168cff]/40 flex items-center justify-center text-[#00e5ff] group-hover:scale-105 transition-transform">
                <Sparkles size={32} />
              </div>

              <h3 className="text-2xl font-bold font-['Space_Grotesk'] text-[#f5fbff]">
                TEXT-TO-FACE <br />
                <span className="text-[#00e5ff]">SYNTHESIS</span>
              </h3>

              <p className="text-xs text-[#9bb4c5] leading-relaxed">
                Generate fictional human portraits from natural language descriptions using generative AI.
                CLIP text conditioning, latent diffusion denoising, and automated provenance labeling.
              </p>

              <div className="pt-2 flex flex-wrap gap-1.5 text-[9px] font-mono text-[#00e5ff]">
                <span className="px-2 py-0.5 rounded bg-[#168cff]/10 border border-[#168cff]/20">CLIP EMBEDDINGS</span>
                <span className="px-2 py-0.5 rounded bg-[#168cff]/10 border border-[#168cff]/20">DIFFUSION U-NET</span>
                <span className="px-2 py-0.5 rounded bg-[#168cff]/10 border border-[#168cff]/20">AI WATERMARK</span>
              </div>
            </div>

            <button
              onClick={() => onSelectTab('text')}
              className="mt-8 w-full py-3 px-4 rounded-lg font-bold font-['Space_Grotesk'] text-xs tracking-wider uppercase bg-[#168cff]/20 hover:bg-[#168cff]/35 text-[#00e5ff] border border-[#168cff]/60 group-hover:border-[#00e5ff] flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>GENERATE FACE</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* 3. PLATFORM ARCHITECTURE SUMMARY */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#00e5ff]/15">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-[#00e5ff] text-xs font-mono">
              <Layers size={14} />
              <span>UNIFIED ARCHITECTURAL FOUNDATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-['Space_Grotesk'] text-[#f5fbff]">
              INTELLIGENCE IN <br />
              <span className="text-[#00ffd1]">EVERY LAYER.</span>
            </h2>
            <p className="text-sm text-[#9bb4c5] leading-relaxed">
              FACEAI STUDIO is structured as an end-to-end framework where computer vision forensics,
              structure-preserving stylization, and probabilistic generative diffusion operate under a single
              synchronized Python FastAPI inference engine.
            </p>

            <div className="pt-2">
              <button
                onClick={() => onSelectTab('research')}
                className="py-3 px-6 rounded-lg font-bold font-['Space_Grotesk'] text-xs tracking-wider uppercase bg-[#102638] hover:bg-[#00e5ff]/15 text-[#00e5ff] border border-[#00e5ff]/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>VIEW COMPLETE RESEARCH SPECIFICATION</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-5 rounded-xl bg-[#102638]/70 border border-[#00e5ff]/20 space-y-2">
              <div className="text-[#00ffd1] font-bold">SPATIAL-DOMAIN</div>
              <p className="text-[#9bb4c5] text-[11px] leading-relaxed">
                RGB convolutional filters scanning for boundary seams, unnatural blur, and blending seams.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#102638]/70 border border-[#00e5ff]/20 space-y-2">
              <div className="text-[#00e5ff] font-bold">FREQUENCY-DOMAIN</div>
              <p className="text-[#9bb4c5] text-[11px] leading-relaxed">
                Fourier frequency shift detecting upsampling grid anomalies inherent in synthetic generators.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#102638]/70 border border-[#00e5ff]/20 space-y-2">
              <div className="text-[#00ffd1] font-bold">SKETCH SYNTHESIS</div>
              <p className="text-[#9bb4c5] text-[11px] leading-relaxed">
                Preserves eyes, nose, lips and jaw contours with edge-guided pencil gradient shading.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#102638]/70 border border-[#00e5ff]/20 space-y-2">
              <div className="text-[#00e5ff] font-bold">ETHICAL AI</div>
              <p className="text-[#9bb4c5] text-[11px] leading-relaxed">
                Strict provenance labeling, probabilistic disclosures, and protection against synthetic impersonation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
