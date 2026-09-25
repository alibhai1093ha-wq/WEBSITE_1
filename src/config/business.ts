/**
 * ============================================================
 *  CENTRAL BUSINESS CONFIGURATION
 * ============================================================
 *  Single source of truth for all business details.
 *  Replace the placeholder values below once available —
 *  every page, button, and link updates automatically.
 * ============================================================
 */

export const business = {
  name: "Nexaro Tech",
  legalName: "Nexaro Tech, Inc.",
  tagline: "Automate the busywork. Scale what matters.",
  description:
    "Nexaro Tech is the all-in-one SaaS platform that turns manual workflows into self-running pipelines — so your team can focus on growth, not glue work.",

  // ── Contact details (placeholders — replace when available) ──
  email: "arslansaleem116kaka@gmail.com",
  phone: "+923060341876",
  whatsapp: "923060341876", // international format, digits only, e.g. 15551234567
  address: "Street No. 7, Burewala, Pakistan",
  hours: [
    { days: "Monday – Friday", time: "9:00 AM – 6:00 PM" },
    { days: "Saturday", time: "10:00 AM – 2:00 PM" },
    { days: "Sunday", time: "Closed" },
  ],

  // ── Social media (only non-empty entries are displayed) ──
  socials: [
    { label: "X (Twitter)", url: "https://x.com/nexarotech", icon: "x" },
    { label: "LinkedIn", url: "https://linkedin.com/company/nexarotech", icon: "linkedin" },
    { label: "GitHub", url: "https://github.com/nexarotech", icon: "github" },
    { label: "Facebook", url: "", icon: "facebook" },
    { label: "Instagram", url: "", icon: "instagram" },
    { label: "YouTube", url: "", icon: "youtube" },
  ] as { label: string; url: string; icon: string }[],

  // ── Derived links (computed, never hardcode these elsewhere) ──
  get mailto() {
    return `mailto:${this.email}`;
  },
  get tel() {
    return `tel:${this.phone.replace(/[^\d+]/g, "")}`;
  },
  get whatsappLink() {
    return `https://wa.me/${this.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
      "Hi Nexaro Tech! I'd like to learn more about your services.",
    )}`;
  },
  get siteUrl() {
    // Build-time safety: `new URL(raw)` throws for relative/invalid
    // values (e.g. "nexarotech.com"), which crashes Vercel's page-data
    // collection ("Failed to collect page data for /_not-found").
    // Normalize bare domains to https and fall back on garbage input.
    const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
    if (raw) {
      const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
      try {
        return new URL(candidate).origin;
      } catch {
        // invalid value — fall through to the localhost default
      }
    }
    return "http://localhost:3000";
  },
};

export const activeSocials = business.socials.filter((s) => s.url !== "");
