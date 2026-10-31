import { SiteSettings, Course, BlogPost, PricingPlan, Testimonial, FAQ } from '../types';

export const TRADING_IMAGE_PRESETS = [
  {
    id: 'p1',
    name: 'Candlestick Chart & SMC Liquidity',
    url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    category: 'Charts',
  },
  {
    id: 'p2',
    name: 'Multi-Monitor Trading Desk',
    url: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80',
    category: 'Desk',
  },
  {
    id: 'p3',
    name: 'Institutional Dark Terminal',
    url: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80',
    category: 'Terminal',
  },
  {
    id: 'p4',
    name: 'Order Book Depth Analysis',
    url: 'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&w=1200&q=80',
    category: 'Charts',
  },
  {
    id: 'p5',
    name: 'Senior Market Strategist',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    category: 'People',
  },
  {
    id: 'p6',
    name: 'Executive Prop Trader',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    category: 'People',
  },
  {
    id: 'p7',
    name: 'Gold (XAU/USD) Macro Trading',
    url: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1200&q=80',
    category: 'Assets',
  },
  {
    id: 'p8',
    name: 'High Frequency Algorithmic Server',
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    category: 'Tech',
  },
  {
    id: 'p9',
    name: 'Financial Skyline & Forex Hub',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    category: 'Urban',
  },
];

