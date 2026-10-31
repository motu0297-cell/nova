import React from 'react';
import { SiteSettings } from '../types';
import { ArrowRight, CheckCircle2, Play, Zap, Shield, BookOpen, Target, Gem, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  settings: SiteSettings;
  onOpenEnroll: () => void;
  onOpenAuth: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ settings, onOpenEnroll, onOpenAuth }) => {
  const handleCtaClick = (destination: string) => {
    if (destination.startsWith('#')) {
      const el = document.querySelector(destination);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    onOpenEnroll();
  };

  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-grid-pattern">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-radial-gradient pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-40 left-10 w-96 h-96 rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-400 backdrop-blur-md mb-6 shadow-lg shadow-cyan-500/10">
            <Zap className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
            <span>INSTITUTIONAL FOREX & SMART MONEY ACADEMY</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.15]">
            {settings.heroHeadline}
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {settings.heroSubheadline}
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleCtaClick(settings.heroPrimaryCta.destination)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 px-7 py-3.5 text-sm font-bold text-black shadow-xl shadow-cyan-500/30 hover:from-cyan-300 hover:to-blue-500 transition-all hover:scale-105 cursor-pointer"
            >
              {settings.heroPrimaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={onOpenAuth}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-7 py-3.5 text-sm font-semibold text-slate-200 hover:border-cyan-500/50 hover:text-white hover:bg-slate-800 transition-all cursor-pointer backdrop-blur-sm"
            >
              <Play className="h-4 w-4 fill-cyan-400 text-cyan-400" />
              <span>Join Student Portal</span>
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-cyan-400" /> 1-on-1 Prop Firm Evaluation Support
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-cyan-400" /> Real Mentorship by Institutional Analysts
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-cyan-400" /> Verifiable Funded Trader Community
            </span>
          </div>
        </div>

        {/* 
          REPLACEMENT FOR DEMO TRADING CONTENT:
          Premium Trading Education Centerpiece
          Mandated Exact Text:
          - "📈 MASTER THE MARKETS"
          - "🎯 Learn Smart. Trade With Discipline."
          - "💎 Build Your Trading Knowledge. Develop Your Strategy. Manage Your Risk."
        */}
        <div className="mt-14 lg:mt-18 relative rounded-3xl border border-cyan-500/40 bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-slate-950 p-8 sm:p-12 shadow-2xl shadow-cyan-500/10 backdrop-blur-2xl">
          {/* Subtle neon corner accents */}
          <div className="absolute top-0 right-0 h-32 w-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 h-32 w-32 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* 1. MASTER THE MARKETS */}
            <div className="inline-block">
              <span className="font-extrabold italic text-2xl sm:text-3xl md:text-4xl uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 drop-shadow-md">
                📈 MASTER THE MARKETS
              </span>
            </div>

            {/* 2. Learn Smart. Trade With Discipline. */}
            <div>
              <h2 className="font-extrabold italic text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
                🎯 Learn Smart. Trade With Discipline.
              </h2>
            </div>

            {/* 3. Build Your Trading Knowledge. Develop Your Strategy. Manage Your Risk. */}
            <div className="pt-2">
              <p className="font-extrabold italic text-lg sm:text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-cyan-200 to-cyan-400 leading-relaxed max-w-3xl mx-auto">
                💎 Build Your Trading Knowledge. Develop Your Strategy. Manage Your Risk.
              </p>
            </div>

            {/* 
              ADMIN PHOTO UPLOAD MANAGER DISPLAY AREA
              Completely replaced the 3 feature text items.
              Displays the uploaded image configured in Website Image Manager with custom size, fit, and position.
              If no image is uploaded, displays a clean dark fintech placeholder with zero old feature texts.
            */}
            {settings.showcaseImageSettings?.enabled !== false && (
              <div className="mt-10 pt-6 border-t border-slate-800/80">
                {settings.showcaseImageSettings?.imageUrl ? (
                  <div className="group relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-slate-950 shadow-2xl shadow-cyan-950/40">
                    <div
                      className={`w-full overflow-hidden flex items-center justify-center ${
                        settings.showcaseImageSettings.size === 'small'
                          ? 'h-56 sm:h-64'
                          : settings.showcaseImageSettings.size === 'large'
                          ? 'h-96 sm:h-[480px]'
                          : settings.showcaseImageSettings.size === 'full'
                          ? 'h-[460px] sm:h-[580px]'
                          : 'h-72 sm:h-96'
                      }`}
                    >
                      <img
                        src={settings.showcaseImageSettings.imageUrl}
                        alt={settings.showcaseImageSettings.altText || 'NOVA FX Showcase'}
                        className={`w-full h-full transition-transform duration-700 group-hover:scale-[1.02] ${
                          settings.showcaseImageSettings.fit === 'contain' ? 'object-contain bg-slate-950' : 'object-cover'
                        } ${
                          settings.showcaseImageSettings.position === 'top'
                            ? 'object-top'
                            : settings.showcaseImageSettings.position === 'bottom'
                            ? 'object-bottom'
                            : 'object-center'
                        }`}
                      />
                    </div>

                    {/* Gradient Overlay & Optional Caption */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4 sm:p-6">
                      {settings.showcaseImageSettings.caption && (
                        <p className="text-xs sm:text-sm font-semibold text-cyan-300 backdrop-blur-md bg-slate-950/60 px-3 py-1.5 rounded-lg border border-cyan-500/20">
                          {settings.showcaseImageSettings.caption}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Clean dark fintech placeholder when no image uploaded */
                  <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-950/50 p-8 sm:p-12 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 mb-3">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-bold text-slate-300">
                      NOVA FX Institutional Media Space
                    </p>
                    <p className="mt-1 text-xs text-slate-500 font-mono">
                      Admin can upload and manage custom visual showcase from Website Image Manager
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
          {settings.stats.map((stat, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-900/50 p-5 backdrop-blur-sm hover:border-cyan-500/40 transition-all group"
            >
              <div className="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-cyan-500/5 blur-2xl group-hover:bg-cyan-500/15 transition-all" />
              <p className="font-mono text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-300">
                {stat.label}
              </p>
              {stat.sublabel && (
                <p className="mt-0.5 text-[11px] text-slate-400">{stat.sublabel}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
