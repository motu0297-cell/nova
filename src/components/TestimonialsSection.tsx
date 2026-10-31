import React from 'react';
import { Testimonial } from '../types';
import { Star, CheckCircle, ShieldCheck, Quote } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <section id="testimonials" className="relative py-20 lg:py-28 bg-slate-950/80 border-t border-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
            VERIFIED GRADUATE SUCCESS
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            Real Funded Accounts. Real Bi-Weekly Payouts.
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Over $18.4 Million in certified prop firm allocations unlocked by NOVA FX traders worldwide.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/50 p-7 backdrop-blur-sm hover:border-cyan-500/40 transition-all duration-300"
            >
              <div>
                {/* Header: Avatar, Name, Funded Badge */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={test.avatarUrl}
                      alt={test.studentName}
                      className="h-12 w-12 rounded-full object-cover border-2 border-cyan-500/30"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80';
                      }}
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-white">{test.studentName}</h4>
                        {test.verified && (
                          <CheckCircle className="h-3.5 w-3.5 text-cyan-400 fill-cyan-400/20" />
                        )}
                      </div>
                      <p className="text-xs text-slate-400">{test.role}</p>
                    </div>
                  </div>

                  <span className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono font-bold text-emerald-400">
                    {test.fundedAmount}
                  </span>
                </div>

                {/* Rating Stars */}
                <div className="mt-4 flex items-center gap-1">
                  {[...Array(test.rating || 5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="mt-3 text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                  "{test.quote}"
                </p>
              </div>

              {/* Verified Payout Footer */}
              {test.payoutProof && (
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    {test.payoutProof}
                  </span>
                  <span className="text-[11px] text-slate-500">FTMO / MFF Audited</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
