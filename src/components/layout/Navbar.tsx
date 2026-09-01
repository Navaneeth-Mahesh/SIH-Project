'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Radio, Command, Bell, Mic, Cpu } from 'lucide-react';
import { useVoxStore } from '@/store/useVoxStore';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { 
    systemStatus, 
    isMicrophoneActive, 
    isMonitoring, 
    setCommandPaletteOpen 
  } = useVoxStore();

  const isThreat = systemStatus === 'threat_detected';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-surface-100 border border-white/10 group-hover:border-cyan-500/50 transition">
              <Shield className={`w-5 h-5 transition-colors ${isThreat ? 'text-red-400' : 'text-cyan-400'}`} />
              <span className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ${isThreat ? 'bg-red-500 animate-ping' : 'bg-cyan-400'}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-sm tracking-wider text-text-primary">
                  VOXSHIELD
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  AI SOC
                </span>
              </div>
              <p className="text-[9px] font-mono text-text-secondary tracking-widest hidden sm:block uppercase">
                SIH26104 • ANTI-SPOOF ENGINE
              </p>
            </div>
          </Link>
        </div>

        {/* Global Status Telemetry */}
        <div className="hidden md:flex items-center gap-6 text-xs font-mono">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-100 border border-white/5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-text-secondary">ENGINE:</span>
            <span className="text-text-primary font-semibold">NEURAL-V3</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-100 border border-white/5">
            <span
              className={`w-2 h-2 rounded-full ${
                isThreat
                  ? 'bg-red-500 animate-ping'
                  : isMonitoring
                  ? 'bg-cyan-400 animate-pulse'
                  : 'bg-emerald-400'
              }`}
            />
            <span className="text-text-secondary">STATUS:</span>
            <span
              className={`font-semibold ${
                isThreat
                  ? 'text-red-400'
                  : isMonitoring
                  ? 'text-cyan-400'
                  : 'text-emerald-400'
              }`}
            >
              {isThreat ? 'CRITICAL ALERT' : isMonitoring ? 'MONITORING LIVE' : 'PROTECTED'}
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-100 border border-white/5">
            <Mic className={`w-3.5 h-3.5 ${isMicrophoneActive ? 'text-emerald-400' : 'text-text-muted'}`} />
            <span className="text-text-secondary">MIC:</span>
            <span className={isMicrophoneActive ? 'text-emerald-400 font-semibold' : 'text-text-muted'}>
              {isMicrophoneActive ? 'STREAMING' : 'MUTED'}
            </span>
          </div>
        </div>

        {/* Action Controls & Command Shortcut */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-text-secondary bg-surface-100 hover:bg-surface-50 border border-white/10 hover:border-cyan-500/30 rounded-lg transition"
            aria-label="Open Command Palette"
          >
            <Command className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">COMMAND</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] rounded bg-white/5 border border-white/10">
              ⌘K
            </kbd>
          </button>

          {pathname !== '/monitor' && (
            <Link
              href="/monitor"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-mono font-bold tracking-wider transition shadow-lg shadow-cyan-500/10"
            >
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>LIVE MONITOR</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
