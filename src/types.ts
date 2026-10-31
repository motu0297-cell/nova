export interface NavLinkItem {
  id: string;
  label: string;
  href: string;
}

export interface SocialLinkItem {
  platform: 'twitter' | 'telegram' | 'youtube' | 'discord' | 'instagram' | 'linkedin';
  url: string;
}

export interface StatItem {
  label: string;
  value: string;
  sublabel?: string;
}

export interface SectionVisibility {
  hero: boolean;
  about: boolean;
  features: boolean;
  courses: boolean;
  roadmap: boolean;
  pricing: boolean;
  testimonials: boolean;
  blog: boolean;
  faq: boolean;
  contact: boolean;
}

export interface QuickLinksVisibility {
  youtube: boolean;
  sessionClock: boolean;
  newsCalendar: boolean;
  marketSentiment?: boolean;
}

export interface HeaderQuickLink {
  id: string;
  key: 'whatsapp' | 'youtube' | 'session-clock' | 'news-calendar' | 'market-sentiment' | 'custom' | string;
  title: string;
  url: string;
  enabled: boolean;
  order: number;
  icon?: 'whatsapp' | 'youtube' | 'clock' | 'calendar' | 'sentiment' | 'link' | string;
  isSpecialAction?: boolean;
}

export interface RgbDotSettings {
  enabled: boolean;
  size: 'tiny' | 'small' | 'medium' | 'large';
  glowIntensity: 'subtle' | 'medium' | 'high' | 'neon';
  speed: 'slow' | 'normal' | 'fast';
}

export interface CommunityButtonSettings {
  enabled: boolean;
  text: string;
  url: string;
  theme: 'cyan-blue-purple' | 'emerald-whatsapp' | 'electric-neon' | 'cyber-gold' | 'magenta-fire';
  glow: 'subtle' | 'intense' | 'none';
}

export interface ShowcaseImageSettings {
  enabled: boolean;
  imageUrl: string;
  altText?: string;
  caption?: string;
  position: 'center' | 'top' | 'bottom';
  size: 'small' | 'medium' | 'large' | 'full';
  fit: 'cover' | 'contain';
  aspectRatio?: '16:9' | '21:9' | 'auto';
  updatedAt?: string;
}

export interface SiteSettings {
  id?: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroPrimaryCta: {
    label: string;
    destination: string;
  };
  heroSecondaryCta: {
    label: string;
    destination: string;
  };
  aboutTitle: string;
  aboutDescription: string;
  stats: StatItem[];
  navLinks: NavLinkItem[];
  socialLinks: SocialLinkItem[];
  sectionVisibility: SectionVisibility;
  contactEmail: string;
  contactTelegram: string;
  contactLocation: string;
  communityWhatsappUrl?: string;
  youtubeUrl?: string;
  quickLinksVisibility?: QuickLinksVisibility;
  headerQuickLinks?: HeaderQuickLink[];
  rgbDotSettings?: RgbDotSettings;
  communityButtonSettings?: CommunityButtonSettings;
  showcaseImageSettings?: ShowcaseImageSettings;
  updatedAt?: string;
}

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  lessons: string[];
}

export interface CourseLinkItem {
  id: string;
  title: string;
  url: string;
  type?: 'youtube' | 'drive' | 'telegram' | 'discord' | 'tradingview' | 'notion' | 'custom';
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Mastery';
  price: number;
  duration: string;
  modulesCount: number;
  rating: number;
  enrolledCount: number;
  thumbnailUrl: string;
  badge?: string;
  youtubeUrl?: string;
  customLinks?: CourseLinkItem[];
  modules: CourseModule[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  readTime: string;
  author: string;
  thumbnailUrl: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  badge?: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
  ctaLink: string;
  sortOrder: number;
}

export interface Testimonial {
  id: string;
  studentName: string;
  role: string;
  fundedAmount: string;
  avatarUrl: string;
  quote: string;
  rating: number;
  verified: boolean;
  payoutProof?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
}

export interface ContactInquiry {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'new' | 'read' | 'replied';
}

export interface AdminUser {
  uid: string;
  email: string;
  username: string;
  role: 'admin';
  createdAt?: string;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  createdAt: string;
  lastLoginAt: string;
}

