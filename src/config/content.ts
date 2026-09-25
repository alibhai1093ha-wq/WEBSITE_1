import { business } from "./business";

/**
 * ============================================================
 *  CONTENT CONFIGURATION
 * ============================================================
 *  Repeatable page content stored as structured data.
 *  Database-ready: each array maps naturally to a future
 *  Supabase table (services, projects, testimonials, faqs).
 *  UI components consume this data via typed interfaces.
 * ============================================================
 */

// ── Types (mirror future Supabase table schemas) ──

export interface Service {
  slug: string;
  icon: string;
  title: string;
  short: string;
  description: string;
  bullets: string[];
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  gradient: string;
  icon: string;
  tags: string[];
  client: string;
  year: string;
  duration: string;
  role: string;
  overview: string;
  challenge: string;
  solution: string;
  results: string[];
  metrics: { value: string; label: string }[];
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
  initials: string;
  color: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

// ── Services ──

export const services: Service[] = [
  {
    slug: "workflow-automation",
    icon: "⚡",
    title: "Workflow Automation",
    short: "Turn repetitive manual processes into self-running pipelines.",
    description:
      "We design, build, and maintain automated workflows that connect your tools and eliminate busywork — from lead routing and invoicing to reporting and onboarding.",
    bullets: [
      "Visual workflow builder with triggers and logic",
      "Automatic retries, alerts, and full run logs",
      "Custom connectors for any internal API",
    ],
  },
  {
    slug: "integrations",
    icon: "🧩",
    title: "Integrations",
    short: "Connect your entire stack in clicks, not code.",
    description:
      "With 200+ prebuilt connectors and a framework for custom ones, Nexaro links CRMs, billing, databases, chat tools, and data warehouses into one reliable nervous system.",
    bullets: [
      "200+ native integrations (Slack, HubSpot, Postgres, AWS…)",
      "Bi-directional sync with conflict handling",
      "Webhook in/out with signing and replay protection",
    ],
  },
  {
    slug: "ai-copilot",
    icon: "🤖",
    title: "AI Copilot",
    short: "Describe a workflow in plain English — get a working pipeline.",
    description:
      "Our AI copilot drafts workflows, suggests optimizations, and explains failures in human terms. You always review before anything goes live.",
    bullets: [
      "Natural-language workflow drafting",
      "Smart error handling suggestions",
      "Human-in-the-loop approvals for sensitive steps",
    ],
  },
  {
    slug: "analytics",
    icon: "📊",
    title: "Live Analytics",
    short: "Dashboards that update the moment data changes.",
    description:
      "Track workflow volume, success rates, and the business metrics that matter — revenue influenced, hours saved, SLAs met — all in real time.",
    bullets: [
      "Real-time operational dashboards",
      "Per-workflow and per-team reporting",
      "CSV / API export for BI tools",
    ],
  },
  {
    slug: "security-compliance",
    icon: "🛡️",
    title: "Security & Compliance",
    short: "Enterprise-grade security from day one.",
    description:
      "SOC 2 Type II certified infrastructure with SSO/SAML, granular roles, encryption in transit and at rest, and complete audit trails — so security review is a formality.",
    bullets: [
      "SSO / SAML and SCIM provisioning",
      "Granular role-based access control",
      "Immutable audit logs on every action",
    ],
  },
  {
    slug: "scale-infrastructure",
    icon: "🚀",
    title: "Scale Infrastructure",
    short: "From first customer to billionth event, zero config.",
    description:
      "Auto-scaling execution with regional failover means your workflows keep running through traffic spikes — with a 99.99% uptime SLA backing it up.",
    bullets: [
      "Auto-scaling with no capacity planning",
      "Priority queues for time-critical runs",
      "99.99% uptime SLA with status transparency",
    ],
  },
];

// ── Why Choose Us ──

export const whyChooseUs = [
  {
    icon: "🏅",
    title: "Professional Service",
    description: "Certified specialists handle your account — no hand-offs to juniors, no black boxes.",
  },
  {
    icon: "💎",
    title: "Quality Work",
    description: "Every workflow is tested against edge cases before it ever touches production.",
  },
  {
    icon: "🎧",
    title: "Reliable Support",
    description: "Real humans on chat and email, with a median first response under 15 minutes.",
  },
  {
    icon: "⚡",
    title: "Fast Response",
    description: "Urgent issue? Our on-call engineers respond within the hour, 24/7 on Scale plans.",
  },
  {
    icon: "😊",
    title: "Customer Satisfaction",
    description: "97% of customers stay past year one — the highest retention in our category.",
  },
  {
    icon: "🔒",
    title: "Data Safety",
    description: "SOC 2 Type II, encryption everywhere, and audit logs your compliance team will love.",
  },
];

// ── Portfolio / Projects ──

export const projects: Project[] = [
  {
    slug: "lead-routing-engine",
    title: "Lead Routing Engine",
    category: "Automation",
    description:
      "Cut lead response time from 6 hours to 90 seconds for a B2B SaaS with 40+ sales reps.",
    gradient: "from-[var(--brand-500)] to-[var(--brand-400)]",
    icon: "🎯",
    tags: ["Sales Ops", "Enrichment", "Slack"],
    client: "Confidential B2B SaaS (2,400 seats)",
    year: "2025",
    duration: "6 weeks",
    role: "Workflow architecture · Connectors · Sales engagement",
    overview:
      "A fast-growing B2B SaaS company found its marketing-qualified leads waiting up to six hours before a sales rep touched them — enough time for competitors to close the deal first. The manual dispatch process relied on a shared spreadsheet and whoever happened to be watching Slack.",
    challenge:
      "Leads arrived from ten different sources (demo forms, content downloads, product trials) with no unified view or prioritization. Reps had no idea which leads were their responsibility, and follow-up times ballooned during off-hours. The sales leadership had tried CRMs and routing rules before, but every solution required manual upkeep.",
    solution:
      "We built a serverless lead pipeline that ingests every source, enriches each lead with firmographic signals, scores it, and routes it to the right rep in Slack with full context. Off-hours leads are tagged urgent and escalated to on-call reps via SMS. Every action is logged, so the sales ops team sees exactly how each lead was handled.",
    results: [
      "Median first-touch time dropped from 6 hours to 90 seconds",
      "Route accuracy of 99.2% across 40+ reps and territories",
      "Two sales-ops FTE hours per day freed from manual dispatch",
      "19% increase in SQL-to-meeting conversion in the first quarter",
    ],
    metrics: [
      { value: "90s", label: "median response" },
      { value: "99.2%", label: "route accuracy" },
      { value: "+19%", label: "meeting conversions" },
      { value: "10", label: "sources unified" },
    ],
  },
  {
    slug: "invoice-ops-suite",
    title: "Invoice Ops Suite",
    category: "Automation",
    description:
      "Automated invoice intake, approvals, and reconciliation — saving a finance team 120 hours a month.",
    gradient: "from-[var(--accent-500)] to-[var(--accent-400)]",
    icon: "🧾",
    tags: ["Finance", "Approvals", "ERP"],
    client: "Mid-market retail group (360 stores)",
    year: "2025",
    duration: "8 weeks",
    role: "AP automation · Approval flows · ERP integration",
    overview:
      "A retail finance team processed over 4,000 invoices a month across three brands and two ERP instances. Approvals bounced between email chains, duplicate entries were common, and month-end close routinely stretched five days.",
    challenge:
      "Invoices arrived as email attachments, PDFs in a shared drive, and physical paper. Keying them into the ERP was manual, approvals had no enforced hierarchy, and three separate systems of record disagreed on what was even outstanding.",
    solution:
      "We deployed an invoice intake layer that extracts structured data from any format, routes to the correct approver based on amount and cost center, and posts approved invoices into the ERP with GL coding. Reconciliation is automated nightly against the bank ledger, with exceptions surfaced to a human queue.",
    results: [
      "120 hours/month in AP processing time eliminated",
      "Month-end close cut from 5 days to 24 hours",
      "Duplicate payments reduced to zero in the first cycle",
      "100% of approvals now carry a full audit trail",
    ],
    metrics: [
      { value: "120h", label: "saved / month" },
      { value: "1 day", label: "month-end close" },
      { value: "0", label: "duplicate payments" },
      { value: "4k", label: "invoices / month" },
    ],
  },
  {
    slug: "support-triage-ai",
    title: "Support Triage AI",
    category: "AI",
    description:
      "AI classification and routing for 8,000 daily tickets, with sentiment-based escalation to senior agents.",
    gradient: "from-[var(--cyan-500)] to-[var(--cyan-400)]",
    icon: "🎫",
    tags: ["AI", "Helpdesk", "NLP"],
    client: "Dev-tools company (8,000 tickets/day)",
    year: "2025",
    duration: "10 weeks",
    role: "ML pipeline · Routing rules · Slack escalation",
    overview:
      "A developer-tools company receives 8,000 support tickets a day across product areas, languages, and severity levels. A tired human triage team sorted them by hand, and critical outages sometimes waited behind routine questions.",
    challenge:
      "Tickets arrived in three channels with inconsistent labels. Sentiment and severity were judged manually, so frustrated customers could wait as long as happy ones. The triage team had 40% annual turnover from the grind.",
    solution:
      "We trained a lightweight classifier on two years of historical tickets to predict product area, priority, and sentiment. Every incoming ticket is now classified live, routed to the right queue, and surfaced with a confidence score for review. Negative-sentiment tickets touching billing or outages are escalated to senior agents in under 30 seconds.",
    results: [
      "Triage time per ticket fell from 8 minutes to under 30 seconds",
      "Critical-ticket first response improved by 71%",
      "Triage team workload reduced by 60%",
      "Escalation accuracy of 94% against expert labels",
    ],
    metrics: [
      { value: "30s", label: "triaged" },
      { value: "+71%", label: "critical response" },
      { value: "94%", label: "escalation accuracy" },
      { value: "8k", label: "tickets / day" },
    ],
  },
  {
    slug: "ecommerce-order-sync",
    title: "E-commerce Order Sync",
    category: "Integration",
    description:
      "Real-time inventory and order sync across Shopify, 3PLs, and accounting for a DTC brand.",
    gradient: "from-emerald-500 to-emerald-400",
    icon: "🛒",
    tags: ["E-commerce", "Real-time", "3PL"],
    client: "DTC apparel brand ($40M/yr revenue)",
    year: "2024",
    duration: "7 weeks",
    role: "Integration architecture · 3PL coordination",
    overview:
      "A direct-to-consumer brand sold on Shopify but reconciled orders against its 3PL and accounting systems via overnight CSV drops. Overselling, stockouts, and refund errors were daily occurrences during peak season.",
    challenge:
      "Order data traveled through four systems that never agreed in real time. The 3PL shipped what it had; the website sold what it thought it had. Peak-season traffic pushed the mismatch past $200k in annualized losses from chargebacks and expedite fees.",
    solution:
      "We built an event-driven sync layer that pushes each order from Shopify to the 3PL the moment it's placed, pulls tracking back automatically, and posts settled orders into accounting nightly. Inventory is reconciled in real time with a safety-stock reorder point that triggers vendor purchase orders.",
    results: [
      "Out-of-stock cancellation rate dropped 42%",
      "Order-to-fulfillment latency cut from 6 hours to 4 minutes",
      "Refund/chargeback losses down 31% in the next peak season",
      "Nightly reconciliation now takes 20 minutes (was a full shift)",
    ],
    metrics: [
      { value: "-42%", label: "cancellations" },
      { value: "4 min", label: "to fulfillment" },
      { value: "-31%", label: "chargeback losses" },
      { value: "20 min", label: "nightly close" },
    ],
  },
  {
    slug: "hr-onboarding-flow",
    title: "HR Onboarding Flow",
    category: "Integration",
    description:
      "One trigger now provisions 14 systems, equipment, and training for every new hire automatically.",
    gradient: "from-amber-500 to-amber-400",
    icon: "🧑‍💼",
    tags: ["HR", "Provisioning", "SSO"],
    client: "Hyper-growth fintech (1,800+ employees)",
    year: "2024",
    duration: "5 weeks",
    role: "IT orchestration · SSO · Access governance",
    overview:
      "A fintech scaling to 300 hires a quarter provisioned every new employee by hand. Each hire needed accounts in 14 systems, a laptop order, and training enrollments — a 2-day manual checklist that occasionally started the new hire's first day on empty.",
    challenge:
      "The checklist lived in a shareable doc and execution depended on a single IT admin. Access to sensitive systems wasn't revoked uniformly on termination, and the company failed an internal security audit over inconsistent offboarding.",
    solution:
      "We orchestrated onboarding into a single trigger: the HRIS 'start date' event fans out to identity management, SSO, the ticketing system, the laptop vendor, and the LMS in parallel, with approvals for anything requiring finance sign-off. Offboarding reverses the same flow with an immutable access log.",
    results: [
      "Onboarding time cut from 48 hours to under 20 minutes",
      "Provisioning errors dropped to near-zero across 300+ hires/quarter",
      "Offboarding now guarantees full deprovisioning within 15 minutes",
      "Passed the internal security audit that previously failed",
    ],
    metrics: [
      { value: "20 min", label: "to fully provisioned" },
      { value: "14", label: "systems automated" },
      { value: "300+", label: "hires / quarter" },
      { value: "15 min", label: "offboard deprovision" },
    ],
  },
  {
    slug: "revenue-reporting-hub",
    title: "Revenue Reporting Hub",
    category: "Analytics",
    description:
      "Unified revenue dashboards pulling from five sources, replacing a weekly spreadsheet ritual.",
    gradient: "from-rose-500 to-rose-400",
    icon: "📈",
    tags: ["BI", "Dashboards", "Warehouse"],
    client: "Series B subscription platform",
    year: "2024",
    duration: "6 weeks",
    role: "Data model · Pipeline · Executive dashboards",
    overview:
      "A subscription platform's revenue picture lived in five disconnected tools. Every Monday, the FP&A analyst spent a full day copy-pasting numbers into a spreadsheet the exec team finished questioning by Tuesday.",
    challenge:
      "Billing, usage, marketing, and finance data all counted revenue differently. The weekly report was wrong by the time it was read, and there was no way to answer 'why is MRR down?' without another day of digging.",
    solution:
      "We centralized the five sources into a semantic revenue model in a warehouse, with a single definition of MRR/ARR everyone agreed on. Live dashboards now show revenue, churn, and expansion by segment with drill-downs, plus a nightly anomaly alert that flags unexpected changes before the exec meeting.",
    results: [
      "One full FTE day per week returned to the FP&A team",
      "All five sources now reconcile to cents every night",
      "Churn anomalies flagged an average of 4 days earlier",
      "Board reporting moved from weekly to daily freshness",
    ],
    metrics: [
      { value: "1 day", label: "saved / week" },
      { value: "5", label: "sources reconciled" },
      { value: "4 days", label: "earlier anomaly flags" },
      { value: "daily", label: "report freshness" },
    ],
  },
];

export const projectCategories = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.category))),
];

