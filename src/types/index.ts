export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type SecurityAction = 'allow' | 'verify' | 'alert' | 'block';
export type LivenessStatus = 'pass' | 'fail' | 'analyzing' | 'pending';
export type EngineStatus = 'active' | 'calibrating' | 'standby' | 'offline';

export interface DetectionResult {
  id: string;
  timestamp: string;
  spoofProbability: number; // 0 - 1
  speakerMatch: number; // 0 - 1
  liveness: LivenessStatus;
  livenessScore?: number; // 0 - 100
  replayLikelihood?: number; // 0 - 1
  spectralFlatness?: number;
  pitchAnomaly?: number;
  riskScore: number; // 0 - 100
  riskLevel: RiskLevel;
  action: SecurityAction;
  reason: string;
  matchedProfileId?: string;
  matchedProfileName?: string;
  audioDuration?: number;
  audioFileName?: string;
  latencyMs?: number;
}

export interface SecurityIncident {
  id: string;
  timestamp: string;
  caller: string;
  threatType: 'Synthetic Voice' | 'Voice Cloning' | 'Replay Attack' | 'Impersonation Attempt' | 'Adversarial Noise';
  riskScore: number;
  riskLevel: RiskLevel;
  action: SecurityAction;
  status: 'active' | 'investigating' | 'reviewed' | 'dismissed' | 'blocked';
  spoofProbability: number;
  speakerMatch: number;
  liveness: LivenessStatus;
  replayLikelihood: number;
  timeline: {
    time: string;
    event: string;
    severity?: 'info' | 'warning' | 'critical';
  }[];
  audioSnippetUrl?: string;
  notes?: string;
}

export interface VoiceProfile {
  id: string;
  name: string;
  role: string;
  department: string;
  createdAt: string;
  lastVerifiedAt?: string;
  sampleDurationSec: number;
  confidenceScore: number;
  embeddingVectorLength: number;
  status: 'enrolled' | 'pending' | 'suspended';
  avatarSeed?: string;
  biometricId: string;
}

export interface SystemSettings {
  detectionSensitivity: 'low' | 'balanced' | 'high';
  autoBlockCritical: boolean;
  requireChallengeVerification: boolean;
  spectralAnalysisDepth: 'standard' | 'deep';
  audioInputDevice: string;
  notificationsEnabled: boolean;
  soundAlertsEnabled: boolean;
  theme: 'dark';
  dataRetention: 'session' | '7days' | '30days';
  apiEndpoint: string;
  simulateLatency: boolean;
}

export interface AnalyticsSummary {
  threatsDetected: number;
  threatsBlocked: number;
  verifiedCalls: number;
  verificationFailures: number;
  averageRiskScore: number;
  averageLatencyMs: number;
  systemUptimePercentage: number;
  threatsTrend: {
    timestamp: string;
    threats: number;
    blocked: number;
    verified: number;
    avgRisk: number;
  }[];
  threatTypeBreakdown: {
    name: string;
    value: number;
    percentage: number;
  }[];
  latencyDistribution: {
    range: string;
    count: number;
  }[];
}
