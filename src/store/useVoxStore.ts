import { create } from 'zustand';
import { DetectionResult, SecurityIncident, VoiceProfile, SystemSettings, RiskLevel } from '@/types';
import { INITIAL_VOICE_PROFILES, INITIAL_THREAT_INCIDENTS } from '@/services/mockApi';

export interface ToastMessage {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  description?: string;
  timestamp: number;
}

interface VoxShieldState {
  // Engine & System state
  systemStatus: 'protected' | 'analyzing' | 'threat_detected' | 'idle';
  isMicrophoneActive: boolean;
  isMonitoring: boolean;
  activeInputLevel: number; // 0 - 100
  detectionEngineStatus: 'active' | 'standby' | 'calibrating';
  
  // Real-time detection state
  currentDetection: DetectionResult | null;
  detectionHistory: DetectionResult[];
  
  // Incidents / Threats
  threats: SecurityIncident[];
  selectedThreatId: string | null;
  threatFilter: {
    search: string;
    riskLevel: RiskLevel | 'all';
    status: string | 'all';
  };

  // Voice Profiles
  profiles: VoiceProfile[];
  selectedProfileId: string | null;

  // Global Settings
  settings: SystemSettings;

  // UI & Command Palette & Toast
  isCommandPaletteOpen: boolean;
  toasts: ToastMessage[];

  // Actions
  setSystemStatus: (status: 'protected' | 'analyzing' | 'threat_detected' | 'idle') => void;
  setMicrophoneActive: (active: boolean) => void;
  setIsMonitoring: (monitoring: boolean) => void;
  setInputLevel: (level: number) => void;
  setCurrentDetection: (detection: DetectionResult | null) => void;
  addDetectionToHistory: (detection: DetectionResult) => void;
  
  // Threat Actions
  setSelectedThreatId: (id: string | null) => void;
  setThreatFilter: (filter: Partial<VoxShieldState['threatFilter']>) => void;
  updateThreatStatus: (id: string, status: SecurityIncident['status']) => void;
  dismissThreat: (id: string) => void;

  // Profile Actions
  addProfile: (profile: Omit<VoiceProfile, 'id' | 'createdAt'>) => void;
  deleteProfile: (id: string) => void;
  updateProfile: (id: string, updates: Partial<VoiceProfile>) => void;
  setSelectedProfileId: (id: string | null) => void;

  // Settings Actions
  updateSettings: (updates: Partial<SystemSettings>) => void;

  // UI Actions
  setCommandPaletteOpen: (open: boolean) => void;
  addToast: (toast: Omit<ToastMessage, 'id' | 'timestamp'>) => void;
  removeToast: (id: string) => void;
}

const DEFAULT_SETTINGS: SystemSettings = {
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

export const useVoxStore = create<VoxShieldState>((set, get) => ({
  systemStatus: 'protected',
  isMicrophoneActive: false,
  isMonitoring: false,
  activeInputLevel: 0,
  detectionEngineStatus: 'active',
  
  currentDetection: {
    id: 'DET-INIT',
    timestamp: new Date().toISOString(),
    spoofProbability: 0.04,
    speakerMatch: 0.98,
    liveness: 'pass',
    riskScore: 6,
    riskLevel: 'low',
    action: 'allow',
    reason: 'Continuous acoustic telemetry initialized. Background noise baseline clean.',
    latencyMs: 115,
  },
  detectionHistory: [],

  threats: INITIAL_THREAT_INCIDENTS,
  selectedThreatId: null,
  threatFilter: {
    search: '',
    riskLevel: 'all',
    status: 'all',
  },

  profiles: INITIAL_VOICE_PROFILES,
  selectedProfileId: null,

  settings: (() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('voxshield_settings');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error('Failed reading settings from localStorage:', e);
      }
    }
    return DEFAULT_SETTINGS;
  })(),

  isCommandPaletteOpen: false,
  toasts: [],

  setSystemStatus: (status) => set({ systemStatus: status }),
  setMicrophoneActive: (active) => set({ isMicrophoneActive: active }),
  setIsMonitoring: (monitoring) => set({ isMonitoring: monitoring }),
  setInputLevel: (level) => set({ activeInputLevel: level }),
  
  setCurrentDetection: (detection) => {
    set({ currentDetection: detection });
    if (detection && detection.riskLevel === 'critical') {
      set({ systemStatus: 'threat_detected' });
    } else if (detection && detection.riskLevel === 'high') {
      set({ systemStatus: 'threat_detected' });
    }
  },

  addDetectionToHistory: (detection) =>
    set((state) => ({
      detectionHistory: [detection, ...state.detectionHistory.slice(0, 49)],
    })),

  setSelectedThreatId: (id) => set({ selectedThreatId: id }),
  setThreatFilter: (filter) =>
    set((state) => ({ threatFilter: { ...state.threatFilter, ...filter } })),

  updateThreatStatus: (id, status) =>
    set((state) => ({
      threats: state.threats.map((t) => (t.id === id ? { ...t, status } : t)),
    })),

  dismissThreat: (id) =>
    set((state) => ({
      threats: state.threats.filter((t) => t.id !== id),
      selectedThreatId: state.selectedThreatId === id ? null : state.selectedThreatId,
    })),

  addProfile: (profileData) => {
    const newProfile: VoiceProfile = {
      ...profileData,
      id: `prof-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ profiles: [newProfile, ...state.profiles] }));
    get().addToast({
      type: 'success',
      title: 'Voice Profile Enrolled',
      description: `${newProfile.name} biometric profile successfully registered.`,
    });
  },

  deleteProfile: (id) => {
    const profile = get().profiles.find((p) => p.id === id);
    set((state) => ({
      profiles: state.profiles.filter((p) => p.id !== id),
      selectedProfileId: state.selectedProfileId === id ? null : state.selectedProfileId,
    }));
    get().addToast({
      type: 'info',
      title: 'Profile Removed',
      description: `${profile?.name || 'Profile'} was deleted from voice security database.`,
    });
  },

  updateProfile: (id, updates) =>
    set((state) => ({
      profiles: state.profiles.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })),

  setSelectedProfileId: (id) => set({ selectedProfileId: id }),

  updateSettings: (updates) => {
    set((state) => {
      const newSettings = { ...state.settings, ...updates };
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('voxshield_settings', JSON.stringify(newSettings));
        } catch (e) {
          console.error('Failed saving settings:', e);
        }
      }
      return { settings: newSettings };
    });
    get().addToast({
      type: 'success',
      title: 'Settings Synchronized',
      description: 'Security rules and parameters updated.',
    });
  },

  setCommandPaletteOpen: (open) => set({ isCommandPaletteOpen: open }),

  addToast: (toast) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastMessage = { ...toast, id, timestamp: Date.now() };
    set((state) => ({ toasts: [...state.toasts, newToast] }));
    setTimeout(() => {
      get().removeToast(id);
    }, 4500);
  },

  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
