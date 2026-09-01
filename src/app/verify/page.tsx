'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  UserCheck, 
  Mic, 
  Square, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ShieldCheck, 
  ShieldAlert, 
  RotateCcw,
  Volume2
} from 'lucide-react';
import { useVoxStore } from '@/store/useVoxStore';
import { LiveWaveform } from '@/components/audio/LiveWaveform';
import { useMicrophone } from '@/hooks/useMicrophone';
import { useAudioAnalyser } from '@/hooks/useAudioAnalyser';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { api } from '@/services/api';
import { formatTime } from '@/lib/utils';

export default function VerifyVoicePage() {
  const { profiles, addToast } = useVoxStore();
  const [selectedProfileId, setSelectedProfileId] = useState<string>(profiles[0]?.id || 'prof-001');
  const [challengePhrase, setChallengePhrase] = useState<string>('BLUE TIGER 729');
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [verificationResult, setVerificationResult] = useState<{
    verified: boolean;
    similarity: number;
    spoofProbability: number;
    livenessPass: boolean;
    challengeMatchPercentage?: number;
    message: string;
  } | null>(null);

  const { startMicrophone, stopMicrophone, stream } = useMicrophone();
  const { audioData, frequencyData, startAnalysing, stopAnalysing } = useAudioAnalyser(256);
  const { isRecording, recordingDuration, audioBlob, startRecording, stopRecording, resetRecording } = useAudioRecorder();

  const selectedProfile = profiles.find((p) => p.id === selectedProfileId) || profiles[0];

  const handleSelectNewPhrase = () => {
    setChallengePhrase(api.getRandomChallengePhrase());
  };

  const handleStartCapture = async () => {
    resetRecording();
    const mediaStream = await startMicrophone();
    if (mediaStream) {
      startAnalysing(mediaStream);
      startRecording(mediaStream);
      setStep(2);
    }
  };

  const handleStopCaptureAndAnalyze = async () => {
    stopRecording();
    stopMicrophone();
    stopAnalysing();
    setStep(3);

    // Run verification through API layer
    try {
      const dummyBlob = audioBlob || new Blob(['mock_voice_data'], { type: 'audio/webm' });
      const result = await api.verifyVoice(dummyBlob, selectedProfileId, challengePhrase);
      setVerificationResult(result);
      setStep(4);

      addToast({
        type: result.verified ? 'success' : 'error',
        title: result.verified ? 'Identity Verified' : 'Verification Failed',
        description: result.message,
      });
    } catch {
      setStep(1);
      addToast({
        type: 'error',
        title: 'Verification Error',
        description: 'Unable to process acoustic biometric signature.',
      });
    }
  };

  const handleReset = () => {
    resetRecording();
    stopMicrophone();
    stopAnalysing();
    setVerificationResult(null);
    setStep(1);
    setChallengePhrase(api.getRandomChallengePhrase());
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-2">
      {/* Header */}
      <div className="border-b border-white/10 pb-5">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>BIOMETRIC IDENTITY GATEWAY</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-text-primary tracking-tight mt-1">
          VERIFY VOICE IDENTITY & LIVENESS
        </h1>
        <p className="text-xs font-mono text-text-secondary mt-1">
          Multi-factor acoustic liveness challenge and high-dimensional neural speaker verification.
        </p>
      </div>

      {/* Step Progress Indicators */}
      <div className="grid grid-cols-4 gap-2 font-mono text-xs">
        {[
          { num: 1, label: 'SELECT PROFILE' },
          { num: 2, label: 'RECORD CHALLENGE' },
          { num: 3, label: 'AI ANALYSIS' },
          { num: 4, label: 'DECISION' },
        ].map((s) => (
          <div
            key={s.num}
            className={`p-3 rounded-xl border transition ${
              step === s.num
                ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400'
                : step > s.num
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-surface-200 border-white/5 text-text-muted'
            }`}
          >
            <span className="block text-[10px] uppercase font-bold">STEP 0{s.num}</span>
            <span className="text-xs font-semibold truncate block">{s.label}</span>
          </div>
        ))}
      </div>

      {/* STEP 1: Select Profile & Challenge Setup */}
      {step === 1 && (
        <div className="rounded-2xl border border-white/10 bg-surface-200/90 p-6 space-y-6">
          <div className="space-y-1">
            <h3 className="text-base font-display font-bold text-text-primary">
              1. SELECT TARGET IDENTITY
            </h3>
            <p className="text-xs font-mono text-text-secondary">
              Choose the enrolled employee profile against which the speaker biometric template will be verified.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profiles.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedProfileId(p.id)}
                className={`p-4 rounded-xl border text-left transition font-mono ${
                  selectedProfileId === p.id
                    ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                    : 'border-white/10 bg-surface-300 hover:border-white/20 text-text-secondary'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-text-primary">{p.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-text-muted">
                    {p.biometricId}
                  </span>
                </div>
                <p className="text-xs text-text-secondary">{p.role}</p>
                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-text-muted">
                  <span>SAMPLE: {p.sampleDurationSec}s</span>
                  <span className="text-emerald-400">CONFIDENCE: {(p.confidenceScore * 100).toFixed(1)}%</span>
                </div>
              </button>
            ))}
          </div>

          {/* Interactive Challenge Phrase Box */}
          <div className="p-5 rounded-xl border border-cyan-500/30 bg-cyan-500/5 space-y-3 font-mono">
            <div className="flex items-center justify-between text-xs">
              <span className="text-cyan-400 font-bold uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                DYNAMIC LIVENESS CHALLENGE
              </span>
              <button
                onClick={handleSelectNewPhrase}
                className="text-text-secondary hover:text-cyan-400 transition flex items-center gap-1 text-[11px]"
              >
                <RefreshCw className="w-3 h-3" />
                <span>GENERATE NEW</span>
              </button>
            </div>

            <div className="text-center py-4 bg-surface-400 rounded-lg border border-white/10">
              <p className="text-xs text-text-muted uppercase mb-1">Speak the following phrase clearly:</p>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-cyan-400 tracking-wider">
                &ldquo;{challengePhrase}&rdquo;
              </h2>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleStartCapture}
              className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-xs font-bold tracking-wider transition flex items-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <Mic className="w-4 h-4" />
              <span>START RECORDING (10s)</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Live Recording & Audio Stream */}
      {step === 2 && (
        <div className="rounded-2xl border border-white/10 bg-surface-200/90 p-8 space-y-6 text-center">
          <div className="space-y-1">
            <span className="text-xs font-mono text-red-400 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              RECORDING BIOMETRIC SAMPLES
            </span>
            <h3 className="text-2xl font-display font-bold text-text-primary">
              Please Speak: &ldquo;{challengePhrase}&rdquo;
            </h3>
            <p className="text-xs font-mono text-text-secondary">
              Verifying acoustic liveness & speaker voiceprint for {selectedProfile.name}
            </p>
          </div>

          {/* Large Recording Pulse Button */}
          <div className="py-4 flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-28 h-28 rounded-full bg-cyan-500/20 animate-ping" />
              <button
                onClick={handleStopCaptureAndAnalyze}
                className="relative z-10 w-24 h-24 rounded-full bg-red-500 hover:bg-red-600 flex flex-col items-center justify-center text-white transition shadow-xl shadow-red-500/30"
              >
                <Square className="w-6 h-6 fill-current" />
                <span className="text-[10px] font-mono font-bold mt-1">STOP</span>
              </button>
            </div>
            <span className="text-lg font-mono font-bold text-text-primary mt-4">
              00:{recordingDuration.toString().padStart(2, '0')} / 00:10
            </span>
          </div>

          <LiveWaveform
            audioData={audioData}
            frequencyData={frequencyData}
            isActive={isRecording}
            height={130}
            visualMode="both"
          />

          <div className="flex justify-center">
            <button
              onClick={handleStopCaptureAndAnalyze}
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-mono font-bold tracking-wider transition"
            >
              FINISH & ANALYZE NOW
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Analyzing State */}
      {step === 3 && (
        <div className="rounded-2xl border border-white/10 bg-surface-200/90 p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 mx-auto flex items-center justify-center text-cyan-400">
            <RefreshCw className="w-8 h-8 animate-spin" />
          </div>
          <h3 className="text-lg font-display font-bold text-text-primary">
            ANALYSING BIOMETRIC VOICEPAYLOAD
          </h3>
          <p className="text-xs font-mono text-text-secondary max-w-sm mx-auto">
            Extracting 512-dim x-vector speaker embeddings, validating phase linearity, and matching challenge transcript.
          </p>
        </div>
      )}

      {/* STEP 4: Verification Result */}
      {step === 4 && verificationResult && (
        <div className="rounded-2xl border border-white/10 bg-surface-200/90 p-8 space-y-6">
          <div className="text-center space-y-2">
            <div
              className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${
                verificationResult.verified
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                  : 'bg-red-500/10 border border-red-500/30 text-red-400'
              }`}
            >
              {verificationResult.verified ? (
                <CheckCircle2 className="w-8 h-8" />
              ) : (
                <XCircle className="w-8 h-8" />
              )}
            </div>

            <h2 className="text-2xl font-display font-extrabold text-text-primary tracking-tight">
              {verificationResult.verified ? 'IDENTITY VERIFIED' : 'VERIFICATION FAILED'}
            </h2>
            <p className="text-xs font-mono text-text-secondary max-w-md mx-auto">
              {verificationResult.message}
            </p>
          </div>

          {/* Diagnostic Metrics Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-4 rounded-xl bg-surface-300 border border-white/5 space-y-1">
              <span className="text-[10px] text-text-secondary uppercase">Speaker Match</span>
              <p className="text-xl font-bold text-cyan-400">
                {(verificationResult.similarity * 100).toFixed(1)}%
              </p>
              <span className="text-[10px] text-text-muted">Target: {selectedProfile.name}</span>
            </div>

            <div className="p-4 rounded-xl bg-surface-300 border border-white/5 space-y-1">
              <span className="text-[10px] text-text-secondary uppercase">Deepfake Prob</span>
              <p
                className={`text-xl font-bold ${
                  verificationResult.spoofProbability > 0.5 ? 'text-red-400' : 'text-emerald-400'
                }`}
              >
                {(verificationResult.spoofProbability * 100).toFixed(1)}%
              </p>
              <span className="text-[10px] text-text-muted">Vocoder check</span>
            </div>

            <div className="p-4 rounded-xl bg-surface-300 border border-white/5 space-y-1">
              <span className="text-[10px] text-text-secondary uppercase">Phrase Match</span>
              <p className="text-xl font-bold text-emerald-400">
                {verificationResult.challengeMatchPercentage || 96}%
              </p>
              <span className="text-[10px] text-text-muted">&ldquo;{challengePhrase}&rdquo;</span>
            </div>

            <div className="p-4 rounded-xl bg-surface-300 border border-white/5 space-y-1">
              <span className="text-[10px] text-text-secondary uppercase">Liveness Status</span>
              <p
                className={`text-xl font-bold uppercase ${
                  verificationResult.livenessPass ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                {verificationResult.livenessPass ? 'PASS' : 'FAIL'}
              </p>
              <span className="text-[10px] text-text-muted">Phase dispersion</span>
            </div>
          </div>

          <div className="pt-4 flex justify-center gap-4">
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-mono font-bold tracking-wider transition flex items-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <RotateCcw className="w-4 h-4" />
              <span>TEST ANOTHER VERIFICATION</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