export const initialSiteSettings: SiteSettings = {
  heroHeadline: 'Master Institutional Forex & Algorithmic Market Edge',
  heroSubheadline:
    'Trade like the institutions that move the market. Precision Smart Money Concepts (SMC), institutional liquidity cycles, and disciplined risk frameworks designed to secure funded accounts from $50K to $300K+.',
  heroPrimaryCta: {
    label: 'Explore Academy Courses',
    destination: '#courses',
  },
  heroSecondaryCta: {
    label: 'Join Live Trading Room',
    destination: '#pricing',
  },
  aboutTitle: 'Stripping Away Retail Lag to Reveal Institutional Liquidity',
  aboutDescription:
    'Founded in 2020 by former Tier-1 interbank flow analysts and veteran algorithmic prop traders, NOVA FX was built on a single truth: retail indicators lag, but order flow never lies. We mentor disciplined traders into high-conviction decision-makers who systematically capitalize on market imbalances.',
  stats: [
    { label: 'Funded Capital Unlocked', value: '$18.4M+', sublabel: 'Across Top Prop Firms' },
    { label: 'Evaluation Pass Rate', value: '91.8%', sublabel: 'Stage 1 & Stage 2 Average' },
    { label: 'Active Academy Members', value: '3,840+', sublabel: 'In 48 Countries' },
    { label: 'Average Risk-Reward', value: '1 : 4.6', sublabel: 'On Confirmed Setups' },
  ],
  navLinks: [
    { id: '1', label: 'Courses', href: '#courses' },
    { id: '2', label: 'Roadmap', href: '#roadmap' },
    { id: '3', label: 'Features', href: '#features' },
    { id: '4', label: 'About', href: '#about' },
    { id: '5', label: 'Pricing', href: '#pricing' },
    { id: '6', label: 'Testimonials', href: '#testimonials' },
    { id: '7', label: 'Market Insights', href: '#blog' },
    { id: '8', label: 'FAQ', href: '#faq' },
    { id: '9', label: 'Contact', href: '#contact' },
  ],
  socialLinks: [
    { platform: 'telegram', url: 'https://t.me/novafxtrading' },
    { platform: 'twitter', url: 'https://x.com/novafx_official' },
    { platform: 'youtube', url: 'https://youtube.com/@novafx' },
    { platform: 'discord', url: 'https://discord.gg/novafx' },
  ],
  sectionVisibility: {
    hero: true,
    about: true,
    features: true,
    courses: true,
    roadmap: true,
    pricing: true,
    testimonials: true,
    blog: true,
    faq: true,
    contact: true,
  },
  contactEmail: 'admissions@novafx.academy',
  contactTelegram: '@NovaFX_Desk',
  contactLocation: 'London Financial District / Canary Wharf & New York Desk',
  communityWhatsappUrl: 'https://chat.whatsapp.com/NovaFxMentorships',
  youtubeUrl: 'https://youtube.com/@novafx',
  quickLinksVisibility: {
    youtube: true,
    sessionClock: true,
    newsCalendar: true,
    marketSentiment: true,
  },
  headerQuickLinks: [
    {
      id: 'link-whatsapp',
      key: 'whatsapp',
      title: 'WhatsApp Community',
      url: 'https://chat.whatsapp.com/NovaFxMentorships',
      enabled: true,
      order: 1,
      icon: 'whatsapp',
    },
    {
      id: 'link-youtube',
      key: 'youtube',
      title: 'NOVA FX MENTORSHIPS',
      url: 'https://youtube.com/@novafx',
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
  ],
  rgbDotSettings: {
    enabled: true,
    size: 'tiny',
    glowIntensity: 'subtle',
    speed: 'normal',
  },
  communityButtonSettings: {
    enabled: true,
    text: 'JOIN COMMUNITY 🚀',
    url: 'https://chat.whatsapp.com/NovaFxMentorships',
    theme: 'cyan-blue-purple',
    glow: 'subtle',
  },
  showcaseImageSettings: {
    enabled: true,
    imageUrl: '/assets/nova_official_art.png',
    altText: 'NOVA FX Official Mentorship & Trading Academy',
    caption: 'NOVA OFFICIAL • Master The Markets With Discipline & High Probability SMC',
    position: 'center',
    size: 'large',
    fit: 'contain',
    aspectRatio: '16:9',
  },
};

export const initialCourses: Course[] = [
  {
    id: 'course-smc-mastery',
    title: 'Smart Money Concepts & Liquidity Architecture',
    slug: 'smc-liquidity-mastery',
    shortDescription:
      'Learn how central banks and liquidity providers build positions through Fair Value Gaps, Order Blocks, and Liquidity Sweeps.',
    description:
      'A deep-dive institutional curriculum decoding market maker footprints. Stop relying on lagging indicators like RSI or Bollinger Bands. Master high-probability liquidity pools, Asian session sweeps, London open expansions, and New York reversals with surgical multi-timeframe precision.',
    level: 'Advanced',
    price: 349,
    duration: '28 Hours • 6 Modules',
    modulesCount: 6,
    rating: 4.96,
    enrolledCount: 1420,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    badge: 'Flagship Program',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    customLinks: [
      {
        id: 'cl-1',
        title: 'NOVA YouTube Strategy Walkthrough',
        url: 'https://youtube.com',
        type: 'youtube',
      },
      {
        id: 'cl-2',
        title: 'Institutional Liquidity Cheatsheet (Drive)',
        url: 'https://drive.google.com',
        type: 'drive',
      },
      {
        id: 'cl-3',
        title: 'Prop Firm Risk Calculator Template',
        url: 'https://tradingview.com',
        type: 'tradingview',
      },
      {
        id: 'cl-4',
        title: 'VIP Student Trade Alerts Discord',
        url: 'https://discord.com',
        type: 'discord',
      },
    ],
    isPublished: true,
    createdAt: '2026-01-15',
    updatedAt: '2026-10-20',
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Market Structure Breakdown (HTF to LTF)',
        duration: '4h 15m',
        lessons: [
          'True Swing Structure vs Internal Inducement',
          'Break of Structure (BOS) vs Change of Character (CHOCH)',
          'Mapping Highs & Lows: Protected vs Targeted Extremes',
        ],
      },
      {
        id: 'm2',
        title: 'Module 2: Liquidity Engineering & Order Flow',
        duration: '5h 10m',
        lessons: [
          'Buy-Side & Sell-Side Liquidity (BSL / SSL)',
          'Engineering Retail Traps: Trendline & Double Top Bait',
          'Fair Value Gaps (FVG) and Inversion Gap mechanics',
        ],
      },
      {
        id: 'm3',
        title: 'Module 3: Order Blocks & Institutional Mitigations',
        duration: '4h 45m',
        lessons: [
          'Refining Order Blocks to 1-Minute Sniper Entries',
          'Breaker Blocks vs Mitigation Blocks',
          'Premium vs Discount Equilibrium Pricing',
        ],
      },
      {
        id: 'm4',
        title: 'Module 4: Session Timing & Killzones',
        duration: '4h 30m',
        lessons: [
          'Asian Session Range & Accumulation',
          'London Open Judas Swing & Institutional Manipulation',
          'New York Continuation & Reversal Models',
        ],
      },
      {
        id: 'm5',
        title: 'Module 5: Risk Modeling & Trade Management',
        duration: '4h 50m',
        lessons: [
          'Fixed 0.5% - 1% Risk Allocation Equations',
          'Scaling Out and Partial Profit Securing',
          'Breakeven Thresholds without Premature Stopping',
        ],
      },
      {
        id: 'm6',
        title: 'Module 6: Live Trade Execution Archive',
        duration: '5h 00m',
        lessons: [
          'EUR/USD +22R London Open Walkthrough',
          'GBP/USD NFP News Volatility Trade Breakdown',
          'XAU/USD Gold Range Expansion Case Studies',
        ],
      },
    ],
  },
  {
    id: 'course-prop-firm-accelerator',
    title: 'Prop Firm Evaluation Blueprint ($100K - $300K)',
    slug: 'prop-firm-evaluation-blueprint',
    shortDescription:
      'Step-by-step quantitative protocol to pass FTMO, Funding Pips, and MFF challenges without violating drawdown rules.',
    description:
      'Designed specifically for traders preparing to handle six-figure institutional funded capital. Learn mathematical drawdown buffer allocation, daily loss limit defenses, volatility avoidance, and high-probability setup filtering.',
    level: 'Intermediate',
    price: 289,
    duration: '18 Hours • 5 Modules',
    modulesCount: 5,
    rating: 4.92,
    enrolledCount: 1140,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80',
    badge: '91% Pass Rate',
    isPublished: true,
    createdAt: '2026-02-01',
    updatedAt: '2026-10-18',
    modules: [
      {
        id: 'm1',
        title: 'Module 1: The Mathematics of Prop Challenges',
        duration: '3h 30m',
        lessons: [
          'Deconstructing 8% Phase 1 and 5% Phase 2 Targets',
          'Daily Max Drawdown Safety Margins (4% Cap)',
          'Position Sizing Spreadsheet Walkthrough',
        ],
      },
      {
        id: 'm2',
        title: 'Module 2: High Probability Execution Checklists',
        duration: '4h 00m',
        lessons: [
          'The 4-Confluence Rule Before Entering Any Position',
          'News Event Blackouts: CPI, FOMC, and NFP Handling',
          'Filtering Out Low-Volume Choppy Ranges',
        ],
      },
      {
        id: 'm3',
        title: 'Module 3: Psychological Conditioning for Six Figures',
        duration: '3h 45m',
        lessons: [
          'Overcoming Imposter Syndrome with $200K Accounts',
          'The 2-Loss Daily Stop Rule to Prevent Tilting',
          'Recovery Protocols After a Drawdown Day',
        ],
      },
      {
        id: 'm4',
        title: 'Module 4: Scaling Plans & Profit Split Maximization',
        duration: '3h 15m',
        lessons: [
          'Bi-weekly Payout Verification Best Practices',
          'Reaching 90% Profit Split Tiers',
          'Tax Structuring and Business Entity Setup for Traders',
        ],
      },
    ],
  },
  {
    id: 'course-forex-foundations',
    title: 'Zero to Funded: Professional Forex Foundations',
    slug: 'professional-forex-foundations',
    shortDescription:
      'Comprehensive beginner roadmap covering pip values, lot calculations, economic calendars, and pure price action reading.',
    description:
      'Build your foundation the right way from day one without retail gimmicks. Learn currency correlations, global trading sessions, broker mechanics, and the psychology required to trade professionally.',
    level: 'Beginner',
    price: 149,
    duration: '14 Hours • 4 Modules',
    modulesCount: 4,
    rating: 4.88,
    enrolledCount: 890,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80',
    badge: 'Beginner Friendly',
    isPublished: true,
    createdAt: '2026-03-10',
    updatedAt: '2026-10-12',
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Forex Architecture & Currency Pairs',
        duration: '3h 00m',
        lessons: [
          'Major, Minor, and Exotic Pairs Anatomy',
          'Bid/Ask Spreads, Slippage, and Commission Impact',
          'Leverage, Margin, and Free Margin Dynamics',
        ],
      },
      {
        id: 'm2',
        title: 'Module 2: Candlestick Mechanics & Chart Setup',
        duration: '3h 30m',
        lessons: [
          'Anatomy of a Candlestick: Open, High, Low, Close',
          'TradingView Master Setup: Institutional Clean Layout',
          'Multi-timeframe Top-Down Analysis Protocol',
        ],
      },
      {
        id: 'm3',
        title: 'Module 3: Macro Fundamentals & Central Bank Policy',
        duration: '3h 45m',
        lessons: [
          'Interest Rate Differentials and Carry Trade Dynamics',
          'Reading Economic Calendars Like a Pro (ForexFactory)',
          'Understanding Inflation (CPI) and Employment (NFP) Shocks',
        ],
      },
      {
        id: 'm4',
        title: 'Module 4: Executing Your First High-R:R Trades',
        duration: '3h 45m',
        lessons: [
          'Setting Stop Losses with Structural Logic',
          'Targeting Liquidity Pools for Minimum 1:3 R:R',
          'Trading Journal Habit & Self-Audit System',
        ],
      },
    ],
  },
  {
    id: 'course-algorithmic-psychology',
    title: 'Algorithmic Psychology & Performance Mastery',
    slug: 'algorithmic-psychology-performance',
    shortDescription:
      'Eliminate FOMO, revenge trading, and emotional hesitation with neuroscience-backed behavioral conditioning.',
    description:
      'Developed alongside sports psychologists and institutional hedge fund performance coaches. Discover how elite traders execute under extreme stress, enter the zone of peak state, and turn discipline into an unbreakable habit.',
    level: 'Mastery',
    price: 249,
    duration: '12 Hours • 4 Modules',
    modulesCount: 4,
    rating: 4.97,
    enrolledCount: 650,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    badge: 'Mindset Elite',
    isPublished: true,
    createdAt: '2026-04-05',
    updatedAt: '2026-10-15',
    modules: [
      {
        id: 'm1',
        title: 'Module 1: The Neurochemistry of Trading Decisions',
        duration: '3h 00m',
        lessons: [
          'Dopamine Spikes and the Illusion of Certainty',
          'Cortisol in Drawdowns: Recognizing Threat Responses',
          'Pre-Market Grounding and Executive Brain Activation',
        ],
      },
      {
        id: 'm2',
        title: 'Module 2: The Eradication of Revenge Trading',
        duration: '3h 15m',
        lessons: [
          'Hard Stop Rules: The Circuit Breaker Protocol',
          'De-identifying Self-Worth from P&L Fluctuations',
          'Building Immunity to Missed Move Anxiety (FOMO)',
        ],
      },
      {
        id: 'm3',
        title: 'Module 3: Peak State Routine of 7-Figure Traders',
        duration: '2h 45m',
        lessons: [
          'Morning Institutional Pre-Flight Checklist',
          'During-Session Focus State & Breath Control',
          'Post-Session Debrief & Trade Tagging',
        ],
      },
    ],
  },
  {
    id: 'course-gold-macro-trading',
    title: 'XAU/USD Gold Institutional Swing & Intraday Playbook',
    slug: 'gold-xauusd-institutional-playbook',
    shortDescription:
      'Specialized tactics to capture 200+ pip expansions on Gold using yields, DXY correlation, and session sweeps.',
    description:
      'Gold moves with immense volatility and liquidity. This masterclass unlocks the exact session playbooks for XAU/USD, including the London Gold Fix, US yields correlation, and the Asian range sweep strategy.',
    level: 'Advanced',
    price: 319,
    duration: '16 Hours • 5 Modules',
    modulesCount: 5,
    rating: 4.94,
    enrolledCount: 780,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1200&q=80',
    badge: 'High Volatility',
    isPublished: true,
    createdAt: '2026-05-12',
    updatedAt: '2026-10-14',
    modules: [
      {
        id: 'm1',
        title: 'Module 1: The Drivers of Gold (DXY, 10Y Yields, Geopolitics)',
        duration: '3h 15m',
        lessons: ['Real Yields vs Gold Inverse Correlation', 'Safe Haven Flow Catalysts', 'Gold Fix Cycles'],
      },
      {
        id: 'm2',
        title: 'Module 2: The New York Open 100-Pip Expansion Model',
        duration: '3h 45m',
        lessons: ['London High/Low Liquidity Sweep', 'COMEX Volume Spikes', 'Entry Trigger Confirmation'],
      },
    ],
  },
  {
    id: 'course-live-room-archive',
    title: 'Live Trading Room Master Archive: 100+ Recorded Sessions',
    slug: 'live-trading-room-master-archive',
    shortDescription:
      'Over 100 recorded live trading sessions with real-time execution commentary and post-market reviews.',
    description:
      'Watch senior mentors navigate live London and New York sessions. Every winning trade and losing trade analyzed with radical transparency.',
    level: 'Intermediate',
    price: 199,
    duration: '60+ Hours • 8 Modules',
    modulesCount: 8,
    rating: 4.91,
    enrolledCount: 1540,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&w=1200&q=80',
    badge: 'Live Case Studies',
    isPublished: true,
    createdAt: '2026-06-01',
    updatedAt: '2026-10-10',
    modules: [
      {
        id: 'm1',
        title: 'Module 1: High Volatility NFP Live Recordings',
        duration: '8h 00m',
        lessons: ['NFP June 2026 Execution', 'NFP July 2026 Execution', 'Managing Volatility Spreads'],
      },
      {
        id: 'm2',
        title: 'Module 2: FOMC Rate Decisions & Powell Pressers',
        duration: '7h 30m',
        lessons: ['Pre-FOMC Positioning', 'Statement vs Press Conference Swings', 'Next Day Continuation Moves'],
      },
    ],
  },
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: 'post-smc-liquidity-sweeps',
    title: 'How Central Banks Hunt Retail Stop Losses: The Mechanics of Liquidity Sweeps',
    slug: 'how-central-banks-hunt-retail-stop-losses',
    category: 'SMC & Liquidity',
    excerpt:
      'Understand why your stop loss gets tapped right before the market surges in your predicted direction, and how to enter at the sweep instead.',
    content: `## Why Retail Support & Resistance Fails

Retail trading textbooks teach traders to put their stop loss 5 to 10 pips below a "double bottom" or horizontal support line. To institutional algorithms handling billions in volume, that cluster of retail stop losses is not support—it is liquidity.

Large institutions cannot simply click "Buy" on 5,000 lots of EUR/USD without moving the market price substantially. They need a massive pool of sell orders to absorb their buy orders. Where are those sell orders located? Right below obvious support levels in the form of stop-loss orders.

### The 3 Stages of an Institutional Sweep

1. **Accumulation / Range Building**: Price forms a clean, visible horizontal support floor. Retail traders buy, placing stops directly underneath.
2. **The Manipulation / Judas Swing**: A rapid, aggressive candle drives price 15 to 30 pips through the support level, triggering every retail stop order and trapping breakout sellers.
3. **The Expansion**: Having filled their institutional buy orders at discounted wholesale prices, algorithms rapidly pump price back into the range and expand in the true intended direction.

### Key Rule for NOVA FX Traders

Never enter at the touch of support. Wait for the liquidity sweep, verify the displacement candle back into the range, and enter on the retest of the resulting Fair Value Gap (FVG). This shifts you from being the hunted to trading alongside the predator.`,
    readTime: '6 min read',
    author: 'Marcus Vance, Chief Market Strategist',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    isPublished: true,
    createdAt: '2026-10-24',
    updatedAt: '2026-10-24',
  },
  {
    id: 'post-prop-firm-drawdown-math',
    title: 'The Prop Firm Drawdown Survival Guide: Mathematical Risk Modeling',
    slug: 'prop-firm-drawdown-survival-guide',
    category: 'Prop Firm Guides',
    excerpt:
      'The difference between funded traders and blown accounts is not the win rate—it is the math of maximum drawdown tolerance.',
    content: `## The Optical Illusion of 10% Maximum Drawdown

When a prop firm offers a $100,000 account with a 10% maximum trailing drawdown, most beginners believe they have $100,000 of capital. In reality, you only have $10,000 of working capital before account liquidation.

If you risk 2% of the total account balance ($2,000) on a single trade, you are actually risking **20% of your entire survival buffer**. A streak of 4 consecutive losses—common in any statistical trading system—destroys 80% of your account.

### The NOVA FX 0.5% Rule

To ensure statistical survival:
- **Phase 1 Target**: 8% ($8,000)
- **Max Risk Per Trade**: 0.5% ($500)
- **Minimum Target R:R**: 1 : 3.5 ($1,750 profit per win)

With this framework, you need 20 consecutive losses to breach your drawdown. Even with a modest 40% win rate, your positive expectancy guarantees you pass the evaluation within 14 to 22 trading sessions.`,
    readTime: '8 min read',
    author: 'Elena Rostova, Quantitative Risk Lead',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80',
    isPublished: true,
    createdAt: '2026-10-18',
    updatedAt: '2026-10-18',
  },
  {
    id: 'post-london-newyork-killzones',
    title: 'Trading the London & New York Session Killzones for Maximum Volatility',
    slug: 'trading-london-newyork-killzones',
    category: 'Market Analysis',
    excerpt:
      'Why 80% of the daily pip range on major currency pairs unfolds during two precise 3-hour windows.',
    content: `## Time Is More Important Than Price

Forex does not trade uniformly across 24 hours. The highest conviction setups occur when London and New York banking desks are actively passing liquidity back and forth.

### 1. London Open Killzone (07:00 - 10:00 GMT)
- **Characteristics**: Creates the high or low of the daily range roughly 70% of the time.
- **Top Pairs**: EUR/USD, GBP/USD, EUR/GBP.
- **Primary Setup**: Asian Session Range Sweep followed by displacement towards daily bias.

### 2. New York Open Killzone (13:00 - 16:00 GMT)
- **Characteristics**: Overlaps with the London afternoon session, generating the highest tick volume of the 24-hour cycle.
- **Top Pairs**: EUR/USD, USD/JPY, Gold (XAU/USD), US30, Nasdaq.
- **Primary Setup**: Retest of the London trend or massive reversal off Key HTF Fair Value Gaps.`,
    readTime: '5 min read',
    author: 'Tariq Al-Mansoor, Head of FX Flow',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80',
    isPublished: true,
    createdAt: '2026-10-12',
    updatedAt: '2026-10-12',
  },
  {
    id: 'post-trading-psychology-zone',
    title: 'De-coupling Ego From Outcome: How Elite Traders Enter The Zone',
    slug: 'de-coupling-ego-from-outcome',
    category: 'Risk Psychology',
    excerpt:
      'Mastering the psychological transition from needing to be right on every trade to executing an asymmetric probabilistic edge.',
    content: `## The Casino Mindset vs The Retail Mindset

A casino operator never celebrates when a roulette ball hits black, nor do they panic when red hits 5 times in a row. They know with mathematical certainty that their house edge guarantees profitability over 10,000 spins.

Amateur traders, however, evaluate their worth on every single trade. When they win, they experience dopamine-driven invincibility and over-leverage. When they lose, they experience shame and revenge trade.

### The 3 Mental Invariants of NOVA FX Mentorship

1. **Any Single Trade Outcome is Random**: Your edge is only visible over a sample of 30+ trades.
2. **A Losing Trade Executed Correctly is a Complete Success**: If you followed your plan, respected your risk, and stopped out cleanly, you executed like a hedge fund professional.
3. **Radical Acceptance of Stop Losses**: A stop loss is simply the cost of doing business, identical to inventory expenses in a retail company.`,
    readTime: '7 min read',
    author: 'Dr. Julian Thorne, Performance Coach',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    isPublished: true,
    createdAt: '2026-10-05',
    updatedAt: '2026-10-05',
  },
];

