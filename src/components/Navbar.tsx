import React, { useState } from 'react';
import { SiteSettings, HeaderQuickLink } from '../types';
import { X, LogIn, Shield, LogOut, Clock, Calendar, ExternalLink, BarChart2, Link as LinkIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  settings: SiteSettings;
  onOpenAdmin: () => void;
  onOpenAuth: () => void;
  onOpenSessionClock: () => void;
  onOpenNewsCalendar: () => void;
  onOpenMarketSentiment?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  onOpenAdmin,
  onOpenAuth,
  onOpenSessionClock,
  onOpenNewsCalendar,
  onOpenMarketSentiment,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { googleUser, isGoogleAuthenticated, isAdmin, logoutGoogle } = useAuth();

  const handleNavClick = (href: string) => {
    setDrawerOpen(false);
    if (href === '#' || href === '') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // RGB Dot Configuration
  const rgbDot = settings.rgbDotSettings || {
    enabled: true,
    size: 'tiny',
    glowIntensity: 'subtle',
    speed: 'normal',
  };

  const getDotSizeClass = () => {
    switch (rgbDot.size) {
      case 'small':
        return 'h-2 w-2';
      case 'medium':
        return 'h-2.5 w-2.5';
      case 'large':
        return 'h-3 w-3';
      case 'tiny':
      default:
        return 'h-1.5 w-1.5';
    }
  };

  const getDotSpeedStyle = () => {
    if (rgbDot.speed === 'slow') return { animationDuration: '6s' };
    if (rgbDot.speed === 'fast') return { animationDuration: '2s' };
    return { animationDuration: '4s' };
  };

  // Community Button Configuration
  const communityBtn = settings.communityButtonSettings || {
    enabled: true,
    text: 'JOIN COMMUNITY 🚀',
    url: settings.communityWhatsappUrl || 'https://chat.whatsapp.com/NovaFxMentorships',
    theme: 'cyan-blue-purple',
    glow: 'subtle',
  };

  const getCommunityThemeClass = () => {
    switch (communityBtn.theme) {
      case 'emerald-whatsapp':
        return 'bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 border-emerald-400/40';
      case 'electric-neon':
        return 'bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 border-cyan-300/50';
      case 'cyber-gold':
        return 'bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 border-amber-300/40';
      case 'magenta-fire':
        return 'bg-gradient-to-r from-fuchsia-500 via-rose-600 to-purple-600 border-fuchsia-400/40';
      case 'cyan-blue-purple':
      default:
        return 'bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 border-cyan-300/40';
    }
  };

  const getCommunityGlowClass = () => {
    switch (communityBtn.glow) {
      case 'intense':
        return 'shadow-xl shadow-cyan-400/50 hover:shadow-cyan-300/80 ring-1 ring-cyan-300/50';
      case 'none':
        return 'shadow-none border border-slate-700';
      case 'subtle':
      default:
        return 'shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/50';
    }
  };

  // Quick Links Items
  const quickLinksList: HeaderQuickLink[] = (
    settings.headerQuickLinks && settings.headerQuickLinks.length > 0
      ? settings.headerQuickLinks
      : [
          {
            id: 'link-whatsapp',
            key: 'whatsapp',
            title: 'WhatsApp Community',
            url: settings.communityWhatsappUrl || 'https://chat.whatsapp.com/NovaFxMentorships',
            enabled: true,
            order: 1,
            icon: 'whatsapp',
          },
          {
            id: 'link-youtube',
            key: 'youtube',
            title: 'NOVA FX MENTORSHIPS',
            url: settings.youtubeUrl || 'https://youtube.com/@novafx',
            enabled: true,
            order: 2,
            icon: 'youtube',
          },
          {
            id: 'link-session-clock',
            key: 'session-clock',
            title: 'SESSION CLOCK',
            url: '#session-clock',
            enabled: true,
            order: 3,
            icon: 'clock',
            isSpecialAction: true,
          },
          {
            id: 'link-news-calendar',
            key: 'news-calendar',
            title: 'NEWS CALENDAR',
            url: '#news-calendar',
            enabled: true,
            order: 4,
            icon: 'calendar',
            isSpecialAction: true,
          },
          {
            id: 'link-market-sentiment',
            key: 'market-sentiment',
            title: 'MARKET SENTIMENT',
            url: '#sentiment',
            enabled: true,
            order: 5,
            icon: 'sentiment',
            isSpecialAction: true,
          },
        ]
  )
    .filter((l) => l.enabled !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const handleQuickLinkClick = (link: HeaderQuickLink, e: React.MouseEvent) => {
    if (link.key === 'session-clock') {
      if (!link.url || link.url === '#session-clock' || link.url.startsWith('#')) {
        e.preventDefault();
        onOpenSessionClock();
        return;
      }
    }
    if (link.key === 'news-calendar') {
      if (!link.url || link.url === '#news-calendar' || link.url.startsWith('#')) {
        e.preventDefault();
        onOpenNewsCalendar();
        return;
      }
    }
    if (link.key === 'market-sentiment') {
      if (!link.url || link.url === '#sentiment' || link.url.startsWith('#')) {
        e.preventDefault();
        if (onOpenMarketSentiment) {
          onOpenMarketSentiment();
        }
        return;
      }
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#050811]/90 backdrop-blur-xl border-b border-cyan-900/30 shadow-2xl shadow-black/80">
        {/* Main Navbar Row */}
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8">
          {/* LEFT: Existing NOVA FX logo + RGB Animated Glowing LED Dot + MENTORSHIPS subtitle */}
          <div className="flex items-center gap-3 z-10">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#');
              }}
              className="flex items-center gap-3 group"
            >
              {/* Uploaded official NOVA FX Logo */}
              <img
                src="/assets/aistudio/NOVA_FX_LOGO_c07e6c8d.png"
                alt="NOVA FX Official Brand Logo"
                className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl object-cover border border-cyan-400/40 shadow-lg shadow-cyan-500/25 group-hover:shadow-cyan-400/50 group-hover:scale-105 transition-all shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    '/public/assets/aistudio/NOVA_FX_LOGO_c07e6c8d.png';
                }}
              />

              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2">
                  <div className="flex items-center tracking-wider text-xl font-black">
                    <span className="text-white">NOVA</span>
                    <span className="text-cyan-400 ml-1">FX</span>
                  </div>

                  {/* Tiny RGB Animated Glowing LED Dot */}
                  {rgbDot.enabled !== false && (
                    <span
                      title="NOVA FX Live Active State"
                      style={getDotSpeedStyle()}
                      className={`rounded-full animate-rgb-dot shrink-0 inline-block transition-all ${getDotSizeClass()}`}
                    />
                  )}
                </div>

                {/* Subtitle: MENTORSHIPS */}
                <p className="text-[9px] font-bold tracking-[0.25em] text-cyan-400/90 uppercase">
                  MENTORSHIPS
                </p>
              </div>
            </a>
          </div>

          {/* EXACT HORIZONTAL CENTER: JOIN COMMUNITY 🚀 Button with WhatsApp Logo & Neon Gradient */}
          {communityBtn.enabled !== false && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-20">
              <a
                href={communityBtn.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-black text-white hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer animate-gradient-shift ${getCommunityThemeClass()} ${getCommunityGlowClass()}`}
              >
                {/* Official WhatsApp Green Logo Icon */}
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#25D366] p-0.5 shadow-sm shadow-emerald-950/50 group-hover:rotate-6 transition-transform">
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#FFFFFF"
                      d="M17.5 14.38C17.2 14.23 15.72 13.5 15.45 13.4C15.17 13.3 14.97 13.25 14.77 13.55C14.57 13.85 14 14.55 13.82 14.75C13.65 14.95 13.47 14.98 13.17 14.83C12.87 14.68 11.91 14.37 10.77 13.35C9.88 12.56 9.28 11.58 9.11 11.28C8.94 10.98 9.09 10.82 9.24 10.67C9.38 10.53 9.55 10.3 9.7 10.13C9.85 9.96 9.9 9.83 10 9.63C10.1 9.43 10.05 9.26 9.97 9.11C9.9 8.96 9.3 7.48 9.05 6.88C8.81 6.3 8.56 6.38 8.38 6.37C8.21 6.36 8.01 6.36 7.81 6.36C7.61 6.36 7.29 6.43 7.02 6.73C6.75 7.03 5.98 7.75 5.98 9.22C5.98 10.69 7.05 12.11 7.2 12.31C7.35 12.51 9.3 15.52 12.29 16.81C13 17.12 13.56 17.31 13.99 17.44C14.7 17.67 15.34 17.64 15.85 17.56C16.42 17.47 17.61 16.84 17.86 16.14C18.11 15.44 18.11 14.84 18.03 14.71C17.96 14.58 17.76 14.53 17.5 14.38Z"
                    />
                  </svg>
                </span>

                {/* Button Text */}
                <span className="tracking-wider whitespace-nowrap drop-shadow-sm font-extrabold">
                  {communityBtn.text || 'JOIN COMMUNITY 🚀'}
                </span>
              </a>
            </div>
          )}

          {/* RIGHT: Login/Profile + Three-line Hamburger Menu */}
          <div className="flex items-center gap-2 sm:gap-3 z-10">
            {/* Google Authentication Status */}
            {isGoogleAuthenticated && googleUser ? (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-950/20 px-2.5 sm:px-3 py-1.5 text-xs text-white hover:border-cyan-400 transition-all cursor-pointer"
              >
                {googleUser.photoURL ? (
                  <img
                    src={googleUser.photoURL}
                    alt={googleUser.displayName}
                    className="h-6 w-6 rounded-full object-cover border border-cyan-400"
                  />
                ) : (
                  <div className="h-6 w-6 rounded-full bg-cyan-500 text-black font-bold flex items-center justify-center text-[10px]">
                    {googleUser.displayName.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="hidden md:inline font-medium max-w-[100px] truncate text-slate-200">
                  {googleUser.displayName}
                </span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="hidden sm:flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:border-cyan-500/50 hover:text-white transition-all cursor-pointer"
              >
                <LogIn className="h-3.5 w-3.5 text-cyan-400" />
                <span>Login</span>
              </button>
            )}

            {/* Modern Three-Line Hamburger Menu Button */}
            <button
              type="button"
              onClick={() => setDrawerOpen(!drawerOpen)}
              aria-label="Toggle Navigation Menu"
              className="group relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl border border-cyan-500/40 bg-slate-900/90 p-2 shadow-lg shadow-cyan-500/10 hover:border-cyan-400 hover:shadow-cyan-400/30 transition-all cursor-pointer"
            >
              <span
                className={`h-0.5 w-5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 ${
                  drawerOpen ? 'translate-y-2 rotate-45' : 'group-hover:scale-x-110'
                }`}
              />
              <span
                className={`h-0.5 w-5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 ${
                  drawerOpen ? 'opacity-0' : 'group-hover:scale-x-110'
                }`}
              />
              <span
                className={`h-0.5 w-5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 ${
                  drawerOpen ? '-translate-y-2 -rotate-45' : 'group-hover:scale-x-110'
                }`}
              />
            </button>
          </div>
        </div>

        {/* HEADER & QUICK LINKS BAR IMMEDIATELY BELOW NAVBAR (Manageable from Admin Panel) */}
        {quickLinksList.length > 0 && (
          <div className="border-t border-cyan-900/30 bg-[#060a17]/95 px-4 py-2 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 sm:gap-4 flex-wrap">
              {quickLinksList.map((link) => {
                // Check if external or action
                const isSpecial =
                  link.isSpecialAction ||
                  link.key === 'session-clock' ||
                  link.key === 'news-calendar' ||
                  link.key === 'market-sentiment';

                const isExternal =
                  !isSpecial ||
                  (link.url && !link.url.startsWith('#') && link.url.startsWith('http'));

                // Render Icon
                const renderIcon = () => {
                  if (link.key === 'whatsapp' || link.icon === 'whatsapp') {
                    return (
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#25D366] p-0.5">
                        <svg className="h-2.5 w-2.5 fill-white" viewBox="0 0 24 24">
                          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2Z" />
                        </svg>
                      </span>
                    );
                  }
                  if (link.key === 'youtube' || link.icon === 'youtube') {
                    return (
                      <span className="flex h-3.5 w-4.5 items-center justify-center rounded-sm bg-[#FF0000] p-0.5 shadow-sm">
                        <svg className="h-2 w-2 fill-white ml-0.5" viewBox="0 0 24 24">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </span>
                    );
                  }
                  if (link.key === 'session-clock' || link.icon === 'clock') {
                    return <Clock className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />;
                  }
                  if (link.key === 'news-calendar' || link.icon === 'calendar') {
                    return <Calendar className="h-3.5 w-3.5 text-blue-400" />;
                  }
                  if (link.key === 'market-sentiment' || link.icon === 'sentiment') {
                    return <BarChart2 className="h-3.5 w-3.5 text-purple-400" />;
                  }
                  return <LinkIcon className="h-3.5 w-3.5 text-slate-400" />;
                };

                const getBadge = () => {
                  if (link.key === 'session-clock') {
                    return <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />;
                  }
                  if (link.key === 'news-calendar') {
                    return (
                      <span className="rounded bg-red-500/20 px-1 py-0.2 text-[9px] font-mono text-red-400 border border-red-500/30">
                        HIGH IMPACT
                      </span>
                    );
                  }
                  if (link.key === 'market-sentiment') {
                    return (
                      <span className="rounded bg-purple-500/20 px-1 py-0.2 text-[9px] font-mono text-purple-300 border border-purple-500/30">
                        CONTRARIAN
                      </span>
                    );
                  }
                  return null;
                };

                if (isExternal) {
                  return (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs font-bold text-slate-200 hover:border-cyan-500/50 hover:bg-slate-800/80 hover:text-white transition-all shadow-sm cursor-pointer"
                    >
                      {renderIcon()}
                      <span className="tracking-wide">{link.title}</span>
                      {getBadge()}
                      <ExternalLink className="h-3 w-3 text-slate-500" />
                    </a>
                  );
                }

                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={(e) => handleQuickLinkClick(link, e)}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs font-bold text-slate-200 hover:border-cyan-400 hover:bg-cyan-950/30 hover:text-white transition-all shadow-sm cursor-pointer"
                  >
                    {renderIcon()}
                    <span className="tracking-wide">{link.title}</span>
                    {getBadge()}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Slide Drawer for Hamburger Menu */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative z-10 w-full max-w-sm border-l border-cyan-500/30 bg-[#060a16] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/assets/aistudio/NOVA_FX_LOGO_c07e6c8d.png"
                    alt="NOVA FX"
                    className="h-9 w-9 rounded-xl object-cover border border-cyan-400/40 shadow-md shadow-cyan-500/30"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-base font-black tracking-wider text-white">NOVA</span>
                      <span className="text-base font-black tracking-wider text-cyan-400">FX</span>
                      {rgbDot.enabled !== false && (
                        <span className="h-1.5 w-1.5 rounded-full animate-rgb-dot shrink-0" />
                      )}
                    </div>
                    <p className="text-[9px] font-bold text-cyan-400 tracking-widest uppercase">
                      MENTORSHIPS
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setDrawerOpen(false)}
                  className="rounded-full border border-slate-800 bg-slate-900 p-2 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="mt-6 space-y-1">
                <button
                  onClick={() => handleNavClick('#')}
                  className="w-full rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-slate-200 hover:bg-slate-900 hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavClick('#about')}
                  className="w-full rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-slate-200 hover:bg-slate-900 hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  About
                </button>
                <button
                  onClick={() => handleNavClick('#courses')}
                  className="w-full rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-slate-200 hover:bg-slate-900 hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Courses
                </button>
                <button
                  onClick={() => handleNavClick('#roadmap')}
                  className="w-full rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-slate-200 hover:bg-slate-900 hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Learning Roadmap
                </button>
                <button
                  onClick={() => handleNavClick('#pricing')}
                  className="w-full rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-slate-200 hover:bg-slate-900 hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Pricing
                </button>
                <button
                  onClick={() => handleNavClick('#blog')}
                  className="w-full rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-slate-200 hover:bg-slate-900 hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Blog
                </button>
                <button
                  onClick={() => handleNavClick('#contact')}
                  className="w-full rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-slate-200 hover:bg-slate-900 hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Contact
                </button>

                {/* Quick Links in Drawer */}
                <div className="my-2 border-t border-slate-800/80 pt-2 space-y-1">
                  <button
                    onClick={() => {
                      setDrawerOpen(false);
                      onOpenSessionClock();
                    }}
                    className="w-full flex items-center gap-2 rounded-xl px-4 py-2 text-left text-xs font-semibold text-cyan-300 hover:bg-cyan-950/30 transition-colors cursor-pointer"
                  >
                    <Clock className="h-3.5 w-3.5 text-cyan-400" />
                    Session Clock
                  </button>
                  <button
                    onClick={() => {
                      setDrawerOpen(false);
                      onOpenNewsCalendar();
                    }}
                    className="w-full flex items-center gap-2 rounded-xl px-4 py-2 text-left text-xs font-semibold text-blue-300 hover:bg-blue-950/30 transition-colors cursor-pointer"
                  >
                    <Calendar className="h-3.5 w-3.5 text-blue-400" />
                    News Calendar
                  </button>
                  {onOpenMarketSentiment && (
                    <button
                      onClick={() => {
                        setDrawerOpen(false);
                        onOpenMarketSentiment();
                      }}
                      className="w-full flex items-center gap-2 rounded-xl px-4 py-2 text-left text-xs font-semibold text-purple-300 hover:bg-purple-950/30 transition-colors cursor-pointer"
                    >
                      <BarChart2 className="h-3.5 w-3.5 text-purple-400" />
                      Market Sentiment
                    </button>
                  )}
                </div>

                <div className="my-3 border-t border-slate-800" />

                {/* Login / Sign Up item */}
                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    onOpenAuth();
                  }}
                  className="w-full flex items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-cyan-400 hover:bg-slate-900 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    {isGoogleAuthenticated && googleUser
                      ? `Student: ${googleUser.displayName}`
                      : 'Login / Sign Up'}
                  </span>
                  {isGoogleAuthenticated && (
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  )}
                </button>

                {/* Admin Panel item: STRICTLY VISIBLE ONLY TO AUTHENTICATED ADMIN */}
                {isAdmin && (
                  <button
                    onClick={() => {
                      setDrawerOpen(false);
                      onOpenAdmin();
                    }}
                    className="w-full flex items-center justify-between rounded-xl border border-cyan-500/30 bg-cyan-950/20 px-4 py-2.5 text-left text-sm font-bold text-cyan-400 hover:bg-cyan-900/30 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-cyan-400" />
                      Admin Panel
                    </span>
                    <span className="rounded bg-cyan-400/20 px-1.5 py-0.5 text-[10px] font-mono">
                      AUTHORIZED
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="pt-6 border-t border-slate-800">
              {isGoogleAuthenticated && (
                <button
                  onClick={async () => {
                    await logoutGoogle();
                    setDrawerOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 py-2.5 text-xs font-semibold text-red-400 hover:bg-red-500/20 transition-colors mb-3 cursor-pointer"
                >
                  <LogOut className="h-4 w-4" /> Sign Out
                </button>
              )}

              <p className="text-[11px] text-slate-500 text-center font-mono">
                NOVA FX Institutional Academy • 2026
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
