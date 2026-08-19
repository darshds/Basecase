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
  },
  {
    code: 'SVC-02',
    title: 'Search visibility',
    dur: 'Audit 2 wks, then ongoing',
    desc: "Technical SEO audits, site architecture, content structure, and local search. We fix what's holding the site back first, then build the pages that earn rankings.",
    loop: 'Breaks the loop: publishing content nobody finds.',
    tags: ['Technical audit', 'Core Web Vitals', 'Schema', 'Local SEO', 'Content'],
  },
  {
    code: 'SVC-03',
    title: 'Chatbots & AI assistants',
    dur: '3–6 weeks',
    desc: 'Support bots, internal knowledge assistants, and lead qualifiers that answer from your own documents rather than guessing. Handover to a human when it matters.',
    loop: 'Breaks the loop: answering the same question forty times a week.',
    tags: ['RAG', 'Claude / GPT', 'Vector search', 'WhatsApp', 'Web widget'],
  },
  {
    code: 'SVC-04',
    title: 'Cloud',
    dur: '2–8 weeks',
    desc: 'Migration off aging servers, architecture that scales with demand, and a monthly bill you can explain. Deployment pipelines included, not billed as an extra.',
    loop: 'Breaks the loop: a cloud bill nobody can explain.',
    tags: ['AWS', 'Azure', 'GCP', 'Docker', 'Terraform', 'CI/CD'],
  },
  {
    code: 'SVC-05',
    title: 'System design',
    dur: '1–3 weeks',
    desc: 'Architecture for systems that need to survive growth. You get diagrams, written decisions with the reasoning kept in, and a build plan your own team can execute.',
    loop: 'Breaks the loop: patching symptoms instead of fixing the structure.',
    tags: ['Architecture review', 'Scaling plan', 'Integration mapping', 'Decision records'],
  },
  {
    code: 'SVC-06',
    title: 'Database setup',
    dur: '1–4 weeks',
    desc: "Schema design, safe migrations, indexing, backups, and query tuning, whether you're starting clean or untangling a database that grew without a plan.",
    loop: 'Breaks the loop: the database nobody wants to touch.',
    tags: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Backups'],
  },
];

export const CATALOG = [
  { key: 'build', label: 'Build', items: ['Mobile apps (iOS / Android)', 'E-commerce stores', 'Custom SaaS products', 'API development & integrations', 'Legacy system modernisation', 'Internal tools & low-code', 'UI/UX design', 'QA & test automation', 'Accessibility (WCAG) remediation'] },
  { key: 'run', label: 'Run & support', items: ['Managed hosting', 'Maintenance retainers', 'DevOps & CI/CD', 'Monitoring & uptime', 'Performance optimisation', 'IT helpdesk & device management', 'Backup & disaster recovery'] },
  { key: 'data', label: 'Data & AI', items: ['Data pipelines (ETL)', 'Data warehousing', 'BI dashboards & reporting', 'Document processing automation', 'Internal knowledge assistants', 'Forecasting & ML models', 'Data migration & cleanup'] },
  { key: 'secure', label: 'Security', items: ['Security audits & pen testing', 'Compliance readiness (ISO 27001, SOC 2, GDPR)', 'Identity & access management', 'Privacy & data handling review', 'Security awareness training'] },
  { key: 'grow', label: 'Growth', items: ['Paid search & social', 'Conversion rate optimisation', 'Email & lifecycle campaigns', 'Landing pages & content', 'Analytics & tracking setup', 'CRM / ERP implementation'] },
  { key: 'advise', label: 'Advisory', items: ['Fractional CTO', 'Technology due diligence', 'Vendor & platform selection', 'Team augmentation', 'Training & workshops', 'Product discovery sprints'] },
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

// Email and phone are the live values carried over from the prototype's footer.
// PLACEHOLDER: the street address is still unset. Fill every field in and it is
// picked up automatically by the LocalBusiness JSON-LD in app/layout.jsx; while
// any field is left in [brackets] the block is omitted rather than published with
// junk values.
export const CONTACT = {
  email: 'basecase02@gmail.com',
  phone: '+61 424090855',
  address: { street: '[add street]', city: '[add city]', region: '[add region]', postal: '[add postcode]', country: '[add country]' },
};
