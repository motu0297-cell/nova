import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import {
  SiteSettings,
  Course,
  BlogPost,
  PricingPlan,
  Testimonial,
  FAQ,
} from './types';
import {
  initializeDatabaseIfEmpty,
  subscribeSiteSettings,
  subscribeCourses,
  subscribeBlogPosts,
  subscribePricingPlans,
  subscribeTestimonials,
  subscribeFaqs,
  getSiteSettings,
  getCourses,
  getBlogPosts,
  getPricingPlans,
  getTestimonials,
  getFaqs,
} from './services/dbService';
import {
  initialSiteSettings,
  initialCourses,
  initialBlogPosts,
  initialPricingPlans,
  initialTestimonials,
  initialFaqs,
} from './data/initialData';

// Public Components
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { FeaturesSection } from './components/FeaturesSection';
import { CoursesSection } from './components/CoursesSection';
import { RoadmapSection } from './components/RoadmapSection';
import { PricingSection } from './components/PricingSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BlogSection } from './components/BlogSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

// Modals
import { CourseModal } from './components/CourseModal';
import { BlogModal } from './components/BlogModal';
import { EnrollModal } from './components/EnrollModal';
import { GoogleAuthModal } from './components/GoogleAuthModal';
import { SessionClockModal } from './components/SessionClockModal';
import { NewsCalendarModal } from './components/NewsCalendarModal';
import { MarketSentimentModal } from './components/MarketSentimentModal';

// Admin Components
import { AdminLogin } from './admin/AdminLogin';
import { AdminDashboard } from './admin/AdminDashboard';

