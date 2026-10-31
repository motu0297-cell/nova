import React, { useState } from 'react';
import { SiteSettings } from '../types';
import { Send, Check, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface FooterProps {
  settings: SiteSettings;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onOpenAdmin }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { isAdmin } = useAuth();

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="border-t border-slate-900 bg-slate-950 text-slate-400">
      {/* Newsletter Pre-Footer */}
      <div className="border-b border-slate-900/80 bg-slate-900/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
              WEEKLY MARKET INTELLIGENCE
            </span>
            <h3 className="mt-1 text-xl font-bold text-white">
              Subscribe to the Institutional Sunday Outlook
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Key liquidity zones, high-impact economic news traps, and weekly bias delivered every Sunday at 18:00 GMT.
            </p>
          </div>

          <div className="w-full md:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 text-xs text-emerald-400">
                <Check className="h-4 w-4" /> You are subscribed to Sunday Outlook!
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-2 w-full max-w-md">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none w-full"
                />
                <button
                  type="submit"
                  className="shrink-0 flex items-center gap-1.5 rounded-xl bg-cyan-500 px-4 py-2.5 text-xs font-bold text-black hover:bg-cyan-400 transition-colors cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" /> Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column with Uploaded Official Logo */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <img
                src="/assets/aistudio/NOVA_FX_LOGO_c07e6c8d.png"
                alt="NOVA FX"
                className="h-10 w-10 rounded-xl object-cover border border-cyan-400/40 shadow-md shadow-cyan-500/20"
              />
              <div className="flex items-center gap-1">
                <span className="text-lg font-black tracking-wider text-white">NOVA</span>
                <span className="text-lg font-black tracking-wider text-cyan-400">FX</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Global institution-grade trading education academy specializing in Smart Money Concepts, interbank liquidity flow, and prop firm capital scaling.
            </p>

            {/* Social Media Links from Settings */}
            <div className="flex items-center gap-2 pt-2">
              {settings.socialLinks.map((s, idx) => (
                <a
                  key={idx}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:border-cyan-500/40 hover:text-cyan-400 transition-all text-xs uppercase font-mono"
                  title={s.platform}
                >
                  {s.platform.charAt(0)}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              {settings.navLinks.slice(0, 5).map((l) => (
                <li key={l.id}>
                  <a href={l.href} className="hover:text-cyan-400 transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Programs & Tools
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#courses" className="hover:text-cyan-400 transition-colors">
                  SMC Mastery Program
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-cyan-400 transition-colors">
                  Prop Firm Accelerator ($100K - $300K)
                </a>
              </li>
              <li>
                <a href="#roadmap" className="hover:text-cyan-400 transition-colors">
                  4-Stage Trader Roadmap
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-cyan-400 transition-colors">
                  Live Trading Room Passes
                </a>
              </li>
              {/* Admin Panel link strictly visible ONLY if authorized */}
              {isAdmin && (
                <li>
                  <button
                    onClick={onOpenAdmin}
                    className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    <Shield className="h-3 w-3" /> Admin Dashboard
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Risk Disclaimer */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Institutional Compliance
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              CFTC Rule 4.41: Hypothetical or simulated performance results have certain limitations. Trading foreign exchange and leveraged contracts carries high risk and may not be suitable for all investors. NOVA FX provides educational curriculum only.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} NOVA FX Trading Academy. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Risk Disclosure</span>
            {isAdmin && (
              <button
                onClick={onOpenAdmin}
                className="text-cyan-400/80 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
              >
                <Shield className="h-3 w-3" /> Admin Console
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