// ── Testimonials ──

export const testimonials: Testimonial[] = [
  {
    quote:
      "We replaced four internal tools and a tangle of Zapier flows with Nexaro. Our ops team shipped their first automation the same afternoon.",
    name: "Amara Chen",
    role: "COO, Brightlane",
    rating: 5,
    initials: "AC",
    color: "from-[var(--brand-500)] to-[var(--brand-400)]",
  },
  {
    quote:
      "The AI copilot feels like cheating. I described our onboarding flow in a paragraph and got back a working pipeline with retries and alerts.",
    name: "Diego Fuentes",
    role: "Head of Engineering, Kitepath",
    rating: 5,
    initials: "DF",
    color: "from-[var(--accent-500)] to-[var(--accent-400)]",
  },
  {
    quote:
      "Uptime has been flawless since day one. Security cleared it in a week — the audit logs and SSO support did all the heavy lifting.",
    name: "Priya Nair",
    role: "VP of IT, Northcell",
    rating: 5,
    initials: "PN",
    color: "from-[var(--cyan-500)] to-[var(--cyan-400)]",
  },
  {
    quote:
      "Support answered in minutes, not days. That alone made switching from our previous vendor worth it.",
    name: "Marcus Webb",
    role: "Founder, Vantage Labs",
    rating: 5,
    initials: "MW",
    color: "from-emerald-500 to-emerald-400",
  },
  {
    quote:
      "Our finance close went from five days to one. The Invoice Ops Suite paid for itself in the first month.",
    name: "Sofia Lindqvist",
    role: "CFO, Meridian Retail",
    rating: 5,
    initials: "SL",
    color: "from-amber-500 to-amber-400",
  },
  {
    quote:
      "The migration team moved 60+ flows over a weekend with zero downtime. Impressive operation end to end.",
    name: "James Okafor",
    role: "CTO, Orbital Systems",
    rating: 5,
    initials: "JO",
    color: "from-rose-500 to-rose-400",
  },
];

