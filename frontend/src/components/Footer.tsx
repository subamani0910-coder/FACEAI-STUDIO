import React from 'react';
import { Fingerprint, Shield, Cpu, Sparkles, Terminal } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="border-t border-[#00e5ff]/20 bg-[#06121f] text-[#9bb4c5] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl border border-[#00e5ff]/40 bg-[#06121f] flex items-center justify-center text-[#00e5ff] shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                <Fingerprint size={22} />
              </div>
              <div>
                <span className="text-lg font-bold font-['Space_Grotesk'] text-[#f5fbff]">FACEAI </span>
                <span className="text-lg font-bold font-['Space_Grotesk'] text-[#00e5ff]">STUDIO</span>
                <div className="text-[9px] font-mono tracking-widest text-[#9bb4c5]">
                  FACIAL INTELLIGENCE PLATFORM
                </div>
              </div>
            </div>

            <p className="text-xs text-[#9bb4c5] max-w-md leading-relaxed">
              An integrated deep learning framework uniting spatial and frequency-based deepfake forensics,
              facial structure-preserving sketch generation, and generative text-to-face synthesis.
            </p>

            <div className="flex items-center gap-2 pt-2 text-[10px] font-mono text-[#00ffd1]">
              <span className="w-2 h-2 rounded-full bg-[#00ffd1] shadow-[0_0_6px_#00ffd1]" />
              <span>TAGLINE: "INTELLIGENCE BEYOND APPEARANCE"</span>
            </div>
            <div className="text-[10px] font-mono text-[#00e5ff]">
              SECONDARY: "DETECT. TRANSFORM. GENERATE."
            </div>
          </div>

          {/* Core Modules Column */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#f5fbff] font-['Space_Grotesk'] flex items-center gap-1.5">
              <Cpu size={14} className="text-[#00e5ff]" />
              <span>AI MODULES</span>
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectTab('deepfake')}
                  className="hover:text-[#00ffd1] transition-colors flex items-center gap-2 text-left"
                >
                  <Shield size={12} className="text-[#00e5ff]" />
                  <span>01. Deepfake Forensics</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('sketch')}
                  className="hover:text-[#00ffd1] transition-colors flex items-center gap-2 text-left"
                >
                  <Terminal size={12} className="text-[#00e5ff]" />
                  <span>02. Face Sketch Studio</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('text')}
                  className="hover:text-[#00ffd1] transition-colors flex items-center gap-2 text-left"
                >
                  <Sparkles size={12} className="text-[#00e5ff]" />
                  <span>03. Text-to-Face Synthesis</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Research & Platform */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#f5fbff] font-['Space_Grotesk']">
              RESEARCH & INFO
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectTab('research')}
                  className="hover:text-[#00ffd1] transition-colors text-left"
                >
                  Research Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('about')}
                  className="hover:text-[#00ffd1] transition-colors text-left"
                >
                  About the Project
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('about')}
                  className="hover:text-[#00ffd1] transition-colors text-left"
                >
                  Responsible AI Framework
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 pt-8 border-t border-[#00e5ff]/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#9bb4c5] gap-4">
          <div>
            © 2026 FACEAI STUDIO · Official Research Project Prototype · Open Source & Educational
          </div>
          <div className="text-[#00e5ff] text-[10px]">
            TECH STACK: REACT · THREE.JS · FASTAPI · PYTORCH · DIFFUSERS
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
