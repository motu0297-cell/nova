import React from 'react';
import {
  Video,
  BarChart,
  Target,
  ShieldCheck,
  MessageSquare,
  History,
  Calculator,
  Zap,
  ArrowRight,
} from 'lucide-react';

interface FeaturesSectionProps {
  onOpenEnroll: () => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ onOpenEnroll }) => {
  const features = [
    {
      icon: Video,
      title: 'Daily Killzone Live Execution',
      description:
        'Watch senior mentors trade London Open (07:30 GMT) and New York Open (13:15 GMT) live. Hear the multi-timeframe narrative before the candle prints.',
      badge: 'Mon - Thu Live',
    },
    {
      icon: Target,
      title: 'Proprietary SMC Order Block Map',
      description:
        'Institutional TradingView scripts highlighting Fair Value Gaps, algorithmic discount levels, and high-probability liquidity pools in real time.',
      badge: 'Exclusive Tool',
    },
    {
      icon: ShieldCheck,
      title: 'Prop Firm Pass Coaching ($100K - $300K)',
      description:
        'Direct personal reviews of your trading journal before and during FTMO / Funding Pips evaluations to ensure strict drawdown rule adherence.',
      badge: '91.8% Pass Rate',
    },
    {
      icon: MessageSquare,
      title: 'VIP Discord Trade Alerts & Setups',
      description:
        'Real-time swing and intraday trade setups with exact invalidation levels, partial targets, and institutional liquidity context.',
      badge: 'Active 24/7',
    },
    {
      icon: History,
      title: '100+ Hours Live Session Archive',
      description:
        'Every single live session is recorded and categorized by market conditions (NFP, CPI, trend days, range days) for weekend backtesting.',
      badge: 'Full Archive',
    },
    {
      icon: Calculator,
      title: 'Algorithmic Position Sizing Tool',
      description:
        'Dynamic risk spreadsheet calibrating exact lot sizes to 0.5% risk based on your currency pair, account currency, and exact pip stop distance.',
      badge: 'Risk Engine',
    },
  ];

  return (
    <section id="features" className="relative py-20 lg:py-28 bg-slate-950 border-t border-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
            THE NOVA FX ARSENAL
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
            Everything You Need to Secure & Scale Six-Figure Funded Capital
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Engineered from ground up to replace retail confusion with systematic institutional execution.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div
                key={i}
                className="group relative rounded-2xl border border-slate-800/90 bg-slate-900/40 p-7 backdrop-blur-sm neon-glow-card"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-slate-800 border border-slate-700/80 px-2.5 py-1 text-[11px] font-medium text-cyan-300">
                    {feat.badge}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {feat.title}
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Feature highlight CTA banner */}
        <div className="mt-16 relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/40 p-8 lg:p-12">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-400">
                <Zap className="h-3 w-3" /> Live Trading Room Passes Available
              </span>
              <h3 className="mt-4 text-2xl sm:text-3xl font-extrabold text-white">
                Ready to Experience Live London Execution With Senior Mentors?
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Join our private trading room this Monday and see institutional order flow analyzed live in real time.
              </p>
            </div>

            <button
              onClick={onOpenEnroll}
              className="shrink-0 flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3.5 text-sm font-bold text-black hover:bg-cyan-400 shadow-xl shadow-cyan-500/25 transition-all hover:scale-105 cursor-pointer"
            >
              Access Live Trading Room
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