// ── FAQs ──

export const faqs: FAQ[] = [
  {
    question: "Do I need engineering resources to use Nexaro?",
    answer:
      "No. The visual builder is designed for operators, and the AI copilot can assemble workflows from a plain-English description. Engineers can still drop into code whenever they want full control.",
  },
  {
    question: "How does the 14-day trial work?",
    answer:
      "Every Growth feature is unlocked during the trial — no credit card required. When it ends, you can pick a plan or drop to the free Starter tier and keep everything you built.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. Nexaro is SOC 2 Type II certified, encrypts data in transit and at rest, and supports SSO/SAML, granular role-based access, and complete audit logs on the Scale plan.",
  },
  {
    question: "Can I migrate from Zapier or Make?",
    answer:
      "Absolutely. Our importer converts your existing flows automatically in most cases, and the team runs a free white-glove migration for annual plans.",
  },
  {
    question: "What happens if a workflow fails?",
    answer:
      "Every run is logged and retried automatically with exponential backoff. If something still fails, you get alerted instantly through your team's preferred channel.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes — monthly plans can be cancelled with one click from the billing page. Annual plans are refundable pro-rata within the first 30 days.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "All plans include email and chat support with a median response under 15 minutes. Growth adds priority queueing, and Scale includes a dedicated success manager and 24/7 on-call escalation.",
  },
  {
    question: "Do you offer on-premise or private cloud deployments?",
    answer:
      "Scale customers can run Nexaro in a dedicated single-tenant environment in the region of their choice. Contact sales to discuss compliance and residency requirements.",
  },
];

