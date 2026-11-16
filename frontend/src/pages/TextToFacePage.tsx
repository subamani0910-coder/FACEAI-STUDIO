import React, { useState } from 'react';
import {
  Sparkles,
  Download,
  RefreshCw,
  Sliders,
  AlertTriangle,
  Cpu,
  Layers,
  Wand2,
  Trash2,
  CheckCircle,
} from 'lucide-react';
import { generateTextToFace, TextToFaceResult } from '../services/api';
import ScanningOverlay from '../components/ScanningOverlay';

const PROMPT_CHIPS = [
  'A fictional young adult with curly black hair, brown eyes, friendly warm smile, professional studio headshot',
  'Cyberpunk facial intelligence researcher with subtle holographic ocular implants, silver hair, cinematic lighting',
  'Elderly fictional scholar with thoughtful kind eyes, natural skin texture, soft window portrait illumination',
  'Athletic fictional persona with sharp jawline, confident expression, dramatic studio rim light, natural skin',
];

export const TextToFacePage: React.FC = () => {
  const [prompt, setPrompt] = useState(
    'A fictional young adult with curly dark hair, warm brown eyes, a subtle smile, studio portrait photography'
  );
  const [negativePrompt, setNegativePrompt] = useState(
    'blurry, deformed, distorted, extra limbs, bad anatomy, cartoon, drawing, low quality'
  );
  const [modelId, setModelId] = useState('runwayml/stable-diffusion-v1-5');
  const [steps, setSteps] = useState(25);
  const [guidance, setGuidance] = useState(7.0);
  const [seed, setSeed] = useState<string>('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<TextToFaceResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim() || prompt.length < 8) {
      setError('Please provide a detailed prompt of at least 8 characters.');
      return;
    }
    setGenerating(true);
    setError(null);
    setResult(null);

    const numericSeed = seed.trim() !== '' ? parseInt(seed, 10) : null;

    try {
      const res = await generateTextToFace({
        prompt: prompt.trim(),
        modelId,
        negativePrompt: negativePrompt.trim() || undefined,
        steps,
        guidance,
        seed: Number.isNaN(numericSeed) ? null : numericSeed,
        width: 512,
        height: 512,
      });
      setResult(res);
    } catch (err: any) {
      setError(
        err?.message ||
          'Generation failed. The backend requires internet access on first download and ~4GB VRAM (GPU) or ~8GB RAM (CPU).'
      );
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!result?.imageUrl) return;
    const a = document.createElement('a');
    a.href = result.imageUrl;
    a.download = `faceai-fictional-face-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleClear = () => {
    setPrompt('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Module Title Banner */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#168cff]/10 border border-[#168cff]/30 text-[#00e5ff] text-xs font-mono mb-3">
          <Sparkles size={14} />
          <span>MODULE 03 :: GENERATIVE TEXT-TO-FACE SYNTHESIS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Space_Grotesk'] text-[#f5fbff] tracking-tight">
          TEXT-TO-FACE <span className="text-[#00e5ff]">SYNTHESIS</span>
        </h1>
        <p className="mt-3 text-sm text-[#9bb4c5] max-w-2xl leading-relaxed">
          Generate entirely fictional, synthetic human portraits from natural language descriptions using
          latent diffusion models conditioned on CLIP text embeddings.
        </p>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Prompt & Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-[#102638]/70 border border-[#00e5ff]/25 backdrop-blur-md shadow-[0_0_30px_rgba(6,18,31,0.8)]">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#00e5ff]/15">
              <span className="text-xs font-mono tracking-widest text-[#00ffd1] font-bold">
                NATURAL LANGUAGE PROMPT
              </span>
              <button
                onClick={handleClear}
                className="text-[10px] font-mono text-[#9bb4c5] hover:text-[#ff647e] flex items-center gap-1"
              >
                <Trash2 size={11} /> CLEAR
              </button>
            </div>

            {/* Prompt Textarea */}
            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe a fictional human face: age, hair style, eye color, facial expression, studio lighting..."
              className="w-full p-4 rounded-xl bg-[#06121f] border border-[#00e5ff]/30 text-[#f5fbff] text-xs font-mono focus:border-[#00ffd1] focus:outline-none focus:ring-1 focus:ring-[#00ffd1] transition-all resize-y"
            />

            {/* Prompt Suggestion Chips */}
            <div className="mt-3 space-y-1.5">
              <div className="text-[10px] font-mono text-[#9bb4c5]">SUGGESTED PROMPT INSPIRATION:</div>
              <div className="flex flex-wrap gap-1.5">
                {PROMPT_CHIPS.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPrompt(chip)}
                    className="text-[9px] font-mono px-2.5 py-1 rounded bg-[#06121f] hover:bg-[#00e5ff]/15 text-[#9bb4c5] hover:text-[#00ffd1] border border-[#00e5ff]/20 transition-all text-left truncate max-w-full"
                  >
                    ✦ {chip.slice(0, 52)}...
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced Toggle */}
            <div className="mt-5 pt-4 border-t border-[#00e5ff]/15">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-xs font-mono text-[#00e5ff] flex items-center gap-2 hover:underline"
              >
                <Sliders size={13} />
                <span>{showAdvanced ? 'HIDE ADVANCED SETTINGS' : 'SHOW ADVANCED HYPERPARAMETERS'}</span>
              </button>

              {showAdvanced && (
                <div className="mt-4 space-y-4 p-4 rounded-xl bg-[#06121f]/90 border border-[#00e5ff]/20 text-xs font-mono">
                  {/* Negative Prompt */}
                  <div>
                    <label className="block text-[10px] text-[#9bb4c5] mb-1">NEGATIVE PROMPT</label>
                    <input
                      type="text"
                      value={negativePrompt}
                      onChange={(e) => setNegativePrompt(e.target.value)}
                      className="w-full px-3 py-2 rounded bg-[#0a1b2b] border border-[#00e5ff]/20 text-xs text-[#f5fbff] focus:outline-none focus:border-[#00ffd1]"
                    />
                  </div>

                  {/* Diffusion Model ID */}
                  <div>
                    <label className="block text-[10px] text-[#9bb4c5] mb-1">
                      HUGGING FACE MODEL ID / CHECKPOINT
                    </label>
                    <input
                      type="text"
                      value={modelId}
                      onChange={(e) => setModelId(e.target.value)}
                      className="w-full px-3 py-2 rounded bg-[#0a1b2b] border border-[#00e5ff]/20 text-xs text-[#f5fbff] focus:outline-none focus:border-[#00ffd1]"
                    />
                  </div>

                  {/* Sliders Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between text-[10px] text-[#9bb4c5] mb-1">
                        <span>INFERENCE STEPS</span>
                        <span className="text-[#00ffd1]">{steps}</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={50}
                        value={steps}
                        onChange={(e) => setSteps(Number(e.target.value))}
                        className="w-full accent-[#00ffd1]"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-[10px] text-[#9bb4c5] mb-1">
                        <span>GUIDANCE SCALE</span>
                        <span className="text-[#00e5ff]">{guidance.toFixed(1)}</span>
                      </div>
                      <input
                        type="range"
                        min={1.0}
                        max={15.0}
                        step={0.5}
                        value={guidance}
                        onChange={(e) => setGuidance(Number(e.target.value))}
                        className="w-full accent-[#00e5ff]"
                      />
                    </div>
                  </div>

                  {/* Seed */}
                  <div>
                    <label className="block text-[10px] text-[#9bb4c5] mb-1">
                      RANDOM SEED (OPTIONAL)
                    </label>
                    <input
                      type="number"
                      placeholder="Leave blank for random generation"
                      value={seed}
                      onChange={(e) => setSeed(e.target.value)}
                      className="w-full px-3 py-2 rounded bg-[#0a1b2b] border border-[#00e5ff]/20 text-xs text-[#f5fbff] focus:outline-none focus:border-[#00ffd1]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-6">
              <button
                onClick={handleGenerate}
                disabled={generating || !prompt.trim()}
                className="w-full py-3.5 px-6 rounded-lg font-bold font-['Space_Grotesk'] text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#168cff]/30 via-[#00e5ff]/25 to-[#00ffd1]/20 border border-[#00e5ff] text-[#f5fbff] hover:bg-[#00e5ff]/30 hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                {generating ? (
                  <>
                    <RefreshCw size={17} className="animate-spin text-[#00ffd1]" />
                    <span>SYNTHESIZING FICTIONAL FACE...</span>
                  </>
                ) : (
                  <>
                    <Wand2 size={17} className="text-[#00ffd1]" />
                    <span>GENERATE FICTIONAL FACE</span>
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-4 rounded-lg bg-[#ff647e]/10 border border-[#ff647e]/40 text-xs text-[#ffb0bb] space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <AlertTriangle size={14} className="text-[#ff647e]" />
                  <span>SYNTHESIS PIPELINE NOTICE</span>
                </div>
                <div className="text-[11px] leading-relaxed">{error}</div>
              </div>
            )}
          </div>

          {/* Research Architecture Callout */}
          <div className="p-5 rounded-2xl bg-[#06121f]/90 border border-[#00e5ff]/15 text-xs text-[#9bb4c5] space-y-2">
            <div className="font-bold font-['Space_Grotesk'] text-[#f5fbff] flex items-center gap-2">
              <Cpu size={14} className="text-[#00e5ff]" />
              <span>RESEARCH ARCHITECTURE :: CLIP-CONDITIONED LATENT DIFFUSION</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              Prompt Text → CLIP Text Encoder (ViT-L/14) → 77×768 Text Embeddings → Cross-Attention Conditioning →
              U-Net Iterative Noise Predictor (25 timesteps) → VAE Decoder → 512×512 Synthetic RGB Output.
            </p>
          </div>
        </div>

        {/* Right Column: Synthetic Canvas Output */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-[#102638]/70 border border-[#00e5ff]/25 backdrop-blur-md shadow-[0_0_30px_rgba(6,18,31,0.8)] min-h-[480px] flex flex-col">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#00e5ff]/15">
              <span className="text-xs font-mono tracking-widest text-[#00ffd1] font-bold">
                GENERATIVE DIFFUSION CANVAS
              </span>
              <span className="text-[10px] font-mono text-[#00e5ff]">
                512 × 512 RGB
              </span>
            </div>

            {/* Visualizer Area */}
            <div className="relative flex-1 rounded-xl overflow-hidden bg-[#030c14] border border-[#00e5ff]/20 flex items-center justify-center min-h-[380px]">
              {generating ? (
                <div className="relative w-full h-full min-h-[380px] flex items-center justify-center p-4">
                  <ScanningOverlay
                    active={true}
                    label="DENOISING LATENT SPACE"
                    sublabel={`TIMESTEP PROGRESS: ${steps} ITERATIVE INFERENCE STEPS`}
                  />
                </div>
              ) : result ? (
                <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
                  <img
                    src={result.imageUrl}
                    alt="AI-Generated Fictional Face"
                    className="max-h-[360px] w-auto object-contain rounded-lg border border-[#00e5ff]/40 shadow-[0_0_30px_rgba(0,229,255,0.2)]"
                  />
                  {/* Mandatory AI-Generated Watermark Badge */}
                  <div className="mt-3 px-3 py-1 rounded-full bg-[#ff647e]/20 border border-[#ff647e]/50 text-[#ffb0bb] text-[10px] font-mono font-bold tracking-widest">
                    AI-GENERATED — FICTIONAL FACE
                  </div>
                </div>
              ) : (
                <div className="text-center p-8 text-[#9bb4c5]">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full border border-[#00e5ff]/30 flex items-center justify-center text-[#00e5ff] shadow-[0_0_20px_rgba(0,229,255,0.15)]">
                    <Sparkles size={28} />
                  </div>
                  <div className="text-sm font-bold font-['Space_Grotesk'] text-[#f5fbff]">
                    YOUR SYNTHETIC PORTRAIT
                  </div>
                  <p className="text-xs text-[#9bb4c5] mt-1 max-w-xs mx-auto">
                    Enter a natural language description and initialize the generative diffusion model.
                  </p>
                </div>
              )}
            </div>

            {/* Action Bar when result ready */}
            {result && (
              <div className="mt-6 p-4 rounded-xl bg-[#06121f]/90 border border-[#00e5ff]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold font-mono text-[#00ffd1]">
                    <CheckCircle size={15} />
                    <span>PORTRAIT GENERATED</span>
                  </div>
                  <div className="text-[10px] font-mono text-[#9bb4c5] mt-0.5">
                    ACCELERATOR: {result.device.toUpperCase()}
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleDownload}
                    className="flex-1 sm:flex-none py-2.5 px-5 rounded-lg font-bold font-['Space_Grotesk'] text-xs tracking-wider uppercase bg-[#00e5ff]/20 hover:bg-[#00e5ff]/30 text-[#00e5ff] border border-[#00e5ff] shadow-[0_0_15px_rgba(0,229,255,0.25)] flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Download size={15} />
                    <span>DOWNLOAD PORTRAIT</span>
                  </button>

                  <button
                    onClick={handleGenerate}
                    className="p-2.5 rounded-lg border border-[#00e5ff]/30 text-[#00e5ff] hover:bg-[#00e5ff]/10 transition-all"
                    title="Regenerate"
                  >
                    <RefreshCw size={15} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextToFacePage;
