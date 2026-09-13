/**
 * One page per commercial keyword.
 *
 * Six services previously shared a single /services page, so they competed for
 * one ranking slot. Each now gets its own page targeting one buying-intent
 * keyword: keyword in the first 100 words, what-it-is and who-it's-for in the
 * opening paragraph, real trust signals, a direct CTA, and answers to the
 * questions buyers ask before deciding.
 *
 * `title` is the `%s` in the root layout's `'%s · Basecase Tech'` template,
 * which adds 16 characters. Keep every title <= 44 so the rendered tag stays
 * under the 60-character SERP limit.
 *
 * Only claims backed by lib/data.js appear here. `projectIds` reference real
 * shipped builds; a service with no matching client work carries none rather
 * than borrowing someone else's.
 */
export const SERVICE_PAGES = [
  {
    slug: 'web-development',
    code: 'SVC-01',
    keyword: 'web development company Australia',
    title: 'Web Development Company Australia',
    description:
      'Australian web development studio building marketing sites, web apps and e-commerce in Next.js and React. Fixed scope, 4-10 weeks, senior engineers only.',
    h1: 'Web development company in Australia',
    intro:
      'Basecase is a web development company in Australia building marketing sites, web applications and e-commerce storefronts for businesses that have outgrown a template. You get senior engineers writing the code directly, a fixed scope agreed before work starts, and a site your own team can edit without calling us back.',
    whoFor: [
      'You are on WordPress or Wix and the plugin stack breaks every few months',
      'Your site is slow enough that it is costing you search rankings',
      'You need a web app or internal tool, not a brochure site',
      'You have been quoted by an agency that will not name who writes the code',
    ],
    deliverables: [
      'Design and build in Next.js, React, Laravel or headless WordPress',
      'Core Web Vitals budget agreed up front and measured at handover',
      'CMS your team can actually use, without developer gatekeeping',
      'Analytics, search console and schema wired before launch',
      'Source code in your own repository from day one',
    ],
    process: [
      { title: 'Scope', detail: 'We map pages, integrations and edge cases, then fix the scope in writing. No hourly surprises.' },
      { title: 'Build', detail: 'Weekly deploys to a staging URL you can click through, so nothing lands as a surprise at the end.' },
      { title: 'Launch', detail: 'Performance budget verified, redirects mapped, search console connected, and your team trained on the CMS.' },
    ],
    faqs: [
      { q: 'How much does a website cost in Australia?', a: 'Our web builds start around $5,000 for a focused marketing site and run to $50,000+ for web applications with custom integrations. We quote a fixed scope before starting rather than billing hourly, so the number you agree is the number you pay.' },
      { q: 'How long does a website take to build?', a: 'Four to ten weeks for most builds, depending on page count and how many systems it needs to talk to. Architecture-heavy projects are scoped separately so the estimate reflects the real work.' },
      { q: 'Do you work with businesses outside Australia?', a: 'Yes. We are Australian-registered and Australia-based, and we have shipped production work for clients across Australia and India. Delivery is remote-first either way.' },
      { q: 'Will I be able to edit the site myself?', a: 'Yes. Every build ships with a CMS your team controls and training at handover. You own the repository, so you are never locked into us for routine content changes.' },
      { q: 'What technology do you build on?', a: 'Mostly Next.js and React, with Laravel or headless WordPress where the project calls for it. We pick based on what you need to maintain afterwards, not on what we feel like using.' },
    ],
    projectIds: ['7ty7', 'ivory-atelier', 'tyche-media', '22nd-avenue', 'zoshe'],
    related: ['seo', 'system-design', 'cloud'],
  },
  {
    slug: 'seo',
    code: 'SVC-02',
    keyword: 'technical SEO services Australia',
    title: 'Technical SEO Services Australia',
    description:
      'Technical SEO audits and fixes for Australian businesses: Core Web Vitals, crawlability, schema and site architecture. We fix what blocks rankings first.',
    h1: 'Technical SEO services for Australian businesses',
    intro:
      'Our technical SEO services in Australia start with what is actively blocking your rankings, not with a content calendar. Most sites we audit are publishing regularly and still losing to competitors because crawl errors, slow pages or missing structured data are capping every page they publish. We find those first, fix them, then build the pages that earn commercial rankings.',
    whoFor: [
      'You publish consistently and rankings still have not moved',
      'You rank for informational terms but not the ones buyers search',
      'A migration or redesign dropped your traffic and nobody can say why',
      'You need someone who can fix the code, not just file a report',
    ],
    deliverables: [
      'Full technical audit: crawlability, indexation, redirects, canonicals',
      'Core Web Vitals diagnosis with the specific fixes, not generic advice',
      'Schema markup implemented and validated, not just recommended',
      'Site architecture and internal linking mapped to commercial intent',
      'Keyword targets matched to the right page type, not scattered across blogs',
    ],
    process: [
      { title: 'Audit', detail: 'Two weeks. Crawl, index coverage, performance, schema, and a ranked list of what is actually costing you traffic.' },
      { title: 'Fix', detail: 'We implement the fixes in your codebase. Most agencies hand you a PDF and leave the engineering to you.' },
      { title: 'Build', detail: 'Then the pages: one commercial keyword per page, structured to convert the traffic once it lands.' },
    ],
    faqs: [
      { q: 'How long does SEO take to show results?', a: 'Technical fixes can move rankings within weeks because you are removing a cap that already exists. New pages targeting commercial keywords typically take three to six months to settle. Anyone promising faster is guessing.' },
      { q: 'What is the difference between technical SEO and content SEO?', a: 'Technical SEO makes sure Google can crawl, render and trust your pages. Content SEO decides what those pages say. Publishing more content while technical problems remain is the most common way to waste an SEO budget.' },
      { q: 'Do you do the implementation or just the audit?', a: 'We implement. The audit is two weeks, then we make the fixes in your codebase directly. A report you cannot action is not a deliverable.' },
      { q: 'Do you guarantee first-page rankings?', a: 'No, and neither can anyone honestly. We commit to fixing what is measurably blocking you and building pages that target keywords your buyers actually search. Guarantees in SEO are a sales tactic.' },
    ],
    projectIds: ['7ty7', 'ivory-atelier', 'healthy-soya'],
    related: ['web-development', 'system-design'],
  },
  {
    slug: 'ai-chatbots',
    code: 'SVC-03',
    keyword: 'AI chatbot development Australia',
    title: 'AI Chatbot Development Australia',
    description:
      'Custom AI chatbots and internal assistants built on your own documents using RAG. Australian-built, three to six weeks, with human handover when it matters.',
    h1: 'AI chatbot development in Australia',
    intro:
      'We do AI chatbot development in Australia for businesses that need an assistant answering from their own documents rather than guessing. That means retrieval-augmented generation over your real content: support bots, internal knowledge assistants and lead qualifiers that cite what they are drawing from and hand over to a person when the question needs one.',
    whoFor: [
      'Your team answers the same forty questions every week',
      'Your documentation exists but nobody can find anything in it',
      'You tried a generic chatbot and it confidently invented answers',
      'You need it to escalate to a human rather than trap the customer',
    ],
    deliverables: [
      'RAG pipeline over your own documents, so answers are grounded in your content',
      'Model choice matched to the task, whether Claude, GPT or a smaller local model',
      'Vector search and chunking tuned for your document structure',
      'Human handover path, so the bot escalates instead of stalling',
      'Deployment to web widget, WhatsApp or internal tooling',
    ],
    process: [
      { title: 'Ground', detail: 'We start with your documents. What the assistant can see determines what it can answer, so this comes before any model selection.' },
      { title: 'Build', detail: 'Retrieval, chunking and prompt design, tested against the questions your team actually gets asked.' },
      { title: 'Escalate', detail: 'A defined handover to a human, plus logging so you can see what it is being asked and where it falls short.' },
    ],
    faqs: [
      { q: 'How do you stop an AI chatbot from making things up?', a: 'By grounding it in retrieval rather than relying on the model’s training. The assistant answers from documents you supply and is constrained to say when it does not know, instead of filling the gap. That constraint is a design decision, not a setting you toggle.' },
      { q: 'Will our data be used to train someone else’s model?', a: 'Not in how we build it. Your documents sit in your own vector store, and we use API tiers that exclude your data from provider training. If your compliance position requires it, we can run smaller models entirely on infrastructure you control.' },
      { q: 'How long does a chatbot project take?', a: 'Three to six weeks for most builds. The variable is almost never the model, it is how organised your source documents are when we start.' },
      { q: 'Can it hand over to a real person?', a: 'Yes, and we build that in by default. A bot that refuses to escalate is worse than no bot, because it traps the customer who most needs help.' },
    ],
    projectIds: [],
    related: ['system-design', 'databases', 'web-development'],
  },
  {
    slug: 'cloud',
    code: 'SVC-04',
    keyword: 'cloud migration services Australia',
    title: 'Cloud Migration Services Australia',
    description:
      'Cloud migration and architecture for Australian businesses on AWS, Azure and GCP. Move off ageing servers, scale with demand, and get a bill you can explain.',
    h1: 'Cloud migration services in Australia',
    intro:
      'Our cloud migration services move Australian businesses off ageing servers and onto infrastructure that scales with demand, with a monthly bill someone can actually explain. That covers the migration itself, the architecture underneath it, and the deployment pipeline that makes releases routine rather than an event. Pipelines are part of the work, not an upsell.',
    whoFor: [
      'You are running on a server nobody wants to touch or reboot',
      'Your cloud bill grows every month and nobody can account for it',
      'Deploys are manual, risky, and happen after hours',
      'You need to scale for demand you cannot predict',
    ],
    deliverables: [
      'Migration plan with rollback, so a bad cut-over is recoverable',
      'Architecture on AWS, Azure or GCP sized to real usage, not worst-case guesses',
      'Containerisation and infrastructure as code with Docker and Terraform',
      'CI/CD pipeline included in the engagement',
      'Cost breakdown by service, so the bill is explainable line by line',
    ],
    process: [
      { title: 'Map', detail: 'What runs where now, what depends on what, and what breaks if it moves. Most migrations fail on undocumented dependencies.' },
      { title: 'Move', detail: 'Staged cut-over with a rollback path at each step, rather than one high-risk weekend.' },
      { title: 'Hand over', detail: 'Infrastructure as code, documented pipelines, and a cost model your finance team can read.' },
    ],
    faqs: [
      { q: 'How much does cloud migration cost?', a: 'Two to eight weeks of engineering depending on how many systems move and how tangled the dependencies are. The larger question is usually the ongoing bill, which we model before migrating so there are no surprises after cut-over.' },
      { q: 'Which cloud provider should we use?', a: 'Usually the one your team can already operate. AWS, Azure and GCP all do the job; the deciding factors are existing skills, compliance requirements and any commitments you already hold. We do not have a provider we are incentivised to recommend.' },
      { q: 'Will there be downtime during migration?', a: 'We plan for none, using staged cut-over with rollback at each step. Where a brief window is genuinely unavoidable we tell you before starting, not during.' },
      { q: 'Can you reduce our existing cloud bill?', a: 'Often, yes. Over-provisioned instances, forgotten environments and unattached storage are the usual culprits. We start with a cost breakdown by service so the savings are evidenced rather than promised.' },
    ],
    projectIds: ['techfit-tech', 'lsn-lagree'],
    related: ['system-design', 'databases', 'web-development'],
  },
  {
    slug: 'system-design',
    code: 'SVC-05',
    keyword: 'software architecture consulting Australia',
    title: 'Architecture Consulting Australia',
    description:
      'Software architecture consulting for Australian businesses: scaling plans, integration mapping and decision records your own engineers can build from.',
    h1: 'Software architecture consulting in Australia',
    intro:
      'Software architecture consulting for Australian teams building systems that have to survive growth. You get diagrams, written decisions with the reasoning kept in, and a build plan your own engineers can execute without us. This is deliberately the engagement that does not require hiring us to build it: sometimes the most useful thing is a plan and an honest second opinion.',
    whoFor: [
      'You are patching symptoms and the same failures keep returning',
      'A rewrite is being discussed and nobody agrees on the shape of it',
      'Your systems work at current load but nobody knows what breaks next',
      'You need an independent read before committing real budget',
    ],
    deliverables: [
      'Architecture review of what exists, including what is working',
      'Scaling plan tied to the load you actually expect',
      'Integration map of every system boundary and failure mode',
      'Architecture decision records: the reasoning, not just the conclusion',
      'Build plan your team can execute independently',
    ],
    process: [
      { title: 'Review', detail: 'We read the code and talk to the people running it. Architecture problems are usually visible in both.' },
      { title: 'Decide', detail: 'Options with trade-offs stated plainly, including the option of changing nothing.' },
      { title: 'Document', detail: 'Decision records that keep the reasoning, so the next engineer inherits context rather than a mystery.' },
    ],
    faqs: [
      { q: 'What does a software architect actually deliver?', a: 'Diagrams, architecture decision records and a sequenced build plan. The decision records matter most: they preserve why a choice was made, which is what stops the same debate being relitigated in a year.' },
      { q: 'Do we have to hire you to build it afterwards?', a: 'No. The deliverable is written for your team to execute. We would rather be useful for three weeks than manufacture a dependency.' },
      { q: 'How long does an architecture engagement take?', a: 'One to three weeks for most systems. Longer if there is significant undocumented legacy to read before anything sensible can be said about it.' },
      { q: 'Should we rewrite or refactor?', a: 'Usually refactor, but not always, and it depends on specifics we would need to look at. Anyone answering that question before reading your code is selling something.' },
    ],
    projectIds: ['techfit-tech', '22nd-avenue', 'lsn-lagree'],
    related: ['cloud', 'databases', 'web-development'],
  },
  {
    slug: 'databases',
    code: 'SVC-06',
    keyword: 'database consulting services Australia',
    title: 'Database Consulting Australia',
    description:
      'Database consulting for Australian businesses: schema design, safe migrations, indexing, backups and query tuning on PostgreSQL, MySQL, MongoDB and Redis.',
    h1: 'Database consulting services in Australia',
    intro:
      'Database consulting services for Australian businesses, whether you are designing a schema from scratch or untangling one that grew without a plan. That covers schema design, migrations that are safe to run on live data, indexing, backups that have actually been restore-tested, and query tuning for the queries that are hurting you now.',
    whoFor: [
      'Queries that were fast last year now time out',
      'Nobody wants to touch the schema because nobody fully understands it',
      'You have backups but have never tested restoring one',
      'You are about to scale and suspect the database will be the ceiling',
    ],
    deliverables: [
      'Schema design or remediation, with migrations safe to run on live data',
      'Index strategy driven by your real query patterns, not guesswork',
      'Backup and restore procedure, tested rather than assumed',
      'Query tuning on the slowest paths, with before and after timings',
      'PostgreSQL, MySQL, MongoDB and Redis',
    ],
    process: [
      { title: 'Measure', detail: 'Slow query logs and real access patterns first. Optimising the wrong query is the most common wasted effort here.' },
      { title: 'Fix', detail: 'Indexing, schema changes and query rewrites, applied through migrations that can be rolled back.' },
      { title: 'Protect', detail: 'Backups verified by performing an actual restore. An untested backup is not a backup.' },
    ],
    faqs: [
      { q: 'Which database should we use?', a: 'PostgreSQL for most workloads, unless something specific argues otherwise. MongoDB suits genuinely document-shaped data, and Redis is a cache rather than a primary store. The honest answer usually depends on your access patterns, not on the database being fashionable.' },
      { q: 'Can you fix slow queries without a rewrite?', a: 'Usually. Most slow queries come down to a missing index, an unbounded result set, or an N+1 pattern in the application. We measure before changing anything, so the fix targets the actual bottleneck.' },
      { q: 'How do you run migrations without downtime?', a: 'Expand-and-contract: add the new structure, backfill, switch reads, then remove the old one. Each step is reversible, which is what makes it safe on live data.' },
      { q: 'How long does a database engagement take?', a: 'One to four weeks. Query tuning and indexing are usually quick wins; a full schema remediation on a database with years of accumulated drift takes longer.' },
    ],
    projectIds: ['zoshe', '22nd-avenue', 'techfit-tech'],
    related: ['system-design', 'cloud', 'ai-chatbots'],
  },
];

export const SERVICE_SLUGS = SERVICE_PAGES.map((s) => s.slug);

export function getServicePage(slug) {
  return SERVICE_PAGES.find((s) => s.slug === slug) || null;
}
