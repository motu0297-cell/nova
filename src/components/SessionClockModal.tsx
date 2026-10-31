import React, { useState, useEffect } from 'react';
import { X, Clock, Globe, ArrowUpRight, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

interface SessionClockModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MarketSession {
  city: string;
  country: string;
  currency: string;
  openUtc: number; // hour in UTC
  closeUtc: number; // hour in UTC
  tag: string;
}

const SESSIONS: MarketSession[] = [
  { city: 'Sydney', country: 'Australia', currency: 'AUD', openUtc: 22, closeUtc: 7, tag: 'Oceania' },
  { city: 'Tokyo', country: 'Japan', currency: 'JPY', openUtc: 0, closeUtc: 9, tag: 'Asian Session' },
  { city: 'London', country: 'United Kingdom', currency: 'GBP/EUR', openUtc: 8, closeUtc: 16.5, tag: 'European Session' },
  { city: 'New York', country: 'United States', currency: 'USD', openUtc: 13, closeUtc: 21, tag: 'Americas Session' },
];

export const SessionClockModal: React.FC<SessionClockModalProps> = ({ isOpen, onClose }) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  // Compute UTC decimal hour
  const utcHours = now.getUTCHours();
  const utcMinutes = now.getUTCMinutes();
  const utcSeconds = now.getUTCSeconds();
  const currentUtcDecimal = utcHours + utcMinutes / 60 + utcSeconds / 3600;

  const isSessionOpen = (s: MarketSession) => {
    if (s.openUtc < s.closeUtc) {
      return currentUtcDecimal >= s.openUtc && currentUtcDecimal < s.closeUtc;
    } else {
      // Over midnight
      return currentUtcDecimal >= s.openUtc || currentUtcDecimal < s.closeUtc;
    }
  };

  const isLondonNyOverlap =
    isSessionOpen(SESSIONS.find((s) => s.city === 'London')!) &&
    isSessionOpen(SESSIONS.find((s) => s.city === 'New York')!);

  const formatUtcTime = () => {
    const hh = String(utcHours).padStart(2, '0');
    const mm = String(utcMinutes).padStart(2, '0');
    const ss = String(utcSeconds).padStart(2, '0');
    return `${hh}:${mm}:${ss} UTC`;
  };

  const formatLocalTime = () => {
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-cyan-500/30 bg-[#070b16] shadow-2xl shadow-cyan-950/50 text-slate-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 px-6 py-4 bg-slate-900/40">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/40 bg-cyan-500/10 text-cyan-400 shadow-md shadow-cyan-500/20">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-wide">
                  NOVA FX • Global Session Clock
                </h3>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono font-semibold text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE TICKS
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Institutional timing & killzones synchronization
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg border border-slate-800 bg-slate-900/80 p-2 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Top Clock Display Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-cyan-500/20 bg-gradient-to-br from-slate-900/90 to-cyan-950/30 p-4">
              <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest block mb-1">
                Forex Standard Time (UTC)
              </span>
              <div className="text-3xl font-black font-mono tracking-tight text-white drop-shadow-sm">
                {formatUtcTime()}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {now.toUTCString().slice(0, 16)}
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
                Your Local Device Time
              </span>
              <div className="text-3xl font-black font-mono tracking-tight text-slate-200">
                {formatLocalTime()}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {Intl.DateTimeFormat().resolvedOptions().timeZone}
              </div>
            </div>
          </div>

          {/* Overlap Alert banner if London/NY are active */}
          {isLondonNyOverlap ? (
            <div className="rounded-xl border border-cyan-400/50 bg-gradient-to-r from-cyan-950/60 via-blue-950/50 to-purple-950/60 p-4 shadow-lg shadow-cyan-500/10">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400 text-slate-950 font-black">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    LONDON & NEW YORK OVERLAP ACTIVE
                    <span className="rounded bg-emerald-500/20 text-emerald-300 text-[10px] px-1.5 py-0.5 font-mono border border-emerald-500/40">
                      PEAK LIQUIDITY
                    </span>
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Highest forex tick volume of the 24h cycle. Prime liquidity for EUR/USD, GBP/USD, and XAU/USD expansions.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3.5 flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-cyan-400" />
                Next Peak Overlap: <strong className="text-white">13:00 - 16:30 UTC</strong> (London + New York Session Overlap)
              </span>
              <span className="text-[11px] font-mono text-slate-400">Monday - Friday</span>
            </div>
          )}

          {/* 4 Sessions Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              Interbank Global Centers Status
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SESSIONS.map((session) => {
                const open = isSessionOpen(session);
                return (
                  <div
                    key={session.city}
                    className={`rounded-xl border p-4 transition-all ${
                      open
                        ? 'border-emerald-500/40 bg-emerald-950/15 shadow-md shadow-emerald-900/10'
                        : 'border-slate-800/80 bg-slate-900/30 opacity-75'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-white">{session.city}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-slate-700 bg-slate-800 text-slate-300">
                          {session.currency}
                        </span>
                      </div>
                      {open ? (
                        <span className="flex items-center gap-1.5 text-xs font-bold font-mono text-emerald-400">
                          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                          ACTIVE
                        </span>
                      ) : (
                        <span className="text-xs font-mono text-slate-500">CLOSED</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400 font-mono mt-2">
                      <span>Operating Hours:</span>
                      <span className="text-slate-300">
                        {String(Math.floor(session.openUtc)).padStart(2, '0')}:00 -{' '}
                        {String(Math.floor(session.closeUtc)).padStart(2, '0')}:
                        {session.closeUtc % 1 ? '30' : '00'} UTC
                      </span>
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{session.tag}</span>
                      <span className="text-slate-500">{session.country}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Educational Note */}
          <div className="rounded-xl border border-cyan-500/20 bg-slate-900/60 p-4 text-xs text-slate-300 space-y-1">
            <span className="font-bold text-cyan-400 flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5" />
              NOVA FX Execution Rule
            </span>
            <p className="text-[12px] text-slate-400 leading-relaxed">
              Institutional manipulation models (&ldquo;Judas Swings&rdquo;) typically print in the first 60 minutes after London open (08:00 UTC) and New York open (13:00 UTC). Do not enter preemptively before liquidity is swept.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 px-6 py-3 bg-slate-900/60 flex items-center justify-between text-xs text-slate-400">
          <span>Synced with International Forex Banking Clock</span>
          <button
            onClick={onClose}
            className="rounded-lg bg-cyan-500 px-4 py-1.5 text-xs font-bold text-black hover:bg-cyan-400 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
