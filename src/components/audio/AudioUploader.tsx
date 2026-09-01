'use client';

import React, { useState, useRef } from 'react';
import { Upload, Play, Pause, RefreshCw, FileAudio, CheckCircle2, AlertTriangle, XCircle, ShieldCheck } from 'lucide-react';
import { api } from '@/services/api';
import { useVoxStore } from '@/store/useVoxStore';
import { DetectionResult } from '@/types';
import { formatTime, getRiskColor, getActionBadge } from '@/lib/utils';
import { LiveWaveform } from './LiveWaveform';
import { useAudioAnalyser } from '@/hooks/useAudioAnalyser';

export const AudioUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [localResult, setLocalResult] = useState<DetectionResult | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { setCurrentDetection, addDetectionToHistory, addToast } = useVoxStore();
  const { audioData, frequencyData, startAnalysing, stopAnalysing, isAnalysing } = useAudioAnalyser(256);

  const handleFile = (selectedFile: File) => {
    const validExtensions = ['audio/wav', 'audio/mpeg', 'audio/mp3', 'audio/ogg', 'audio/x-m4a', 'audio/mp4'];
    if (!validExtensions.some((ext) => selectedFile.type.includes(ext)) && 
        !['.wav', '.mp3', '.m4a', '.ogg'].some((ext) => selectedFile.name.toLowerCase().endsWith(ext))) {
      addToast({
        type: 'error',
        title: 'Unsupported Audio Format',
        description: 'Please provide a valid .wav, .mp3, .m4a, or .ogg file.',
      });
      return;
    }

    if (audioUrl) URL.revokeObjectURL(audioUrl);
    const url = URL.createObjectURL(selectedFile);
    setFile(selectedFile);
    setAudioUrl(url);
    setLocalResult(null);
    setIsPlaying(false);
    setCurrentTime(0);

    addToast({
      type: 'info',
      title: 'Audio File Loaded',
      description: `${selectedFile.name} (${(selectedFile.size / 1024 / 1024).toFixed(2)} MB)`,
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current || !audioUrl) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      stopAnalysing();
    } else {
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
      if (!isAnalysing) {
        startAnalysing(audioRef.current);
      }
    }
  };

  const runAnalysis = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    try {
      const result = await api.analyzeAudio(file);
      setLocalResult(result);
      setCurrentDetection(result);
      addDetectionToHistory(result);

      addToast({
        type: result.riskLevel === 'critical' ? 'error' : result.riskLevel === 'high' ? 'warning' : 'success',
        title: `Analysis Complete: ${result.action.toUpperCase()}`,
        description: `Deepfake probability: ${(result.spoofProbability * 100).toFixed(1)}% | Risk: ${result.riskScore}/100`,
      });
    } catch {
      addToast({
        type: 'error',
        title: 'Analysis Failed',
        description: 'Unable to evaluate acoustic payload.',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".wav,.mp3,.m4a,.ogg,audio/*"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />

      {/* Hidden Audio Tag for playback */}
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          crossOrigin="anonymous"
          onTimeUpdate={(e) => setCurrentTime((e.target as HTMLAudioElement).currentTime)}
          onLoadedMetadata={(e) => setDuration((e.target as HTMLAudioElement).duration)}
          onEnded={() => {
            setIsPlaying(false);
            stopAnalysing();
          }}
        />
      )}

      {/* Drag and drop zone */}
      {!file ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-200 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer text-center group"
        >
          <div className="w-14 h-14 rounded-full bg-surface-100 border border-white/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Upload className="w-6 h-6 text-cyan-400" />
          </div>
          <p className="text-sm font-medium text-text-primary mb-1">
            Drag and drop recorded voice sample or <span className="text-cyan-400 underline">browse files</span>
          </p>
          <p className="text-xs text-text-secondary font-mono">
            Supported formats: WAV, MP3, M4A, OGG (Max 25MB)
          </p>
        </div>
      ) : (
        <div className="bg-surface-200 border border-white/10 rounded-xl p-5 space-y-4">
          {/* File header bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <FileAudio className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-text-primary truncate max-w-xs">{file.name}</h4>
                <p className="text-xs text-text-secondary font-mono">
                  {(file.size / 1024 / 1024).toFixed(2)} MB • {formatTime(duration)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 text-xs font-mono rounded border border-white/10 hover:bg-white/5 text-text-secondary transition"
              >
                REPLACE FILE
              </button>
              <button
                onClick={runAnalysis}
                disabled={isAnalyzing}
                className="px-4 py-1.5 text-xs font-mono font-bold tracking-wider rounded bg-cyan-500 hover:bg-cyan-400 text-black transition flex items-center gap-2 disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ANALYZING...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5" />
                    INSPECT VOICEPRINT
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Interactive Player Controls & Live Waveform */}
          <div className="space-y-2">
            <LiveWaveform
              audioData={audioData}
              frequencyData={frequencyData}
              isActive={isPlaying}
              height={100}
              visualMode="both"
            />

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-cyan-500 hover:text-black flex items-center justify-center text-text-primary transition"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>

              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  if (audioRef.current) audioRef.current.currentTime = val;
                  setCurrentTime(val);
                }}
                className="flex-1 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />

              <span className="text-xs font-mono text-text-secondary min-w-[70px] text-right">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Detection Result readout if inspected */}
          {localResult && (
            <div className="pt-3 border-t border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-text-secondary">
                  DETECTION DIAGNOSTIC RESULT
                </span>
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                    getActionBadge(localResult.action).color
                  }`}
                >
                  ACTION: {localResult.action.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="bg-surface-300 p-2.5 rounded border border-white/5">
                  <span className="text-[10px] font-mono text-text-secondary uppercase">Deepfake Prob</span>
                  <p className={`text-base font-mono font-bold ${localResult.spoofProbability > 0.5 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {(localResult.spoofProbability * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="bg-surface-300 p-2.5 rounded border border-white/5">
                  <span className="text-[10px] font-mono text-text-secondary uppercase">Speaker Match</span>
                  <p className="text-base font-mono font-bold text-cyan-400">
                    {(localResult.speakerMatch * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="bg-surface-300 p-2.5 rounded border border-white/5">
                  <span className="text-[10px] font-mono text-text-secondary uppercase">Liveness</span>
                  <p className={`text-base font-mono font-bold uppercase ${localResult.liveness === 'pass' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {localResult.liveness}
                  </p>
                </div>
                <div className="bg-surface-300 p-2.5 rounded border border-white/5">
                  <span className="text-[10px] font-mono text-text-secondary uppercase">Risk Score</span>
                  <p className={`text-base font-mono font-bold ${getRiskColor(localResult.riskLevel).text}`}>
                    {localResult.riskScore} / 100
                  </p>
                </div>
              </div>

              <div className="text-xs font-mono text-text-secondary bg-surface-300/60 p-2.5 rounded border border-white/5 flex items-start gap-2">
                {localResult.action === 'block' ? (
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                ) : localResult.action === 'alert' ? (
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                )}
                <span>{localResult.reason}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
