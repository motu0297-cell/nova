import React, { useState, useEffect } from 'react';
import {
  SiteSettings,
  Course,
  BlogPost,
  PricingPlan,
  Testimonial,
  FAQ,
  ContactInquiry,
  UserProfile,
  HeaderQuickLink,
  RgbDotSettings,
  CommunityButtonSettings,
  ShowcaseImageSettings,
} from '../types';
import {
  saveSiteSettings,
  saveCourse,
  deleteCourse,
  saveBlogPost,
  deleteBlogPost,
  savePricingPlan,
  deletePricingPlan,
  saveTestimonial,
  deleteTestimonial,
  saveFaq,
  deleteFaq,
  getContactInquiries,
  updateInquiryStatus,
  getRegisteredUsers,
} from '../services/dbService';
import { useAuth } from '../context/AuthContext';
import { CourseEditorModal } from './CourseEditorModal';
import { BlogEditorModal } from './BlogEditorModal';
import { PricingEditorModal } from './PricingEditorModal';
import { TestimonialEditorModal } from './TestimonialEditorModal';
import { FaqEditorModal } from './FaqEditorModal';
import { ImageUploadField } from '../components/ImageUploadField';
import {
  LayoutDashboard,
  FileText,
  GraduationCap,
  CreditCard,
  MessageSquare,
  HelpCircle,
  Settings,
  Eye,
  LogOut,
  Save,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  Database,
  Layers,
  Inbox,
  Link,
  Shield,
  Users,
  Search,
  Calendar,
  Mail,
  UserCheck,
  Image as ImageIcon,
  Sparkles,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Sliders,
  EyeOff,
} from 'lucide-react';

