import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, Target, Shield, Award, Zap, ArrowRight } from 'lucide-react';

interface RoadmapSectionProps {
  onOpenEnroll: () => void;
}

export const RoadmapSection: React.FC<RoadmapSectionProps> = ({ onOpenEnroll }) => {
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages = [
    {
      phase: 'Phase 01',
      title: 'Foundation & Market Anatomy',
      timeline: 'Weeks 1 - 3',
      objective: 'Transitioning from retail confusion to clean institutional market structure.',
      deliverables: [
        'Multi-timeframe mapping: Monthly, Weekly, Daily, 4-Hour, and 15-Minute alignment',
        'Swing highs/lows vs internal inducement structure',
        'Economic calendar mastery and avoiding dangerous high-impact volatility traps',
        'TradingView custom clean chart workspace setup',
      ],
      milestone: 'Consistent identification of Higher-Timeframe (HTF) market bias on EUR/USD and GBP/USD.',
      badge: 'Level 1: Novice to System',
    },
    {
      phase: 'Phase 02',
      title: 'Smart Money Concepts & Order Flow',
      timeline: 'Weeks 4 - 7',
      objective: 'Decoding how institutional algorithms sweep liquidity before genuine expansions.',
      deliverables: [
        'Buy-Side Liquidity (BSL) and Sell-Side Liquidity (SSL) pool mapping',
        'Fair Value Gaps (FVG) and premium vs discount equilibrium zones',
        'Institutional Order Block (OB) entry refinement to 1-Minute and 5-Minute sniper executions',
        'Asian Range sweep into London Open Judas Swing model',
      ],
      milestone: 'Achieving consistent 1:3 to 1:5 Risk-to-Reward executions on demo accounts.',
      badge: 'Level 2: Institutional Edge',
    },
    {
      phase: 'Phase 03',
      title: 'Quantitative Risk & Psychological Conditioning',
      timeline: 'Weeks 8 - 10',
      objective: 'Protecting capital mathematically to make account failure statistically impossible.',
      deliverables: [
        'The 0.5% risk modeling equation with daily maximum drawdown circuit breaker',
        'Neuroscience-based behavioral triggers: eliminating revenge trading and premature closing',
        'Trade Journal statistical auditing (expectancy, win rate, average R:R, drawdown duration)',
        'Pre-market mental state activation checklist',
      ],
      milestone: '30-trade verified journal with positive mathematical expectancy and zero rule violations.',
      badge: 'Level 3: Funded Ready',
    },
    {
      phase: 'Phase 04',
      title: 'Prop Firm Evaluation & Capital Scaling',
      timeline: 'Weeks 11+',
      objective: 'Passing $100K to $300K prop challenges and withdrawing bi-weekly 80-90% profit splits.',
      deliverables: [
        'FTMO, Funding Pips, and Alpha Capital challenge protocol adherence',
        'Stage 1 (8%) and Stage 2 (5%) pacing without rushed entries',
        'Bi-weekly profit split withdrawal management and institutional scaling tier unlock',
        'Direct 1-on-1 mentor audit prior to live account activation',
      ],
      milestone: 'Official Certificate of Funded Status and first $5,000+ payout cleared.',
      badge: 'Level 4: Professional Trader',
    },
  ];

  return (
    <section id="roadmap" className="relative py-20 lg:py-28 bg-slate-950/80 border-t border-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
            THE SYSTEMATIC PATHWAY
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            The 4-Stage Funded Trader Roadmap
          </h2>
          <p className="mt-3 text-base text-slate-300">
            A battle-tested progression taking ambitious individuals from total beginners to disciplined, six-figure funded operators.
          </p>
        </div>

        {/* Stage Timeline Navigation */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3">
          {stages.map((stage, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStage(idx)}
              className={`rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                activeStage === idx
                  ? 'border-cyan-500 bg-cyan-950/30 shadow-lg shadow-cyan-500/15'
                  : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`font-mono text-xs font-bold ${
                    activeStage === idx ? 'text-cyan-400' : 'text-slate-400'
                  }`}
                >
                  {stage.phase}
                </span>
                <span className="text-[10px] font-medium text-slate-400">{stage.timeline}</span>
              </div>
              <h3 className="mt-2 text-sm font-bold text-white truncate">{stage.title}</h3>
              <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-slate-400">
                <span>View Details</span>
                <ChevronRight className="h-3 w-3" />
              </div>
            </button>
          ))}
        </div>

        {/* Active Stage Detailed Display */}
        <div className="mt-8 rounded-2xl border border-cyan-500/30 bg-slate-900/60 p-6 sm:p-10 backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400 mb-2">
                <Zap className="h-3 w-3" />
                {stages[activeStage].badge}
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {stages[activeStage].phase}: {stages[activeStage].title}
              </h3>
              <p className="mt-2 text-sm text-slate-300 max-w-2xl">
                {stages[activeStage].objective}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 font-mono text-xs font-semibold text-slate-300">
                Duration: {stages[activeStage].timeline}
              </span>
              <button
                onClick={onOpenEnroll}
                className="flex items-center gap-1.5 rounded-xl bg-cyan-500 px-5 py-2.5 text-xs font-bold text-black hover:bg-cyan-400 shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
              >
                Join This Phase
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Deliverables */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
                What You Master In This Phase:
              </h4>
              <ul className="mt-4 space-y-3.5">
                {stages[activeStage].deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Target Milestone */}
            <div className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Award className="h-4 w-4" /> Exit Milestone (Required to Progress)
                </span>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed font-medium">
                  "{stages[activeStage].milestone}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                <span>Verified by Senior Desk Mentors</span>
                <span className="text-cyan-400 font-mono">100% Systematic</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
