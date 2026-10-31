import React, { useState } from 'react';
import { X, TrendingUp, TrendingDown, Activity, AlertCircle, RefreshCw, BarChart2, Shield } from 'lucide-react';

interface MarketSentimentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SentimentAsset {
  pair: string;
  category: 'Forex Major' | 'Commodity' | 'Indices';
  longPercent: number;
  shortPercent: number;
  bias: 'Strong Bullish' | 'Bullish' | 'Neutral' | 'Bearish' | 'Strong Bearish';
  institutionalFlow: string;
  smartMoneySignal: string;
}

const ASSET_SENTIMENTS: SentimentAsset[] = [
  {
    pair: 'EUR/USD',
    category: 'Forex Major',
    longPercent: 32,
    shortPercent: 68,
    bias: 'Bullish',
    institutionalFlow: 'Smart Money Accumulation',
    smartMoneySignal: 'Heavy retail crowd shorting into support; interbank algorithms targeting Buy-Side Liquidity (BSL) at 1.0920.',
  },
  {
    pair: 'GBP/USD',
    category: 'Forex Major',
    longPercent: 37,
    shortPercent: 63,
    bias: 'Bullish',
    institutionalFlow: 'Displacement Expansion',
    smartMoneySignal: 'Retail trapped in trendline breakout shorts; London open expansion targeting clean equal highs.',
  },
  {
    pair: 'XAU/USD (Gold)',
    category: 'Commodity',
    longPercent: 74,
    shortPercent: 26,
    bias: 'Bearish',
    institutionalFlow: 'Retail Trap Exhaustion',
    smartMoneySignal: 'Extreme retail long saturation (>70%). High probability of aggressive Judas swing downwards to purge stop losses.',
  },
  {
    pair: 'USD/JPY',
    category: 'Forex Major',
    longPercent: 52,
    shortPercent: 48,
    bias: 'Neutral',
    institutionalFlow: 'Consolidation & Range Building',
    smartMoneySignal: 'Equilibrium pricing near monthly VWAP. Awaiting Bank of Japan rate guidance before committing capital.',
  },
  {
    pair: 'US30 (Dow Jones)',
    category: 'Indices',
    longPercent: 29,
    shortPercent: 71,
    bias: 'Strong Bullish',
    institutionalFlow: 'Institutional Short Squeeze',
    smartMoneySignal: 'Massive retail short imbalance creates fuel for rapid intraday upward continuation to fresh all-time highs.',
  },
];

export const MarketSentimentModal: React.FC<MarketSentimentModalProps> = ({ isOpen, onClose }) => {
  const [filter, setFilter] = useState<'ALL' | 'EXTREME'>('ALL');

  if (!isOpen) return null;

  const displayedAssets =
    filter === 'EXTREME'
      ? ASSET_SENTIMENTS.filter((a) => a.longPercent >= 65 || a.shortPercent >= 65)
      : ASSET_SENTIMENTS;

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
              <BarChart2 className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-wide">
                  NOVA FX • Live Market Sentiment & Positioning
                </h3>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-[10px] font-mono font-semibold text-cyan-400">
                  CONTRARIAN ENGINE
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Retail order book positioning vs institutional Smart Money footprints
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg border border-slate-800 bg-slate-900/80 p-2 text-slate-400 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="px-6 py-3 border-b border-slate-800/70 bg-slate-900/20 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">Filter Pairs:</span>
            <button
              onClick={() => setFilter('ALL')}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition-all cursor-pointer ${
                filter === 'ALL'
                  ? 'bg-cyan-500 text-black shadow-sm shadow-cyan-500/30'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              All Assets ({ASSET_SENTIMENTS.length})
            </button>
            <button
              onClick={() => setFilter('EXTREME')}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition-all cursor-pointer ${
                filter === 'EXTREME'
                  ? 'bg-purple-500 text-white shadow-sm shadow-purple-500/30'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              Extreme Sentiment (&gt;65% Imbalance)
            </button>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-cyan-300 font-mono">
            <Activity className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
            Contrarian Principle: Trade opposite retail herd bias
          </div>
        </div>

        {/* Content list */}
        <div className="overflow-y-auto p-6 space-y-4">
          <div className="space-y-4">
            {displayedAssets.map((asset) => {
              const isBullish = asset.bias.includes('Bullish');
              const isBearish = asset.bias.includes('Bearish');

              return (
                <div
                  key={asset.pair}
                  className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 space-y-3 hover:border-cyan-500/30 transition-all"
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-base font-bold text-white tracking-wide">
                        {asset.pair}
                      </span>
                      <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-400 border border-slate-700">
                        {asset.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 font-mono">Institutional Bias:</span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-md px-2.5 py-0.5 text-xs font-mono font-bold ${
                          isBullish
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : isBearish
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                            : 'bg-slate-800 text-slate-300 border border-slate-700'
                        }`}
                      >
                        {isBullish ? <TrendingUp className="h-3 w-3" /> : isBearish ? <TrendingDown className="h-3 w-3" /> : null}
                        {asset.bias}
                      </span>
                    </div>
                  </div>

                  {/* Positioning Bar */}
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-emerald-400 font-semibold">
                        Retail Long: {asset.longPercent}%
                      </span>
                      <span className="text-rose-400 font-semibold">
                        Retail Short: {asset.shortPercent}%
                      </span>
                    </div>

                    <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden flex">
                      <div
                        style={{ width: `${asset.longPercent}%` }}
                        className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-500"
                      />
                      <div
                        style={{ width: `${asset.shortPercent}%` }}
                        className="h-full bg-gradient-to-r from-rose-500 to-rose-700 transition-all duration-500"
                      />
                    </div>
                  </div>

                  {/* Smart Money Interpretation */}
                  <div className="rounded-lg border border-cyan-500/20 bg-slate-950/60 p-3 text-xs text-slate-300 space-y-1">
                    <span className="font-semibold text-cyan-300 flex items-center gap-1.5">
                      <Shield className="h-3.5 w-3.5 text-cyan-400" />
                      Smart Money Analysis • {asset.institutionalFlow}
                    </span>
                    <p className="text-[12px] text-slate-400 leading-relaxed">
                      {asset.smartMoneySignal}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Educational Note */}
          <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 space-y-1">
              <strong className="text-cyan-300 block font-semibold">
                Why 90% of Retail Traders Lose on Sentiment
              </strong>
              <p className="text-slate-400 leading-relaxed">
                Retail sentiment measures open orders from retail brokerages. Because 80–90% of retail traders lose long-term, extreme one-sided positioning (&gt;65% long or short) indicates massive liquidity pools for institutional algorithmic market makers to target.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 px-6 py-3 bg-slate-900/60 flex items-center justify-between text-xs text-slate-400">
          <span>Synced with Interbank Order Flow Imbalance Models</span>
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
