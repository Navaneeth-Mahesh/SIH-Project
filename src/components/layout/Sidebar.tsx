'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Radio,
  UserCheck,
  ShieldAlert,
  Users,
  BarChart3,
  Settings,
  Flame,
} from 'lucide-react';
import { useVoxStore } from '@/store/useVoxStore';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard, badge: null },
  { href: '/monitor', label: 'Live Monitor', icon: Radio, badge: 'REALTIME' },
  { href: '/verify', label: 'Verify Voice', icon: UserCheck, badge: null },
  { href: '/threats', label: 'Threat Center', icon: ShieldAlert, badge: 'ALERT_COUNT' },
  { href: '/profiles', label: 'Voice Profiles', icon: Users, badge: null },
  { href: '/analytics', label: 'Analytics', icon: BarChart3, badge: null },
  { href: '/settings', label: 'Settings', icon: Settings, badge: null },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const threats = useVoxStore((s) => s.threats);
  const activeThreatsCount = threats.filter((t) => t.status === 'blocked' || t.status === 'investigating').length;

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-white/5 bg-background/60 backdrop-blur-xl p-4 shrink-0 min-h-[calc(100vh-4rem)] justify-between">
      <div className="space-y-6">
        {/* Section Label */}
        <div className="px-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-widest text-text-secondary">
              VOXSHIELD SYSTEM
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          </div>
        </div>

        {/* Navigation list */}
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href === '/dashboard' && pathname === '/');

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-mono transition-all duration-150 ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(0,240,255,0.08)]'
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-cyan-400' : 'text-text-muted group-hover:text-text-primary'
                    }`}
                  />
                  <span className="tracking-wide font-medium">{item.label}</span>
                </div>

                {item.badge === 'REALTIME' && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/30">
                    LIVE
                  </span>
                )}

                {item.badge === 'ALERT_COUNT' && activeThreatsCount > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 font-bold border border-red-500/30">
                    {activeThreatsCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Cyber Incident / Threat Alert Status Box */}
      <div className="p-3.5 rounded-xl border border-white/10 bg-surface-200/90 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-text-primary font-semibold">
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span>ZERO-DAY DEFENSE</span>
        </div>
        <p className="text-[11px] text-text-secondary leading-relaxed">
          Synthetic neural artifacts & vocoder anomalies monitored continuously.
        </p>
        <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-cyan-400">
          <span>LATENCY: &lt;140ms</span>
          <span>ACCURACY: 99.4%</span>
        </div>
      </div>
    </aside>
  );
};
