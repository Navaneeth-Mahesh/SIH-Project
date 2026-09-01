'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Radio,
  UserCheck,
  ShieldAlert,
  Users,
  BarChart3,
  Settings,
  Mic,
  Upload,
  Search,
  X,
  Sparkles,
} from 'lucide-react';
import { useVoxStore } from '@/store/useVoxStore';

export const CommandPalette: React.FC = () => {
  const router = useRouter();
  const {
    isCommandPaletteOpen,
    setCommandPaletteOpen,
    setIsMonitoring,
    addToast,
  } = useVoxStore();

  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!isCommandPaletteOpen);
      }
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const COMMANDS = [
    {
      id: 'cmd-dashboard',
      title: 'Go to Overview Dashboard',
      description: 'System health, live telemetry, recent detections',
      icon: LayoutDashboard,
      action: () => {
        router.push('/dashboard');
        setCommandPaletteOpen(false);
      },
    },
    {
      id: 'cmd-monitor',
      title: 'Open Real-Time Live Monitor',
      description: 'Continuous microphone spectrum and deepfake detection',
      icon: Radio,
      action: () => {
        router.push('/monitor');
        setIsMonitoring(true);
        setCommandPaletteOpen(false);
      },
    },
    {
      id: 'cmd-verify',
      title: 'Verify Voice Identity & Liveness',
      description: 'Run 10-second biometric acoustic challenge verification',
      icon: UserCheck,
      action: () => {
        router.push('/verify');
        setCommandPaletteOpen(false);
      },
    },
    {
      id: 'cmd-threats',
      title: 'Open Threat Incident Center',
      description: 'Investigate spoofing alerts and blocked wire attempts',
      icon: ShieldAlert,
      action: () => {
        router.push('/threats');
        setCommandPaletteOpen(false);
      },
    },
    {
      id: 'cmd-profiles',
      title: 'Manage Voice Biometric Profiles',
      description: 'Enroll executive voices and configure identity embeddings',
      icon: Users,
      action: () => {
        router.push('/profiles');
        setCommandPaletteOpen(false);
      },
    },
    {
      id: 'cmd-analytics',
      title: 'View Cybersecurity Analytics',
      description: 'Attack vectors, latency breakdown, and spoof ratios',
      icon: BarChart3,
      action: () => {
        router.push('/analytics');
        setCommandPaletteOpen(false);
      },
    },
    {
      id: 'cmd-settings',
      title: 'System Settings & Sensitivities',
      description: 'Configure auto-block thresholds and audio devices',
      icon: Settings,
      action: () => {
        router.push('/settings');
        setCommandPaletteOpen(false);
      },
    },
    {
      id: 'cmd-upload',
      title: 'Inspect Audio File Payload',
      description: 'Upload WAV, MP3, or M4A for offline spoof inspection',
      icon: Upload,
      action: () => {
        router.push('/monitor');
        setCommandPaletteOpen(false);
      },
    },
  ];

  const filteredCommands = COMMANDS.filter(
    (cmd) =>
      cmd.title.toLowerCase().includes(query.toLowerCase()) ||
      cmd.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-surface-200 border border-white/15 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Search header */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
          <Search className="w-4 h-4 text-cyan-400 shrink-0" />
          <input
            type="text"
            placeholder="Type a command or search destination..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none font-mono"
          />
          <button
            onClick={() => setCommandPaletteOpen(false)}
            className="text-text-muted hover:text-text-primary transition p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Command list */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.id}
                  onClick={cmd.action}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-cyan-500/10 hover:border-cyan-500/30 border border-transparent transition text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-surface-100 border border-white/10 flex items-center justify-center text-text-secondary group-hover:text-cyan-400 transition">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-mono font-semibold text-text-primary group-hover:text-cyan-400 transition">
                        {cmd.title}
                      </p>
                      <p className="text-[11px] text-text-secondary">{cmd.description}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-text-muted opacity-0 group-hover:opacity-100 transition uppercase">
                    EXECUTE ↵
                  </span>
                </button>
              );
            })
          ) : (
            <div className="p-8 text-center text-xs font-mono text-text-secondary">
              No matching command found for &quot;{query}&quot;
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-white/5 bg-surface-300 flex items-center justify-between text-[10px] font-mono text-text-muted">
          <span>VOXSHIELD TACTICAL PALETTE</span>
          <span>ESC to close • ↑↓ to navigate</span>
        </div>
      </div>
    </div>
  );
};
