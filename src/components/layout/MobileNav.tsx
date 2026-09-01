'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Radio, UserCheck, ShieldAlert, Users, BarChart3, Settings } from 'lucide-react';
import { useVoxStore } from '@/store/useVoxStore';

const MOBILE_NAV = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/monitor', label: 'Monitor', icon: Radio },
  { href: '/verify', label: 'Verify', icon: UserCheck },
  { href: '/threats', label: 'Threats', icon: ShieldAlert },
  { href: '/profiles', label: 'Profiles', icon: Users },
  { href: '/analytics', label: 'Metrics', icon: BarChart3 },
  { href: '/settings', label: 'Config', icon: Settings },
];

export const MobileNav: React.FC = () => {
  const pathname = usePathname();
  const threats = useVoxStore((s) => s.threats);
  const activeThreatsCount = threats.filter((t) => t.status === 'blocked' || t.status === 'investigating').length;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface-300/95 backdrop-blur-xl border-t border-white/10 px-2 py-2">
      <div className="flex items-center justify-around">
        {MOBILE_NAV.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href === '/dashboard' && pathname === '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                isActive ? 'text-cyan-400' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-mono tracking-tight">{item.label}</span>

              {item.href === '/threats' && activeThreatsCount > 0 && (
                <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-red-500" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
