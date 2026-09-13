export const SERVICE_INDEX = [
  { code: 'SVC-01', label: 'Web development' },
  { code: 'SVC-02', label: 'Search visibility' },
  { code: 'SVC-03', label: 'Chatbots & AI' },
  { code: 'SVC-04', label: 'Cloud' },
  { code: 'SVC-05', label: 'System design' },
  { code: 'SVC-06', label: 'Databases' },
];

// PLACEHOLDER: confirm durations against real delivery times.
export const SERVICES = [
  {
    code: 'SVC-01',
    title: 'Build Your Website',
    shortDesc: 'Fast, clean websites that convert.',
    dur: '4–10 weeks',
    desc: 'Marketing sites, web apps, and tools built to your spec. No plugin bloat.',
    tags: ['Next.js', 'React', 'Modern Stack'],
    image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    featured: true,
    layout: 'large',
  },
  {
    code: 'SVC-02',
    title: 'Get Found Online',
    shortDesc: 'Rankings that stick.',
    dur: 'Audit 2 wks, then ongoing',
    desc: 'Technical SEO audits and content strategy. We fix what blocks you.',
    tags: ['SEO Audit', 'Rankings', 'Content'],
    image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    featured: false,
    layout: 'small',
  },
  {
    code: 'SVC-03',
    title: 'AI That Answers',
    shortDesc: 'Support that actually helps.',
    dur: '3–6 weeks',
    desc: 'Chatbots that learn from your content. Automation that works.',
    tags: ['Smart Q&A', 'Chatbot', 'Support'],
    image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    featured: true,
    layout: 'large',
  },
  {
    code: 'SVC-04',
    title: 'Scale Without Stress',
    shortDesc: 'Cloud done right.',
    dur: '2–8 weeks',
    desc: 'Migration, scaling, predictable bills. Deployment pipelines included.',
    tags: ['AWS/Azure/GCP', 'Deployment', 'Scaling'],
    image: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    featured: true,
    layout: 'small',
  },
  {
    code: 'SVC-05',
    title: 'Build to Grow',
    shortDesc: 'Architecture that scales.',
    dur: '1–3 weeks',
    desc: 'System design for growth. Diagrams, decisions, and a build plan.',
    tags: ['Architecture', 'Scaling Plan', 'Decisions'],
    image: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    featured: true,
    layout: 'small',
  },
  {
    code: 'SVC-06',
    title: 'Data That Works',
    shortDesc: 'Databases optimized.',
    dur: '1–4 weeks',
    desc: 'Schema, migrations, backups, and tuning. Fast and safe.',
    tags: ['PostgreSQL', 'MongoDB', 'Optimization'],
    image: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    featured: false,
    layout: 'large',
  },
];

export const FEATURED_SERVICES = SERVICES.filter((s) => s.featured);

export const CATALOG = [
  {
    key: 'build',
    code: 'GRP-01',
    label: 'Build',
    desc: 'Custom software, mobile apps, e-commerce, and everything in between.',
    items: ['Mobile apps (iOS / Android)', 'E-commerce stores', 'Custom SaaS products', 'API development & integrations', 'Legacy system modernisation', 'Internal tools & low-code', 'UI/UX design', 'QA & test automation', 'Accessibility (WCAG) remediation'],
  },
  {
    key: 'run',
    code: 'GRP-02',
    label: 'Run & Support',
    desc: 'Keep it running. Hosting, monitoring, backups, and 24/7 reliability.',
    items: ['Managed hosting', 'Maintenance retainers', 'DevOps & CI/CD', 'Monitoring & uptime', 'Performance optimisation', 'IT helpdesk & device management', 'Backup & disaster recovery'],
  },
  {
    key: 'data',
    code: 'GRP-03',
    label: 'Data & AI',
    desc: 'Pipelines, dashboards, automation, and intelligence from your data.',
    items: ['Data pipelines (ETL)', 'Data warehousing', 'BI dashboards & reporting', 'Document processing automation', 'Internal knowledge assistants', 'Forecasting & ML models', 'Data migration & cleanup'],
  },
  {
    key: 'secure',
    code: 'GRP-04',
    label: 'Security',
    desc: 'Audits, compliance, and protection that actually works.',
    items: ['Security audits & pen testing', 'Compliance readiness (ISO 27001, SOC 2, GDPR)', 'Identity & access management', 'Privacy & data handling review', 'Security awareness training'],
  },
  {
    key: 'grow',
    code: 'GRP-05',
    label: 'Growth',
    desc: 'Rankings, traffic, conversions, and the customers who stay.',
    items: ['Paid search & social', 'Conversion rate optimisation', 'Email & lifecycle campaigns', 'Landing pages & content', 'Analytics & tracking setup', 'CRM / ERP implementation'],
  },
  {
    key: 'advise',
    code: 'GRP-06',
    label: 'Advisory',
    desc: 'Expert guidance, due diligence, and strategy that scales.',
    items: ['Fractional CTO', 'Technology due diligence', 'Vendor & platform selection', 'Team augmentation', 'Training & workshops', 'Product discovery sprints'],
  },
];

