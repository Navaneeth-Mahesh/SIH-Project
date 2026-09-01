import { useEffect, useRef, useState, useCallback } from 'react';

interface AudioAnalyserHook {
  audioData: Uint8Array;
  frequencyData: Uint8Array;
  volume: number; // 0 - 100
  startAnalysing: (streamOrElement: MediaStream | HTMLAudioElement) => void;
  stopAnalysing: () => void;
  isAnalysing: boolean;
}

export function useAudioAnalyser(fftSize: number = 256): AudioAnalyserHook {
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [volume, setVolume] = useState(0);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | MediaElementAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  
  const timeDataRef = useRef<Uint8Array>(new Uint8Array(fftSize / 2));
  const freqDataRef = useRef<Uint8Array>(new Uint8Array(fftSize / 2));

  const updateAudioMetrics = useCallback(() => {
    if (!analyserRef.current) return;

    analyserRef.current.getByteTimeDomainData(timeDataRef.current as any);
    analyserRef.current.getByteFrequencyData(freqDataRef.current as any);

    // Calculate RMS volume level
    let sum = 0;
    for (let i = 0; i < timeDataRef.current.length; i++) {
      const normalized = (timeDataRef.current[i] - 128) / 128;
      sum += normalized * normalized;
    }
    const rms = Math.sqrt(sum / timeDataRef.current.length);
    const calculatedVolume = Math.min(100, Math.round(rms * 250));
    setVolume(calculatedVolume);

    animationFrameRef.current = requestAnimationFrame(updateAudioMetrics);
  }, []);

  const startAnalysing = useCallback(
    (streamOrElement: MediaStream | HTMLAudioElement) => {
      try {
        if (!audioContextRef.current) {
          const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          audioContextRef.current = new AudioContextClass();
        }

        if (audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume();
        }

        const analyser = audioContextRef.current.createAnalyser();
        analyser.fftSize = fftSize;
        analyser.smoothingTimeConstant = 0.8;
        analyserRef.current = analyser;

        timeDataRef.current = new Uint8Array(analyser.frequencyBinCount);
        freqDataRef.current = new Uint8Array(analyser.frequencyBinCount);

        if (streamOrElement instanceof MediaStream) {
          sourceRef.current = audioContextRef.current.createMediaStreamSource(streamOrElement);
          sourceRef.current.connect(analyser);
        } else if (streamOrElement instanceof HTMLAudioElement) {
          sourceRef.current = audioContextRef.current.createMediaElementSource(streamOrElement);
          sourceRef.current.connect(analyser);
          analyser.connect(audioContextRef.current.destination);
        }

        setIsAnalysing(true);
        animationFrameRef.current = requestAnimationFrame(updateAudioMetrics);
      } catch (err) {
        console.error('Error starting audio analyser:', err);
      }
    },
    [fftSize, updateAudioMetrics]
  );

  const stopAnalysing = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (sourceRef.current) {
      try {
        sourceRef.current.disconnect();
      } catch {
        // ignore
      }
      sourceRef.current = null;
    }
    setIsAnalysing(false);
    setVolume(0);
  }, []);

  useEffect(() => {
    return () => {
      stopAnalysing();
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, [stopAnalysing]);

  return {
    audioData: timeDataRef.current,
    frequencyData: freqDataRef.current,
    volume,
    startAnalysing,
    stopAnalysing,
    isAnalysing,
  };
}
