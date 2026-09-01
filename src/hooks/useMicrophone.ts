import { useState, useCallback, useRef } from 'react';
import { useVoxStore } from '@/store/useVoxStore';

export function useMicrophone() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRequesting, setIsRequesting] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);
  
  const { setMicrophoneActive, addToast } = useVoxStore();

  const startMicrophone = useCallback(async (): Promise<MediaStream | null> => {
    setIsRequesting(true);
    setError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Web Audio mediaDevices API is not supported in this environment.');
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: false, // keep raw harmonics for spoof detection
          autoGainControl: false,
          sampleRate: 48000,
        },
        video: false,
      });

      streamRef.current = mediaStream;
      setStream(mediaStream);
      setMicrophoneActive(true);
      setIsRequesting(false);
      
      addToast({
        type: 'success',
        title: 'Microphone Engaged',
        description: 'Real-time high-fidelity voice telemetry stream active.',
      });

      return mediaStream;
    } catch (err: unknown) {
      setIsRequesting(false);
      const errMsg = err instanceof Error ? err.message : 'Microphone permission denied or device unavailable';
      setError(errMsg);
      setMicrophoneActive(false);
      
      addToast({
        type: 'error',
        title: 'Microphone Inaccessible',
        description: 'Please grant microphone permissions to enable real-time detection.',
      });
      return null;
    }
  }, [setMicrophoneActive, addToast]);

  const stopMicrophone = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setStream(null);
    setMicrophoneActive(false);
  }, [setMicrophoneActive]);

  return {
    stream,
    error,
    isRequesting,
    startMicrophone,
    stopMicrophone,
  };
}
