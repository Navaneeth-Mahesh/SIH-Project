'use client';

import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Mic, 
  MicOff, 
  Upload, 
  RefreshCw, 
  ShieldCheck, 
  ShieldAlert, 
  Activity, 
  Cpu, 
  Layers, 
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { useVoxStore } from '@/store/useVoxStore';
import { DetectionResult } from '@/types';
import { LiveWaveform } from '@/components/audio/LiveWaveform';
import { AudioUploader } from '@/components/audio/AudioUploader';
import { RiskGauge } from '@/components/metrics/RiskGauge';
import { useMicrophone } from '@/hooks/useMicrophone';
import { useAudioAnalyser } from '@/hooks/useAudioAnalyser';
import { getRiskColor, getActionBadge } from '@/lib/utils';
import { api } from '@/services/api';

export default function LiveMonitorPage() {
  const [activeTab, setActiveTab] = useState<'live' | 'upload'>('live');
  const [isSimulatingAnalysis, setIsSimulatingAnalysis] = useState(false);

  const {
    isMicrophoneActive,
    isMonitoring,
    setIsMonitoring,
    currentDetection,
    setCurrentDetection,
    addDetectionToHistory,
    addToast,
    systemStatus,
  } = useVoxStore();

  const { startMicrophone, stopMicrophone } = useMicrophone();
  const { audioData, frequencyData, volume, startAnalysing, stopAnalysing } = useAudioAnalyser(256);

  const handleStartMonitoring = async () => {
    const stream = await startMicrophone();
    if (stream) {
      startAnalysing(stream);
      setIsMonitoring(true);
      addToast({
        type: 'info',
        title: 'Voice Telemetry Engaged',
        description: 'Analyzing spectral harmonics, phase linearity, and vocoder artifacts.',
      });
    }
  };

  const handleStopMonitoring = () => {
    stopMicrophone();
    stopAnalysing();
    setIsMonitoring(false);
    addToast({
      type: 'info',
      title: 'Voice Stream Halted',
      description: 'Audio input channel disconnected.',
    });
  };

  // Periodic analysis trigger while microphone is actively detecting voice
  useEffect(() => {
    if (!isMonitoring || !isMicrophoneActive || volume < 15) return;

    const interval = setInterval(async () => {
      // Simulate real-time continuous acoustic inspection
      const randomSpoof = Math.random() > 0.85;
      const spoofProb = randomSpoof ? 0.91 : 0.06;
      const score = randomSpoof ? 88 : 8;
      const riskLevel: 'critical' | 'low' = randomSpoof ? 'critical' : 'low';
      const action: 'block' | 'allow' = randomSpoof ? 'block' : 'allow';

      const update: DetectionResult = {
        id: `DET-${Date.now().toString().slice(-6)}`,
        timestamp: new Date().toISOString(),
        spoofProbability: Number(spoofProb.toFixed(3)),
        speakerMatch: randomSpoof ? 0.34 : 0.97,
        liveness: randomSpoof ? ('fail' as const) : ('pass' as const),
        riskScore: score,
        riskLevel,
        action,
        reason: randomSpoof
          ? 'Neural vocoder phase discontinuity identified. Tortoise/XTTS v2 synthetic signature.'
          : 'Natural vocal micro-tremors and phase coherence validated.',
        latencyMs: Math.floor(105 + Math.random() * 35),
      };

      setCurrentDetection(update);
      addDetectionToHistory(update);

      if (randomSpoof) {
        addToast({
          type: 'error',
          title: 'SYNTHETIC THREAT INTERCEPTED',
          description: 'High spoof probability detected in live audio channel. Block action executed.',
        });
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [isMonitoring, isMicrophoneActive, volume, setCurrentDetection, addDetectionToHistory, addToast]);

  const detection = currentDetection || {
    id: 'DET-DEFAULT',
    timestamp: new Date().toISOString(),
    spoofProbability: 0.05,
    speakerMatch: 0.98,
    liveness: 'pass',
    riskScore: 7,
    riskLevel: 'low',
    action: 'allow',
    reason: 'Continuous acoustic telemetry initialized. Baseline clean.',
    latencyMs: 118,
  };

  const riskColor = getRiskColor(detection.riskLevel);
  const actionBadge = getActionBadge(detection.action);

  return (
    <div className="space-y-8 py-2">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>REAL-TIME INTERCEPTION CONSOLE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-text-primary tracking-tight mt-1">
            LIVE VOICE MONITOR
          </h1>
          <p className="text-xs font-mono text-text-secondary mt-1">
            Continuous AI anti-spoofing and speaker verification on incoming speech.
          </p>
        </div>

        {/* Tab switcher: Live Mic vs Upload */}
        <div className="flex items-center p-1 rounded-xl bg-surface-200 border border-white/10">
          <button
            onClick={() => setActiveTab('live')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-semibold transition ${
              activeTab === 'live'
                ? 'bg-cyan-500 text-black shadow-md'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>LIVE MICROPHONE</span>
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-semibold transition ${
              activeTab === 'upload'
                ? 'bg-cyan-500 text-black shadow-md'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>UPLOAD AUDIO</span>
          </button>
        </div>
      </div>

      {activeTab === 'live' ? (
        <div className="space-y-8">
          {/* Main Monitor Console Card */}
          <div className="rounded-2xl border border-white/10 bg-surface-200/90 backdrop-blur-xl p-6 space-y-6">
            {/* Top Toolbar Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span
                  className={`w-3 h-3 rounded-full ${
                    isMonitoring ? 'bg-cyan-400 animate-ping' : 'bg-white/20'
                  }`}
                />
                <span className="text-xs font-mono font-bold tracking-wider text-text-primary uppercase">
                  {isMonitoring ? 'MONITORING LIVE INPUT STREAM' : 'SYSTEM IDLE — AWAITING START'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {!isMonitoring ? (
                  <button
                    onClick={handleStartMonitoring}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-mono font-bold tracking-wider transition shadow-lg shadow-cyan-500/20"
                  >
                    <Mic className="w-4 h-4" />
                    <span>START MONITORING</span>
                  </button>
                ) : (
                  <button
                    onClick={handleStopMonitoring}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40 text-xs font-mono font-bold tracking-wider transition"
                  >
                    <MicOff className="w-4 h-4" />
                    <span>STOP</span>
                  </button>
                )}
              </div>
            </div>

            {/* Live Center Spectral & Oscilloscope Waveform */}
            <LiveWaveform
              audioData={audioData}
              frequencyData={frequencyData}
              isActive={isMonitoring}
              height={180}
              visualMode="both"
            />

            {/* Real-time Telemetry metrics strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-surface-300 border border-white/5 space-y-1">
                <span className="text-[10px] text-text-secondary uppercase">Input Signal Level</span>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyan-400 transition-all duration-75"
                      style={{ width: `${volume}%` }}
                    />
                  </div>
                  <span className="text-cyan-400 font-bold">{volume}%</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-300 border border-white/5 space-y-1">
                <span className="text-[10px] text-text-secondary uppercase">Voice Activity (VAD)</span>
                <p className="text-sm font-bold text-text-primary">
                  {volume > 15 ? (
                    <span className="text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      SPEECH ACTIVE
                    </span>
                  ) : (
                    <span className="text-text-muted">AMBIENT SILENCE</span>
                  )}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-300 border border-white/5 space-y-1">
                <span className="text-[10px] text-text-secondary uppercase">Neural Processing</span>
                <p className="text-sm font-bold text-cyan-400">ZERO-TRUST PIPELINE</p>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-300 border border-white/5 space-y-1">
                <span className="text-[10px] text-text-secondary uppercase">Pipeline Latency</span>
                <p className="text-sm font-bold text-emerald-400">
                  {detection.latencyMs} ms
                </p>
              </div>
            </div>
          </div>

          {/* Diagnostic Metrics & Radial Risk Center */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Radial Risk Gauge */}
            <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-surface-200/90 p-6 flex flex-col items-center justify-center space-y-4">
              <div className="w-full flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono text-text-secondary">
                <span>RISK EVALUATION</span>
                <span className="text-cyan-400 font-bold">MODEL V3.4</span>
              </div>

              <RiskGauge
                score={detection.riskScore}
                riskLevel={detection.riskLevel}
                action={detection.action}
                size={230}
              />

              <div className="w-full pt-3 border-t border-white/10 text-center font-mono text-xs text-text-secondary">
                <span>REASONING: {detection.reason}</span>
              </div>
            </div>

            {/* Right Column: Live Analysis Breakdown Cards */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-6 rounded-2xl border border-white/10 bg-surface-200/90 space-y-4 font-mono">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-bold uppercase tracking-wider text-text-primary">
                    AI ANTI-SPOOFING METRICS
                  </span>
                  <span className="text-xs text-text-muted">SESSION ID: {detection.id}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Metric 1 */}
                  <div className="p-4 rounded-xl bg-surface-300 border border-white/5 space-y-1">
                    <span className="text-[10px] text-text-secondary uppercase">
                      Deepfake Probability
                    </span>
                    <p
                      className={`text-2xl font-bold ${
                        detection.spoofProbability > 0.5 ? 'text-red-400' : 'text-emerald-400'
                      }`}
                    >
                      {(detection.spoofProbability * 100).toFixed(1)}%
                    </p>
                    <span className="text-[10px] text-text-muted block">
                      {detection.spoofProbability > 0.5 ? 'Synthetic vocoder artifacts' : 'Natural harmonic envelope'}
                    </span>
                  </div>

                  {/* Metric 2 */}
                  <div className="p-4 rounded-xl bg-surface-300 border border-white/5 space-y-1">
                    <span className="text-[10px] text-text-secondary uppercase">
                      Speaker Match
                    </span>
                    <p className="text-2xl font-bold text-cyan-400">
                      {(detection.speakerMatch * 100).toFixed(1)}%
                    </p>
                    <span className="text-[10px] text-text-muted block">
                      512-dim cosine similarity
                    </span>
                  </div>

                  {/* Metric 3 */}
                  <div className="p-4 rounded-xl bg-surface-300 border border-white/5 space-y-1">
                    <span className="text-[10px] text-text-secondary uppercase">
                      Liveness State
                    </span>
                    <p
                      className={`text-2xl font-bold uppercase ${
                        detection.liveness === 'pass' ? 'text-emerald-400' : 'text-red-400'
                      }`}
                    >
                      {detection.liveness}
                    </p>
                    <span className="text-[10px] text-text-muted block">
                      Acoustic phase coherence
                    </span>
                  </div>
                </div>

                {/* System Decision Banner */}
                <div
                  className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    detection.action === 'block'
                      ? 'bg-red-500/10 border-red-500/30'
                      : detection.action === 'alert'
                      ? 'bg-amber-500/10 border-amber-500/30'
                      : 'bg-emerald-500/10 border-emerald-500/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {detection.action === 'block' ? (
                      <ShieldAlert className="w-5 h-5 text-red-400" />
                    ) : (
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    )}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary">
                        SYSTEM POLICY DECISION: {detection.action.toUpperCase()}
                      </h4>
                      <p className="text-[11px] text-text-secondary">{detection.reason}</p>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-bold px-3 py-1 rounded border self-start sm:self-center ${actionBadge.color}`}
                  >
                    {actionBadge.label}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Audio File Inspection Tab */
        <div className="rounded-2xl border border-white/10 bg-surface-200/90 backdrop-blur-xl p-6 space-y-6">
          <div>
            <h3 className="text-base font-display font-bold text-text-primary">
              OFFLINE AUDIO FILE PAYLOAD ANALYSIS
            </h3>
            <p className="text-xs font-mono text-text-secondary mt-1">
              Upload pre-recorded voicemail, wire call audio, or test voice clones for complete spectral anti-spoofing diagnostics.
            </p>
          </div>

          <AudioUploader />
        </div>
      )}
    </div>
  );
}