interface AdminDashboardProps {
  initialSettings: SiteSettings;
  initialCourses: Course[];
  initialPosts: BlogPost[];
  initialPlans: PricingPlan[];
  initialTestimonials: Testimonial[];
  initialFaqs: FAQ[];
  onBackToSite: () => void;
  onRefreshAll: () => Promise<void>;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  initialSettings,
  initialCourses,
  initialPosts,
  initialPlans,
  initialTestimonials,
  initialFaqs,
  onBackToSite,
  onRefreshAll,
}) => {
  const { adminSession, logoutAdmin } = useAuth();

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    'header-links' | 'image-manager' | 'users' | 'cms' | 'sections' | 'courses' | 'blog' | 'pricing' | 'testimonials' | 'faqs' | 'nav' | 'inquiries'
  >('header-links');

  // Working States
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [plans, setPlans] = useState<PricingPlan[]>(initialPlans);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [faqs, setFaqs] = useState<FAQ[]>(initialFaqs);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [registeredUsers, setRegisteredUsers] = useState<UserProfile[]>([]);
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [usersLoading, setUsersLoading] = useState(false);

  // Modals
  const [editingCourse, setEditingCourse] = useState<Course | null | 'new'>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null | 'new'>(null);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null | 'new'>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null | 'new'>(null);
  const [editingFaq, setEditingFaq] = useState<FAQ | null | 'new'>(null);

  // Status notifications
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Load registered users and inquiries
  useEffect(() => {
    async function loadData() {
      setUsersLoading(true);
      const [inqData, usersData] = await Promise.all([
        getContactInquiries(),
        getRegisteredUsers(adminSession?.token),
      ]);
      setInquiries(inqData);
      setRegisteredUsers(usersData);
      setUsersLoading(false);
    }
    loadData();
  }, [adminSession?.token]);

  // Sync props when updated from parent
  useEffect(() => {
    setSettings(initialSettings);
  }, [initialSettings]);
  useEffect(() => {
    setCourses(initialCourses);
  }, [initialCourses]);
  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);
  useEffect(() => {
    setPlans(initialPlans);
  }, [initialPlans]);
  useEffect(() => {
    setTestimonials(initialTestimonials);
  }, [initialTestimonials]);
  useEffect(() => {
    setFaqs(initialFaqs);
  }, [initialFaqs]);

  // Save Settings
  const handleSaveSettings = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    try {
      await saveSiteSettings(settings);
      setSaveStatus('Website content saved permanently to Cloud Firestore.');
      await onRefreshAll();
    } catch (err: any) {
      setSaveStatus('Error saving settings: ' + err.message);
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveStatus(null), 3500);
    }
  };

  // Quick links state helpers
  const currentQuickLinks: HeaderQuickLink[] = (
    settings.headerQuickLinks && settings.headerQuickLinks.length > 0
      ? settings.headerQuickLinks
      : [
          {
            id: 'link-whatsapp',
            key: 'whatsapp',
            title: 'WhatsApp Community',
            url: settings.communityButtonSettings?.url || settings.communityWhatsappUrl || 'https://chat.whatsapp.com/NovaFxMentorships',
            enabled: true,
            order: 1,
            icon: 'whatsapp',
          },
          {
            id: 'link-youtube',
            key: 'youtube',
            title: 'YouTube — NOVA FX MENTORSHIPS',
            url: settings.youtubeUrl || 'https://youtube.com/@novafx',
            enabled: true,
            order: 2,
            icon: 'youtube',
          },
          {
            id: 'link-session-clock',
            key: 'session-clock',
            title: 'Session Clock',
            url: '#session-clock',
            enabled: true,
            order: 3,
            icon: 'clock',
            isSpecialAction: true,
          },
          {
            id: 'link-news-calendar',
            key: 'news-calendar',
            title: 'News Calendar',
            url: '#news-calendar',
            enabled: true,
            order: 4,
            icon: 'calendar',
            isSpecialAction: true,
          },
          {
            id: 'link-market-sentiment',
            key: 'market-sentiment',
            title: 'Market Sentiment',
            url: '#sentiment',
            enabled: true,
            order: 5,
            icon: 'sentiment',
            isSpecialAction: true,
          },
        ]
  ).sort((a, b) => (a.order || 0) - (b.order || 0));

  const handleUpdateQuickLinks = (updated: HeaderQuickLink[]) => {
    setSettings((prev) => ({
      ...prev,
      headerQuickLinks: updated,
    }));
  };

  const handleQuickLinkToggle = (id: string) => {
    const updated = currentQuickLinks.map((item) =>
      item.id === id ? { ...item, enabled: !item.enabled } : item
    );
    handleUpdateQuickLinks(updated);
  };

  const handleQuickLinkTitleChange = (id: string, title: string) => {
    const updated = currentQuickLinks.map((item) =>
      item.id === id ? { ...item, title } : item
    );
    handleUpdateQuickLinks(updated);
  };

  const handleQuickLinkUrlChange = (id: string, url: string) => {
    const updated = currentQuickLinks.map((item) =>
      item.id === id ? { ...item, url } : item
    );
    handleUpdateQuickLinks(updated);
  };

  const handleAddQuickLink = () => {
    const newId = 'link-' + Date.now();
    const newOrder = currentQuickLinks.length + 1;
    const newLink: HeaderQuickLink = {
      id: newId,
      key: 'custom',
      title: 'Custom Navigation Link',
      url: 'https://',
      enabled: true,
      order: newOrder,
      icon: 'link',
    };
    handleUpdateQuickLinks([...currentQuickLinks, newLink]);
  };

  const handleDeleteQuickLink = (id: string) => {
    if (!window.confirm('Are you sure you want to delete this navigation link?')) return;
    const updated = currentQuickLinks.filter((item) => item.id !== id);
    handleUpdateQuickLinks(updated);
  };

  const handleMoveQuickLink = (idx: number, direction: -1 | 1) => {
    const list = [...currentQuickLinks];
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= list.length) return;
    const temp = list[idx];
    list[idx] = list[targetIdx];
    list[targetIdx] = temp;
    const reordered = list.map((item, index) => ({
      ...item,
      order: index + 1,
    }));
    handleUpdateQuickLinks(reordered);
  };

  // RGB Dot state helpers
  const currentRgbDot: RgbDotSettings = settings.rgbDotSettings || {
    enabled: true,
    size: 'tiny',
    glowIntensity: 'subtle',
    speed: 'normal',
  };

  const handleRgbDotUpdate = (partial: Partial<RgbDotSettings>) => {
    setSettings((prev) => ({
      ...prev,
      rgbDotSettings: {
        ...(prev.rgbDotSettings || currentRgbDot),
        ...partial,
      },
    }));
  };

  // Community Button state helpers
  const currentCommunityBtn: CommunityButtonSettings = settings.communityButtonSettings || {
    enabled: true,
    text: 'JOIN COMMUNITY 🚀',
    url: settings.communityWhatsappUrl || 'https://chat.whatsapp.com/NovaFxMentorships',
    theme: 'cyan-blue-purple',
    glow: 'subtle',
  };

  const handleCommunityBtnUpdate = (partial: Partial<CommunityButtonSettings>) => {
    setSettings((prev) => ({
      ...prev,
      communityButtonSettings: {
        ...(prev.communityButtonSettings || currentCommunityBtn),
        ...partial,
      },
      communityWhatsappUrl: partial.url !== undefined ? partial.url : prev.communityWhatsappUrl,
    }));
  };

  // Showcase Image state helpers
  const currentShowcaseImage: ShowcaseImageSettings = settings.showcaseImageSettings || {
    enabled: true,
    imageUrl: '/assets/aistudio/NOVA_FX_LOGO_c07e6c8d.png',
    altText: 'NOVA FX Institutional Trading Showcase',
    caption: 'Institutional Flow Analysis & Live Liquidity Frameworks',
    position: 'center',
    size: 'medium',
    fit: 'cover',
    aspectRatio: '16:9',
  };

  const handleShowcaseImageUpdate = (partial: Partial<ShowcaseImageSettings>) => {
    setSettings((prev) => ({
      ...prev,
      showcaseImageSettings: {
        ...(prev.showcaseImageSettings || currentShowcaseImage),
        ...partial,
        updatedAt: new Date().toISOString(),
      },
    }));
  };

  // Course handlers
  const handleSaveCourse = async (course: Course) => {
    await saveCourse(course);
    setCourses((prev) => {
      const idx = prev.findIndex((c) => c.id === course.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = course;
        return copy;
      }
      return [course, ...prev];
    });
    setEditingCourse(null);
    await onRefreshAll();
  };

  const handleDeleteCourse = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    await deleteCourse(id);
    setCourses((prev) => prev.filter((c) => c.id !== id));
    await onRefreshAll();
  };

  // Blog handlers
  const handleSavePost = async (post: BlogPost) => {
    await saveBlogPost(post);
    setPosts((prev) => {
      const idx = prev.findIndex((p) => p.id === post.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = post;
        return copy;
      }
      return [post, ...prev];
    });
    setEditingPost(null);
    await onRefreshAll();
  };

  const handleDeletePost = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    await deleteBlogPost(id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
    await onRefreshAll();
  };

  // Pricing handlers
  const handleSavePlan = async (plan: PricingPlan) => {
    await savePricingPlan(plan);
    setPlans((prev) => {
      const idx = prev.findIndex((p) => p.id === plan.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = plan;
        return copy;
      }
      return [...prev, plan];
    });
    setEditingPlan(null);
    await onRefreshAll();
  };

  const handleDeletePlan = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this pricing tier?')) return;
    await deletePricingPlan(id);
    setPlans((prev) => prev.filter((p) => p.id !== id));
    await onRefreshAll();
  };

  // Testimonial handlers
  const handleSaveTestimonial = async (test: Testimonial) => {
    await saveTestimonial(test);
    setTestimonials((prev) => {
      const idx = prev.findIndex((t) => t.id === test.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = test;
        return copy;
      }
      return [test, ...prev];
    });
    setEditingTestimonial(null);
    await onRefreshAll();
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!window.confirm('Delete this student testimonial?')) return;
    await deleteTestimonial(id);
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    await onRefreshAll();
  };

  // FAQ handlers
  const handleSaveFaq = async (faq: FAQ) => {
    await saveFaq(faq);
    setFaqs((prev) => {
      const idx = prev.findIndex((f) => f.id === faq.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = faq;
        return copy;
      }
      return [...prev, faq];
    });
    setEditingFaq(null);
    await onRefreshAll();
  };

  const handleDeleteFaq = async (id: string) => {
    if (!window.confirm('Delete this FAQ question?')) return;
    await deleteFaq(id);
    setFaqs((prev) => prev.filter((f) => f.id !== id));
    await onRefreshAll();
  };

  // Inquiry Status update
  const handleInquiryStatus = async (id: string, status: 'new' | 'read' | 'replied') => {
    await updateInquiryStatus(id, status);
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status } : i))
    );
  };

  // Filter users by search term
  const filteredUsers = registeredUsers.filter(
    (u) =>
      u.displayName?.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(userSearchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Admin Header Bar */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-xl px-4 py-3 sm:px-6 sticky top-0 z-30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Uploaded official logo */}
            <img
              src="/assets/aistudio/NOVA_FX_LOGO_c07e6c8d.png"
              alt="NOVA FX"
              className="h-9 w-9 rounded-xl object-cover border border-cyan-400/40 shadow-md shadow-cyan-500/25 shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base">NOVA FX</span>
                <span className="rounded bg-cyan-500/20 text-cyan-400 px-1.5 py-0.5 text-[10px] font-mono font-bold">
                  ADMIN CONTROL
                </span>
              </div>
              <span className="text-[11px] text-slate-400">
                Server Session: <strong className="text-white">{adminSession?.username || 'Configured Admin'}</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Cloud Firestore Connected</span>
            </div>

            <button
              onClick={onBackToSite}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-1.5 text-xs font-semibold text-slate-200 hover:text-white hover:border-cyan-500/40 transition-colors cursor-pointer"
            >
              <Eye className="h-3.5 w-3.5 text-cyan-400" />
              Preview Public Site
            </button>

            <button
              onClick={logoutAdmin}
              className="flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Area */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 border-r border-slate-800/80 bg-slate-900/40 p-4 space-y-1 shrink-0">
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-cyan-400">
            Brand & Header Control
          </p>

          <button
            onClick={() => setActiveTab('header-links')}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'header-links'
                ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Link className="h-4 w-4" />
              Header & Quick Links Manager
            </span>
            <span className="h-2 w-2 rounded-full animate-rgb-dot shrink-0" />
          </button>

          <button
            onClick={() => setActiveTab('image-manager')}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'image-manager'
                ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <ImageIcon className="h-4 w-4" />
              Website Image Manager
            </span>
            <span className="rounded bg-cyan-500/20 text-cyan-300 text-[9px] px-1 font-mono">
              HERO
            </span>
          </button>

          <p className="px-3 pt-4 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            User Intelligence
          </p>

          <button
            onClick={() => setActiveTab('users')}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'users'
                ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Users className="h-4 w-4" />
              Registered Google Users
            </span>
            <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-cyan-300 font-mono">
              {registeredUsers.length}
            </span>
          </button>

          <p className="px-3 pt-4 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Academy Management
          </p>

          <button
            onClick={() => setActiveTab('cms')}
            className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium transition-all ${
              activeTab === 'cms'
                ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Settings className="h-4 w-4" />
            Headings & Copy CMS
          </button>

          <button
            onClick={() => setActiveTab('sections')}
            className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium transition-all ${
              activeTab === 'sections'
                ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Layers className="h-4 w-4" />
            Section Visibility
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-all ${
              activeTab === 'courses'
                ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <GraduationCap className="h-4 w-4" />
              Courses & Programs
            </span>
            <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
              {courses.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('blog')}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-all ${
              activeTab === 'blog'
                ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <FileText className="h-4 w-4" />
              Blog & Insights
            </span>
            <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
              {posts.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('pricing')}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-all ${
              activeTab === 'pricing'
                ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <CreditCard className="h-4 w-4" />
              Pricing Plans
            </span>
            <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
              {plans.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('testimonials')}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-all ${
              activeTab === 'testimonials'
                ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <MessageSquare className="h-4 w-4" />
              Student Testimonials
            </span>
            <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
              {testimonials.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('faqs')}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-all ${
              activeTab === 'faqs'
                ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <HelpCircle className="h-4 w-4" />
              FAQs
            </span>
            <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
              {faqs.length}
            </span>
          </button>

          <p className="px-3 pt-4 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Navigation & Leads
          </p>

          <button
            onClick={() => setActiveTab('nav')}
            className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium transition-all ${
              activeTab === 'nav'
                ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Link className="h-4 w-4" />
            Navigation & Socials
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-all ${
              activeTab === 'inquiries'
                ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Inbox className="h-4 w-4" />
              Student Inquiries
            </span>
            {inquiries.filter((i) => i.status === 'new').length > 0 && (
              <span className="rounded-full bg-cyan-400 text-black px-1.5 py-0.2 text-[10px] font-bold">
                {inquiries.filter((i) => i.status === 'new').length}
              </span>
            )}
          </button>
        </aside>

        {/* Content Pane */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {/* Notification toast */}
          {saveStatus && (
            <div className="mb-6 flex items-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-950/30 p-4 text-xs font-medium text-cyan-300">
              <CheckCircle2 className="h-4 w-4 text-cyan-400" />
              <span>{saveStatus}</span>
            </div>
          )}

          {/* TAB: HEADER & QUICK LINKS MANAGER */}
          {activeTab === 'header-links' && (
            <div className="space-y-8 max-w-4xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Link className="h-5 w-5 text-cyan-400" /> HEADER & QUICK LINKS MANAGER
                  </h2>
                  <p className="text-xs text-slate-400">
                    Configure the top navigation bar, LED RGB glowing dot, centered community button, and horizontal quick links.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSaveSettings}
                  disabled={isSaving}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-cyan-500 px-5 py-2.5 text-xs font-bold text-black hover:bg-cyan-400 transition-all cursor-pointer shadow-lg shadow-cyan-500/20 disabled:opacity-50"
                >
                  <Save className="h-4 w-4" /> {isSaving ? 'Saving...' : 'Save Header Changes'}
                </button>
              </div>

              {/* 1. RGB DOT SETTINGS */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full animate-rgb-dot" />
                      RGB Glowing Dot Settings
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Controls the LED glowing dot positioned beside the NOVA FX brand in the navbar.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRgbDotUpdate({ enabled: !currentRgbDot.enabled })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                      currentRgbDot.enabled ? 'bg-cyan-500' : 'bg-slate-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-black transition-transform ${
                        currentRgbDot.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Dot Size</label>
                    <select
                      value={currentRgbDot.size}
                      onChange={(e) => handleRgbDotUpdate({ size: e.target.value as any })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    >
                      <option value="tiny">Tiny (6px) — Default & Premium</option>
                      <option value="small">Small (8px)</option>
                      <option value="medium">Medium (10px)</option>
                      <option value="large">Large (12px)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Glow Intensity</label>
                    <select
                      value={currentRgbDot.glowIntensity}
                      onChange={(e) => handleRgbDotUpdate({ glowIntensity: e.target.value as any })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    >
                      <option value="subtle">Subtle Glow</option>
                      <option value="medium">Medium Glow</option>
                      <option value="high">High Glow</option>
                      <option value="neon">Neon Boost Glow</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Animation Speed</label>
                    <select
                      value={currentRgbDot.speed}
                      onChange={(e) => handleRgbDotUpdate({ speed: e.target.value as any })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    >
                      <option value="slow">Slow Transition (6s)</option>
                      <option value="normal">Normal Transition (4s)</option>
                      <option value="fast">Fast Transition (2s)</option>
                    </select>
                  </div>
                </div>

                {/* Dot Live Preview */}
                <div className="rounded-xl border border-slate-800/80 bg-slate-950 p-3.5 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Live Navbar Dot Preview:</span>
                  <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-xl border border-cyan-500/20">
                    <span className="text-base font-black tracking-wider text-white">NOVA</span>
                    <span className="text-base font-black tracking-wider text-cyan-400">FX</span>
                    {currentRgbDot.enabled ? (
                      <span
                        className={`rounded-full animate-rgb-dot shrink-0 ${
                          currentRgbDot.size === 'tiny'
                            ? 'h-1.5 w-1.5'
                            : currentRgbDot.size === 'small'
                            ? 'h-2 w-2'
                            : currentRgbDot.size === 'medium'
                            ? 'h-2.5 w-2.5'
                            : 'h-3 w-3'
                        }`}
                      />
                    ) : (
                      <span className="text-[10px] text-slate-500 font-mono">[Disabled]</span>
                    )}
                  </div>
                </div>
              </div>

              {/* 2. JOIN COMMUNITY BUTTON SETTINGS */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Join Community Button Settings
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Controls the mathematically centered pill button in the public website navbar.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCommunityBtnUpdate({ enabled: !currentCommunityBtn.enabled })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                      currentCommunityBtn.enabled ? 'bg-cyan-500' : 'bg-slate-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-black transition-transform ${
                        currentCommunityBtn.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Button Display Text</label>
                    <input
                      type="text"
                      value={currentCommunityBtn.text}
                      onChange={(e) => handleCommunityBtnUpdate({ text: e.target.value })}
                      placeholder="e.g. JOIN COMMUNITY 🚀"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      WhatsApp Invite Destination URL
                    </label>
                    <input
                      type="url"
                      value={currentCommunityBtn.url}
                      onChange={(e) => handleCommunityBtnUpdate({ url: e.target.value })}
                      placeholder="https://chat.whatsapp.com/..."
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-cyan-400 focus:border-cyan-500 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Gradient Theme</label>
                    <select
                      value={currentCommunityBtn.theme}
                      onChange={(e) => handleCommunityBtnUpdate({ theme: e.target.value as any })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    >
                      <option value="cyan-blue-purple">Cyan &rarr; Blue &rarr; Purple (Default Brand)</option>
                      <option value="emerald-whatsapp">Emerald &rarr; WhatsApp Teal</option>
                      <option value="electric-neon">Electric Neon Cyan</option>
                      <option value="cyber-gold">Cyber Gold &rarr; Amber</option>
                      <option value="magenta-fire">Magenta &rarr; Fire Purple</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Button Glow</label>
                    <select
                      value={currentCommunityBtn.glow}
                      onChange={(e) => handleCommunityBtnUpdate({ glow: e.target.value as any })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    >
                      <option value="subtle">Subtle Neon Glow</option>
                      <option value="intense">Intense High-Glow</option>
                      <option value="none">No Glow (Flat Border)</option>
                    </select>
                  </div>
                </div>

                {/* Button Live Preview */}
                <div className="rounded-xl border border-slate-800/80 bg-slate-950 p-4 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Live Centered Button Preview:</span>
                  {currentCommunityBtn.enabled ? (
                    <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-black text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 border border-cyan-300/40 shadow-lg shadow-cyan-500/25">
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#25D366] p-0.5">
                        <svg className="h-2.5 w-2.5 fill-white" viewBox="0 0 24 24">
                          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2Z" />
                        </svg>
                      </span>
                      <span>{currentCommunityBtn.text || 'JOIN COMMUNITY 🚀'}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-500 font-mono">[Hidden on Public Website]</span>
                  )}
                </div>
              </div>

              {/* 3. QUICK LINKS BAR ITEMS MANAGER (The 5 items + custom links) */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
                      Horizontal Quick Links Bar (Below Navbar)
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Manage the 5 essential quick navigation elements: WhatsApp Community, YouTube, Session Clock, News Calendar, and Market Sentiment.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddQuickLink}
                    className="flex items-center gap-1.5 rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-3.5 py-1.5 text-xs font-bold text-cyan-400 hover:bg-cyan-500/20 cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add New Link
                  </button>
                </div>

                <div className="space-y-3">
                  {currentQuickLinks.map((item, idx) => (
                    <div
                      key={item.id}
                      className={`rounded-xl border p-4 transition-all ${
                        item.enabled
                          ? 'border-slate-800 bg-slate-950/80'
                          : 'border-slate-800/50 bg-slate-950/40 opacity-60'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-400 font-bold">
                            #{item.order || idx + 1}
                          </span>
                          <span className="text-xs font-bold text-white capitalize">
                            {item.key === 'whatsapp'
                              ? 'WhatsApp Community'
                              : item.key === 'youtube'
                              ? 'YouTube — NOVA FX MENTORSHIPS'
                              : item.key === 'session-clock'
                              ? 'Trading Session Clock'
                              : item.key === 'news-calendar'
                              ? 'Economic News Calendar'
                              : item.key === 'market-sentiment'
                              ? 'Live Market Sentiment'
                              : 'Custom Quick Link'}
                          </span>
                          <span
                            className={`rounded px-2 py-0.5 text-[10px] font-mono font-bold ${
                              item.enabled
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : 'bg-slate-800 text-slate-500'
                            }`}
                          >
                            {item.enabled ? 'VISIBLE' : 'HIDDEN'}
                          </span>
                        </div>

                        {/* Enable/Disable Toggle & Order Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleQuickLinkToggle(item.id)}
                            className={`rounded-lg px-2.5 py-1 text-xs font-semibold cursor-pointer transition-colors ${
                              item.enabled
                                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30'
                                : 'bg-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            {item.enabled ? 'Enabled' : 'Disabled'}
                          </button>

                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => handleMoveQuickLink(idx, -1)}
                            className="rounded-lg border border-slate-800 bg-slate-900 p-1.5 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                            title="Move Up"
                          >
                            <ArrowUp className="h-3.5 w-3.5" />
                          </button>

                          <button
                            type="button"
                            disabled={idx === currentQuickLinks.length - 1}
                            onClick={() => handleMoveQuickLink(idx, 1)}
                            className="rounded-lg border border-slate-800 bg-slate-900 p-1.5 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                            title="Move Down"
                          >
                            <ArrowDown className="h-3.5 w-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteQuickLink(item.id)}
                            className="rounded-lg border border-slate-800 bg-slate-900 p-1.5 text-red-400 hover:bg-red-500/20 cursor-pointer"
                            title="Delete Item"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-400">
                            Display Label / Title
                          </label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => handleQuickLinkTitleChange(item.id, e.target.value)}
                            placeholder="Display Title..."
                            className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <label className="text-[11px] font-semibold text-slate-400">
                              Destination URL
                            </label>
                            {item.url && item.url.startsWith('http') && (
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10px] text-cyan-400 hover:underline flex items-center gap-1 font-mono"
                              >
                                Preview Link <ExternalLink className="h-2.5 w-2.5" />
                              </a>
                            )}
                          </div>
                          <input
                            type="text"
                            value={item.url}
                            onChange={(e) => handleQuickLinkUrlChange(item.id, e.target.value)}
                            placeholder="https://... or modal trigger (#session-clock, #news-calendar, #sentiment)"
                            className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-cyan-400 focus:border-cyan-500 focus:outline-none font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: WEBSITE IMAGE MANAGER */}
          {activeTab === 'image-manager' && (
            <div className="space-y-8 max-w-4xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-cyan-400" /> WEBSITE IMAGE MANAGER
                  </h2>
                  <p className="text-xs text-slate-400">
                    Upload and manage the centerpiece visual showcase replacing the previous three feature text items.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSaveSettings}
                  disabled={isSaving}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-cyan-500 px-5 py-2.5 text-xs font-bold text-black hover:bg-cyan-400 transition-all cursor-pointer shadow-lg shadow-cyan-500/20 disabled:opacity-50"
                >
                  <Save className="h-4 w-4" /> {isSaving ? 'Saving...' : 'Save & Publish Image'}
                </button>
              </div>

              {/* Upload & Settings Form */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                      <ImageIcon className="h-4 w-4" />
                      Hero Centerpiece Visual Showcase
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Upload any JPG, JPEG, PNG, or WEBP image. Supports replace, delete, resize, fit, and position controls.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Visibility:</span>
                    <button
                      type="button"
                      onClick={() =>
                        handleShowcaseImageUpdate({ enabled: !currentShowcaseImage.enabled })
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                        currentShowcaseImage.enabled ? 'bg-cyan-500' : 'bg-slate-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-black transition-transform ${
                          currentShowcaseImage.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Upload Field */}
                <ImageUploadField
                  label="Centerpiece Image Asset"
                  value={currentShowcaseImage.imageUrl}
                  onChange={(url) => handleShowcaseImageUpdate({ imageUrl: url })}
                  helperText="Upload JPG, JPEG, PNG, or WEBP. Uploads are stored persistently in cloud storage."
                  aspectRatio="wide"
                />

                {/* Controls Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Display Size / Height</label>
                    <select
                      value={currentShowcaseImage.size}
                      onChange={(e) => handleShowcaseImageUpdate({ size: e.target.value as any })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    >
                      <option value="small">Small Height (240px)</option>
                      <option value="medium">Medium Height (360px) — Recommended</option>
                      <option value="large">Large Height (480px)</option>
                      <option value="full">Full Cinematic Height (580px)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Image Fit</label>
                    <select
                      value={currentShowcaseImage.fit}
                      onChange={(e) => handleShowcaseImageUpdate({ fit: e.target.value as any })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    >
                      <option value="cover">Cover (Fill & Crop nicely)</option>
                      <option value="contain">Contain (Preserve entire image)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Display Focus Position</label>
                    <select
                      value={currentShowcaseImage.position}
                      onChange={(e) => handleShowcaseImageUpdate({ position: e.target.value as any })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    >
                      <option value="center">Center Focused</option>
                      <option value="top">Top Focused</option>
                      <option value="bottom">Bottom Focused</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Overlay Caption / Subtitle</label>
                    <input
                      type="text"
                      value={currentShowcaseImage.caption || ''}
                      onChange={(e) => handleShowcaseImageUpdate({ caption: e.target.value })}
                      placeholder="e.g. Institutional Flow Analysis & Live Liquidity Frameworks"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Alt Text (Accessibility & SEO)</label>
                    <input
                      type="text"
                      value={currentShowcaseImage.altText || ''}
                      onChange={(e) => handleShowcaseImageUpdate({ altText: e.target.value })}
                      placeholder="e.g. NOVA FX Official Mentorship Showcase"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Live Mockup */}
                <div className="pt-4 border-t border-slate-800">
                  <h4 className="text-xs font-bold text-slate-300 mb-3 flex items-center gap-1.5">
                    <Eye className="h-3.5 w-3.5 text-cyan-400" />
                    Live Public Website Hero Centerpiece Rendering:
                  </h4>

                  {currentShowcaseImage.enabled ? (
                    currentShowcaseImage.imageUrl ? (
                      <div className="relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-slate-950 shadow-2xl">
                        <div
                          className={`w-full overflow-hidden flex items-center justify-center ${
                            currentShowcaseImage.size === 'small'
                              ? 'h-48'
                              : currentShowcaseImage.size === 'large'
                              ? 'h-80'
                              : currentShowcaseImage.size === 'full'
                              ? 'h-96'
                              : 'h-64'
                          }`}
                        >
                          <img
                            src={currentShowcaseImage.imageUrl}
                            alt={currentShowcaseImage.altText || 'Preview'}
                            className={`w-full h-full ${
                              currentShowcaseImage.fit === 'contain' ? 'object-contain bg-slate-950' : 'object-cover'
                            } ${
                              currentShowcaseImage.position === 'top'
                                ? 'object-top'
                                : currentShowcaseImage.position === 'bottom'
                                ? 'object-bottom'
                                : 'object-center'
                            }`}
                          />
                        </div>
                        {currentShowcaseImage.caption && (
                          <div className="absolute bottom-3 left-3 bg-slate-950/80 px-3 py-1 rounded-lg border border-cyan-500/20 text-xs font-semibold text-cyan-300 backdrop-blur-md">
                            {currentShowcaseImage.caption}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-950 p-8 text-center text-xs text-slate-400">
                        No image uploaded yet. A dark fintech placeholder will be displayed on the public website.
                      </div>
                    )
                  ) : (
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 text-center text-xs text-slate-500 font-mono">
                      [Image Visibility is Disabled &mdash; This section is hidden on the public website]
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB: REGISTERED GOOGLE USERS */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-cyan-400" /> Registered Google Accounts
                  </h2>
                  <p className="text-xs text-slate-400">
                    Live database view of students authenticated through Google Sign-In.
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full sm:w-72">
                  <input
                    type="text"
                    value={userSearchTerm}
                    onChange={(e) => setUserSearchTerm(e.target.value)}
                    placeholder="Search by name or email..."
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/80 pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                  />
                  <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
                </div>
              </div>

              {usersLoading ? (
                <div className="flex items-center justify-center py-12 text-xs text-cyan-400">
                  <span className="h-6 w-6 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin mr-2" />
                  Loading student roster...
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center text-slate-400 text-xs">
                  {userSearchTerm
                    ? 'No registered users match your search criteria.'
                    : 'No registered Google users in the database yet. Click "Login / Sign Up" on the public website to test Google account registration!'}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredUsers.map((u) => (
                    <div
                      key={u.uid}
                      className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col justify-between hover:border-cyan-500/40 transition-all"
                    >
                      <div>
                        <div className="flex items-center gap-3">
                          {u.photoURL ? (
                            <img
                              src={u.photoURL}
                              alt={u.displayName}
                              className="h-11 w-11 rounded-full object-cover border border-cyan-400 shrink-0"
                            />
                          ) : (
                            <div className="h-11 w-11 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-black font-bold text-sm shrink-0">
                              {u.displayName?.charAt(0).toUpperCase() || 'U'}
                            </div>
                          )}

                          <div className="overflow-hidden">
                            <h4 className="text-sm font-bold text-white truncate">
                              {u.displayName}
                            </h4>
                            <p className="text-xs text-cyan-400 truncate flex items-center gap-1 font-mono">
                              <Mail className="h-3 w-3 shrink-0" />
                              {u.email}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5 text-[11px] text-slate-400">
                          <div className="flex justify-between">
                            <span>User ID:</span>
                            <span className="font-mono text-slate-300 truncate max-w-[140px]">
                              {u.uid}
                            </span>
                          </div>
                          {u.createdAt && (
                            <div className="flex justify-between">
                              <span>Registered:</span>
                              <span className="text-slate-300">
                                {new Date(u.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                          {u.lastLoginAt && (
                            <div className="flex justify-between">
                              <span>Last Active:</span>
                              <span className="text-emerald-400">
                                {new Date(u.lastLoginAt).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 pt-2 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                        <span>Provider: Google OAuth</span>
                        <span className="text-emerald-400 font-semibold">Active</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: CMS HEADINGS & COPY */}
          {activeTab === 'cms' && (
            <div className="space-y-8 max-w-4xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Website Headings & Copy CMS</h2>
                  <p className="text-xs text-slate-400">
                    Modify all public titles, subheadlines, descriptions, and CTA destination links.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSaveSettings}
                  disabled={isSaving}
                  className="flex items-center gap-1.5 rounded-xl bg-cyan-500 px-5 py-2.5 text-xs font-bold text-black hover:bg-cyan-400 shadow-md shadow-cyan-500/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  {isSaving ? 'Saving...' : 'Save & Publish Headings'}
                </button>
              </div>

              {/* Hero Section settings */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
                  Hero Section
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Hero Main Headline
                  </label>
                  <input
                    type="text"
                    value={settings.heroHeadline}
                    onChange={(e) => setSettings({ ...settings, heroHeadline: e.target.value })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Hero Subheadline / Value Proposition
                  </label>
                  <textarea
                    rows={3}
                    value={settings.heroSubheadline}
                    onChange={(e) => setSettings({ ...settings, heroSubheadline: e.target.value })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Primary CTA Label
                    </label>
                    <input
                      type="text"
                      value={settings.heroPrimaryCta.label}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          heroPrimaryCta: { ...settings.heroPrimaryCta, label: e.target.value },
                        })
                      }
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Primary CTA Destination Anchor
                    </label>
                    <input
                      type="text"
                      value={settings.heroPrimaryCta.destination}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          heroPrimaryCta: { ...settings.heroPrimaryCta, destination: e.target.value },
                        })
                      }
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Secondary CTA Label
                    </label>
                    <input
                      type="text"
                      value={settings.heroSecondaryCta.label}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          heroSecondaryCta: { ...settings.heroSecondaryCta, label: e.target.value },
                        })
                      }
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Secondary CTA Destination Anchor
                    </label>
                    <input
                      type="text"
                      value={settings.heroSecondaryCta.destination}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          heroSecondaryCta: { ...settings.heroSecondaryCta, destination: e.target.value },
                        })
                      }
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* About Section settings */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
                  About Section
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    About Section Headline
                  </label>
                  <input
                    type="text"
                    value={settings.aboutTitle}
                    onChange={(e) => setSettings({ ...settings, aboutTitle: e.target.value })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    About Narrative / Institutional Mission
                  </label>
                  <textarea
                    rows={4}
                    value={settings.aboutDescription}
                    onChange={(e) => setSettings({ ...settings, aboutDescription: e.target.value })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Stats Settings */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
                  Key Institutional Metrics (Hero Counters)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {settings.stats.map((st, i) => (
                    <div key={i} className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={st.value}
                          onChange={(e) => {
                            const updated = [...settings.stats];
                            updated[i].value = e.target.value;
                            setSettings({ ...settings, stats: updated });
                          }}
                          placeholder="Value (e.g. $18.4M+)"
                          className="w-1/2 rounded border border-slate-800 bg-slate-900 px-2 py-1 text-xs text-white font-mono font-bold"
                        />
                        <input
                          type="text"
                          value={st.label}
                          onChange={(e) => {
                            const updated = [...settings.stats];
                            updated[i].label = e.target.value;
                            setSettings({ ...settings, stats: updated });
                          }}
                          placeholder="Label (e.g. Funded Capital)"
                          className="w-1/2 rounded border border-slate-800 bg-slate-900 px-2 py-1 text-xs text-white"
                        />
                      </div>
                      <input
                        type="text"
                        value={st.sublabel || ''}
                        onChange={(e) => {
                          const updated = [...settings.stats];
                          updated[i].sublabel = e.target.value;
                          setSettings({ ...settings, stats: updated });
                        }}
                        placeholder="Sublabel (e.g. Top Prop Firms)"
                        className="w-full rounded border border-slate-800 bg-slate-900 px-2 py-1 text-[11px] text-slate-400"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Desks info */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
                  Admissions Contact Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Admissions Email
                    </label>
                    <input
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Telegram Handle
                    </label>
                    <input
                      type="text"
                      value={settings.contactTelegram}
                      onChange={(e) => setSettings({ ...settings, contactTelegram: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Locations
                    </label>
                    <input
                      type="text"
                      value={settings.contactLocation}
                      onChange={(e) => setSettings({ ...settings, contactLocation: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SECTION VISIBILITY */}
          {activeTab === 'sections' && (
            <div className="space-y-6 max-w-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Section Visibility & Layout</h2>
                  <p className="text-xs text-slate-400">
                    Toggle individual website sections on or off in real-time.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSaveSettings}
                  disabled={isSaving}
                  className="flex items-center gap-1.5 rounded-xl bg-cyan-500 px-5 py-2 text-xs font-bold text-black hover:bg-cyan-400 transition-all cursor-pointer"
                >
                  <Save className="h-4 w-4" /> Save Layout
                </button>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 divide-y divide-slate-800">
                {Object.keys(settings.sectionVisibility).map((key) => {
                  const sectionKey = key as keyof typeof settings.sectionVisibility;
                  const isVisible = settings.sectionVisibility[sectionKey];

                  return (
                    <div key={key} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                      <div>
                        <span className="text-sm font-semibold capitalize text-white">
                          {key} Section
                        </span>
                        <p className="text-xs text-slate-400">
                          {isVisible ? 'Currently displayed on public site' : 'Hidden from public site'}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setSettings({
                            ...settings,
                            sectionVisibility: {
                              ...settings.sectionVisibility,
                              [sectionKey]: !isVisible,
                            },
                          })
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                          isVisible ? 'bg-cyan-500' : 'bg-slate-700'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-black transition-transform ${
                            isVisible ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB: COURSES */}
          {activeTab === 'courses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Course Management</h2>
                  <p className="text-xs text-slate-400">
                    Add, edit, publish/unpublish, and manage program syllabus and thumbnails.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingCourse('new')}
                  className="flex items-center gap-1.5 rounded-xl bg-cyan-500 px-4 py-2 text-xs font-bold text-black hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20 cursor-pointer"
                >
                  <Plus className="h-4 w-4" /> Add Program
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-video w-full bg-slate-950">
                        <img
                          src={course.thumbnailUrl}
                          alt={course.title}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          <span className="rounded bg-black/70 px-2 py-0.5 text-[10px] font-bold text-cyan-400 backdrop-blur-md">
                            {course.level}
                          </span>
                        </div>
                        <div className="absolute top-2 right-2">
                          <span
                            className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                              course.isPublished
                                ? 'bg-emerald-500/80 text-black'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {course.isPublished ? 'Published' : 'Draft'}
                          </span>
                        </div>
                      </div>

                      <div className="p-4">
                        <h4 className="font-bold text-sm text-white line-clamp-1">{course.title}</h4>
                        <p className="mt-1 text-xs text-slate-400 line-clamp-2">
                          {course.shortDescription}
                        </p>
                        <div className="mt-3 flex items-center justify-between text-xs text-slate-300 font-mono">
                          <span className="font-bold text-cyan-400">${course.price} USD</span>
                          <span>{course.modules?.length || course.modulesCount} Modules</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-slate-800 p-3 bg-slate-950/60 flex items-center justify-between">
                      <button
                        onClick={() =>
                          handleSaveCourse({ ...course, isPublished: !course.isPublished })
                        }
                        className="text-xs text-slate-400 hover:text-white"
                      >
                        {course.isPublished ? 'Unpublish' : 'Publish'}
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingCourse(course)}
                          className="p-1.5 rounded-lg border border-slate-700 bg-slate-800 text-cyan-400 hover:bg-slate-700"
                          title="Edit Course"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(course.id)}
                          className="p-1.5 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20"
                          title="Delete Course"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: BLOG POSTS */}
          {activeTab === 'blog' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Market Intel & Blog Posts</h2>
                  <p className="text-xs text-slate-400">
                    Publish educational articles, liquidity sweep breakdowns, and announcements.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingPost('new')}
                  className="flex items-center gap-1.5 rounded-xl bg-cyan-500 px-4 py-2 text-xs font-bold text-black hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20 cursor-pointer"
                >
                  <Plus className="h-4 w-4" /> New Article
                </button>
              </div>

              <div className="space-y-4">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={post.thumbnailUrl}
                        alt={post.title}
                        className="h-16 w-24 rounded-xl object-cover bg-slate-950 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 text-[10px] font-semibold text-cyan-400">
                            {post.category}
                          </span>
                          <span className="text-xs text-slate-400">{post.readTime}</span>
                        </div>
                        <h4 className="mt-1 text-sm font-bold text-white">{post.title}</h4>
                        <p className="text-xs text-slate-400">{post.author}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={() =>
                          handleSavePost({ ...post, isPublished: !post.isPublished })
                        }
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                          post.isPublished
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {post.isPublished ? 'Published' : 'Draft'}
                      </button>
                      <button
                        onClick={() => setEditingPost(post)}
                        className="p-2 rounded-lg border border-slate-700 bg-slate-800 text-cyan-400 hover:bg-slate-700"
                        title="Edit Article"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="p-2 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20"
                        title="Delete Article"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: PRICING */}
          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Membership Pricing Plans</h2>
                  <p className="text-xs text-slate-400">
                    Manage monthly and annual pricing rates, features, and highlight badges.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingPlan('new')}
                  className="flex items-center gap-1.5 rounded-xl bg-cyan-500 px-4 py-2 text-xs font-bold text-black hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20 cursor-pointer"
                >
                  <Plus className="h-4 w-4" /> Add Pricing Tier
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((p) => (
                  <div
                    key={p.id}
                    className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-bold text-white">{p.name}</h4>
                        {p.isPopular && (
                          <span className="rounded bg-cyan-400 text-black px-2 py-0.5 text-[10px] font-bold">
                            Popular
                          </span>
                        )}
                      </div>
                      <div className="mt-3 font-mono text-2xl font-bold text-white">
                        ${p.priceMonthly}{' '}
                        <span className="text-xs text-slate-400 font-normal">/mo (${p.priceYearly} yr)</span>
                      </div>
                      <ul className="mt-4 space-y-1.5 text-xs text-slate-300">
                        {p.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingPlan(p)}
                        className="p-1.5 rounded-lg border border-slate-700 bg-slate-800 text-cyan-400 hover:bg-slate-700"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePlan(p.id)}
                        className="p-1.5 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Student Testimonials & Proofs</h2>
                  <p className="text-xs text-slate-400">
                    Add or modify student success stories and funded account badges.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingTestimonial('new')}
                  className="flex items-center gap-1.5 rounded-xl bg-cyan-500 px-4 py-2 text-xs font-bold text-black hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20 cursor-pointer"
                >
                  <Plus className="h-4 w-4" /> Add Review
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={t.avatarUrl}
                            alt={t.studentName}
                            className="h-10 w-10 rounded-full object-cover border border-cyan-500/30"
                          />
                          <div>
                            <h4 className="text-sm font-bold text-white">{t.studentName}</h4>
                            <p className="text-xs text-slate-400">{t.role}</p>
                          </div>
                        </div>
                        <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded">
                          {t.fundedAmount}
                        </span>
                      </div>
                      <p className="mt-3 text-xs text-slate-300 italic">"{t.quote}"</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] text-cyan-400 font-mono">{t.payoutProof}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingTestimonial(t)}
                          className="p-1.5 rounded-lg border border-slate-700 bg-slate-800 text-cyan-400"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteTestimonial(t.id)}
                          className="p-1.5 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: FAQS */}
          {activeTab === 'faqs' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
                  <p className="text-xs text-slate-400">
                    Add, edit, and organize academy questions and answers.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingFaq('new')}
                  className="flex items-center gap-1.5 rounded-xl bg-cyan-500 px-4 py-2 text-xs font-bold text-black hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20 cursor-pointer"
                >
                  <Plus className="h-4 w-4" /> Add Question
                </button>
              </div>

              <div className="space-y-3">
                {faqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="flex items-start justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4"
                  >
                    <div>
                      <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-cyan-400">
                        {faq.category}
                      </span>
                      <h4 className="mt-1 text-sm font-bold text-white">{faq.question}</h4>
                      <p className="mt-1 text-xs text-slate-400">{faq.answer}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setEditingFaq(faq)}
                        className="p-1.5 rounded-lg border border-slate-700 bg-slate-800 text-cyan-400"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteFaq(faq.id)}
                        className="p-1.5 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: NAVIGATION & SOCIALS */}
          {activeTab === 'nav' && (
            <div className="space-y-8 max-w-3xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Navigation Links & Social Accounts</h2>
                  <p className="text-xs text-slate-400">
                    Manage the main navigation bar items and footer community channels.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSaveSettings}
                  disabled={isSaving}
                  className="flex items-center gap-1.5 rounded-xl bg-cyan-500 px-5 py-2 text-xs font-bold text-black hover:bg-cyan-400 transition-all cursor-pointer"
                >
                  <Save className="h-4 w-4" /> Save Navigation
                </button>
              </div>

              {/* Navigation links */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
                    Navbar Links
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      const newId = String(Date.now());
                      setSettings({
                        ...settings,
                        navLinks: [
                          ...settings.navLinks,
                          { id: newId, label: 'New Link', href: '#features' },
                        ],
                      });
                    }}
                    className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300"
                  >
                    <Plus className="h-3 w-3" /> Add Link
                  </button>
                </div>

                <div className="space-y-2">
                  {settings.navLinks.map((link, idx) => (
                    <div
                      key={link.id}
                      className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 p-2.5"
                    >
                      <input
                        type="text"
                        value={link.label}
                        onChange={(e) => {
                          const updated = [...settings.navLinks];
                          updated[idx].label = e.target.value;
                          setSettings({ ...settings, navLinks: updated });
                        }}
                        className="flex-1 rounded border border-slate-800 bg-slate-900 px-3 py-1 text-xs text-white"
                      />
                      <input
                        type="text"
                        value={link.href}
                        onChange={(e) => {
                          const updated = [...settings.navLinks];
                          updated[idx].href = e.target.value;
                          setSettings({ ...settings, navLinks: updated });
                        }}
                        placeholder="Destination (e.g. #courses)"
                        className="w-48 rounded border border-slate-800 bg-slate-900 px-3 py-1 text-xs text-white font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...settings.navLinks];
                          updated.splice(idx, 1);
                          setSettings({ ...settings, navLinks: updated });
                        }}
                        className="p-1 text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media Links */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
                  Social Media Links
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {settings.socialLinks.map((s, idx) => (
                    <div key={idx} className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300 capitalize">
                        {s.platform} URL
                      </label>
                      <input
                        type="url"
                        value={s.url}
                        onChange={(e) => {
                          const updated = [...settings.socialLinks];
                          updated[idx].url = e.target.value;
                          setSettings({ ...settings, socialLinks: updated });
                        }}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none font-mono"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Community & Quick Links Bar Configuration */}
              <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/60 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
                      Community Button & Sub-Navbar Quick Links
                    </h3>
                    <p className="text-xs text-slate-400">
                      Configure the exact center Join Community WhatsApp link, YouTube Mentorships URL, and quick links bar options.
                    </p>
                  </div>
                  <span className="rounded bg-cyan-500/20 px-2 py-0.5 text-[10px] font-mono text-cyan-300 border border-cyan-500/40">
                    LIVE SYNC
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">
                      WhatsApp Community Invite URL
                    </label>
                    <input
                      type="url"
                      value={settings.communityWhatsappUrl || ''}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          communityWhatsappUrl: e.target.value,
                        })
                      }
                      placeholder="https://chat.whatsapp.com/..."
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">
                      YouTube Mentorships Channel URL
                    </label>
                    <input
                      type="url"
                      value={settings.youtubeUrl || ''}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          youtubeUrl: e.target.value,
                        })
                      }
                      placeholder="https://youtube.com/@novafx"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80">
                  <h4 className="text-xs font-bold text-slate-300 mb-2">
                    Quick Links Sub-Bar Visibility
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <label className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.quickLinksVisibility?.youtube !== false}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            quickLinksVisibility: {
                              youtube: e.target.checked,
                              sessionClock: settings.quickLinksVisibility?.sessionClock !== false,
                              newsCalendar: settings.quickLinksVisibility?.newsCalendar !== false,
                            },
                          })
                        }
                        className="rounded border-slate-700 text-cyan-500 focus:ring-0"
                      />
                      <span>YouTube Mentorships</span>
                    </label>

                    <label className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.quickLinksVisibility?.sessionClock !== false}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            quickLinksVisibility: {
                              youtube: settings.quickLinksVisibility?.youtube !== false,
                              sessionClock: e.target.checked,
                              newsCalendar: settings.quickLinksVisibility?.newsCalendar !== false,
                            },
                          })
                        }
                        className="rounded border-slate-700 text-cyan-500 focus:ring-0"
                      />
                      <span>Session Clock Modal</span>
                    </label>

                    <label className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.quickLinksVisibility?.newsCalendar !== false}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            quickLinksVisibility: {
                              youtube: settings.quickLinksVisibility?.youtube !== false,
                              sessionClock: settings.quickLinksVisibility?.sessionClock !== false,
                              newsCalendar: e.target.checked,
                            },
                          })
                        }
                        className="rounded border-slate-700 text-cyan-500 focus:ring-0"
                      />
                      <span>News Calendar Modal</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Prospective Student Inquiries</h2>
                <p className="text-xs text-slate-400">
                  Messages submitted through the public Contact section.
                </p>
              </div>

              {inquiries.length === 0 ? (
                <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center text-slate-400 text-xs">
                  No inquiries received yet. Submit a message from the Contact form to test real-time capture!
                </div>
              ) : (
                <div className="space-y-4">
                  {inquiries.map((inq, idx) => (
                    <div
                      key={inq.id || idx}
                      className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-white">{inq.name}</h4>
                          <span className="text-xs text-cyan-400">{inq.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded px-2.5 py-0.5 text-[10px] font-bold ${
                              inq.status === 'new'
                                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                                : inq.status === 'replied'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {inq.status.toUpperCase()}
                          </span>
                          <span className="text-[11px] text-slate-400">{inq.createdAt?.split('T')[0]}</span>
                        </div>
                      </div>

                      <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-slate-300">
                        <strong className="text-white block mb-1">Subject: {inq.subject}</strong>
                        <p>{inq.message}</p>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-1 text-xs">
                        <button
                          onClick={() => inq.id && handleInquiryStatus(inq.id, 'read')}
                          className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1 text-slate-300 hover:text-white cursor-pointer"
                        >
                          Mark as Read
                        </button>
                        <button
                          onClick={() => inq.id && handleInquiryStatus(inq.id, 'replied')}
                          className="rounded-lg bg-emerald-500 px-3 py-1 font-bold text-black hover:bg-emerald-400 cursor-pointer"
                        >
                          Mark as Replied
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Editor Modals */}
      {editingCourse && (
        <CourseEditorModal
          course={editingCourse === 'new' ? null : editingCourse}
          onSave={handleSaveCourse}
          onClose={() => setEditingCourse(null)}
        />
      )}

      {editingPost && (
        <BlogEditorModal
          post={editingPost === 'new' ? null : editingPost}
          onSave={handleSavePost}
          onClose={() => setEditingPost(null)}
        />
      )}

      {editingPlan && (
        <PricingEditorModal
          plan={editingPlan === 'new' ? null : editingPlan}
          onSave={handleSavePlan}
          onClose={() => setEditingPlan(null)}
        />
      )}

      {editingTestimonial && (
        <TestimonialEditorModal
          testimonial={editingTestimonial === 'new' ? null : editingTestimonial}
          onSave={handleSaveTestimonial}
          onClose={() => setEditingTestimonial(null)}
        />
      )}

      {editingFaq && (
        <FaqEditorModal
          faq={editingFaq === 'new' ? null : editingFaq}
          onSave={handleSaveFaq}
          onClose={() => setEditingFaq(null)}
        />
      )}
    </div>
  );
};
