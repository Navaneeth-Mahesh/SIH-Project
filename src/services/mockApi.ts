import { DetectionResult, SecurityIncident, VoiceProfile, AnalyticsSummary, RiskLevel, SecurityAction } from '@/types';

export const INITIAL_VOICE_PROFILES: VoiceProfile[] = [
  {
    id: 'prof-001',
    name: 'Dr. Sarah Chen',
    role: 'Chief Executive Officer',
    department: 'Executive Leadership',
    createdAt: '2026-08-14T09:30:00Z',
    lastVerifiedAt: '2026-09-01T14:22:10Z',
    sampleDurationSec: 12.4,
    confidenceScore: 0.982,
    embeddingVectorLength: 512,
    status: 'enrolled',
    avatarSeed: 'sarah',
    biometricId: 'BIO-VX-9921-SC',
  },
  {
    id: 'prof-002',
    name: 'Marcus Vance',
    role: 'Head of Treasury & Wire Transfers',
    department: 'Finance Operations',
    createdAt: '2026-08-18T11:15:00Z',
    lastVerifiedAt: '2026-09-01T18:45:00Z',
    sampleDurationSec: 10.8,
    confidenceScore: 0.965,
    embeddingVectorLength: 512,
    status: 'enrolled',
    avatarSeed: 'marcus',
    biometricId: 'BIO-VX-4019-MV',
  },
  {
    id: 'prof-003',
    name: 'Aisha Patel',
    role: 'Lead Cloud Infrastructure Architect',
    department: 'DevOps & Security',
    createdAt: '2026-08-22T16:00:00Z',
    lastVerifiedAt: '2026-08-30T10:12:00Z',
    sampleDurationSec: 14.1,
    confidenceScore: 0.974,
    embeddingVectorLength: 512,
    status: 'enrolled',
    avatarSeed: 'aisha',
    biometricId: 'BIO-VX-7734-AP',
  },
  {
    id: 'prof-004',
    name: 'Robert Sterling',
    role: 'Chief Financial Officer',
    department: 'Finance',
    createdAt: '2026-08-25T08:45:00Z',
    lastVerifiedAt: '2026-09-01T12:05:00Z',
    sampleDurationSec: 11.2,
    confidenceScore: 0.951,
    embeddingVectorLength: 512,
    status: 'enrolled',
    avatarSeed: 'robert',
    biometricId: 'BIO-VX-5510-RS',
  },
];

