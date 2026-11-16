import React, { useState, useRef, useCallback, useEffect } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'ORIGINAL PHOTO',
  afterLabel = 'GENERATED SKETCH',
}) => {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(x, rect.width));
    const percent = (clampedX / rect.width) * 100;
    setPosition(percent);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden select-none cursor-ew-resize rounded-lg border border-[rgba(0,229,255,0.3)] bg-[#030c14] shadow-[0_0_30px_rgba(0,229,255,0.1)]"
      style={{ height: '420px', maxHeight: '55vh' }}
      onMouseDown={(e) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onTouchStart={(e) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
      }}
    >
      {/* Background (After / Generated) Image */}
      <img
        src={afterImage}
        alt={afterLabel}
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
      />
      <div className="absolute top-3 right-3 z-10 px-2.5 py-1 text-[9px] font-bold tracking-widest text-[#00ffd1] bg-[#06121f]/80 backdrop-blur border border-[#00ffd1]/30 rounded">
        {afterLabel}
      </div>

      {/* Foreground (Before / Original) Image clipped */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${position}%` }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          style={{
            width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
            maxWidth: 'none',
          }}
        />
        <div className="absolute top-3 left-3 z-10 px-2.5 py-1 text-[9px] font-bold tracking-widest text-[#00e5ff] bg-[#06121f]/80 backdrop-blur border border-[#00e5ff]/30 rounded">
          {beforeLabel}
        </div>
      </div>

      {/* Vertical divider line & cyan cyber handle */}
      <div
        className="absolute top-0 bottom-0 z-20 pointer-events-none flex items-center justify-center"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        <div className="w-[2px] h-full bg-[#00e5ff] shadow-[0_0_12px_#00e5ff]" />
        <div className="absolute w-8 h-8 rounded-full bg-[#06121f] border-2 border-[#00e5ff] shadow-[0_0_20px_#00e5ff] flex items-center justify-center text-[#00ffd1]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="8 7 3 12 8 17" />
            <polyline points="16 7 21 12 16 17" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
