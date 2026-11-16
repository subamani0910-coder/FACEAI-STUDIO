import React from 'react';

interface ScanningOverlayProps {
  label?: string;
  sublabel?: string;
  active?: boolean;
}

export const ScanningOverlay: React.FC<ScanningOverlayProps> = ({
  label = 'BIOMETRIC SCAN IN PROGRESS',
  sublabel = 'EXTRACTING SPATIAL & FREQUENCY TENSORS',
  active = true,
}) => {
  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden flex flex-col justify-between p-4 bg-[#06121f]/40 backdrop-blur-[2px]">
      {/* Corner Brackets */}
      <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#00e5ff] shadow-[0_0_8px_#00e5ff]" />
      <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#00e5ff] shadow-[0_0_8px_#00e5ff]" />
      <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#00e5ff] shadow-[0_0_8px_#00e5ff]" />
      <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#00e5ff] shadow-[0_0_8px_#00e5ff]" />

      {/* Sweeping Laser Line */}
      <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent shadow-[0_0_15px_#00e5ff] animate-scan-y" />

      {/* Top HUD Telemetry */}
      <div className="flex justify-between items-center text-[8px] font-mono tracking-widest text-[#00ffd1]">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#00ffd1] animate-ping" />
          <span>SYS::AI_INSPECTOR</span>
        </div>
        <div>LATENCY: 12ms | FFT_GRID: 224x224</div>
      </div>

      {/* Target Reticle in Center */}
      <div className="self-center my-auto flex flex-col items-center justify-center">
        <div className="relative w-32 h-32 border border-[#00e5ff]/30 rounded-full flex items-center justify-center animate-spin" style={{ animationDuration: '8s' }}>
          <div className="absolute w-28 h-28 border border-dashed border-[#00ffd1]/40 rounded-full" />
          <div className="w-2 h-2 bg-[#00e5ff] rounded-full shadow-[0_0_10px_#00e5ff]" />
        </div>
        <div className="mt-3 px-3 py-1 bg-[#06121f]/90 border border-[#00e5ff]/40 rounded text-[9px] font-mono tracking-widest text-[#00e5ff] shadow-[0_0_15px_rgba(0,229,255,0.2)]">
          {label}
        </div>
        <div className="text-[8px] font-mono text-[#91aabb] mt-1">{sublabel}</div>
      </div>

      {/* Bottom Telemetry Waveform */}
      <div className="flex justify-between items-end text-[8px] font-mono tracking-wider text-[#91aabb]">
        <div>CONFIDENCE MATRIX: PROCESSING</div>
        <div className="flex items-end gap-1 h-3">
          {[40, 75, 55, 90, 60, 85, 45, 95].map((h, i) => (
            <div
              key={i}
              className="w-1 bg-[#00e5ff] rounded-t"
              style={{
                height: `${h}%`,
                animation: `pulse 1s infinite ${i * 0.12}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScanningOverlay;