// ── Pricing ──

export interface Tier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

export const tiers: Tier[] = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "For individuals testing the waters.",
    features: [
      "3 active workflows",
      "1,000 tasks / month",
      "Community support",
      "Core integrations",
    ],
    cta: "Start for free",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$29",
    period: "per user / month",
    description: "For teams automating at full speed.",
    features: [
      "Unlimited workflows",
      "50,000 tasks / month",
      "AI copilot included",
      "Priority support",
      "Advanced analytics",
    ],
    cta: "Start 14-day trial",
    highlighted: true,
  },
  {
    name: "Scale",
    price: "Custom",
    period: "annual billing",
    description: "For companies with serious volume.",
    features: [
      "Everything in Growth",
      "Unlimited tasks",
      "SSO / SAML & audit logs",
      "Dedicated success manager",
      "99.99% uptime SLA",
    ],
    cta: "Talk to sales",
    highlighted: false,
  },
];

// ── Team ──

export interface TeamMember {
  initials: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  color: string;
  linkedin?: string;
  x?: string;
}

export const teamMembers: TeamMember[] = [
  {
    initials: "JR",
    name: "Jordan Reyes",
    role: "Co-founder & CEO",
    department: "Leadership",
    bio: "Former ops engineer who watched teams lose years to glue work. Jordan sets the company's direction and makes sure every feature traces to a real customer problem.",
    color: "from-[var(--brand-500)] to-[var(--brand-400)]",
    linkedin: "https://linkedin.com/in/jordanreyes",
    x: "https://x.com/jordanreyes",
  },
  {
    initials: "TK",
    name: "Tara Kim",
    role: "Co-founder & CTO",
    department: "Engineering",
    bio: "Tara leads platform architecture — the execution engine, connectors, and AI copilot. She's the reason 99.99% uptime is a number we actually ship.",
    color: "from-[var(--accent-500)] to-[var(--accent-400)]",
    linkedin: "https://linkedin.com/in/tarakim",
    x: "https://x.com/tarakim",
  },
  {
    initials: "OM",
    name: "Omar Mahmoud",
    role: "VP of Engineering",
    department: "Engineering",
    bio: "Omar runs the build teams that turn platform primitives into features people love. He champions developer-experience and honest status pages.",
    color: "from-[var(--cyan-500)] to-[var(--cyan-400)]",
    linkedin: "https://linkedin.com/in/omarmahmoud",
  },
  {
    initials: "LN",
    name: "Lena Novak",
    role: "Head of Customer Success",
    department: "Services",
    bio: "Lena and her team make sure every customer gets value in their first 30 days — migrations, white-glove onboarding, and a median first response under 15 minutes.",
    color: "from-emerald-500 to-emerald-400",
    linkedin: "https://linkedin.com/in/lenanovak",
  },
  {
    initials: "SB",
    name: "Sara Bhatt",
    role: "Head of Product Design",
    department: "Design",
    bio: "Sara owns the visual builder and the copilot's conversational UX. Her design principle: the complex should feel effortless, never simplified beyond comprehension.",
    color: "from-amber-500 to-amber-400",
    linkedin: "https://linkedin.com/in/sarabhatt",
  },
  {
    initials: "AC",
    name: "Andres Cruz",
    role: "Head of Security & Compliance",
    department: "Trust",
    bio: "Andres keeps Nexaro SOC 2 Type II certified end to end — from SSO and encryption to the audit logs that make your security review a formality.",
    color: "from-rose-500 to-rose-400",
    linkedin: "https://linkedin.com/in/andrescruz",
  },
  {
    initials: "MG",
    name: "Mia García",
    role: "Customer Success Manager",
    department: "Services",
    bio: "Mia is the first human you talk to. She's run onboarding for 300+ teams and can find a faster way to run almost any process you describe.",
    color: "from-[var(--brand-500)] to-[var(--accent-500)]",
    linkedin: "https://linkedin.com/in/miagarcia",
  },
  {
    initials: "DW",
    name: "David Weiss",
    role: "Senior Solutions Engineer",
    department: "Engineering",
    bio: "David builds the custom connectors nobody else has. If your tool doesn't integrate with ours yet, David can 'just add it' most likely by Friday.",
    color: "from-cyan-500 to-emerald-500",
    linkedin: "https://linkedin.com/in/davidweiss",
  },
];

