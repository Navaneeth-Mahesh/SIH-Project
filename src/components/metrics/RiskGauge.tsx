'use client';

import React, { useEffect, useState } from 'react';
import { getRiskColor, getActionBadge } from '@/lib/utils';
import { SecurityAction, RiskLevel } from '@/types';

interface RiskGaugeProps {
  score: number; // 0 - 100
  riskLevel: RiskLevel;
  action: SecurityAction;
  size?: number;
  className?: string;
  animate?: boolean;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({
  score,
  riskLevel,
  action,
  size = 220,
  className = '',
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let start = animatedScore;
    const duration = 600;
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing: easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (score - start) * eased);
      setAnimatedScore(current);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [score]);

  const radius = (size - 24) / 2;
  const circumference = 2 * Math.PI * radius;
  // Use 270 degree gauge arc (3/4 circle)
  const arcLength = circumference * 0.75;
  const strokeDashoffset = arcLength - (arcLength * Math.min(100, Math.max(0, animatedScore))) / 100;
  const colorInfo = getRiskColor(riskLevel);
  const actionInfo = getActionBadge(action);

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-[135deg]"
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="rgba(255, 255, 255, 0.07)"
            strokeWidth="12"
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
          />

          {/* Active Risk Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={colorInfo.hex}
            strokeWidth="12"
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-300 ease-out"
            style={{
              filter: `drop-shadow(0 0 10px ${colorInfo.glow})`,
            }}
          />
        </svg>

        {/* Center Text Information */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-[11px] font-mono tracking-widest text-text-secondary uppercase">
            RISK INDEX
          </span>
          <span
            className={`text-4xl sm:text-5xl font-mono font-bold tracking-tighter ${colorInfo.text}`}
            style={{ textShadow: `0 0 20px ${colorInfo.glow}` }}
          >
            {animatedScore}
          </span>
          <span className={`text-xs font-mono font-semibold tracking-wider mt-0.5 ${colorInfo.text} uppercase`}>
            {riskLevel} THREAT
          </span>
        </div>
      </div>

      {/* Decision pill below gauge */}
      <div className="mt-2 flex items-center gap-2">
        <div
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono font-bold tracking-wider ${actionInfo.color}`}
        >
          <span>{actionInfo.iconSymbol}</span>
          <span>DECISION: {actionInfo.label}</span>
        </div>
      </div>
    </div>
  );
};
