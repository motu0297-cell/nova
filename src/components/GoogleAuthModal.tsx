import React from 'react';
import { useAuth } from '../context/AuthContext';
import { X, LogOut, CheckCircle2, Shield, AlertCircle, Sparkles } from 'lucide-react';

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({ isOpen, onClose }) => {
  const {
    googleUser,
    isGoogleAuthenticated,
    googleLoading,
    googleError,
    loginWithGoogle,
    logoutGoogle,
    clearErrors,
  } = useAuth();

  if (!isOpen) return null;

  const handleSignIn = async () => {
    clearErrors();
    const success = await loginWithGoogle();
    if (success) {
      onClose();
    }
  };

  const handleSignOut = async () => {
    await logoutGoogle();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-3xl border border-cyan-500/30 bg-slate-950 p-6 sm:p-8 shadow-2xl my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full border border-slate-800 bg-slate-900 p-2 text-slate-400 hover:text-white cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {isGoogleAuthenticated && googleUser ? (
          // Signed-In Profile View
          <div className="text-center py-4">
            <div className="relative mx-auto h-20 w-20 mb-4">
              {googleUser.photoURL ? (
                <img
                  src={googleUser.photoURL}
                  alt={googleUser.displayName}
                  className="h-full w-full rounded-full object-cover border-2 border-cyan-400 shadow-lg shadow-cyan-500/20"
                />
              ) : (
                <div className="h-full w-full rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-black font-extrabold text-2xl border-2 border-cyan-400">
                  {googleUser.displayName.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-400 border-2 border-slate-950 flex items-center justify-center">
                <CheckCircle2 className="h-3 w-3 text-black" />
              </div>
            </div>

            <span className="rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-400">
              Authenticated Member
            </span>

            <h3 className="mt-3 text-xl font-extrabold text-white">{googleUser.displayName}</h3>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">{googleUser.email}</p>

            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Account ID:</span>
                <span className="font-mono text-cyan-400 text-[11px] truncate max-w-[180px]">
                  {googleUser.uid}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Authentication:</span>
                <span className="text-emerald-400 font-semibold">Google OAuth Verified</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Academy Status:</span>
                <span className="text-white font-medium">Student Portal Active</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-xl bg-cyan-500 py-3 text-xs font-bold text-black hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                Continue to Academy
              </button>

              <button
                type="button"
                onClick={handleSignOut}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 py-2.5 text-xs font-semibold text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                Sign Out of Account
              </button>
            </div>
          </div>
        ) : (
          // Sign-In / Sign-Up View
          <div>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-3 shadow-lg shadow-cyan-500/10">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-extrabold text-white">Student Portal Access</h3>
              <p className="mt-1 text-xs text-slate-400">
                Log in or sign up with your verified Google account to access your trading curriculum and bookmarks.
              </p>
            </div>

            {googleError && (
              <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-950/20 p-3 text-xs text-red-300">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-400" />
                <span>{googleError}</span>
              </div>
            )}

            <div className="space-y-3">
              <button
                type="button"
                onClick={handleSignIn}
                disabled={googleLoading}
                className="w-full flex items-center justify-center gap-3 rounded-2xl border border-slate-700 bg-white py-3.5 px-4 text-xs font-bold text-slate-900 hover:bg-slate-100 shadow-xl shadow-cyan-500/10 transition-all hover:scale-[1.01] cursor-pointer disabled:opacity-50"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                {googleLoading ? 'Connecting with Google...' : 'Continue with Google'}
              </button>

              <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 text-[11px] text-slate-400 space-y-1.5">
                <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                  <Shield className="h-3.5 w-3.5 text-cyan-400" />
                  Instant & Secure Onboarding
                </div>
                <p>• New users are automatically registered to the academy database.</p>
                <p>• Existing students will be seamlessly logged back in.</p>
                <p>• Your progress and enrolled modules are securely preserved.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
