'use client';

import React, { useState } from 'react';
import { 
  Settings, 
  ShieldCheck, 
  Cpu, 
  Lock, 
  Bell, 
  Database, 
  Server, 
  Save, 
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { useVoxStore } from '@/store/useVoxStore';
import { SystemSettings } from '@/types';

export default function SettingsPage() {
  const { settings, updateSettings, addToast } = useVoxStore();
  const [formData, setFormData] = useState<SystemSettings>(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
  };

  const handleResetDefaults = () => {
    const defaults: SystemSettings = {
      detectionSensitivity: 'high',
      autoBlockCritical: true,
      requireChallengeVerification: true,
      spectralAnalysisDepth: 'deep',
      audioInputDevice: 'default',
      notificationsEnabled: true,
      soundAlertsEnabled: true,
      theme: 'dark',
      dataRetention: '30days',
      apiEndpoint: 'http://localhost:8000',
      simulateLatency: false,
    };
    setFormData(defaults);
    updateSettings(defaults);
    addToast({
      type: 'info',
      title: 'Defaults Restored',
      description: 'Factory cybersecurity thresholds applied.',
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>SECURITY ENGINE PARAMETERS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-text-primary tracking-tight mt-1">
            SYSTEM SETTINGS & POLICIES
          </h1>
          <p className="text-xs font-mono text-text-secondary mt-1">
            Configure neural spoof thresholds, auto-block firewall policies, and backend API routes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-200 hover:bg-surface-100 border border-white/10 text-xs font-mono text-text-secondary hover:text-text-primary transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET DEFAULTS</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 font-mono text-xs">
        {/* Detection Engine Sensitivity */}
        <div className="p-6 rounded-2xl border border-white/10 bg-surface-200/90 space-y-4">
          <div className="flex items-center gap-3 text-cyan-400">
            <Cpu className="w-5 h-5" />
            <h3 className="text-sm font-bold uppercase text-text-primary">
              DETECTION ENGINE SENSITIVITY
            </h3>
          </div>
          <p className="text-text-secondary">
            Adjust the AI anti-spoofing neural network sensitivity threshold for phase jitter and harmonic distortions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {(['low', 'balanced', 'high'] as const).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setFormData({ ...formData, detectionSensitivity: level })}
                className={`p-4 rounded-xl border text-left transition ${
                  formData.detectionSensitivity === level
                    ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                    : 'border-white/10 bg-surface-300 hover:border-white/20 text-text-secondary'
                }`}
              >
                <span className="font-bold uppercase block text-text-primary">{level}</span>
                <span className="text-[10px] text-text-muted mt-1 block">
                  {level === 'low'
                    ? 'Tolerant to noisy environments. Lower false positives.'
                    : level === 'balanced'
                    ? 'Recommended for standard VoIP call centers.'
                    : 'Aggressive zero-trust defense against modern AI vocoders.'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Security Policy Automation */}
        <div className="p-6 rounded-2xl border border-white/10 bg-surface-200/90 space-y-4">
          <div className="flex items-center gap-3 text-emerald-400">
            <Lock className="w-5 h-5" />
            <h3 className="text-sm font-bold uppercase text-text-primary">
              POLICY AUTOMATION & INTERCEPTION RULES
            </h3>
          </div>

          <div className="space-y-4 pt-2">
            <label className="flex items-center justify-between p-3.5 rounded-xl bg-surface-300 border border-white/5 cursor-pointer">
              <div className="space-y-0.5">
                <span className="font-bold text-text-primary block">
                  Auto-Block Critical Impersonation Attacks
                </span>
                <span className="text-[11px] text-text-secondary">
                  Automatically disconnect WebRTC/SIP streams when risk score exceeds 80.
                </span>
              </div>
              <input
                type="checkbox"
                checked={formData.autoBlockCritical}
                onChange={(e) => setFormData({ ...formData, autoBlockCritical: e.target.checked })}
                className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-xl bg-surface-300 border border-white/5 cursor-pointer">
              <div className="space-y-0.5">
                <span className="font-bold text-text-primary block">
                  Require Dynamic Challenge Verification
                </span>
                <span className="text-[11px] text-text-secondary">
                  Force interactive phrase response when acoustic baseline is ambiguous.
                </span>
              </div>
              <input
                type="checkbox"
                checked={formData.requireChallengeVerification}
                onChange={(e) => setFormData({ ...formData, requireChallengeVerification: e.target.checked })}
                className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-xl bg-surface-300 border border-white/5 cursor-pointer">
              <div className="space-y-0.5">
                <span className="font-bold text-text-primary block">
                  SOC Push Notifications & Sound Alerts
                </span>
                <span className="text-[11px] text-text-secondary">
                  Trigger desktop audible alerts upon critical threat identification.
                </span>
              </div>
              <input
                type="checkbox"
                checked={formData.notificationsEnabled}
                onChange={(e) => setFormData({ ...formData, notificationsEnabled: e.target.checked })}
                className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Data & Backend Integration */}
        <div className="p-6 rounded-2xl border border-white/10 bg-surface-200/90 space-y-4">
          <div className="flex items-center gap-3 text-purple-400">
            <Server className="w-5 h-5" />
            <h3 className="text-sm font-bold uppercase text-text-primary">
              BACKEND API & DATA RETENTION
            </h3>
          </div>

          <div className="space-y-4 pt-2">
            <div className="space-y-1">
              <label className="text-text-secondary block">FASTAPI BACKEND ENDPOINT</label>
              <input
                type="text"
                value={formData.apiEndpoint}
                onChange={(e) => setFormData({ ...formData, apiEndpoint: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-surface-300 border border-white/10 text-text-primary focus:outline-none focus:border-cyan-500/50"
                placeholder="http://localhost:8000"
              />
              <span className="text-[10px] text-text-muted">
                Defaults to local fallback engine automatically when FastAPI is offline.
              </span>
            </div>

            <div className="space-y-1">
              <label className="text-text-secondary block">FORENSIC AUDIO DATA RETENTION</label>
              <select
                value={formData.dataRetention}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dataRetention: e.target.value as SystemSettings['dataRetention'],
                  })
                }
                className="w-full p-2.5 rounded-xl bg-surface-300 border border-white/10 text-text-primary focus:outline-none focus:border-cyan-500/50"
              >
                <option value="session">SESSION MEMORY ONLY (EPHEMERAL)</option>
                <option value="7days">7 DAYS ROLLING AUDIT LOG</option>
                <option value="30days">30 DAYS COMPLIANCE VAULT</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold tracking-wider transition flex items-center gap-2 shadow-lg shadow-cyan-500/20"
          >
            <Save className="w-4 h-4" />
            <span>SAVE SETTINGS</span>
          </button>
        </div>
      </form>
    </div>
  );
}
