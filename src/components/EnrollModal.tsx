import React, { useState } from 'react';
import { Course, PricingPlan } from '../types';
import { X, CheckCircle2, ShieldCheck, Zap, Lock, CreditCard, Sparkles, ArrowRight } from 'lucide-react';

interface EnrollModalProps {
  item: Course | PricingPlan | null;
  isYearly?: boolean;
  onClose: () => void;
}

export const EnrollModal: React.FC<EnrollModalProps> = ({ item, isYearly = false, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto' | 'apple'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [enrollmentId, setEnrollmentId] = useState('');

  if (!item) return null;

  const isCourse = 'duration' in item;
  const title = 'title' in item ? item.title : item.name;
  const price = isCourse
    ? (item as Course).price
    : isYearly
    ? (item as PricingPlan).priceYearly
    : (item as PricingPlan).priceMonthly;

  const handleEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      setEnrollmentId('NVX-' + Math.floor(100000 + Math.random() * 900000));
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl border border-cyan-500/40 bg-slate-950 p-6 sm:p-8 shadow-2xl my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full border border-slate-800 bg-slate-900 p-2 text-slate-400 hover:text-white cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {isCompleted ? (
          <div className="text-center py-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 mb-4 animate-bounce">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
              Admission Confirmed
            </span>
            <h2 className="mt-3 text-2xl font-extrabold text-white">Welcome to NOVA FX</h2>
            <p className="mt-2 text-xs text-slate-300">
              Congratulations <strong>{name}</strong>! Your seat in <strong>{title}</strong> has been secured.
            </p>

            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-left font-mono text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Enrollment ID:</span>
                <span className="font-bold text-cyan-400">{enrollmentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Program:</span>
                <span className="font-bold text-white truncate max-w-[200px]">{title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Student Email:</span>
                <span className="text-slate-200">{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Access Credentials:</span>
                <span className="text-emerald-400">Dispatched to Email</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-xl bg-cyan-500 py-3 text-xs font-bold text-black hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                Access Member Dashboard & Discord
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Zap className="h-4 w-4" /> Secure Enrollment Checkout
            </div>
            <h3 className="text-2xl font-bold text-white">{title}</h3>
            <p className="mt-1 text-xs text-slate-400">
              {isCourse ? 'Comprehensive institutional curriculum' : 'Academy tier membership'}
            </p>

            {/* Price display */}
            <div className="mt-4 flex items-baseline justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <div>
                <span className="text-xs text-slate-400">Total Investment:</span>
                <div className="font-mono text-2xl font-extrabold text-white">
                  ${price}{' '}
                  <span className="text-xs font-normal text-slate-400">
                    USD {isCourse ? '(One-time)' : isYearly ? '/ Year' : '/ Month'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                <ShieldCheck className="h-3.5 w-3.5" /> 30-Day Guarantee
              </div>
            </div>

            <form onSubmit={handleEnroll} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Liam Foster"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  Email (Access will be sent here) *
                </label>
                <input
                  type="email"
                  required
                  placeholder="liam@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              {/* Payment selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`rounded-xl border p-2 text-center text-xs font-medium transition-all ${
                      paymentMethod === 'card'
                        ? 'border-cyan-500 bg-cyan-950/30 text-white'
                        : 'border-slate-800 bg-slate-900 text-slate-400'
                    }`}
                  >
                    Credit / Debit
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('crypto')}
                    className={`rounded-xl border p-2 text-center text-xs font-medium transition-all ${
                      paymentMethod === 'crypto'
                        ? 'border-cyan-500 bg-cyan-950/30 text-white'
                        : 'border-slate-800 bg-slate-900 text-slate-400'
                    }`}
                  >
                    USDT / Crypto
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple')}
                    className={`rounded-xl border p-2 text-center text-xs font-medium transition-all ${
                      paymentMethod === 'apple'
                        ? 'border-cyan-500 bg-cyan-950/30 text-white'
                        : 'border-slate-800 bg-slate-900 text-slate-400'
                    }`}
                  >
                    Apple / Google Pay
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 py-3.5 text-xs font-bold text-black hover:from-cyan-300 hover:to-blue-500 shadow-xl shadow-cyan-500/25 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Lock className="h-3.5 w-3.5" />
                  {isProcessing ? 'Securing Seat...' : `Complete Enrollment • $${price}`}
                </button>
              </div>

              <p className="text-center text-[10px] text-slate-400 flex items-center justify-center gap-1">
                <Lock className="h-3 w-3 text-cyan-400" />
                256-Bit Bank Level Encrypted Checkout
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
