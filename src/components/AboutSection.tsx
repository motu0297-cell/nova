import React from 'react';
import { SiteSettings } from '../types';
import { ShieldCheck, Target, Layers, Cpu, Award, Check, X, ArrowUpRight } from 'lucide-react';

interface AboutSectionProps {
  settings: SiteSettings;
  onOpenEnroll: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ settings, onOpenEnroll }) => {
  const pillars = [
    {
      icon: Target,
      title: 'Institutional Order Flow',
      description:
        'We track where central bank algorithms engineer liquidity pools. Rather than guessing with retail indicators, you enter at the sweep of retail stops alongside the liquidity provider.',
    },
    {
      icon: Layers,
      title: 'Quantitative Risk Modeling',
      description:
        'Capital preservation is our primary doctrine. Our 0.5% risk equations and trailing drawdown buffer models ensure you can sustain 20 consecutive losses without failing prop evaluations.',
    },
    {
      icon: Cpu,
      title: 'Algorithmic State Conditioning',
      description:
        'Developed with professional performance psychologists to eliminate revenge trading, FOMO, and impulsive size increases. You execute with mechanical detachment.',
    },
  ];

  const mentors = [
    {
      name: 'Marcus Vance',
      role: 'Head of Institutional Flow',
      experience: 'Ex-Barclays FX Desk • 12 Yrs Market Veteran',
      stats: '$3.4M Lifetime Prop Allocations',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Elena Rostova',
      role: 'Quantitative Risk Director',
      experience: 'Hedge Fund Quant Analyst • M.Sc Mathematical Finance',
      stats: '94.2% Student Evaluation Audit Pass',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Tariq Al-Mansoor',
      role: 'Session Volatility Specialist',
      experience: 'Gold & Indices Specialist • 8 Yrs Prop Trader',
      stats: 'Over $780K in Verified Payouts',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <section id="about" className="relative py-20 lg:py-28 bg-slate-950/70 border-t border-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
            ABOUT THE ACADEMY
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
            {settings.aboutTitle}
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            {settings.aboutDescription}
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="group relative rounded-2xl border border-slate-800 bg-slate-900/40 p-8 hover:border-cyan-500/50 hover:bg-slate-900/80 transition-all duration-300"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Comparison: Retail vs NOVA FX */}
        <div className="mt-20 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Why 95% of Retail Traders Fail vs How NOVA FX Graduates Succeed
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-400">
              The shift from retail indicator blindness to interbank order flow clarity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Retail */}
            <div className="rounded-xl border border-red-500/20 bg-red-950/10 p-6 space-y-4">
              <div className="flex items-center gap-2 text-red-400 font-bold text-base">
                <X className="h-5 w-5" /> The Retail Trap (The 95%)
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <X className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  Buys into double tops and trendline touches where institutional sell algorithms hunt stop losses.
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  Relies on lagging indicators (RSI, Stochastics, Moving Averages) that print after price has already expanded.
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  Risks 2% to 5% per trade, guaranteeing prop firm account liquidation within 3 consecutive losses.
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  Revenge trades during high-volatility news events like CPI and FOMC without a structural thesis.
                </li>
              </ul>
            </div>

            {/* NOVA FX */}
            <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/10 p-6 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <Check className="h-5 w-5" /> The NOVA FX Institutional Edge
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  Waits for retail liquidity pools to be swept, entering on the Fair Value Gap (FVG) retest with 1:4+ R:R.
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  Reads naked price action, order blocks, and session killzones (London Open, NY Open, Asian High/Low).
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  Fixed 0.5% risk modeling with trailing buffer logic engineered specifically for six-figure prop accounts.
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  Mechanical pre-market checklist and daily 2-loss circuit breaker rule to preserve peak emotional capital.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mentors Showcase */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
              FACULTY & DESK LEADERSHIP
            </span>
            <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-white">
              Learn Directly From Institutional Flow Analysts
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mentors.map((mentor, i) => (
              <div
                key={i}
                className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 transition-all hover:border-cyan-500/40"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-950">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-bold text-white">{mentor.name}</h4>
                    <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">
                      Desk Mentor
                    </span>
                  </div>
                  <p className="mt-1 text-xs font-medium text-slate-300">{mentor.role}</p>
                  <p className="mt-3 text-xs text-slate-400">{mentor.experience}</p>
                  <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-cyan-400">
                    <span>{mentor.stats}</span>
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
