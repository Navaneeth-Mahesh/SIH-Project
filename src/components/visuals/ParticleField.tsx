'use client';

import React, { useEffect, useRef } from 'react';
import { useVoxStore } from '@/store/useVoxStore';

export const ParticleField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeInputLevel = useVoxStore((s) => s.activeInputLevel);
  const systemStatus = useVoxStore((s) => s.systemStatus);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = 45; // Sparse, high-performance
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isThreat = systemStatus === 'threat_detected';
      const particleColor = isThreat ? '255, 59, 48' : '0, 240, 255';
      const audioBoost = (activeInputLevel / 100) * 1.8;

      particles.forEach((p) => {
        p.x += p.speedX * (1 + audioBoost);
        p.y += p.speedY * (1 + audioBoost);

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 + audioBoost * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor}, ${p.opacity * (1 + audioBoost * 0.4)})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeInputLevel, systemStatus]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
      aria-hidden="true"
    />
  );
};