function MainAppContent() {
  const { isAdmin, adminLoading } = useAuth();

  // Route state ('site' | 'admin')
  const [currentView, setCurrentView] = useState<'site' | 'admin'>(() => {
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
      return 'admin';
    }
    return 'site';
  });

  // Database content states
  const [settings, setSettings] = useState<SiteSettings>(initialSiteSettings);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [posts, setPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [plans, setPlans] = useState<PricingPlan[]>(initialPricingPlans);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [faqs, setFaqs] = useState<FAQ[]>(initialFaqs);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Active Modals
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [enrollItem, setEnrollItem] = useState<{
    item: Course | PricingPlan;
    isYearly?: boolean;
  } | null>(null);
  const [isGoogleAuthOpen, setIsGoogleAuthOpen] = useState(false);
  const [isSessionClockOpen, setIsSessionClockOpen] = useState(false);
  const [isNewsCalendarOpen, setIsNewsCalendarOpen] = useState(false);
  const [isMarketSentimentOpen, setIsMarketSentimentOpen] = useState(false);

  // Handle URL history routing
  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname.startsWith('/admin')) {
        setCurrentView('admin');
      } else {
        setCurrentView('site');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (view: 'site' | 'admin') => {
    setCurrentView(view);
    const path = view === 'admin' ? '/admin' : '/';
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Seed DB and subscribe to real-time changes
  useEffect(() => {
    let unsubs: (() => void)[] = [];

    async function init() {
      // 1. Seed if empty
      await initializeDatabaseIfEmpty();

      // 2. Fetch fresh initial data
      const [s, c, p, pl, t, f] = await Promise.all([
        getSiteSettings(),
        getCourses(),
        getBlogPosts(),
        getPricingPlans(),
        getTestimonials(),
        getFaqs(),
      ]);

      setSettings(s);
      setCourses(c);
      setPosts(p);
      setPlans(pl);
      setTestimonials(t);
      setFaqs(f);
      setIsDataLoaded(true);

      // 3. Attach real-time subscriptions
      try {
        const u1 = subscribeSiteSettings((newSettings) => setSettings(newSettings));
        const u2 = subscribeCourses((newCourses) => setCourses(newCourses));
        const u3 = subscribeBlogPosts((newPosts) => setPosts(newPosts));
        const u4 = subscribePricingPlans((newPlans) => setPlans(newPlans));
        const u5 = subscribeTestimonials((newTestimonials) => setTestimonials(newTestimonials));
        const u6 = subscribeFaqs((newFaqs) => setFaqs(newFaqs));
        unsubs = [u1, u2, u3, u4, u5, u6];
      } catch (err) {
        console.warn('Real-time subscription note:', err);
      }
    }

    init();

    return () => {
      unsubs.forEach((u) => u && u());
    };
  }, []);

  const refreshAllData = async () => {
    const [s, c, p, pl, t, f] = await Promise.all([
      getSiteSettings(),
      getCourses(),
      getBlogPosts(),
      getPricingPlans(),
      getTestimonials(),
      getFaqs(),
    ]);
    setSettings(s);
    setCourses(c);
    setPosts(p);
    setPlans(pl);
    setTestimonials(t);
    setFaqs(f);
  };

  // If viewing admin route
  if (currentView === 'admin') {
    if (adminLoading) {
      return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-cyan-400">
          <div className="flex flex-col items-center gap-3">
            <span className="h-8 w-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
            <span className="text-xs font-mono">Verifying server credentials...</span>
          </div>
        </div>
      );
    }

    if (!isAdmin) {
      return <AdminLogin onBackToSite={() => navigateTo('site')} />;
    }

    return (
      <AdminDashboard
        initialSettings={settings}
        initialCourses={courses}
        initialPosts={posts}
        initialPlans={plans}
        initialTestimonials={testimonials}
        initialFaqs={faqs}
        onBackToSite={() => navigateTo('site')}
        onRefreshAll={refreshAllData}
      />
    );
  }

  // PUBLIC WEBSITE VIEW
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* Top Navbar with Uploaded Logo, RGB LED dot, exact-centered Join Community, Quick Links Bar, Google Auth, and 3-line hamburger menu */}
      <Navbar
        settings={settings}
        onOpenAdmin={() => navigateTo('admin')}
        onOpenAuth={() => setIsGoogleAuthOpen(true)}
        onOpenSessionClock={() => setIsSessionClockOpen(true)}
        onOpenNewsCalendar={() => setIsNewsCalendarOpen(true)}
        onOpenMarketSentiment={() => setIsMarketSentimentOpen(true)}
      />

      {/* Main Sections respecting visibility toggles */}
      <main>
        {settings.sectionVisibility.hero && (
          <HeroSection
            settings={settings}
            onOpenEnroll={() => {
              if (courses.length > 0) {
                setEnrollItem({ item: courses[0] });
              }
            }}
            onOpenAuth={() => setIsGoogleAuthOpen(true)}
          />
        )}

        {settings.sectionVisibility.about && (
          <AboutSection
            settings={settings}
            onOpenEnroll={() => {
              if (plans.length > 1) {
                setEnrollItem({ item: plans[1] });
              }
            }}
          />
        )}

        {settings.sectionVisibility.features && (
          <FeaturesSection
            onOpenEnroll={() => {
              if (plans.length > 1) {
                setEnrollItem({ item: plans[1] });
              }
            }}
          />
        )}

        {settings.sectionVisibility.courses && (
          <CoursesSection
            courses={courses}
            onSelectCourse={(course) => setSelectedCourse(course)}
            onEnroll={(course) => setEnrollItem({ item: course })}
          />
        )}

        {settings.sectionVisibility.roadmap && (
          <RoadmapSection
            onOpenEnroll={() => {
              if (courses.length > 0) {
                setEnrollItem({ item: courses[0] });
              }
            }}
          />
        )}

        {settings.sectionVisibility.pricing && (
          <PricingSection
            plans={plans}
            onSelectPlan={(plan, isYearly) => setEnrollItem({ item: plan, isYearly })}
          />
        )}

        {settings.sectionVisibility.testimonials && (
          <TestimonialsSection testimonials={testimonials} />
        )}

        {settings.sectionVisibility.blog && (
          <BlogSection posts={posts} onSelectPost={(post) => setSelectedPost(post)} />
        )}

        {settings.sectionVisibility.faq && <FaqSection faqs={faqs} />}

        {settings.sectionVisibility.contact && <ContactSection settings={settings} />}
      </main>

      {/* Footer */}
      <Footer settings={settings} onOpenAdmin={() => navigateTo('admin')} />

      {/* Modals */}
      {selectedCourse && (
        <CourseModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          onEnroll={(c) => {
            setSelectedCourse(null);
            setEnrollItem({ item: c });
          }}
        />
      )}

      {selectedPost && (
        <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}

      {enrollItem && (
        <EnrollModal
          item={enrollItem.item}
          isYearly={enrollItem.isYearly}
          onClose={() => setEnrollItem(null)}
        />
      )}

      {/* Working Google Auth Modal */}
      <GoogleAuthModal
        isOpen={isGoogleAuthOpen}
        onClose={() => setIsGoogleAuthOpen(false)}
      />

      {/* Global Forex Session Clock Modal */}
      <SessionClockModal
        isOpen={isSessionClockOpen}
        onClose={() => setIsSessionClockOpen(false)}
      />

      {/* High-Impact Economic News Calendar Modal */}
      <NewsCalendarModal
        isOpen={isNewsCalendarOpen}
        onClose={() => setIsNewsCalendarOpen(false)}
      />

      {/* Live Market Sentiment & Positioning Modal */}
      <MarketSentimentModal
        isOpen={isMarketSentimentOpen}
        onClose={() => setIsMarketSentimentOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}