export const INITIAL_THREAT_INCIDENTS: SecurityIncident[] = [
  {
    id: 'VS-1025',
    timestamp: '2026-09-01T14:03:15Z',
    caller: 'Inbound Line (+1 415-***-8921)',
    threatType: 'Voice Cloning',
    riskScore: 91,
    riskLevel: 'critical',
    action: 'block',
    status: 'blocked',
    spoofProbability: 0.93,
    speakerMatch: 0.38,
    liveness: 'fail',
    replayLikelihood: 0.76,
    timeline: [
      { time: '14:03:12', event: 'Inbound audio stream established from external SIP trunk', severity: 'info' },
      { time: '14:03:13', event: 'Spectral harmonic discontinuity flagged: synthetic vocoder artifacts detected', severity: 'warning' },
      { time: '14:03:14', event: 'Target speaker embedding mismatch (target: Dr. Sarah Chen, cosine similarity 0.38)', severity: 'warning' },
      { time: '14:03:15', event: 'Liveness acoustic phase challenge failed — synthetic latency identified', severity: 'critical' },
      { time: '14:03:15', event: 'Automated policy triggered: Call stream intercepted and transaction blocked', severity: 'critical' },
    ],
    notes: 'Impersonation attempt targeting wire authorization protocol. Vocoder matched Tortoise/XTTS v2 synthetic architecture.',
  },
  {
    id: 'VS-1024',
    timestamp: '2026-09-01T11:42:30Z',
    caller: 'Remote Conference Trunk (Room B)',
    threatType: 'Synthetic Voice',
    riskScore: 78,
    riskLevel: 'high',
    action: 'alert',
    status: 'investigating',
    spoofProbability: 0.81,
    speakerMatch: 0.52,
    liveness: 'fail',
    replayLikelihood: 0.64,
    timeline: [
      { time: '11:42:25', event: 'Audio chunk received from WebRTC endpoint', severity: 'info' },
      { time: '11:42:28', event: 'High spectral flatness anomaly detected at 4kHz-8kHz band', severity: 'warning' },
      { time: '11:42:30', event: 'Security alert dispatched to active SOC channel', severity: 'critical' },
    ],
    notes: 'Real-time pitch contour jitter missing typical human micro-tremors.',
  },
  {
    id: 'VS-1023',
    timestamp: '2026-09-01T09:15:00Z',
    caller: 'Customer Support Line (#441)',
    threatType: 'Replay Attack',
    riskScore: 68,
    riskLevel: 'high',
    action: 'verify',
    status: 'reviewed',
    spoofProbability: 0.44,
    speakerMatch: 0.89,
    liveness: 'fail',
    replayLikelihood: 0.88,
    timeline: [
      { time: '09:14:55', event: 'Inbound customer voice authentication request', severity: 'info' },
      { time: '09:14:58', event: 'Speaker voiceprint matched genuine profile with high similarity', severity: 'info' },
      { time: '09:15:00', event: 'Loudspeaker room impulse response (RIR) reverberation detected — Replay flag', severity: 'warning' },
      { time: '09:15:00', event: 'Secondary out-of-band interactive challenge requested', severity: 'warning' },
    ],
    notes: 'Pre-recorded voice playback through mobile speakerphone. User passed subsequent dynamic challenge.',
  },
  {
    id: 'VS-1022',
    timestamp: '2026-08-31T22:18:40Z',
    caller: 'Executive Desk Phone Ext 901',
    threatType: 'Impersonation Attempt',
    riskScore: 86,
    riskLevel: 'critical',
    action: 'block',
    status: 'blocked',
    spoofProbability: 0.89,
    speakerMatch: 0.31,
    liveness: 'fail',
    replayLikelihood: 0.72,
    timeline: [
      { time: '22:18:35', event: 'High-privilege credential reset requested via internal VoIP', severity: 'info' },
      { time: '22:18:38', event: 'AI anti-spoofing model triggered on neural codec neural artifacts', severity: 'critical' },
      { time: '22:18:40', event: 'VoIP session terminated automatically by policy rule #VX-CRIT-01', severity: 'critical' },
    ],
    notes: 'ElevenLabs clone attempting credential reset for IT administrative root.',
  },
  {
    id: 'VS-1021',
    timestamp: '2026-08-31T17:05:12Z',
    caller: 'Helpdesk Queue (#12)',
    threatType: 'Adversarial Noise',
    riskScore: 35,
    riskLevel: 'medium',
    action: 'verify',
    status: 'reviewed',
    spoofProbability: 0.28,
    speakerMatch: 0.71,
    liveness: 'pass',
    replayLikelihood: 0.19,
    timeline: [
      { time: '17:05:08', event: 'High background noise ratio detected on audio channel', severity: 'info' },
      { time: '17:05:12', event: 'Noise filtered; human voice characteristics confirmed valid', severity: 'info' },
    ],
    notes: 'High acoustic interference from commuter train environment. Voice authentic.',
  },
];

export const MOCK_ANALYTICS: AnalyticsSummary = {
  threatsDetected: 148,
  threatsBlocked: 139,
  verifiedCalls: 2840,
  verificationFailures: 24,
  averageRiskScore: 18.4,
  averageLatencyMs: 142,
  systemUptimePercentage: 99.98,
  threatsTrend: [
    { timestamp: '00:00', threats: 4, blocked: 4, verified: 120, avgRisk: 12 },
    { timestamp: '04:00', threats: 2, blocked: 2, verified: 65, avgRisk: 8 },
    { timestamp: '08:00', threats: 19, blocked: 18, verified: 410, avgRisk: 24 },
    { timestamp: '12:00', threats: 42, blocked: 40, verified: 890, avgRisk: 31 },
    { timestamp: '16:00', threats: 51, blocked: 48, verified: 940, avgRisk: 28 },
    { timestamp: '20:00', threats: 30, blocked: 27, verified: 415, avgRisk: 19 },
  ],
  threatTypeBreakdown: [
    { name: 'Voice Cloning (TTS/VC)', value: 68, percentage: 46 },
    { name: 'Synthetic AI Vocoder', value: 42, percentage: 28 },
    { name: 'Replay Attacks', value: 26, percentage: 18 },
    { name: 'Adversarial Noise Injection', value: 12, percentage: 8 },
  ],
  latencyDistribution: [
    { range: '< 80ms', count: 1240 },
    { range: '80-150ms', count: 1420 },
    { range: '150-250ms', count: 160 },
    { range: '> 250ms', count: 20 },
  ],
};

