'use client';

import React, { useEffect, useRef } from 'react';
import { useVoxStore } from '@/store/useVoxStore';

interface LiveWaveformProps {
  audioData?: Uint8Array;
  frequencyData?: Uint8Array;
  isActive?: boolean;
  height?: number;
  className?: string;
  showVAD?: boolean;
  visualMode?: 'waveform' | 'frequency' | 'both';
}

export const LiveWaveform: React.FC<LiveWaveformProps> = ({
  audioData,
  frequencyData,
  isActive = false,
  height = 160,
  className = '',
  showVAD = true,
  visualMode = 'both',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const systemStatus = useVoxStore((s) => s.systemStatus);
  const currentDetection = useVoxStore((s) => s.currentDetection);
  const setInputLevel = useVoxStore((s) => s.setInputLevel);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let idlePhase = 0;

    const render = () => {
      const width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio || 600);
      const h = (canvas.height = height * window.devicePixelRatio || height);
      ctx.clearRect(0, 0, width, h);

      // Determine palette based on threat severity
      const isCritical = currentDetection?.riskLevel === 'critical' || systemStatus === 'threat_detected';
      const isHigh = currentDetection?.riskLevel === 'high';
      const themeColor = isCritical ? '#FF3B30' : isHigh ? '#FF9500' : '#00F0FF';
      const glowColor = isCritical ? 'rgba(255, 59, 48, 0.4)' : 'rgba(0, 240, 255, 0.35)';

      // Background grid lines (technical cyber grid)
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      const gridGap = 30 * window.devicePixelRatio;
      for (let x = 0; x < width; x += gridGap) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(width, h / 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.stroke();

      if (isActive && audioData && audioData.length > 0) {
        // Compute volume & push to store
        let sum = 0;
        for (let i = 0; i < audioData.length; i++) {
          const norm = (audioData[i] - 128) / 128;
          sum += norm * norm;
        }
        const rms = Math.sqrt(sum / audioData.length);
        const level = Math.min(100, Math.round(rms * 280));
        setInputLevel(level);

        // Draw Frequency bars if mode is 'frequency' or 'both'
        if ((visualMode === 'frequency' || visualMode === 'both') && frequencyData && frequencyData.length > 0) {
          const barCount = 48;
          const barWidth = width / barCount;
          const step = Math.floor(frequencyData.length / barCount);

          for (let i = 0; i < barCount; i++) {
            const val = frequencyData[i * step] || 0;
            const barHeight = (val / 255) * (h * 0.7);
            const x = i * barWidth;
            const y = h - barHeight;

            const grad = ctx.createLinearGradient(0, y, 0, h);
            grad.addColorStop(0, themeColor);
            grad.addColorStop(1, 'rgba(0, 240, 255, 0.05)');

            ctx.fillStyle = grad;
            ctx.fillRect(x + 2, y, barWidth - 4, barHeight);
          }
        }

        // Draw Time-Domain Waveform Oscilloscope Line
        if (visualMode === 'waveform' || visualMode === 'both') {
          ctx.beginPath();
          ctx.lineWidth = 2 * window.devicePixelRatio;
          ctx.strokeStyle = themeColor;
          ctx.shadowBlur = 12 * window.devicePixelRatio;
          ctx.shadowColor = glowColor;

          const sliceWidth = width / audioData.length;
          let x = 0;

          for (let i = 0; i < audioData.length; i++) {
            const v = audioData[i] / 128.0;
            const y = (v * h) / 2;

            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
            x += sliceWidth;
          }

          ctx.stroke();
          ctx.shadowBlur = 0; // reset
        }
      } else {
        // Idle Animation - subtle sinusoidal wave
        idlePhase += 0.04;
        setInputLevel(0);

        ctx.beginPath();
        ctx.lineWidth = 1.5 * window.devicePixelRatio;
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.35)';
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(0, 240, 255, 0.2)';

        for (let x = 0; x < width; x += 4) {
          const normalX = x / width;
          const y =
            h / 2 +
            Math.sin(normalX * 8 + idlePhase) * 6 * window.devicePixelRatio * Math.sin(normalX * Math.PI) +
            Math.sin(normalX * 16 - idlePhase * 1.5) * 3 * window.devicePixelRatio;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [audioData, frequencyData, isActive, height, currentDetection, systemStatus, setInputLevel, visualMode]);

  return (
    <div className={`relative w-full rounded-lg border border-white/10 bg-surface-300/80 backdrop-blur-md overflow-hidden ${className}`}>
      {/* Visual Header / Metadata Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 text-[11px] font-mono text-text-secondary">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              isActive ? 'bg-cyan-400 animate-ping' : 'bg-white/20'
            }`}
          />
          <span className="tracking-wider uppercase">
            {isActive ? 'SIGNAL INGESTION: ACTIVE' : 'TELEMETRY: STANDBY'}
          </span>
        </div>
        {showVAD && (
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">FFT: 256 BINS</span>
            <span className="hidden sm:inline">SAMPLE RATE: 48 kHz</span>
            <div className="flex items-center gap-1.5">
              <span className="text-text-muted">VAD:</span>
              <span className={isActive ? 'text-emerald-400 font-semibold' : 'text-text-muted'}>
                {isActive ? 'VOICE DETECTED' : 'QUIET'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Canvas container */}
      <div className="relative w-full" style={{ height: `${height}px` }}>
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>
    </div>
  );
};
