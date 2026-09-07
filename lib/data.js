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
    title: 'Web development',
    dur: '4–10 weeks',
    desc: 'Marketing sites, web apps, and internal tools built to your spec. Fast to load, simple to edit, and free of the plugin sprawl that breaks six months later.',
    loop: 'Breaks the loop: rebuilding the site every eighteen months.',
    tags: ['Next.js', 'React', 'Laravel', 'WordPress', 'Headless CMS'],
    featured: true,
  },
  {
    code: 'SVC-02',
    title: 'Search visibility',
    dur: 'Audit 2 wks, then ongoing',
    desc: "Technical SEO audits, site architecture, content structure, and local search. We fix what's holding the site back first, then build the pages that earn rankings.",
    loop: 'Breaks the loop: publishing content nobody finds.',
    tags: ['Technical audit', 'Core Web Vitals', 'Schema', 'Local SEO', 'Content'],
    featured: false,
  },
  {
    code: 'SVC-03',
    title: 'Chatbots & AI assistants',
    dur: '3–6 weeks',
    desc: 'Support bots, internal knowledge assistants, and lead qualifiers that answer from your own documents rather than guessing. Handover to a human when it matters.',
    loop: 'Breaks the loop: answering the same question forty times a week.',
    tags: ['RAG', 'Claude / GPT', 'Vector search', 'WhatsApp', 'Web widget'],
    featured: true,
  },
  {
    code: 'SVC-04',
    title: 'Cloud',
    dur: '2–8 weeks',
    desc: 'Migration off aging servers, architecture that scales with demand, and a monthly bill you can explain. Deployment pipelines included, not billed as an extra.',
    loop: 'Breaks the loop: a cloud bill nobody can explain.',
    tags: ['AWS', 'Azure', 'GCP', 'Docker', 'Terraform', 'CI/CD'],
    featured: true,
  },
  {
    code: 'SVC-05',
    title: 'System design',
    dur: '1–3 weeks',
    desc: 'Architecture for systems that need to survive growth. You get diagrams, written decisions with the reasoning kept in, and a build plan your own team can execute.',
    loop: 'Breaks the loop: patching symptoms instead of fixing the structure.',
    tags: ['Architecture review', 'Scaling plan', 'Integration mapping', 'Decision records'],
    featured: true,
  },
  {
    code: 'SVC-06',
    title: 'Database setup',
    dur: '1–4 weeks',
    desc: "Schema design, safe migrations, indexing, backups, and query tuning, whether you're starting clean or untangling a database that grew without a plan.",
    loop: 'Breaks the loop: the database nobody wants to touch.',
    tags: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Backups'],
    featured: false,
  },
];

export const FEATURED_SERVICES = SERVICES.filter((s) => s.featured);

export const CATALOG = [
  {
    key: 'build',
    code: 'GRP-01',
    label: 'Build',
    desc: 'Custom software engineering, modern web applications, high-converting e-commerce, and native mobile apps.',
    items: ['Mobile apps (iOS / Android)', 'E-commerce stores', 'Custom SaaS products', 'API development & integrations', 'Legacy system modernisation', 'Internal tools & low-code', 'UI/UX design', 'QA & test automation', 'Accessibility (WCAG) remediation'],
  },
  {
    key: 'run',
    code: 'GRP-02',
    label: 'Run & support',
    desc: 'Mission-critical infrastructure management, 24/7 uptime monitoring, CI/CD automation, and fast incident response.',
    items: ['Managed hosting', 'Maintenance retainers', 'DevOps & CI/CD', 'Monitoring & uptime', 'Performance optimisation', 'IT helpdesk & device management', 'Backup & disaster recovery'],
  },
  {
    key: 'data',
    code: 'GRP-03',
    label: 'Data & AI',
    desc: 'Enterprise data pipelines, automated business intelligence dashboards, custom knowledge assistants, and ML workflows.',
    items: ['Data pipelines (ETL)', 'Data warehousing', 'BI dashboards & reporting', 'Document processing automation', 'Internal knowledge assistants', 'Forecasting & ML models', 'Data migration & cleanup'],
  },
  {
    key: 'secure',
    code: 'GRP-04',
    label: 'Security',
    desc: 'Rigorous vulnerability assessments, compliance frameworks, access controls, and data privacy audits.',
    items: ['Security audits & pen testing', 'Compliance readiness (ISO 27001, SOC 2, GDPR)', 'Identity & access management', 'Privacy & data handling review', 'Security awareness training'],
  },
  {
    key: 'grow',
    code: 'GRP-05',
    label: 'Growth',
    desc: 'Technical SEO, high-converting landing pages, analytics architectures, and data-driven conversion rate optimization.',
    items: ['Paid search & social', 'Conversion rate optimisation', 'Email & lifecycle campaigns', 'Landing pages & content', 'Analytics & tracking setup', 'CRM / ERP implementation'],
  },
  {
    key: 'advise',
    code: 'GRP-06',
    label: 'Advisory',
    desc: 'Fractional CTO leadership, technology due diligence, platform evaluations, and structured product discovery sprints.',
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