export const PICKABLE = [
  'Web development', 'Search visibility (SEO)', 'Chatbots & AI assistants', 'Cloud',
  'System design', 'Database setup', 'Mobile app', 'E-commerce', 'Custom software',
  'Integrations', 'DevOps', 'Data & reporting', 'Security & compliance',
  'Maintenance retainer', 'Not sure yet',
];

// PLACEHOLDER: confirm bands against the real pricing floor.
export const BUDGETS = ['Under $5,000', '$5,000 – $15,000', '$15,000 – $50,000', '$50,000 +', 'Monthly retainer'];
export const TIMELINES = ['Urgent: this month', 'Next 1–3 months', '3–6 months', 'Just researching'];
export const SOURCES = ['Google search', 'Referral', 'Social media', 'Existing client', 'Other'];

export const STEPS = [
  { n: '1', title: 'Discovery call', body: "Thirty minutes on what you're trying to achieve, what already exists, and what's actually in the way." },
  { n: '2', title: 'Written proposal', body: 'Scope, deliverables, timeline, and a fixed price. If we think you need less than you asked for, we say so.' },
  { n: '3', title: 'Build in the open', body: 'Weekly demos on a staging link. You see progress as it happens instead of at the end.' },
  { n: '4', title: 'Handover or hosting', body: 'Documentation and training so your team can run it, or a support retainer so we do.' },
];

export const BUYS = [
  { n: '01', title: 'Hunger over pedigree', body: "Not 'we're new,' but: we're the two people who will out-work anyone for your project, because that's the only way we've ever gotten anything." },
  { n: '02', title: 'The method is the story', body: "Legacy modernisation, system design, database untangling, cost control: all of it is breaking a loop someone's been stuck in." },
  { n: '03', title: 'A shared vocabulary', body: "'What's the loop here?' 'Let's find your base case.' You'll know exactly how we think before you sign anything." },
];

export const STUDIO_STATS = [
  { value: '8+', label: 'Shipped Client Builds' },
  { value: '100%', label: 'Built Around Your Business' },
  { value: '100%', label: 'On-Time Project Delivery' },
  { value: '0', label: 'Unnecessary Extras' },
];