// ── Blog ──

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "quote"; text: string }
  | { type: "callout"; text: string };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO yyyy-mm-dd
  readTime: string;
  author: { name: string; initials: string; role: string; color: string };
  tags: string[];
  blocks: BlogBlock[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "cut-lead-response-time-to-90-seconds",
    title: "How to Cut Lead Response Time to 90 Seconds",
    excerpt:
      "Speed to lead is the single highest-leverage metric in B2B sales. Here's the exact pipeline we built for a customer that went from 6 hours to 90 seconds.",
    category: "Sales Ops",
    date: "2026-09-02",
    readTime: "6 min",
    author: {
      name: "Jordan Reyes",
      initials: "JR",
      role: "Co-founder & CEO",
      color: "from-[var(--brand-500)] to-[var(--brand-400)]",
    },
    tags: ["Sales", "Automation", "Slack"],
    blocks: [
      {
        type: "p",
        text: "Every study on lead response agrees on the same uncomfortable fact: the companies that reply fastest win. Respond within five minutes and you're roughly 21 times more likely to qualify the lead than a competitor who waits an hour.",
      },
      { type: "h2", text: "Why fast response is so rare" },
      {
        type: "p",
        text: "Speed to lead isn't slow because reps are lazy. It's slow because leads arrive in ten different places, nobody has a single view, and dispatch is manual. The bottleneck isn't the reply — it's the routing.",
      },
      { type: "h2", text: "The 90-second pipeline" },
      {
        type: "p",
        text: "Here is the architecture we shipped for a B2B SaaS customer that processes hundreds of MQLs a month. It has four stages, all of them automated.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Ingest — every demo request, download, and trial signup lands in one queue the moment it happens.",
          "Enrich — firmographic data (industry, headcount, tech stack) is appended automatically.",
          "Score and route — a lightweight model assigns priority and picks the right rep by territory and workload.",
          "Alert — the winning rep gets the lead card in Slack, with a one-tap 'Start outreach' action.",
        ],
      },
      { type: "h2", text: "The results" },
      {
        type: "list",
        items: [
          "Median first-touch time: 90 seconds (from 6 hours)",
          "Route accuracy: 99.2% across 40+ reps",
          "SQL-to-meeting conversion: +19% in the first quarter",
          "Two hours of sales-ops time per day returned to the team",
        ],
      },
      {
        type: "callout",
        text: "The highest-leverage fix wasn't a new CRM. It was making the existing one work in real time instead of in a spreadsheet.",
      },
      { type: "h2", text: "Start where you are" },
      {
        type: "p",
        text: "You don't need to build this in one go. Start by routing demo requests from the single source where they arrive fastest, measure your current speed to lead for two weeks, and add the next source once the first is reliable.",
      },
    ],
  },
  {
    slug: "automation-fails-here-backoff-retries",
    title: "Why Automations Fail (and What Actually Fixes Them)",
    excerpt:
      "Most 'broken automations' aren't broken — they're missing basic resilience. The retry, backoff, and alerting patterns every workflow needs before it touches production.",
    category: "Engineering",
    date: "2026-08-18",
    readTime: "8 min",
    author: {
      name: "Tara Kim",
      initials: "TK",
      role: "Co-founder & CTO",
      color: "from-[var(--accent-500)] to-[var(--accent-400)]",
    },
    tags: ["Reliability", "Engineering", "Best Practices"],
    blocks: [
      {
        type: "p",
        text: "The first time an automation runs, everything works. The 10,000th time, the API you call has a bad day, the database is mid-snapshot, or a zip file is truncated. A workflow that cannot tolerate those moments isn't an automation — it's a new manual task.",
      },
      { type: "h2", text: "The three failure shapes" },
      {
        type: "list",
        ordered: true,
        items: [
          "Transient — timeouts, rate limits, blips. These succeed on retry almost always.",
          "Partial — half the batch processed before a crash. You need idempotency, not just retries.",
          "Permanent — the input is invalid. No amount of retrying will help; alert a human.",
        ],
      },
      { type: "h2", text: "Retry with exponential backoff" },
      {
        type: "p",
        text: "Retry the transient ones, but spread them out. A naive retry storms the same broken endpoint from every workflow at once. Exponential backoff with jitter — 1s, 2s, 4s, 8s, give up — gets you most of the benefit with none of the collateral damage.",
      },
      { type: "h2", text: "Make every step idempotent" },
      {
        type: "quote",
        text: "If running a step twice is dangerous, your workflow isn't retryable. Idempotency keys turn 'at-least-once' deliveries into 'effectively-once' outcomes.",
      },
      {
        type: "p",
        text: "Give each run a correlation ID and make your side effects check it. Did we already send this invoice? Did this lead already get a follow-up? The checks are cheap; the duplicate you avoid is not.",
      },
      {
        type: "callout",
        text: "Rule of thumb: let machines handle transient failures, surface permanent ones to humans, and make every step safe to run twice.",
      },
    ],
  },
  {
    slug: "migrate-from-zapier-to-nothing",
    title: "Migrating from Zapier Without Migrating to a New Mess",
    excerpt:
      "Switching workflow tools is a chance to delete the duct tape, not re-pay it. A field guide for moving 60+ Zaps to something you can actually reason about.",
    category: "Workflow",
    date: "2026-07-22",
    readTime: "7 min",
    author: {
      name: "David Weiss",
      initials: "DW",
      role: "Senior Solutions Engineer",
      color: "from-cyan-500 to-emerald-500",
    },
    tags: ["Migration", "Workflow", "Zapier"],
    blocks: [
      {
        type: "p",
        text: "Most migration projects fail in a boring way: they faithfully rebuild every Zap, quirks included, and end up with the same pile — now in a new vendor's colors. The migration is the one moment you can prune.",
      },
      { type: "h2", text: "Audit before you move a single Zap" },
      {
        type: "list",
        ordered: true,
        items: [
          "List every automation with its trigger frequency and last-success date.",
          "Delete the ones that haven't fired in 90 days (renamed it: 'the 90-day graveyard').",
          "Flag the ones your team actually depends on — those are the only non-negotiables.",
          "Group the survivors by domain: sales, finance, ops, IT.",
        ],
      },
      { type: "h2", text: "Rebuild for outcomes, not steps" },
      {
        type: "p",
        text: "A Zap of 15 steps looks like a workflow. Usually it's fourteen workarounds and one real step. When you rebuild, ask what outcome the flow produces, not what steps it contains. You'll typically land on something four steps long.",
      },
      { type: "h2", text: "Bring the team along" },
      {
        type: "p",
        text: "The human side sinks more migrations than the technical one. Show your ops team the before/after for the flows they touch, let them name the flows, and keep a 'diff' doc of what changed so nobody gets surprised on Monday.",
      },
      {
        type: "callout",
        text: "Team size: 60+ Zaps migrated for our own customers averages out to roughly 24 real workflows once the dead weight is cut.",
      },
    ],
  },
  {
    slug: "rpa-vs-workflow-automation",
    title: "RPA vs. Workflow Automation: How to Choose",
    excerpt:
      "Robotic process automation and workflow automation are not competitors — they're answers to different questions. A decision guide for teams with messy processes.",
    category: "Strategy",
    date: "2026-06-30",
    readTime: "5 min",
    author: {
      name: "Sara Bhatt",
      initials: "SB",
      role: "Head of Product Design",
      color: "from-amber-500 to-amber-400",
    },
    tags: ["Strategy", "RPA", "Process"],
    blocks: [
      {
        type: "p",
        text: "If your process is 'a human clicks through five windows and pastes the result', that's a candidate for robotic process automation. If it's 'data needs to move between systems we own, with logic and approvals', that's workflow automation.",
      },
      { type: "h2", text: "The real differences" },
      {
        type: "list",
        items: [
          "RPA fakes the UI — it clicks like a person, so it breaks when the UI changes. Workflow automation talks to APIs, so it survives redesigns.",
          "RPA is per-task. Workflow automation is per-process — it can wait for approvals, branch on data, and alert when things go wrong.",
          "RPA is right for legacy apps with no API. Workflow automation is right for everything after the API.",
        ],
      },
      { type: "h2", text: "A practical test" },
      {
        type: "p",
        text: "Ask: is the bottleneck that a human has to drive the tool, or that the systems don't talk to each other? The first is an RPA problem. The second is a workflow problem. Most 'automation' projects are actually the second with the first bolted on.",
      },
      {
        type: "callout",
        text: "Our rule: if a system has an API, connect the API. Reserve bot-clicking for the two legacy screens you simply can't replace.",
      },
    ],
  },
  {
    slug: "ai-copilot-first-30-days",
    title: "The AI Copilot: Our First 30 Days",
    excerpt:
      "An honest recap of what the AI copilot actually does well, where it still leans on humans, and the review loop we built to keep it safe.",
    category: "AI",
    date: "2026-05-14",
    readTime: "6 min",
    author: {
      name: "Tara Kim",
      initials: "TK",
      role: "Co-founder & CTO",
      color: "from-[var(--accent-500)] to-[var(--accent-400)]",
    },
    tags: ["AI", "Copilot", "Product"],
    blocks: [
      {
        type: "p",
        text: "We launched the copilot with one job: turn a plain-English description of a workflow into a working pipeline with nodes, retries, and alerts. Thirty days in, that's exactly what it does — with two honest caveats.",
      },
      { type: "h2", text: "What it nails" },
      {
        type: "list",
        items: [
          "First draft: describe an onboarding flow in a paragraph, get a passable pipeline in seconds.",
          "Naming: it generates human-readable step names, which make the builder dramatically easier to keep clean.",
          "Error explanations: 'the webhook timed out because the payload exceeded 10MB' beats guessing.",
        ],
      },
      { type: "h2", text: "Where it still needs you" },
      {
        type: "p",
        text: "The draft is a starting point, not the finish line. It optimizes for the described happy path, so edge cases — 'what if the customer is already in the CRM?' — still want human eyes. That's by design: everything it writes lands in review before it can go live.",
      },
      { type: "h2", text: "The human-in-the-loop loop" },
      {
        type: "p",
        text: "Sensitive steps (payments, data deletion, external sends) are gated behind an explicit approval. The copilot drafts, the human approves, the machine executes. That division of labor is the whole product thesis.",
      },
      {
        type: "callout",
        text: "The copilot doesn't replace your ops team. It replaces the empty editor on Monday morning.",
      },
    ],
  },
  {
    slug: "monitoring-workflows-log-everything",
    title: "Monitoring Workflows: Log Everything That Matters",
    excerpt:
      "A workflow you can't see is a workflow you don't trust. The observability habits that turn automations from 'it worked once' into 'it works always'.",
    category: "Engineering",
    date: "2026-04-09",
    readTime: "5 min",
    author: {
      name: "Omar Mahmoud",
      initials: "OM",
      role: "VP of Engineering",
      color: "from-[var(--cyan-500)] to-[var(--cyan-400)]",
    },
    tags: ["Observability", "Logging", "Reliability"],
    blocks: [
      {
        type: "p",
        text: "Every workflow run should leave behind enough truth to answer three questions: What was supposed to happen? What actually happened? Where did the two diverge?",
      },
      { type: "h2", text: "The minimum log contract" },
      {
        type: "list",
        ordered: true,
        items: [
          "A correlation ID on every run, passed to every step and side effect.",
          "Start, finish, and duration for each step — not just the failures.",
          "The exact payload at failure, not a redacted summary.",
          "Who or what ran it: schedule, webhook, manual, or a parent workflow.",
        ],
      },
      { type: "h2", text: "Alert on the exception, not the average" },
      {
        type: "p",
        text: "Dashboards tell you the system is fine right up until it isn't. Alert on the specific failure modes that require a human — a payment step failing twice, a sync sitting in retry for an hour — and leave the averages to the charts.",
      },
      {
        type: "callout",
        text: "If a workflow failed and you can't explain it from the logs in under five minutes, that's an observability bug, not an automation bug.",
      },
    ],
  },
];

export const blogCategories = [
  "All",
  ...Array.from(new Set(blogPosts.map((p) => p.category))),
];

// ── Quick reference for link components ──

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Team", href: "/team" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const stats = [
  { value: "12k+", label: "Teams onboard" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "4.2M", label: "Workflows run daily" },
  { value: "38 min", label: "Saved per employee / day" },
];

export const trustedLogos = [
  "Brightlane",
  "Kitepath",
  "Northcell",
  "Vantage",
  "Orbital",
  "Helios",
  "Quantic",
  "Meridian",
];

export { business };