export const initialPricingPlans: PricingPlan[] = [
  {
    id: 'plan-starter',
    name: 'Starter Trader',
    priceMonthly: 49,
    priceYearly: 39,
    badge: 'Foundation',
    description: 'Perfect for beginners building solid price action foundations and risk discipline.',
    features: [
      'Access to Forex Foundations Course (14 Hours)',
      'Weekly Market Outlook & Economic Calendar Brief',
      'TradingView Indicators & Institutional Template',
      'Community Discord General Discussion Access',
      'Downloadable Risk Calculator & Trade Journal Sheet',
    ],
    isPopular: false,
    ctaText: 'Start Free 7-Day Trial',
    ctaLink: '#contact',
    sortOrder: 1,
  },
  {
    id: 'plan-pro',
    name: 'Pro Funded Trader',
    priceMonthly: 99,
    priceYearly: 79,
    badge: 'Most Popular',
    description: 'Our core comprehensive package for traders actively targeting $50K - $200K prop firm funding.',
    features: [
      'Full Access to Smart Money Concepts (SMC) Mastery Course',
      'Prop Firm Evaluation Blueprint ($100K - $300K pass protocols)',
      'Live London & New York Killzone Trading Streams (Mon - Thu)',
      'Real-Time Trade Setups & Institutional Watchlist Alerts',
      'Dedicated Mentor Q&A and Weekly Homework Reviews',
      '100+ Hours Live Session Video Archive with Timestamps',
      'VIP Discord Channels & Student Accountability Squads',
    ],
    isPopular: true,
    ctaText: 'Unlock Pro Membership',
    ctaLink: '#contact',
    sortOrder: 2,
  },
  {
    id: 'plan-institutional',
    name: 'Institutional VIP Mentorship',
    priceMonthly: 249,
    priceYearly: 199,
    badge: 'Limited Seats',
    description: 'Elite 1-on-1 direct coaching with senior liquidity strategists for funded capital scaling.',
    features: [
      'Everything in Pro Funded Trader Plan',
      'Bi-Weekly 1-on-1 Video Coaching Sessions with Marcus Vance',
      'Personal Trade Journal Audit & Psychological Profiling',
      'Direct Private Telegram Hotline to Senior Desk Mentors',
      'Exclusive Gold (XAU/USD) & Algorithmic Quantitative Modules',
      'Guaranteed Fast-Track Prop Firm Scaling Guidance to $500K+',
      'Lifetime Access to All Future Academy Course Releases',
    ],
    isPopular: false,
    ctaText: 'Apply for VIP Coaching',
    ctaLink: '#contact',
    sortOrder: 3,
  },
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    studentName: 'David K., London',
    role: 'FTMO $200K Funded Trader',
    fundedAmount: '$200,000 Funded',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    quote:
      'Before NOVA FX, I blew four $50K challenges by overleveraging EUR/USD during news. The SMC Mastery program completely rewired my mindset. Learning to wait for the London Open Judas swing allowed me to pass my $200K FTMO challenge in 16 trading days. Just received my third bi-weekly payout of $14,200!',
    rating: 5,
    verified: true,
    payoutProof: '$14,200 Payout Proof Verified',
  },
  {
    id: 'test-2',
    studentName: 'Sophia M., Toronto',
    role: 'MFF & Funding Pips Trader',
    fundedAmount: '$150,000 Funded',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    quote:
      'The Prop Firm Blueprint alone is worth ten times the subscription. Elena’s drawdown equations prevented me from tilting during a tough 3-loss streak. I stopped looking at profit dollars and focused strictly on R-multiples. I am now managing $150K across two firms and trading full-time.',
    rating: 5,
    verified: true,
    payoutProof: 'Funded Certificate #8921',
  },
  {
    id: 'test-3',
    studentName: 'Liam O., Sydney',
    role: 'Full-Time FX Scalper',
    fundedAmount: '$100,000 Funded',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    quote:
      'The live London killzone streams are pure gold. Seeing Marcus break down real-time order flow on GBP/USD before the candle even prints gave me the confidence to execute without hesitation. Best trading community by far.',
    rating: 5,
    verified: true,
    payoutProof: 'FTMO Passed May 2026',
  },
  {
    id: 'test-4',
    studentName: 'Mateo R., Madrid',
    role: 'Gold (XAU/USD) Specialist',
    fundedAmount: '$300,000 Funded',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    quote:
      'NOVA FX showed me that retail trendlines are just liquidity traps. Once you understand where institutional orders sit, Gold stops feeling chaotic and becomes the cleanest asset to trade. $300,000 funded capital achieved in 3 months.',
    rating: 5,
    verified: true,
    payoutProof: '$28,450 Profit Split Cleared',
  },
];

