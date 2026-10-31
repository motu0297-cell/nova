import React, { useState } from 'react';
import { PricingPlan } from '../types';
import { Check, Zap, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

interface PricingSectionProps {
  plans: PricingPlan[];
  onSelectPlan: (plan: PricingPlan, isYearly: boolean) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ plans, onSelectPlan }) => {
  const [isYearly, setIsYearly] = useState<boolean>(true);

  return (
    <section id="pricing" className="relative py-20 lg:py-28 bg-slate-950 border-t border-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
            MEMBERSHIP TIERS
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            Choose Your Level of Market Commitment
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Transparent pricing. Zero hidden fees. Cancel or upgrade anytime with one click.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-slate-800 bg-slate-900/80 p-1.5 backdrop-blur-md">
            <button
              onClick={() => setIsYearly(false)}
              className={`rounded-full px-5 py-2 text-xs font-semibold transition-all cursor-pointer ${
                !isYearly ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-semibold transition-all cursor-pointer ${
                isYearly ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="rounded-full bg-emerald-500/20 text-emerald-300 px-2 py-0.5 text-[10px] font-bold">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan) => {
            const price = isYearly ? plan.priceYearly : plan.priceMonthly;
            const isPopular = plan.isPopular;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-3xl border transition-all duration-300 p-8 ${
                  isPopular
                    ? 'border-cyan-400 bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-950 shadow-2xl shadow-cyan-500/15 scale-105 z-10'
                    : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-4 py-1 text-xs font-bold text-black shadow-lg shadow-cyan-500/30">
                      <Sparkles className="h-3 w-3 fill-black" />
                      {plan.badge || 'MOST POPULAR'}
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    {!isPopular && plan.badge && (
                      <span className="rounded-full border border-slate-700 bg-slate-800 px-2.5 py-0.5 text-[11px] font-medium text-slate-300">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-xs sm:text-sm text-slate-400 min-h-[40px]">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mt-6 flex items-baseline gap-1 border-b border-slate-800/80 pb-6">
                    <span className="font-mono text-4xl sm:text-5xl font-extrabold text-white">
                      ${price}
                    </span>
                    <span className="text-sm font-medium text-slate-400">
                      / month {isYearly && <span className="text-xs text-cyan-400">(billed annually)</span>}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="mt-6 space-y-3.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Included in this plan:
                    </p>
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                        <Check className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="mt-8 pt-6 border-t border-slate-800/80">
                  <button
                    onClick={() => onSelectPlan(plan, isYearly)}
                    className={`w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-xs font-bold transition-all cursor-pointer ${
                      isPopular
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-black hover:from-cyan-300 hover:to-blue-500 shadow-lg shadow-cyan-500/25 hover:scale-[1.02]'
                        : 'border border-slate-700 bg-slate-800 text-white hover:bg-slate-700'
                    }`}
                  >
                    {plan.ctaText || 'Get Started'}
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <p className="mt-3 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                    30-Day Money-Back Satisfaction Guarantee
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
