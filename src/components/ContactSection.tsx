import React, { useState } from 'react';
import { SiteSettings } from '../types';
import { submitContactInquiry } from '../services/dbService';
import { Mail, Send, MapPin, MessageSquare, CheckCircle2, AlertCircle, Clock, Shield } from 'lucide-react';

interface ContactSectionProps {
  settings: SiteSettings;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ settings }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Prop Firm Evaluation Inquiry',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await submitContactInquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: 'Prop Firm Evaluation Inquiry',
        message: '',
      });
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage('Failed to send message. Please try again or reach out on Telegram.');
    }
  };

  return (
    <section id="contact" className="relative py-20 lg:py-28 bg-slate-950 border-t border-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Contact Info & Desk Hours */}
          <div>
            <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
              INSTITUTIONAL ADMISSIONS DESK
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              Initiate Contact With Our Mentorship Team
            </h2>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              Have questions regarding our Smart Money Concepts curriculum, 1-on-1 coaching availability, or custom prop firm risk audits? Our senior desk responds promptly.
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Admissions Email</h4>
                  <p className="text-xs text-slate-400">{settings.contactEmail || 'admissions@novafx.academy'}</p>
                  <span className="text-[11px] text-cyan-400 font-mono">Response time: &lt; 2 Hours</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Telegram Admissions Hotline</h4>
                  <p className="text-xs text-slate-400">{settings.contactTelegram || '@NovaFX_Desk'}</p>
                  <span className="text-[11px] text-cyan-400 font-mono">Real-time Desk Coordinator</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Desks & Facilities</h4>
                  <p className="text-xs text-slate-400">
                    {settings.contactLocation || 'Canary Wharf, London & Wall St, New York'}
                  </p>
                  <span className="text-[11px] text-slate-400">Institutional Partner Network</span>
                </div>
              </div>
            </div>

            {/* Trading session hours */}
            <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/40 p-5 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                <Clock className="h-4 w-4" /> Live Desk Active Hours (GMT)
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span>London Killzone Window:</span>
                <span className="font-mono font-bold text-white">07:00 - 11:00 GMT</span>
              </div>
              <div className="flex justify-between py-1">
                <span>New York Overlap Window:</span>
                <span className="font-mono font-bold text-white">12:30 - 17:00 GMT</span>
              </div>
            </div>
          </div>

          {/* Right: Working Contact Form */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-xl shadow-2xl shadow-cyan-500/5">
            <h3 className="text-xl font-bold text-white">Send An Inquiry</h3>
            <p className="mt-1 text-xs text-slate-400">
              Submit your inquiry and a senior desk coach will follow up with personalized guidance.
            </p>

            {submitSuccess ? (
              <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 mb-3">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h4 className="text-base font-bold text-white">Inquiry Received</h4>
                <p className="mt-2 text-xs text-slate-300">
                  Thank you! Your inquiry has been routed to our Senior Desk Mentors. We will reach out via email shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-4 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-bold text-black hover:bg-emerald-400 transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {errorMessage && (
                  <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-950/20 p-3 text-xs text-red-400">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Mercer"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Topic / Objective
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="Prop Firm Evaluation Inquiry">Prop Firm Evaluation ($100K - $300K)</option>
                    <option value="Smart Money Concepts Academy Access">SMC Academy Curriculum</option>
                    <option value="Live Trading Room Pass">Live Trading Room Pass</option>
                    <option value="1-on-1 VIP Mentorship Application">1-on-1 VIP Mentorship</option>
                    <option value="Other / General Question">Other / General Question</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Your Message / Current Trading Experience *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your current trading experience, challenges faced, or funded account goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 py-3.5 text-sm font-bold text-black hover:from-cyan-300 hover:to-blue-500 shadow-xl shadow-cyan-500/25 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send className={`h-4 w-4 ${isSubmitting ? 'animate-pulse' : ''}`} />
                  {isSubmitting ? 'Routing to Desk...' : 'Transmit Inquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