export const initialFaqs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'How is NOVA FX different from traditional retail trading courses?',
    answer:
      'Traditional courses teach lagging indicators like moving averages, MACD, and chart patterns that retail books have repeated since 1990. Market maker algorithms know exactly how retail traders think and engineer liquidity traps to hunt those stops. NOVA FX teaches you institutional mechanics: Order Blocks, Fair Value Gaps, session killzones, and how liquidity is swept and distributed by central bank pricing algorithms.',
    category: 'Curriculum & Methodology',
    sortOrder: 1,
  },
  {
    id: 'faq-2',
    question: 'Is this suitable for complete beginners?',
    answer:
      'Yes. Our Zero to Funded: Professional Forex Foundations course starts from the absolute ground up—covering pip values, broker execution, TradingView setups, and risk formulas. However, we do not waste time on indicator gimmicks; you learn institutional order flow principles from your very first week.',
    category: 'Curriculum & Methodology',
    sortOrder: 2,
  },
  {
    id: 'faq-3',
    question: 'Do you guarantee I will pass a prop firm evaluation?',
    answer:
      'No honest trading academy can guarantee trading results, as execution depends on your discipline and psychological adherence. However, our students who strictly follow the 0.5% risk modeling protocol and the 4-confluence rule maintain an industry-leading 91.8% evaluation pass rate on FTMO, Funding Pips, and The Funded Trader.',
    category: 'Prop Firm Evaluations',
    sortOrder: 3,
  },
  {
    id: 'faq-4',
    question: 'When do the Live Trading Room sessions happen?',
    answer:
      'Live streams run Monday through Thursday during the two primary volatility windows: London Open (07:30 - 09:30 GMT) and New York Open (13:15 - 15:30 GMT). All sessions are recorded and archived in full 4K with marked timestamps for students in different time zones.',
    category: 'Live Trading Room',
    sortOrder: 4,
  },
  {
    id: 'faq-5',
    question: 'Can I cancel or upgrade my subscription anytime?',
    answer:
      'Yes, you can upgrade, downgrade, or cancel your subscription at any moment with one click directly from your account settings. There are no contracts, lock-in periods, or hidden cancellation fees.',
    category: 'Billing & Plans',
    sortOrder: 5,
  },
  {
    id: 'faq-6',
    question: 'What trading capital do I need to start?',
    answer:
      'You can practice all concepts on free demo accounts first. Once you demonstrate consistent positive expectancy in your trading journal, you can enter a $10,000 or $50,000 prop firm challenge for as little as $80 - $250, rather than risking your own savings.',
    category: 'General',
    sortOrder: 6,
  },
];
