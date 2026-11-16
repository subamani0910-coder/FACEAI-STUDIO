import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Procedural Facial Landmark Points & Holographic Head Topology
function HolographicFaceMesh() {
  const group = useRef<THREE.Group>(null);

  // Animate head with mouse pointer & rhythmic cyber oscillation
  useFrame((state) => {
    if (group.current) {
      const t = state.clock.elapsedTime;
      group.current.rotation.y = Math.sin(t * 0.4) * 0.18 + state.pointer.x * 0.28;
      group.current.rotation.x = -state.pointer.y * 0.18 + Math.cos(t * 0.3) * 0.05;
    }
  });

  // Key biometric facial landmark coordinates (eyes, nose, lips, jawline)
  const landmarkPoints = useMemo(() => {
    return [
      // Left eye contour
      new THREE.Vector3(-0.24, 0.22, 0.62),
      new THREE.Vector3(-0.16, 0.24, 0.63),
      new THREE.Vector3(-0.08, 0.22, 0.62),
      new THREE.Vector3(-0.16, 0.20, 0.63),
      // Right eye contour
      new THREE.Vector3(0.08, 0.22, 0.62),
      new THREE.Vector3(0.16, 0.24, 0.63),
      new THREE.Vector3(0.24, 0.22, 0.62),
      new THREE.Vector3(0.16, 0.20, 0.63),
      // Nose bridge and tip
      new THREE.Vector3(0.0, 0.22, 0.64),
      new THREE.Vector3(0.0, 0.10, 0.68),
      new THREE.Vector3(0.0, -0.02, 0.72),
      new THREE.Vector3(-0.08, -0.04, 0.66),
      new THREE.Vector3(0.08, -0.04, 0.66),
      // Mouth landmarks
      new THREE.Vector3(-0.16, -0.22, 0.62),
      new THREE.Vector3(0.0, -0.19, 0.66),
      new THREE.Vector3(0.16, -0.22, 0.62),
      new THREE.Vector3(0.0, -0.26, 0.65),
      // Chin & Jawline
      new THREE.Vector3(0.0, -0.48, 0.58),
      new THREE.Vector3(-0.25, -0.42, 0.48),
      new THREE.Vector3(0.25, -0.42, 0.48),
      new THREE.Vector3(-0.42, -0.22, 0.35),
      new THREE.Vector3(0.42, -0.22, 0.35),
      // Forehead
      new THREE.Vector3(-0.22, 0.45, 0.52),
      new THREE.Vector3(0.0, 0.48, 0.56),
      new THREE.Vector3(0.22, 0.45, 0.52),
    ];
  }, []);

  // Construct neural interconnection lines between facial landmarks
  const neuralLinesGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < landmarkPoints.length; i++) {
      for (let j = i + 1; j < landmarkPoints.length; j++) {
        const dist = landmarkPoints[i].distanceTo(landmarkPoints[j]);
        if (dist < 0.24) {
          points.push(landmarkPoints[i], landmarkPoints[j]);
        }
      }
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [landmarkPoints]);

  return (
    <group ref={group}>
      {/* 1. Main Cranial Wireframe Structure */}
      <mesh position={[0, 0.12, 0]} scale={[0.82, 1.14, 0.74]}>
        <sphereGeometry args={[1, 36, 36]} />
        <meshStandardMaterial
          color="#061f30"
          emissive="#00e5ff"
          emissiveIntensity={0.55}
          wireframe
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* 2. Lower Jaw / Chin Topology */}
      <mesh position={[0, -0.38, 0.15]} scale={[0.55, 0.48, 0.48]}>
        <sphereGeometry args={[0.8, 24, 24]} />
        <meshStandardMaterial
          color="#061f30"
          emissive="#00ffd1"
          emissiveIntensity={0.45}
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* 3. Glowing Facial Landmark Biometric Points */}
      {landmarkPoints.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[0.018, 12, 12]} />
          <meshBasicMaterial color={idx % 2 === 0 ? '#00ffd1' : '#00e5ff'} />
        </mesh>
      ))}

      {/* 4. Neural Network Interconnection Lines */}
      <lineSegments geometry={neuralLinesGeometry}>
        <lineBasicMaterial color="#00e5ff" transparent opacity={0.35} />
      </lineSegments>

      {/* 5. Concentric Holographic Orbital Rings */}
      {[0.95, 1.15, 1.35].map((radius, i) => (
        <mesh
          key={radius}
          rotation={[
            Math.PI / 2 + (i * Math.PI) / 6,
            0.15 * i,
            (i * Math.PI) / 4,
          ]}
        >
          <torusGeometry args={[radius, 0.005, 8, 120]} />
          <meshBasicMaterial
            color={i === 1 ? '#00ffd1' : i === 0 ? '#00e5ff' : '#168cff'}
            transparent
            opacity={0.5}
          />
        </mesh>
      ))}

      {/* 6. Glowing Ocular Irises */}
      {[-0.16, 0.16].map((x, i) => (
        <group key={i} position={[x, 0.22, 0.62]}>
          <mesh>
            <sphereGeometry args={[0.038, 16, 16]} />
            <meshBasicMaterial color="#00ffd1" />
          </mesh>
          <pointLight color="#00ffd1" intensity={1.8} distance={0.6} />
        </group>
      ))}
    </group>
  );
}

