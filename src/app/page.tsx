'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Radio, 
  UserCheck, 
  ShieldAlert, 
  Cpu, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Building2, 
  Landmark, 
  Headphones, 
  PhoneCall, 
  Server, 
  Activity 
} from 'lucide-react';
import { VoiceSecurityCore } from '@/components/visuals/VoiceSecurityCore';

export default function LandingPage() {
  return (
    <div className="space-y-24 py-6">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface-300/60 backdrop-blur-xl p-8 sm:p-12 lg:p-16">
        <div className="cyber-grid-bg absolute inset-0 opacity-20" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>SIH 2026 • PROBLEM ID: SIH26104</span>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-mono tracking-widest text-text-secondary uppercase">
                VOICE IS NO LONGER A TRUSTED SIGNAL.
              </p>
              <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-text-primary leading-[1.08]">
                VOXSHIELD AI
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400">
                  REAL-TIME VOICE SECURITY.
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-text-secondary max-w-xl font-sans leading-relaxed">
              Detect synthetic voices, neural vocoder artifacts, and deepfake impersonation in under 140ms.
              Protect financial transfers, executive channels, and call centers before damage occurs.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/monitor"
                className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-mono font-bold tracking-wider transition-all duration-150 flex items-center gap-2 shadow-lg shadow-cyan-500/20 group"
              >
                <Radio className="w-4 h-4" />
                <span>START PROTECTION</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/dashboard"
                className="px-6 py-3.5 rounded-xl border border-white/15 hover:border-cyan-500/40 bg-surface-100 hover:bg-surface-50 text-text-primary text-xs font-mono tracking-wider transition flex items-center gap-2"
              >
                <span>EXPLORE SYSTEM</span>
              </Link>
            </div>

            {/* Technical Highlights */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 font-mono text-xs">
              <div>
                <span className="text-text-secondary block text-[10px] uppercase">Latency</span>
                <span className="text-cyan-400 font-bold text-base">&lt; 140 ms</span>
              </div>
              <div>
                <span className="text-text-secondary block text-[10px] uppercase">Detection Rate</span>
                <span className="text-emerald-400 font-bold text-base">99.4%</span>
              </div>
              <div>
                <span className="text-text-secondary block text-[10px] uppercase">Architecture</span>
                <span className="text-text-primary font-bold text-base">Zero-Trust VAD</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Voice Security Core */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-surface-400/90 p-4 shadow-2xl relative">
              <div className="flex items-center justify-between text-[11px] font-mono text-text-secondary pb-2 border-b border-white/10">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  VOICE SECURITY CORE
                </span>
                <span>NEURAL ENGINE ACTIVE</span>
              </div>

              <VoiceSecurityCore className="h-72 w-full" />

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-text-muted">
                <span>PHASE DISPERSION: 0.04%</span>
                <span className="text-cyan-400">STATUS: PROTECTED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE SECURITY PIPELINE (DETECT -> VERIFY -> ALERT -> PREVENT) */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
            END-TO-END SECURITY PIPELINE
          </p>
          <h2 className="text-3xl font-display font-bold text-text-primary">
            Autonomous Voice Authentication Architecture
          </h2>
          <p className="text-sm text-text-secondary font-sans">
            How VoxShield intercepts and sanitizes voice communication streams before threat execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Step 1: Detect */}
          <div className="p-6 rounded-xl border border-white/10 bg-surface-200 hover:border-cyan-500/40 transition group">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-4 text-cyan-400">
              <Radio className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest block mb-1">
              PHASE 01
            </span>
            <h3 className="text-lg font-display font-bold text-text-primary mb-2">DETECT</h3>
            <p className="text-xs text-text-secondary leading-relaxed font-sans">
              Continuous spectral phase inspection, vocoder artifact extraction, and high-frequency loss profiling.
            </p>
          </div>

          {/* Step 2: Verify */}
          <div className="p-6 rounded-xl border border-white/10 bg-surface-200 hover:border-cyan-500/40 transition group">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4 text-emerald-400">
              <UserCheck className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest block mb-1">
              PHASE 02
            </span>
            <h3 className="text-lg font-display font-bold text-text-primary mb-2">VERIFY</h3>
            <p className="text-xs text-text-secondary leading-relaxed font-sans">
              Deep biometric embedding matching against enrolled voiceprints and dynamic challenge-response liveness.
            </p>
          </div>

          {/* Step 3: Alert */}
          <div className="p-6 rounded-xl border border-white/10 bg-surface-200 hover:border-amber-500/40 transition group">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4 text-amber-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest block mb-1">
              PHASE 03
            </span>
            <h3 className="text-lg font-display font-bold text-text-primary mb-2">ALERT</h3>
            <p className="text-xs text-text-secondary leading-relaxed font-sans">
              Instantaneous risk score computation (0-100) with SOC incident telemetry, replay probability, and reason logs.
            </p>
          </div>

          {/* Step 4: Prevent */}
          <div className="p-6 rounded-xl border border-white/10 bg-surface-200 hover:border-red-500/40 transition group">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-4 text-red-400">
              <Lock className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest block mb-1">
              PHASE 04
            </span>
            <h3 className="text-lg font-display font-bold text-text-primary mb-2">PREVENT</h3>
            <p className="text-xs text-text-secondary leading-relaxed font-sans">
              Automated SIP/VoIP termination, unauthorized wire transfer interception, and session quarantine.
            </p>
          </div>
        </div>
      </section>

      {/* USE CASES SECTION (SIH Aligned) */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
              MISSION CRITICAL DEPLOYMENT
            </p>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-text-primary">
              Industry Attack Vector Defense
            </h2>
          </div>
          <span className="text-xs font-mono text-text-secondary">
            ALIGNMENT: SIH26104 CYBERSECURITY MANDATE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-xl border border-white/10 bg-surface-200 space-y-4">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Landmark className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold font-display text-text-primary">
              Financial Institutions & Wire Authorizations
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Stops CEO fraud and high-value wire authorization attacks where attackers clone executive voices using only 3 seconds of reference audio.
            </p>
            <ul className="text-xs font-mono text-text-muted space-y-1.5 pt-2 border-t border-white/5">
              <li className="flex items-center gap-2 text-cyan-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> Real-time vocal micro-tremor verification
              </li>
              <li className="flex items-center gap-2 text-cyan-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> High-frequency vocoder interception
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-xl border border-white/10 bg-surface-200 space-y-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Headphones className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold font-display text-text-primary">
              Contact Centers & Customer Support Queues
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Integrates directly into WebRTC and SIP telephone trunks to continuously verify caller voice authenticity without degrading agent workflows.
            </p>
            <ul className="text-xs font-mono text-text-muted space-y-1.5 pt-2 border-t border-white/5">
              <li className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> Automatic caller voiceprint cross-reference
              </li>
              <li className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> Room impulse response (RIR) replay detection
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-xl border border-white/10 bg-surface-200 space-y-4">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold font-display text-text-primary">
              Government Services & Critical Infrastructure
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Secures biometric voice identification channels used in citizen identity verification, emergency dispatch, and defense communications.
            </p>
            <ul className="text-xs font-mono text-text-muted space-y-1.5 pt-2 border-t border-white/5">
              <li className="flex items-center gap-2 text-purple-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> Zero-knowledge biometric encryption
              </li>
              <li className="flex items-center gap-2 text-purple-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> Interactive dynamic challenge phrases
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-surface-200 to-surface-300 p-8 sm:p-12 text-center space-y-6 relative overflow-hidden">
        <div className="cyber-glow-cyan absolute inset-0 opacity-20 pointer-events-none" />
        <div className="max-w-2xl mx-auto space-y-3 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-text-primary">
            Arm Your Voice Channel Against AI Deepfakes
          </h2>
          <p className="text-sm text-text-secondary font-sans">
            Start real-time monitoring now with zero setup. Inspect live microphone streams or analyze recorded audio files.
          </p>
        </div>

        <div className="flex justify-center gap-4 relative z-10">
          <Link
            href="/monitor"
            className="px-8 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-mono font-bold tracking-wider transition shadow-lg shadow-cyan-500/20 flex items-center gap-2"
          >
            <Radio className="w-4 h-4" />
            <span>LAUNCH LIVE MONITOR</span>
          </Link>
          <Link
            href="/verify"
            className="px-6 py-3.5 rounded-xl border border-white/20 hover:border-cyan-500/40 bg-surface-100 text-xs font-mono tracking-wider transition text-text-primary"
          >
            <span>TRY LIVENESS CHALLENGE</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
