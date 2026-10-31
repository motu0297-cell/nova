import React, { useState } from 'react';
import { FAQ } from '../types';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

interface FaqSectionProps {
  faqs: FAQ[];
}

export const FaqSection: React.FC<FaqSectionProps> = ({ faqs }) => {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="relative py-20 lg:py-28 bg-slate-950/80 border-t border-slate-900">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
            CLEAR ANSWERS
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Everything you need to know about our institutional methodology, prop evaluations, and community.
          </p>
        </div>

        {/* Accordions */}
        <div className="mt-12 space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`overflow-hidden rounded-2xl border transition-all ${
                  isOpen
                    ? 'border-cyan-500/40 bg-slate-900/80 shadow-lg shadow-cyan-500/5'
                    : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="flex w-full items-center justify-between p-6 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-4 w-4 text-cyan-400 shrink-0" />
                    <span className="text-sm sm:text-base font-bold text-white">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-cyan-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-slate-800/80 px-6 pt-2 pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <p>{faq.answer}</p>
                    {faq.category && (
                      <div className="mt-3 inline-block rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-cyan-400">
                        Category: {faq.category}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 text-center">
          <p className="text-sm font-semibold text-white">Have a specific question about your prop challenge?</p>
          <p className="mt-1 text-xs text-slate-400">Our senior mentors respond within 2 hours during market sessions.</p>
          <a
            href="#contact"
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-xs font-bold text-cyan-400 hover:bg-cyan-500/20 transition-colors"
          >
            <MessageCircle className="h-3.5 w-3.5" /> Speak With Desk Admissions
          </a>
        </div>
      </div>
    </section>
  );
};
