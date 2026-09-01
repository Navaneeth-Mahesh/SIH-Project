'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  ShieldCheck, 
  ShieldAlert, 
  Clock, 
  Activity, 
  Zap, 
  Download, 
  Layers 
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { MOCK_ANALYTICS } from '@/services/mockApi';
import { useVoxStore } from '@/store/useVoxStore';

const COLORS = ['#00F0FF', '#7928CA', '#FF9500', '#FF3B30', '#10B981'];

export default function AnalyticsPage() {
  const [timeFilter, setTimeFilter] = useState<'24H' | '7D' | '30D' | '90D'>('24H');
  const { addToast } = useVoxStore();

  const handleExport = () => {
    addToast({
      type: 'success',
      title: 'Forensic Report Exported',
      description: `Telemetry and incident data bundle (${timeFilter}) exported to JSON format.`,
    });
  };

  return (
    <div className="space-y-8 py-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>AI THREAT INTELLIGENCE & TELEMETRY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-text-primary tracking-tight mt-1">
            CYBERSECURITY ANALYTICS
          </h1>
          <p className="text-xs font-mono text-text-secondary mt-1">
            Forensic metrics on intercepted synthetic voice payloads, latency distributions, and liveness accuracy.
          </p>
        </div>

        {/* Filters and Export */}
        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 rounded-xl bg-surface-200 border border-white/10 font-mono text-xs">
            {(['24H', '7D', '30D', '90D'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setTimeFilter(period)}
                className={`px-3 py-1.5 rounded-lg transition ${
                  timeFilter === period
                    ? 'bg-cyan-500 text-black font-bold'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {period}
              </button>
            ))}
          </div>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-200 hover:bg-surface-100 border border-white/10 text-xs font-mono text-text-primary transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">EXPORT SOC LOG</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="p-5 rounded-2xl border border-white/10 bg-surface-200 space-y-2">
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <span>THREATS INTERCEPTED</span>
            <ShieldAlert className="w-4 h-4 text-red-400" />
          </div>
          <p className="text-3xl font-bold text-red-400">{MOCK_ANALYTICS.threatsBlocked}</p>
          <span className="text-[10px] text-text-muted block">93.9% automated block rate</span>
        </div>

        <div className="p-5 rounded-2xl border border-white/10 bg-surface-200 space-y-2">
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <span>GENUINE VERIFICATIONS</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-3xl font-bold text-emerald-400">{MOCK_ANALYTICS.verifiedCalls}</p>
          <span className="text-[10px] text-text-muted block">99.2% true positive rate</span>
        </div>

        <div className="p-5 rounded-2xl border border-white/10 bg-surface-200 space-y-2">
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <span>AVERAGE RISK SCORE</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-3xl font-bold text-cyan-400">{MOCK_ANALYTICS.averageRiskScore} / 100</p>
          <span className="text-[10px] text-text-muted block">Low baseline exposure</span>
        </div>

        <div className="p-5 rounded-2xl border border-white/10 bg-surface-200 space-y-2">
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <span>INFERENCE LATENCY</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-3xl font-bold text-text-primary">{MOCK_ANALYTICS.averageLatencyMs} ms</p>
          <span className="text-[10px] text-emerald-400 block">✓ Exceeds SIH real-time SLA</span>
        </div>
      </div>

      {/* Main Threat Timeline Trend Area Chart */}
      <div className="p-6 rounded-2xl border border-white/10 bg-surface-200/90 space-y-4">
        <div className="flex items-center justify-between font-mono">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary">
              THREAT DETECTION & MITIGATION TIMELINE
            </h3>
            <p className="text-xs text-text-secondary">
              Hourly distribution of synthetic voice attempts vs blocked streams.
            </p>
          </div>
          <span className="text-xs text-cyan-400 font-bold">INTERVAL: {timeFilter}</span>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MOCK_ANALYTICS.threatsTrend}>
              <defs>
                <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF3B30" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#FF3B30" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorVerified" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00F0FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="timestamp" stroke="#8B8B8B" tick={{ fontSize: 11, fill: '#8B8B8B' }} />
              <YAxis stroke="#8B8B8B" tick={{ fontSize: 11, fill: '#8B8B8B' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0C0C0C',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '8px',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="threats"
                stroke="#FF3B30"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorThreats)"
                name="Threats Flagged"
              />
              <Area
                type="monotone"
                dataKey="blocked"
                stroke="#10B981"
                strokeWidth={2}
                fill="transparent"
                name="Auto Blocked"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two Column Section: Attack Vector Breakdown & Latency Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono">
        {/* Vector Distribution */}
        <div className="p-6 rounded-2xl border border-white/10 bg-surface-200 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary">
            SYNTHETIC ATTACK VECTOR BREAKDOWN
          </h3>
          <p className="text-xs text-text-secondary">
            Classification of detected spoofing techniques.
          </p>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={MOCK_ANALYTICS.threatTypeBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {MOCK_ANALYTICS.threatTypeBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0C0C0C',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '8px',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {MOCK_ANALYTICS.threatTypeBreakdown.map((item, idx) => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                <span className="text-text-secondary truncate">{item.name}</span>
                <span className="text-text-primary font-bold">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Latency Distribution */}
        <div className="p-6 rounded-2xl border border-white/10 bg-surface-200 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary">
            ENGINE INFERENCE LATENCY PROFILES
          </h3>
          <p className="text-xs text-text-secondary">
            Response latency frequency for real-time WebRTC audio chunks.
          </p>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_ANALYTICS.latencyDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="range" stroke="#8B8B8B" tick={{ fontSize: 11, fill: '#8B8B8B' }} />
                <YAxis stroke="#8B8B8B" tick={{ fontSize: 11, fill: '#8B8B8B' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0C0C0C',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '8px',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="count" fill="#00F0FF" radius={[4, 4, 0, 0]} name="Inspected Audio Chunks" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 rounded-lg bg-surface-300 border border-white/5 text-[11px] text-text-secondary flex items-center justify-between">
            <span>96.2% of calls processed under 150ms</span>
            <span className="text-emerald-400 font-bold">ZERO AUDIBLE DELAY</span>
          </div>
        </div>
      </div>
    </div>
  );
}
