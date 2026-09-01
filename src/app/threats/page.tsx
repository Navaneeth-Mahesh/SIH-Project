'use client';

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  Filter, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  PhoneCall, 
  Cpu, 
  ChevronRight, 
  Layers, 
  Trash2 
} from 'lucide-react';
import { useVoxStore } from '@/store/useVoxStore';
import { SecurityIncident, RiskLevel } from '@/types';
import { getRiskColor, getActionBadge } from '@/lib/utils';

export default function ThreatCenterPage() {
  const {
    threats,
    selectedThreatId,
    setSelectedThreatId,
    threatFilter,
    setThreatFilter,
    updateThreatStatus,
    dismissThreat,
    addToast,
  } = useVoxStore();

  const selectedThreat = threats.find((t) => t.id === selectedThreatId);

  const filteredThreats = threats.filter((t) => {
    const matchesSearch =
      t.id.toLowerCase().includes(threatFilter.search.toLowerCase()) ||
      t.caller.toLowerCase().includes(threatFilter.search.toLowerCase()) ||
      t.threatType.toLowerCase().includes(threatFilter.search.toLowerCase());

    const matchesRisk =
      threatFilter.riskLevel === 'all' || t.riskLevel === threatFilter.riskLevel;

    const matchesStatus =
      threatFilter.status === 'all' || t.status === threatFilter.status;

    return matchesSearch && matchesRisk && matchesStatus;
  });

  const handleMarkReviewed = (id: string) => {
    updateThreatStatus(id, 'reviewed');
    addToast({
      type: 'success',
      title: 'Incident Status Updated',
      description: `Incident #${id} marked as reviewed.`,
    });
  };

  const handleDismiss = (id: string) => {
    dismissThreat(id);
    addToast({
      type: 'info',
      title: 'Incident Dismissed',
      description: `Incident #${id} was cleared from active feed.`,
    });
  };

  return (
    <div className="space-y-8 py-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-red-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>INCIDENT RESPONSE & THREAT INTELLIGENCE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-text-primary tracking-tight mt-1">
            SECURITY THREAT CENTER
          </h1>
          <p className="text-xs font-mono text-text-secondary mt-1">
            Real-time telemetry and forensic records of intercepted synthetic voice clone attacks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 font-mono text-xs font-bold">
            {threats.length} TOTAL INCIDENTS
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        {/* Search */}
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by incident ID, caller, or attack vector..."
            value={threatFilter.search}
            onChange={(e) => setThreatFilter({ search: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-200 border border-white/10 text-xs font-mono text-text-primary placeholder:text-text-muted focus:outline-none focus:border-cyan-500/50 transition"
          />
        </div>

        {/* Risk Level Filter */}
        <div className="sm:col-span-3">
          <select
            value={threatFilter.riskLevel}
            onChange={(e) => setThreatFilter({ riskLevel: e.target.value as RiskLevel | 'all' })}
            className="w-full px-3 py-2.5 rounded-xl bg-surface-200 border border-white/10 text-xs font-mono text-text-primary focus:outline-none focus:border-cyan-500/50 transition"
          >
            <option value="all">ALL RISK LEVELS</option>
            <option value="critical">CRITICAL ONLY</option>
            <option value="high">HIGH</option>
            <option value="medium">MEDIUM</option>
            <option value="low">LOW</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="sm:col-span-3">
          <select
            value={threatFilter.status}
            onChange={(e) => setThreatFilter({ status: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl bg-surface-200 border border-white/10 text-xs font-mono text-text-primary focus:outline-none focus:border-cyan-500/50 transition"
          >
            <option value="all">ALL STATUSES</option>
            <option value="blocked">BLOCKED</option>
            <option value="investigating">INVESTIGATING</option>
            <option value="reviewed">REVIEWED</option>
          </select>
        </div>
      </div>

      {/* Main Threat Incident Table / Cards */}
      <div className="rounded-2xl border border-white/10 bg-surface-200/90 overflow-hidden">
        {filteredThreats.length > 0 ? (
          <div className="divide-y divide-white/5">
            {filteredThreats.map((threat) => {
              const risk = getRiskColor(threat.riskLevel);
              const action = getActionBadge(threat.action);

              return (
                <div
                  key={threat.id}
                  onClick={() => setSelectedThreatId(threat.id)}
                  className={`p-4 sm:p-5 hover:bg-white/5 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    selectedThreatId === threat.id ? 'bg-cyan-500/5 border-l-4 border-l-cyan-400' : ''
                  }`}
                >
                  <div className="space-y-1.5 font-mono">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-text-primary">#{threat.id}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-text-secondary">
                        {threat.threatType}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${risk.bg} ${risk.text}`}
                      >
                        RISK {threat.riskScore} • {threat.riskLevel}
                      </span>
                      <span className="text-[10px] text-text-muted">
                        {new Date(threat.timestamp).toLocaleTimeString()}
                      </span>
                    </div>

                    <p className="text-xs text-text-secondary font-sans">{threat.caller}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-mono font-bold px-3 py-1 rounded border ${action.color}`}
                    >
                      {action.label}
                    </span>

                    <span
                      className={`text-[10px] font-mono px-2 py-1 rounded uppercase ${
                        threat.status === 'blocked'
                          ? 'text-red-400 bg-red-500/10'
                          : threat.status === 'reviewed'
                          ? 'text-emerald-400 bg-emerald-500/10'
                          : 'text-amber-400 bg-amber-500/10'
                      }`}
                    >
                      {threat.status}
                    </span>

                    <ChevronRight className="w-4 h-4 text-text-muted" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h3 className="text-sm font-mono font-bold text-text-primary uppercase">
              NO ACTIVE THREATS FOUND
            </h3>
            <p className="text-xs font-mono text-text-secondary">
              No incidents match your current filter parameters.
            </p>
          </div>
        )}
      </div>

      {/* Cinematic Incident Inspector Drawer/Modal */}
      {selectedThreat && (
        <div className="rounded-2xl border border-cyan-500/30 bg-surface-300 p-6 space-y-6 shadow-2xl animate-in fade-in duration-200">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-display font-bold text-text-primary">
                    INCIDENT #{selectedThreat.id} FORENSIC DOSSIER
                  </span>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      getRiskColor(selectedThreat.riskLevel).bg
                    } ${getRiskColor(selectedThreat.riskLevel).text}`}
                  >
                    RISK {selectedThreat.riskScore}/100
                  </span>
                </div>
                <p className="text-xs font-mono text-text-secondary">{selectedThreat.caller}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {selectedThreat.status !== 'reviewed' && (
                <button
                  onClick={() => handleMarkReviewed(selectedThreat.id)}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold transition flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>MARK REVIEWED</span>
                </button>
              )}

              <button
                onClick={() => handleDismiss(selectedThreat.id)}
                className="px-3.5 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 text-xs font-mono font-bold transition flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>DISMISS ALERT</span>
              </button>

              <button
                onClick={() => setSelectedThreatId(null)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-text-secondary hover:text-text-primary transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Forensic Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-surface-200 border border-white/5 space-y-1">
              <span className="text-[10px] text-text-secondary uppercase">Deepfake Prob</span>
              <p className="text-lg font-bold text-red-400">
                {(selectedThreat.spoofProbability * 100).toFixed(1)}%
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-200 border border-white/5 space-y-1">
              <span className="text-[10px] text-text-secondary uppercase">Speaker Match</span>
              <p className="text-lg font-bold text-cyan-400">
                {(selectedThreat.speakerMatch * 100).toFixed(1)}%
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-200 border border-white/5 space-y-1">
              <span className="text-[10px] text-text-secondary uppercase">Replay Likelihood</span>
              <p className="text-lg font-bold text-amber-400">
                {(selectedThreat.replayLikelihood * 100).toFixed(1)}%
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-200 border border-white/5 space-y-1">
              <span className="text-[10px] text-text-secondary uppercase">Liveness Status</span>
              <p className="text-lg font-bold uppercase text-red-400">
                {selectedThreat.liveness}
              </p>
            </div>
          </div>

          {/* Incident Timeline */}
          <div className="space-y-3 font-mono">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>INCIDENT TIME-SERIES SEQUENCE</span>
            </h4>

            <div className="space-y-2 pl-2 border-l border-white/10">
              {selectedThreat.timeline.map((event, idx) => (
                <div key={idx} className="relative pl-4 text-xs space-y-0.5">
                  <span
                    className={`absolute -left-[17px] top-1.5 w-2 h-2 rounded-full ${
                      event.severity === 'critical'
                        ? 'bg-red-400'
                        : event.severity === 'warning'
                        ? 'bg-amber-400'
                        : 'bg-cyan-400'
                    }`}
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-text-muted text-[10px]">{event.time}</span>
                    <span
                      className={
                        event.severity === 'critical'
                          ? 'text-red-300 font-semibold'
                          : event.severity === 'warning'
                          ? 'text-amber-300'
                          : 'text-text-secondary'
                      }
                    >
                      {event.event}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Forensic Notes */}
          {selectedThreat.notes && (
            <div className="p-3.5 rounded-xl bg-surface-200 border border-white/5 font-mono text-xs text-text-secondary">
              <span className="text-[10px] uppercase text-text-muted block mb-1">SOC FORENSIC NOTES:</span>
              <p>{selectedThreat.notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
