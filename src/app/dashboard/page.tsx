'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Radio, 
  Mic, 
  MicOff, 
  ShieldAlert, 
  UserCheck, 
  Activity, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  Zap
} from 'lucide-react';
import { useVoxStore } from '@/store/useVoxStore';
import { LiveWaveform } from '@/components/audio/LiveWaveform';
import { useMicrophone } from '@/hooks/useMicrophone';
import { useAudioAnalyser } from '@/hooks/useAudioAnalyser';
import { getRiskColor, getActionBadge } from '@/lib/utils';

export default function DashboardPage() {
  const { 
    systemStatus, 
    isMicrophoneActive, 
    currentDetection, 
    threats, 
    profiles, 
    setMicrophoneActive 
  } = useVoxStore();

  const { startMicrophone, stopMicrophone } = useMicrophone();
  const { audioData, frequencyData, startAnalysing, stopAnalysing } = useAudioAnalyser(256);

  const handleMicToggle = async () => {
    if (isMicrophoneActive) {
      stopMicrophone();
      stopAnalysing();
    } else {
      const stream = await startMicrophone();
      if (stream) {
        startAnalysing(stream);
      }
    }
  };

  const isThreat = systemStatus === 'threat_detected';
  const recentThreats = threats.slice(0, 3);
  const activeProfilesCount = profiles.length;

  return (
    <div className="space-y-8 py-2">
      {/* Header & Status bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>SECURITY COMMAND CENTER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-text-primary tracking-tight mt-1">
            VOICE SECURITY OVERVIEW
          </h1>
        </div>

        {/* Global Status Pill */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-200 border border-white/10">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isThreat
                  ? 'bg-red-500 animate-ping'
                  : isMicrophoneActive
                  ? 'bg-cyan-400 animate-pulse'
                  : 'bg-emerald-400'
              }`}
            />
            <span className="text-xs font-mono text-text-secondary uppercase">STATUS:</span>
            <span
              className={`text-xs font-mono font-bold uppercase ${
                isThreat
                  ? 'text-red-400'
                  : isMicrophoneActive
                  ? 'text-cyan-400'
                  : 'text-emerald-400'
              }`}
            >
              {isThreat ? 'CRITICAL ALERT DETECTED' : isMicrophoneActive ? 'MONITORING ACTIVE' : 'PROTECTED'}
            </span>
          </div>

          <button
            onClick={handleMicToggle}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition ${
              isMicrophoneActive
                ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                : 'bg-cyan-500 text-black hover:bg-cyan-400'
            }`}
          >
            {isMicrophoneActive ? (
              <>
                <MicOff className="w-4 h-4" />
                <span>STOP MIC</span>
              </>
            ) : (
              <>
                <Mic className="w-4 h-4" />
                <span>START MIC</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Hero Card: Live Voice Security Waveform */}
      <div className="rounded-2xl border border-white/10 bg-surface-200/90 backdrop-blur-xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-base font-display font-bold text-text-primary">
                LIVE VOICE SECURITY STREAM
              </h2>
              <p className="text-xs font-mono text-text-secondary">
                {isMicrophoneActive
                  ? 'Analyzing high-frequency phase and spectral jitter in real-time.'
                  : 'Microphone stream idle. Click Start Mic or navigate to Live Monitor for continuous monitoring.'}
              </p>
            </div>
          </div>

          <Link
            href="/monitor"
            className="flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition"
          >
            <span>FULL MONITOR CONSOLE</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Oscilloscope Canvas */}
        <LiveWaveform
          audioData={audioData}
          frequencyData={frequencyData}
          isActive={isMicrophoneActive}
          height={150}
          visualMode="both"
        />

        {/* Telemetry Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3 rounded-lg bg-surface-300 border border-white/5 font-mono">
            <span className="text-[10px] text-text-secondary uppercase">Deepfake Prob</span>
            <p className="text-sm font-bold text-emerald-400">
              {currentDetection ? `${(currentDetection.spoofProbability * 100).toFixed(1)}%` : '0.0%'}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-surface-300 border border-white/5 font-mono">
            <span className="text-[10px] text-text-secondary uppercase">Speaker Match</span>
            <p className="text-sm font-bold text-cyan-400">
              {currentDetection ? `${(currentDetection.speakerMatch * 100).toFixed(1)}%` : '98.5%'}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-surface-300 border border-white/5 font-mono">
            <span className="text-[10px] text-text-secondary uppercase">Engine Latency</span>
            <p className="text-sm font-bold text-text-primary">
              {currentDetection?.latencyMs || 124} ms
            </p>
          </div>

          <div className="p-3 rounded-lg bg-surface-300 border border-white/5 font-mono">
            <span className="text-[10px] text-text-secondary uppercase">Liveness Check</span>
            <p className="text-sm font-bold text-emerald-400 uppercase">
              {currentDetection?.liveness || 'PASS'}
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Row (4 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="p-5 rounded-xl border border-white/10 bg-surface-200 space-y-2">
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <span>THREATS BLOCKED</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-text-primary">139</p>
          <span className="text-[10px] text-emerald-400 block">+14 intercepted this week</span>
        </div>

        <div className="p-5 rounded-xl border border-white/10 bg-surface-200 space-y-2">
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <span>ENROLLED PROFILES</span>
            <UserCheck className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-bold text-text-primary">{activeProfilesCount}</p>
          <span className="text-[10px] text-cyan-400 block">512-dim neural embeddings</span>
        </div>

        <div className="p-5 rounded-xl border border-white/10 bg-surface-200 space-y-2">
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <span>INSPECTION ACCURACY</span>
            <Cpu className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-text-primary">99.4%</p>
          <span className="text-[10px] text-purple-400 block">Tortoise, ElevenLabs, XTTS</span>
        </div>

        <div className="p-5 rounded-xl border border-white/10 bg-surface-200 space-y-2">
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <span>AVG INGESTION TIME</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-bold text-text-primary">138 ms</p>
          <span className="text-[10px] text-amber-400 block">Sub-200ms real-time SLA</span>
        </div>
      </div>

      {/* Two Column Layout: Recent Threats & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Recent Threat Stream */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-text-primary flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span>RECENT INCIDENT TELEMETRY</span>
            </h3>
            <Link
              href="/threats"
              className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>VIEW ALL INCIDENTS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {recentThreats.map((t) => (
              <div
                key={t.id}
                className="p-4 rounded-xl border border-white/10 bg-surface-200 hover:border-cyan-500/30 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-text-primary">#{t.id}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-text-secondary">
                      {t.threatType}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                        getRiskColor(t.riskLevel).bg
                      } ${getRiskColor(t.riskLevel).text}`}
                    >
                      RISK {t.riskScore} • {t.riskLevel}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary">{t.caller}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-mono font-bold px-2.5 py-1 rounded border ${
                      getActionBadge(t.action).color
                    }`}
                  >
                    {t.action.toUpperCase()}
                  </span>
                  <Link
                    href={`/threats`}
                    className="text-xs font-mono text-cyan-400 hover:underline"
                  >
                    DETAILS →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Quick Tactical Actions */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-text-primary">
            TACTICAL SHORTCUTS
          </h3>

          <div className="space-y-3">
            <Link
              href="/verify"
              className="p-4 rounded-xl border border-white/10 bg-surface-200 hover:border-cyan-500/40 transition block group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-bold text-text-primary group-hover:text-cyan-400 transition">
                  VERIFY VOICE IDENTITY
                </span>
                <UserCheck className="w-4 h-4 text-cyan-400" />
              </div>
              <p className="text-xs text-text-secondary font-sans">
                Execute 10-second biometric acoustic challenge verification.
              </p>
            </Link>

            <Link
              href="/profiles"
              className="p-4 rounded-xl border border-white/10 bg-surface-200 hover:border-cyan-500/40 transition block group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-bold text-text-primary group-hover:text-cyan-400 transition">
                  ENROLL NEW PROFILE
                </span>
                <Mic className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-xs text-text-secondary font-sans">
                Record and store high-dimensional acoustic voice embeddings.
              </p>
            </Link>

            <Link
              href="/analytics"
              className="p-4 rounded-xl border border-white/10 bg-surface-200 hover:border-cyan-500/40 transition block group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-bold text-text-primary group-hover:text-cyan-400 transition">
                  THREAT INTELLIGENCE
                </span>
                <Activity className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-xs text-text-secondary font-sans">
                Explore historical spoof vectors and latency telemetry charts.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
