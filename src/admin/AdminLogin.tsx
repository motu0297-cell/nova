import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onBackToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onBackToSite }) => {
  const { loginAdmin, adminLoading, adminError, clearErrors } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();
    await loginAdmin(username, password);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 py-12 bg-grid-pattern relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] pointer-events-none" />

      {/* Official Brand Logo */}
      <div className="flex items-center gap-3 mb-8">
        <img
          src="/assets/aistudio/NOVA_FX_LOGO_c07e6c8d.png"
          alt="NOVA FX"
          className="h-12 w-12 rounded-2xl object-cover border border-cyan-400/40 shadow-xl shadow-cyan-500/30"
        />
        <div>
          <div className="flex items-center gap-1">
            <span className="text-2xl font-black tracking-wider text-white">NOVA</span>
            <span className="text-2xl font-black tracking-wider text-cyan-400">FX</span>
          </div>
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            Administrative Control Terminal
          </p>
        </div>
      </div>

      <div className="w-full max-w-md rounded-3xl border border-cyan-500/30 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl relative z-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-3">
            <Shield className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-extrabold text-white">Admin Authentication</h2>
          <p className="mt-1 text-xs text-slate-400">
            Backend server-side verification required. Only the configured administrator can access this panel.
          </p>
        </div>

        {adminError && (
          <div className="mb-6 flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-950/20 p-3.5 text-xs text-red-300">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-400" />
            <span>{adminError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Admin Username
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Configured admin username..."
                className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
              />
              <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Admin Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] text-slate-400 hover:text-cyan-400 cursor-pointer"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Configured admin password..."
                className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
              />
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              Verified strictly against server environment variables.
            </p>
          </div>

          <button
            type="submit"
            disabled={adminLoading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 py-3.5 text-xs font-bold text-black hover:from-cyan-300 hover:to-blue-500 shadow-xl shadow-cyan-500/25 transition-all cursor-pointer disabled:opacity-50 mt-2"
          >
            {adminLoading ? 'Verifying on Server...' : 'Access Admin Panel'}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-800 text-center">
          <button
            onClick={onBackToSite}
            className="text-xs text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            ← Return to Public Website
          </button>
        </div>
      </div>
    </div>
  );
};
