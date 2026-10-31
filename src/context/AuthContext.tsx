import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth } from '../firebase';
import { syncUserProfile } from '../services/dbService';

export interface GoogleAuthUser {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
}

export interface AdminAuthSession {
  username: string;
  role: 'admin';
  displayName?: string;
  token: string;
}

interface AuthContextType {
  // Google User Auth
  googleUser: GoogleAuthUser | null;
  isGoogleAuthenticated: boolean;
  googleLoading: boolean;
  googleError: string | null;
  loginWithGoogle: () => Promise<boolean>;
  logoutGoogle: () => Promise<void>;

  // Protected Admin Auth
  adminSession: AdminAuthSession | null;
  isAdmin: boolean;
  adminLoading: boolean;
  adminError: string | null;
  loginAdmin: (username: string, pass: string) => Promise<boolean>;
  logoutAdmin: () => void;

  clearErrors: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_TOKEN_KEY = 'novafx_admin_token';
const ADMIN_USER_KEY = 'novafx_admin_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Google user state
  const [googleUser, setGoogleUser] = useState<GoogleAuthUser | null>(null);
  const [googleLoading, setGoogleLoading] = useState<boolean>(true);
  const [googleError, setGoogleError] = useState<string | null>(null);

  // Admin session state
  const [adminSession, setAdminSession] = useState<AdminAuthSession | null>(null);
  const [adminLoading, setAdminLoading] = useState<boolean>(true);
  const [adminError, setAdminError] = useState<string | null>(null);

  // Listen to Google Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser: FirebaseUser | null) => {
      if (fbUser && fbUser.email) {
        const userObj: GoogleAuthUser = {
          uid: fbUser.uid,
          displayName: fbUser.displayName || fbUser.email.split('@')[0],
          email: fbUser.email,
          photoURL: fbUser.photoURL || undefined,
        };
        setGoogleUser(userObj);

        // Sync to Firestore & backend registered user catalog
        await syncUserProfile({
          uid: userObj.uid,
          displayName: userObj.displayName,
          email: userObj.email,
          photoURL: userObj.photoURL,
        });
      } else {
        setGoogleUser(null);
      }
      setGoogleLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Check saved admin session on startup
  useEffect(() => {
    async function verifySavedAdmin() {
      const savedToken = localStorage.getItem(ADMIN_TOKEN_KEY);
      const savedUser = localStorage.getItem(ADMIN_USER_KEY);

      if (savedToken && savedUser) {
        try {
          const res = await fetch('/api/admin/verify', {
            headers: { Authorization: `Bearer ${savedToken}` },
          });
          if (res.ok) {
            const data = await res.json();
            if (data.valid) {
              setAdminSession({
                ...JSON.parse(savedUser),
                token: savedToken,
              });
              setAdminLoading(false);
              return;
            }
          }
        } catch {
          // If server temporarily unreachable, keep valid saved session
          try {
            setAdminSession({
              ...JSON.parse(savedUser),
              token: savedToken,
            });
            setAdminLoading(false);
            return;
          } catch {
            localStorage.removeItem(ADMIN_TOKEN_KEY);
            localStorage.removeItem(ADMIN_USER_KEY);
          }
        }
      }

      setAdminSession(null);
      setAdminLoading(false);
    }

    verifySavedAdmin();
  }, []);

  // Google Login / Signup
  const loginWithGoogle = async (): Promise<boolean> => {
    setGoogleLoading(true);
    setGoogleError(null);
    try {
      const provider = new GoogleAuthProvider();
      // Prompt account selection
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      const fbUser = result.user;

      if (!fbUser.email) {
        throw new Error('Google account must have an associated email address.');
      }

      const userObj: GoogleAuthUser = {
        uid: fbUser.uid,
        displayName: fbUser.displayName || fbUser.email.split('@')[0],
        email: fbUser.email,
        photoURL: fbUser.photoURL || undefined,
      };

      setGoogleUser(userObj);

      // Record in Firestore and backend database
      await syncUserProfile({
        uid: userObj.uid,
        displayName: userObj.displayName,
        email: userObj.email,
        photoURL: userObj.photoURL,
      });

      setGoogleLoading(false);
      return true;
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user') {
        setGoogleError('Sign-in popup closed before completion.');
      } else {
        setGoogleError(err.message || 'Google authentication failed.');
      }
      setGoogleLoading(false);
      return false;
    }
  };

  // Google Logout
  const logoutGoogle = async (): Promise<void> => {
    try {
      await signOut(auth);
      setGoogleUser(null);
    } catch (err: any) {
      console.warn('Sign out warning:', err);
    }
  };

  // Secure Server-Side Admin Login (No frontend credentials check)
  const loginAdmin = async (username: string, pass: string): Promise<boolean> => {
    setAdminLoading(true);
    setAdminError(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password: pass }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Invalid administrator credentials.');
      }

      const session: AdminAuthSession = {
        username: data.user?.username || username,
        role: 'admin',
        displayName: data.user?.displayName || 'Administrator',
        token: data.token,
      };

      localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
      localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(session));
      setAdminSession(session);
      setAdminLoading(false);
      return true;
    } catch (err: any) {
      setAdminError(err.message || 'Authentication error. Please check server configuration.');
      setAdminLoading(false);
      return false;
    }
  };

  // Admin Logout
  const logoutAdmin = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    localStorage.removeItem(ADMIN_USER_KEY);
    setAdminSession(null);
  };

  const clearErrors = () => {
    setGoogleError(null);
    setAdminError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        googleUser,
        isGoogleAuthenticated: !!googleUser,
        googleLoading,
        googleError,
        loginWithGoogle,
        logoutGoogle,
        adminSession,
        isAdmin: !!adminSession,
        adminLoading,
        adminError,
        loginAdmin,
        logoutAdmin,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
