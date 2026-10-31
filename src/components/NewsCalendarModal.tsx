import React, { useState } from 'react';
import { X, Calendar, AlertTriangle, Flame, Filter, Info, ShieldCheck } from 'lucide-react';

interface NewsCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NewsEvent {
  id: string;
  time: string; // e.g. "12:30 UTC"
  currency: string;
  eventName: string;
  impact: 'HIGH' | 'MED' | 'LOW';
  forecast: string;
  previous: string;
  volatilityPips: string;
  notes: string;
}

const ECONOMIC_EVENTS: NewsEvent[] = [
  {
    id: 'n1',
    time: '12:30 UTC',
    currency: 'USD',
    eventName: 'Non-Farm Employment Change (NFP) & Unemployment Rate',
    impact: 'HIGH',
    forecast: '+185K / 4.1%',
    previous: '+175K / 4.1%',
    volatilityPips: '80 - 150 pips',
    notes: 'Massive volatility driver for USD majors & Gold. Spreads widen up to 10x in first 30 seconds.',
  },
  {
    id: 'n2',
    time: '12:30 UTC',
    currency: 'USD',
    eventName: 'Core Consumer Price Index (CPI m/m & y/y)',
    impact: 'HIGH',
    forecast: '3.1% YoY',
    previous: '3.2% YoY',
    volatilityPips: '60 - 120 pips',
    notes: 'Key inflation benchmark dictating Federal Reserve interest rate trajectory.',
  },
  {
    id: 'n3',
    time: '18:00 UTC',
    currency: 'USD',
    eventName: 'FOMC Statement & Federal Funds Rate Decision',
    impact: 'HIGH',
    forecast: '4.75% - 5.00%',
    previous: '5.00%',
    volatilityPips: '100 - 200 pips',
    notes: 'Powell Presser at 18:30 UTC. Whiplash whips both directions before true trend displacement.',
  },
  {
    id: 'n4',
    time: '12:15 UTC',
    currency: 'EUR',
    eventName: 'ECB Main Refinancing Rate & Monetary Policy Statement',
    impact: 'HIGH',
    forecast: '3.40%',
    previous: '3.65%',
    volatilityPips: '50 - 90 pips',
    notes: 'Primary driver for EUR/USD and EUR/GBP order flow mitigations.',
  },
  {
    id: 'n5',
    time: '11:00 UTC',
    currency: 'GBP',
    eventName: 'Bank of England (BoE) Official Bank Rate & Minutes',
    impact: 'HIGH',
    forecast: '4.75%',
    previous: '5.00%',
    volatilityPips: '70 - 110 pips',
    notes: 'Check 9-member MPC vote split (Haws vs Doves) for continuation moves.',
  },
  {
    id: 'n6',
    time: '12:30 UTC',
    currency: 'USD',
    eventName: 'Initial Jobless Claims (Weekly)',
    impact: 'MED',
    forecast: '215K',
    previous: '221K',
    volatilityPips: '25 - 40 pips',
    notes: 'Weekly labor health measure. Often sets the tone for Thursday New York killzone.',
  },
  {
    id: 'n7',
    time: '00:30 UTC',
    currency: 'AUD',
    eventName: 'RBA Cash Rate & Statement',
    impact: 'HIGH',
    forecast: '4.35%',
    previous: '4.35%',
    volatilityPips: '45 - 80 pips',
    notes: 'Directly impacts AUD/USD and AUD/JPY during Sydney-Tokyo sessions.',
  },
];

export const NewsCalendarModal: React.FC<NewsCalendarModalProps> = ({ isOpen, onClose }) => {
  const [filterImpact, setFilterImpact] = useState<'ALL' | 'HIGH'>('ALL');

  if (!isOpen) return null;

  const filteredEvents =
    filterImpact === 'ALL'
      ? ECONOMIC_EVENTS
      : ECONOMIC_EVENTS.filter((e) => e.impact === 'HIGH');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl border border-cyan-500/30 bg-[#070b16] shadow-2xl shadow-cyan-950/50 text-slate-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 px-6 py-4 bg-slate-900/40">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/40 bg-cyan-500/10 text-cyan-400 shadow-md shadow-cyan-500/20">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-wide">
                  NOVA FX • High-Impact Economic Calendar
                </h3>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-[10px] font-mono font-semibold text-cyan-400">
                  REAL-TIME RISK ENGINE
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Red folder news alerts & prop firm risk protection
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

        {/* Filter bar */}
        <div className="px-6 py-3 border-b border-slate-800/70 bg-slate-900/20 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">Filter Impact:</span>
            <button
              onClick={() => setFilterImpact('ALL')}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition-all cursor-pointer ${
                filterImpact === 'ALL'
                  ? 'bg-cyan-500 text-black shadow-sm shadow-cyan-500/30'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              All Events ({ECONOMIC_EVENTS.length})
            </button>
            <button
              onClick={() => setFilterImpact('HIGH')}
              className={`flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-semibold transition-all cursor-pointer ${
                filterImpact === 'HIGH'
                  ? 'bg-red-500 text-white shadow-sm shadow-red-500/30'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <Flame className="h-3 w-3" />
              High Impact Only
            </button>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-amber-400 font-mono">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
            Prop firm rules: Close trades 2 mins before High Impact release
          </div>
        </div>

        {/* Content table */}
        <div className="overflow-y-auto p-6 space-y-4">
          <div className="space-y-3">
            {filteredEvents.map((event) => {
              const isHigh = event.impact === 'HIGH';
              return (
                <div
                  key={event.id}
                  className={`rounded-xl border p-4 transition-all ${
                    isHigh
                      ? 'border-red-500/30 bg-gradient-to-r from-red-950/15 via-slate-900/60 to-slate-900/40 hover:border-red-500/50'
                      : 'border-slate-800 bg-slate-900/30 hover:border-slate-700'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="rounded-md border border-slate-700 bg-slate-800 px-2 py-0.5 text-xs font-mono font-bold text-white">
                        {event.currency}
                      </span>
                      <span className="text-xs font-mono text-cyan-400">{event.time}</span>
                      <span
                        className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-mono font-black ${
                          isHigh
                            ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        }`}
                      >
                        {isHigh ? <Flame className="h-3 w-3" /> : null}
                        {event.impact} IMPACT
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                      <span>
                        Forecast: <strong className="text-white">{event.forecast}</strong>
                      </span>
                      <span className="text-slate-600">|</span>
                      <span>
                        Prev: <strong className="text-slate-300">{event.previous}</strong>
                      </span>
                    </div>
                  </div>

                  <h4 className="text-sm font-bold text-white tracking-wide mb-1">
                    {event.eventName}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed mb-2">
                    {event.notes}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-[11px] font-mono text-slate-400">
                    <span className="text-cyan-300">
                      Expected Range Expansion: <strong>{event.volatilityPips}</strong>
                    </span>
                    <span className="text-slate-500">Live Volatility Tracking Active</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Institutional Protocol Notice */}
          <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4 flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 space-y-1">
              <strong className="text-cyan-300 block font-semibold">
                NOVA FX Institutional News Protocol
              </strong>
              <p className="text-slate-400 leading-relaxed">
                We never gamble on news spikes. We wait for the initial news-driven stop sweep to clean retail liquidity. Once displacement creates a clear Fair Value Gap (FVG) on the 1-minute or 5-minute timeframe, we enter on the mitigation with razor-sharp risk.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 px-6 py-3 bg-slate-900/60 flex items-center justify-between text-xs text-slate-400">
          <span>Synced with Major Central Bank Release Schedules</span>
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