export function simulateVoiceAnalysis(
  audioDataOrFile: { name?: string; size?: number; duration?: number } | null,
  targetProfileId?: string
): DetectionResult {
  // Deterministic simulation based on filename/time so it remains stable for a given session
  const isSyntheticIndicator = audioDataOrFile?.name?.toLowerCase().includes('fake') || 
                                audioDataOrFile?.name?.toLowerCase().includes('clone') ||
                                audioDataOrFile?.name?.toLowerCase().includes('synth') ||
                                audioDataOrFile?.name?.toLowerCase().includes('ai');

  const spoofProb = isSyntheticIndicator ? 0.94 : (Math.random() > 0.7 ? 0.88 : 0.07);
  const isSuspicious = spoofProb > 0.6;
  
  let riskScore: number;
  let riskLevel: RiskLevel;
  let action: SecurityAction;
  let liveness: 'pass' | 'fail' = isSuspicious ? 'fail' : 'pass';
  let speakerMatch = isSuspicious ? (0.25 + Math.random() * 0.2) : (0.91 + Math.random() * 0.08);

  if (spoofProb > 0.8) {
    riskScore = Math.floor(82 + Math.random() * 16);
    riskLevel = 'critical';
    action = 'block';
  } else if (spoofProb > 0.5) {
    riskScore = Math.floor(62 + Math.random() * 18);
    riskLevel = 'high';
    action = 'alert';
  } else if (spoofProb > 0.2) {
    riskScore = Math.floor(32 + Math.random() * 20);
    riskLevel = 'medium';
    action = 'verify';
  } else {
    riskScore = Math.floor(4 + Math.random() * 12);
    riskLevel = 'low';
    action = 'allow';
  }

  const reason = action === 'block'
    ? 'High-confidence neural vocoder artifacts detected. Phase discontinuity and unnatural spectral flatness.'
    : action === 'alert'
    ? 'Potential synthetic voice markers detected. Speaker acoustic footprint deviates from enrolled baseline.'
    : action === 'verify'
    ? 'Acoustic background ambiguity. Secondary liveness verification recommended.'
    : 'Human biometric characteristics validated. Phase coherence and micro-tremor pitch dynamics normal.';

  return {
    id: `DET-${Date.now().toString().slice(-6)}`,
    timestamp: new Date().toISOString(),
    spoofProbability: Number(spoofProb.toFixed(3)),
    speakerMatch: Number(speakerMatch.toFixed(3)),
    liveness,
    livenessScore: isSuspicious ? 14 : 96,
    replayLikelihood: isSuspicious ? 0.74 : 0.08,
    spectralFlatness: isSuspicious ? 0.89 : 0.18,
    pitchAnomaly: isSuspicious ? 0.78 : 0.06,
    riskScore,
    riskLevel,
    action,
    reason,
    audioDuration: audioDataOrFile?.duration || 4.2,
    audioFileName: audioDataOrFile?.name || 'live-mic-stream.wav',
    latencyMs: Math.floor(110 + Math.random() * 45),
  };
}

export const DYNAMIC_CHALLENGE_PHRASES = [
  'BLUE TIGER 729',
  'CYBER SHIELD 404',
  'SILVER FALCON 815',
  'QUANTUM ECHO 360',
  'SOLAR ORBIT 951',
  'NEBULA MATRIX 128',
];
