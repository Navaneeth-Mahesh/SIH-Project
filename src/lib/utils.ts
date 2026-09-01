import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function formatPercentage(val: number): string {
  return `${Math.round(val * 100)}%`;
}

export function getRiskColor(level: 'low' | 'medium' | 'high' | 'critical'): {
  text: string;
  bg: string;
  border: string;
  glow: string;
  hex: string;
} {
  switch (level) {
    case 'low':
      return {
        text: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/30',
        glow: 'rgba(16, 185, 129, 0.3)',
        hex: '#10B981',
      };
    case 'medium':
      return {
        text: 'text-cyan-400',
        bg: 'bg-cyan-500/10',
        border: 'border-cyan-500/30',
        glow: 'rgba(0, 240, 255, 0.3)',
        hex: '#00F0FF',
      };
    case 'high':
      return {
        text: 'text-amber-400',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/30',
        glow: 'rgba(255, 149, 0, 0.3)',
        hex: '#FF9500',
      };
    case 'critical':
      return {
        text: 'text-red-400',
        bg: 'bg-red-500/10',
        border: 'border-red-500/30',
        glow: 'rgba(255, 59, 48, 0.3)',
        hex: '#FF3B30',
      };
  }
}

export function getActionBadge(action: 'allow' | 'verify' | 'alert' | 'block'): {
  label: string;
  color: string;
  iconSymbol: string;
} {
  switch (action) {
    case 'allow':
      return { label: 'ALLOW', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', iconSymbol: '✓' };
    case 'verify':
      return { label: 'VERIFY', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20', iconSymbol: '↻' };
    case 'alert':
      return { label: 'ALERT', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', iconSymbol: '⚠' };
    case 'block':
      return { label: 'BLOCK', color: 'text-red-400 bg-red-500/10 border-red-500/20', iconSymbol: '×' };
  }
}
