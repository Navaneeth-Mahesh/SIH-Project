'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useVoxStore } from '@/store/useVoxStore';

function CoreMesh() {
  const pointsRef = useRef<THREE.Points>(null!);
  const outerRingRef = useRef<THREE.LineSegments>(null!);
  const activeInputLevel = useVoxStore((s) => s.activeInputLevel);
  const systemStatus = useVoxStore((s) => s.systemStatus);
  const isMonitoring = useVoxStore((s) => s.isMonitoring);

  const isThreat = systemStatus === 'threat_detected';

  // Generate particle sphere
  const [positions, colors] = useMemo(() => {
    const count = 450;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cyan = new THREE.Color('#00F0FF');
    const red = new THREE.Color('#FF3B30');
    const emerald = new THREE.Color('#10B981');

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 0.9 + 0.8;
      
      const sinPhi = Math.sin(phi);
      pos[i * 3] = r * sinPhi * Math.cos(theta);
      pos[i * 3 + 1] = r * sinPhi * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const chosenColor = isThreat ? red : isMonitoring ? cyan : emerald;
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }
    return [pos, col];
  }, [isThreat, isMonitoring]);

  useFrame((state, delta) => {
    const speed = isThreat ? 1.5 : isMonitoring ? 0.8 : 0.25;
    const audioScale = 1 + (activeInputLevel / 100) * 0.35;

    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * speed * 0.4;
      pointsRef.current.rotation.x += delta * speed * 0.2;
      pointsRef.current.scale.set(audioScale, audioScale, audioScale);
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z -= delta * speed * 0.3;
      outerRingRef.current.rotation.y += delta * speed * 0.2;
    }
  });

  const mainColor = isThreat ? '#FF3B30' : isMonitoring ? '#00F0FF' : '#10B981';

  return (
    <group>
      {/* Particle Core */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          vertexColors
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Wireframe geometric shell */}
      <lineSegments ref={outerRingRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <lineBasicMaterial
          color={mainColor}
          transparent
          opacity={isThreat ? 0.4 : 0.2}
        />
      </lineSegments>
    </group>
  );
}

export const VoiceSecurityCore: React.FC<{ className?: string }> = ({ className = 'h-64 w-full' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 3.4], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <CoreMesh />
      </Canvas>
    </div>
  );
};