// Fallback CSS component if WebGL is unavailable
function WebGLFallback() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
      <div className="relative w-48 h-48 rounded-full border-2 border-dashed border-[#00e5ff]/50 animate-spin flex items-center justify-center" style={{ animationDuration: '20s' }}>
        <div className="w-40 h-40 rounded-full border border-[#00ffd1]/40 animate-pulse" />
        <div className="absolute w-28 h-28 rounded-full bg-[#00e5ff]/10 shadow-[0_0_30px_#00e5ff]" />
      </div>
      <div className="mt-4 text-xs font-mono text-[#00ffd1] tracking-widest">
        BIOMETRIC SCANNER (2D FALLBACK)
      </div>
    </div>
  );
}

export const HoloHead: React.FC = () => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <WebGLFallback />;
  }

  return (
    <div className="relative w-full h-full min-h-[420px] lg:min-h-[520px] flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 3.4], fov: 42 }}
        dpr={[1, 1.5]}
        onError={() => setHasError(true)}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[3, 2, 3]} color="#00e5ff" intensity={3.5} />
        <pointLight position={[-3, -1, 2]} color="#00ffd1" intensity={2.5} />
        <pointLight position={[0, -3, 2]} color="#168cff" intensity={2.0} />

        <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.25}>
          <HolographicFaceMesh />
        </Float>

        <Sparkles count={80} scale={3.6} size={2.4} speed={0.3} color="#63faff" />
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.35} />
      </Canvas>

      {/* Cyber Scanning HUD Elements */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6">
        <div className="flex justify-between items-start text-[9px] font-mono tracking-widest text-[#00ffd1]">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#06121f]/80 border border-[#00e5ff]/30 backdrop-blur">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ffd1] animate-ping" />
            <span>BIOMETRIC MESH :: ACTIVE</span>
          </div>
          <div className="px-2.5 py-1 rounded bg-[#06121f]/80 border border-[#00e5ff]/30 backdrop-blur text-[#00e5ff]">
            FPS: 60 · GL_VERTICES: 1,296
          </div>
        </div>

        <div className="flex justify-between items-end text-[9px] font-mono tracking-widest text-[#9bb4c5]">
          <div className="px-2.5 py-1 rounded bg-[#06121f]/80 border border-[#00e5ff]/20 backdrop-blur">
            NEURAL LANDMARK TRACKING
          </div>
          <div className="px-2.5 py-1 rounded bg-[#06121f]/80 border border-[#00ffd1]/30 text-[#00ffd1] backdrop-blur">
            HOLOGRAPHIC PROJECTION 3.0
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoloHead;