export const PROJECTS = [
  {
    id: '7ty7',
    title: '7ty7',
    client: '7ty7 Events & Productions',
    url: 'https://www.7ty7.com/',
    status: 'live',
    category: 'Experiential & Media',
    tagline: 'Experiential Event Agency & Global Productions',
    desc: 'High-octane digital experience engineered for a global experiential event agency producing concerts, corporate spectacles, and brand activations worldwide across Australia and India.',
    stack: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Performance SEO', 'Vite'],
    metrics: 'Australia + India Production · Sub-second Interactions · Dynamic Booking Funnel',
    accentColor: '#E84C3D',
    year: '2025',
    featured: true,
  },
  {
    id: 'ivory-atelier',
    title: 'Ivory Atelier Beauty',
    client: 'Ivory Atelier',
    url: 'https://www.ivoryatelierbeauty.com/',
    status: 'live',
    category: 'Luxury & Aesthetics',
    tagline: 'Unhurried House for Hair, Nails, Beauty & Café',
    desc: 'Bespoke digital atelier with custom consultation scheduling, editorial aesthetics, service catalogs, and seamless customer touchpoints for Mumbai’s luxury sanctuary in Juhu.',
    stack: ['Next.js App Router', 'Headless Booking', 'Custom Typography', 'SEO Schema'],
    metrics: 'Custom Booking Engine · Mobile-First UI · Luxury Micro-animations',
    accentColor: '#A88A56',
    year: '2025',
    featured: true,
  },
  {
    id: 'tyche-media',
    title: 'Tyche Media',
    client: 'Tyche Media Group',
    url: 'https://www.tyche.media/',
    status: 'live',
    category: 'Growth & Agency',
    tagline: 'High-Impact Performance Marketing & Creative Media',
    desc: 'Sleek, high-converting digital presence built to communicate performance marketing results, creative strategy, and scalable growth engines for fast-scaling brands.',
    stack: ['React', 'Next.js', 'Conversion Architecture', 'Interactive Grids'],
    metrics: 'Conversion-Optimized · High-Contrast Tech Typography · Instant Lead Flow',
    accentColor: '#2B3FE8',
    year: '2025',
    featured: true,
  },
  {
    id: '22nd-avenue',
    title: '22nd Avenue',
    client: '22nd Avenue Talent Management',
    url: 'https://22ndavenue.co.in/',
    status: 'live',
    category: 'Media & Entertainment',
    tagline: 'Global Talent & Celebrity Management',
    desc: '22nd Avenue was born from a vision to craft world-class experiences in entertainment, founded by Aditya Mehra, Daryl Sheldon and Manoj Gopalani. Handling global brand collaborations, celebrity representation, influencer marketing, and live events.',
    stack: ['Next.js', 'Talent Roster Engine', 'Brand Partnerships', 'JAMstack'],
    metrics: 'Global Talent Roster · Brand Partnership Engine · Live Event Hub',
    accentColor: '#7C3AED',
    year: '2026',
    featured: true,
  },
  {
    id: 'healthy-soya',
    title: 'Healthy Soya',
    client: 'Healthy Soya Foods',
    url: 'https://healthysoya.com/',
    status: 'live',
    category: 'Food & Consumer Goods',
    tagline: 'Pure Plant-Based Soya Nutrition & Healthy Foods',
    desc: 'Clean corporate and consumer website showcasing product nutrition profiles, manufacturing certifications, B2B wholesale distribution inquiry portals, and retail locator.',
    stack: ['Responsive Web', 'B2B Inquiry Engine', 'Product Showcase', 'SEO Engine'],
    metrics: 'B2B Distributor Portal · Nutrition Matrix · Fast Catalog View',
    accentColor: '#1E8E3E',
    year: '2024',
    featured: false,
  },
  {
    id: 'techfit-tech',
    title: 'TechFit Tech',
    client: 'TechFit Technologies',
    url: 'https://www.techfittech.com/',
    status: 'live',
    category: 'SaaS & Enterprise',
    tagline: 'Fitness Technology & Hardware-Software Ecosystems',
    desc: 'Comprehensive enterprise technology and software platform built for modern fitness facilities, boutique studios, automated tracking, and equipment integrations.',
    stack: ['Enterprise Web', 'Cloud Infrastructure', 'Interactive Demos', 'REST APIs'],
    metrics: 'Cloud-Connected · Hardware Showcase · Enterprise Inbound Pipeline',
    accentColor: '#0F62FE',
    year: '2024',
    featured: false,
  },
  {
    id: 'zoshe',
    title: 'Zoshe',
    client: 'Zoshe Fashion',
    url: 'https://www.zoshe.in/',
    status: 'live',
    category: 'E-Commerce & Fashion',
    tagline: 'Contemporary Designer Fashion & Apparel',
    desc: 'Blazing-fast e-commerce shopping experience for designer apparel, featuring curated collections, real-time inventory discovery, and friction-free mobile checkout.',
    stack: ['E-Commerce Engine', 'Next.js', 'Product Filtering', 'Mobile Checkout'],
    metrics: 'Instant Product Filtering · Fast Checkout · Visual Lookbooks',
    accentColor: '#1A6B54',
    year: '2025',
    featured: false,
  },
  {
    id: 'lsn-lagree',
    title: 'LSN Lagree',
    client: 'LSN Fitness Studio',
    url: 'https://lsn-lagree.netlify.app/',
    status: 'coming_soon',
    category: 'Fitness & Booking App',
    tagline: 'High-Intensity Lagree Method Fitness Platform',
    desc: 'Next-generation boutique studio platform featuring live class schedules, trainer rosters, interactive reformer booking, and automated membership checkout.',
    stack: ['Next.js / Netlify', 'Class Booking API', 'Member Portal', 'Tailwind'],
    metrics: 'Alpha Preview Online · Interactive Schedule · Instant Reservations',
    accentColor: '#DD5119',
    year: '2026 (Coming Soon)',
    featured: false,
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);

// Company, Contact, and Australian Registration details.
export const CONTACT = {
  companyName: 'Basecase Tech',
  email: 'basecase02@gmail.com',
  phone: '+61 424090855',
  country: 'Australia',
  address: { street: '[add street]', city: '[add city]', region: '[add region]', postal: '[add postcode]', country: 'Australia' },
  abn: '90 434 299 004',
};

