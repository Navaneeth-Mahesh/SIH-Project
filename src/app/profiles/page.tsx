'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Mic, 
  MicOff, 
  Trash2, 
  Search, 
  CheckCircle2, 
  ShieldCheck, 
  Activity, 
  Fingerprint,
  Square,
  Sparkles
} from 'lucide-react';
import { useVoxStore } from '@/store/useVoxStore';
import { LiveWaveform } from '@/components/audio/LiveWaveform';
import { useMicrophone } from '@/hooks/useMicrophone';
import { useAudioAnalyser } from '@/hooks/useAudioAnalyser';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { VoiceProfile } from '@/types';

export default function VoiceProfilesPage() {
  const { profiles, addProfile, deleteProfile, addToast } = useVoxStore();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');
  const [isRecordingSample, setIsRecordingSample] = useState(false);

  const { startMicrophone, stopMicrophone } = useMicrophone();
  const { audioData, frequencyData, startAnalysing, stopAnalysing } = useAudioAnalyser(256);
  const { isRecording, recordingDuration, audioBlob, startRecording, stopRecording, resetRecording } = useAudioRecorder();

  const filteredProfiles = profiles.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.role.toLowerCase().includes(search.toLowerCase()) ||
      p.department.toLowerCase().includes(search.toLowerCase())
  );

  const handleStartRecordingProfile = async () => {
    const stream = await startMicrophone();
    if (stream) {
      startAnalysing(stream);
      startRecording(stream);
      setIsRecordingSample(true);
    }
  };

  const handleStopRecordingProfile = () => {
    stopRecording();
    stopMicrophone();
    stopAnalysing();
    setIsRecordingSample(false);
    addToast({
      type: 'info',
      title: 'Voice Sample Captured',
      description: `${recordingDuration}s acoustic biometric vector synthesized.`,
    });
  };

  const handleCreateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role) {
      addToast({
        type: 'error',
        title: 'Missing Required Fields',
        description: 'Please specify the full name and organizational role.',
      });
      return;
    }

    addProfile({
      name,
      role,
      department: department || 'Operations',
      sampleDurationSec: recordingDuration || 10.5,
      confidenceScore: 0.975,
      embeddingVectorLength: 512,
      status: 'enrolled',
      biometricId: `BIO-VX-${Math.floor(1000 + Math.random() * 9000)}-${name.slice(0, 2).toUpperCase()}`,
    });

    // Reset Form
    setName('');
    setRole('');
    setDepartment('');
    resetRecording();
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 py-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>BIOMETRIC ENROLLMENT VAULT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-text-primary tracking-tight mt-1">
            TRUSTED VOICE PROFILES
          </h1>
          <p className="text-xs font-mono text-text-secondary mt-1">
            Enrolled acoustic voiceprints and neural embedding signatures for executive identity verification.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-mono font-bold tracking-wider transition shadow-lg shadow-cyan-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>ENROLL NEW IDENTITY</span>
        </button>
      </div>

      {/* Search Filter */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search enrolled profiles by name or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-200 border border-white/10 text-xs font-mono text-text-primary placeholder:text-text-muted focus:outline-none focus:border-cyan-500/50 transition"
        />
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProfiles.map((p) => (
          <div
            key={p.id}
            className="p-5 rounded-2xl border border-white/10 bg-surface-200/90 hover:border-cyan-500/30 transition space-y-4 font-mono flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Fingerprint className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] text-text-muted">{p.biometricId}</span>
                </div>

                <button
                  onClick={() => deleteProfile(p.id)}
                  className="text-text-muted hover:text-red-400 p-1 transition"
                  title="Remove Profile"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div>
                <h3 className="text-base font-bold font-display text-text-primary">{p.name}</h3>
                <p className="text-xs text-cyan-400">{p.role}</p>
                <p className="text-[11px] text-text-secondary">{p.department}</p>
              </div>
            </div>

            {/* Profile biometrics strip */}
            <div className="pt-3 border-t border-white/5 space-y-2">
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="bg-surface-300 p-2 rounded">
                  <span className="text-[9px] text-text-secondary uppercase block">Acoustic Match</span>
                  <span className="font-bold text-emerald-400">
                    {(p.confidenceScore * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="bg-surface-300 p-2 rounded">
                  <span className="text-[9px] text-text-secondary uppercase block">Embedding</span>
                  <span className="font-bold text-text-primary">{p.embeddingVectorLength}-D</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-text-muted">
                <span>Sample: {p.sampleDurationSec}s</span>
                <span className="text-emerald-400 uppercase font-semibold">● {p.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Enrolling New Profile */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl border border-white/15 bg-surface-200 p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono">
              <div className="flex items-center gap-2 text-cyan-400">
                <Fingerprint className="w-5 h-5" />
                <h3 className="text-sm font-bold uppercase">ENROLL BIOMETRIC VOICE IDENTITY</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-text-muted hover:text-text-primary"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProfile} className="space-y-4 font-mono text-xs">
              <div className="space-y-1">
                <label className="text-text-secondary block">FULL NAME</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Alex Mercer"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-surface-300 border border-white/10 text-text-primary focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-text-secondary block">ORGANIZATIONAL ROLE</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. VP of Global Treasury"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-surface-300 border border-white/10 text-text-primary focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-text-secondary block">DEPARTMENT</label>
                <input
                  type="text"
                  placeholder="e.g. Finance & Authorization"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-surface-300 border border-white/10 text-text-primary focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              {/* Voice Sample Capture Section */}
              <div className="p-4 rounded-xl border border-white/10 bg-surface-300 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary font-bold">ACOUSTIC SAMPLE (10s)</span>
                  {isRecording && (
                    <span className="text-red-400 animate-pulse">RECORDING: 00:{recordingDuration}s</span>
                  )}
                </div>

                <LiveWaveform
                  audioData={audioData}
                  frequencyData={frequencyData}
                  isActive={isRecording}
                  height={80}
                  visualMode="both"
                />

                <div className="flex justify-center">
                  {!isRecording ? (
                    <button
                      type="button"
                      onClick={handleStartRecordingProfile}
                      className="px-4 py-2 rounded-lg bg-surface-100 hover:bg-surface-50 text-cyan-400 border border-cyan-500/30 flex items-center gap-2"
                    >
                      <Mic className="w-4 h-4" />
                      <span>{recordingDuration > 0 ? 'RE-RECORD SAMPLE' : 'RECORD VOICEPRINT'}</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleStopRecordingProfile}
                      className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 border border-red-500/40 flex items-center gap-2"
                    >
                      <Square className="w-4 h-4" />
                      <span>STOP & SAVE SAMPLE</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-surface-300 hover:bg-surface-100 text-text-secondary"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold"
                >
                  SAVE & ENROLL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
