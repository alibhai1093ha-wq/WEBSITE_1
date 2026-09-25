import { business } from "@/config/business";
import { ButtonLink } from "@/components/ui/Button";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-40 sm:pt-48">
      {/* Ambient glows */}
      <div className="glow left-1/2 top-[-8rem] h-[26rem] w-[42rem] -translate-x-1/2 bg-[var(--brand-500)]/30" />
      <div className="glow right-[-6rem] top-40 h-64 w-64 bg-[var(--accent-500)]/25" />
      <div className="glow left-[-6rem] top-64 h-64 w-64 bg-[var(--cyan-500)]/20" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          {/* Announcement badge */}
          <div className="card mx-auto inline-flex items-center gap-2 px-4 py-1.5 text-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span className="muted">New — Nexaro AI Copilot 2.0 is live</span>
            <span className="font-semibold text-[var(--brand-500)]">→</span>
          </div>

          {/* Business name + headline */}
          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            {business.tagline.split(". ")[0]}.
            <br />
            <span className="text-gradient">
              {business.tagline.split(". ")[1]}
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed muted sm:text-lg">
            {business.description}
          </p>

          {/* Contact details — visible immediately, no extra click */}
          <div className="mx-auto mt-7 flex flex-col items-center justify-center gap-x-8 gap-y-2 text-sm sm:flex-row">
            <a
              href={business.mailto}
              className="inline-flex items-center gap-2 font-medium transition-colors hover:text-[var(--brand-500)]"
            >
              <span aria-hidden>✉️</span>
              {business.email}
            </a>
            <a
              href={business.tel}
              className="inline-flex items-center gap-2 font-medium transition-colors hover:text-[var(--brand-500)]"
            >
              <span aria-hidden>📞</span>
              {business.phone}
            </a>
          </div>

          {/* Primary CTAs */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact" size="lg" variant="primary">
              Contact Us
            </ButtonLink>
            <ButtonLink href={business.tel} size="lg" variant="primary">
              📞 Call Now
            </ButtonLink>
            <ButtonLink href={business.mailto} size="lg" variant="secondary">
              ✉️ Email Us
            </ButtonLink>
          </div>

          <p className="mt-5 font-mono-brand text-xs muted">
            Free 14-day trial · No credit card · Cancel anytime
          </p>
        </div>

        {/* Product mockup (pure CSS — no image weight) */}
        <div className="card mx-auto mt-16 max-w-4xl p-4 shadow-2xl shadow-[var(--shadow-color)] sm:p-6">
          <div className="flex items-center gap-1.5 px-2 pb-4">
            <span className="h-3 w-3 rounded-full bg-rose-400/80" />
            <span className="h-3 w-3 rounded-full bg-amber-400/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
            <span className="ml-4 rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-3 py-1 font-mono-brand text-xs muted">
              app.nexarotech.com/workflows
            </span>
          </div>

          <div className="grid gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-4 sm:grid-cols-[160px_1fr]">
            <div className="hidden flex-col gap-1.5 sm:flex">
              {["Dashboard", "Workflows", "Runs", "Team", "Settings"].map(
                (item, i) => (
                  <span
                    key={item}
                    className={`rounded-lg px-3 py-2 text-xs font-medium ${
                      i === 1
                        ? "bg-[var(--brand-600)]/15 text-[var(--brand-500)]"
                        : "muted"
                    }`}
                  >
                    {item}
                  </span>
                ),
              )}
              <div className="mt-auto space-y-1.5 pt-4">
                <div className="h-2 w-full rounded-full bg-[var(--border)]" />
                <div className="h-2 w-2/3 rounded-full bg-[var(--border)]" />
              </div>
            </div>

            <div className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold">onboarding-pipeline</span>
                <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-500">
                  ● Live
                </span>
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-4">
                {[
                  { icon: "⚡", label: "Trigger", detail: "New signup in Stripe" },
                  { icon: "🤖", label: "AI step", detail: "Enrich + score lead" },
                  { icon: "💬", label: "Notify", detail: "Alert #sales in Slack" },
                  { icon: "📊", label: "Sync", detail: "Update CRM row" },
                ].map((node) => (
                  <div
                    key={node.label}
                    className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3"
                  >
                    <span className="text-base">{node.icon}</span>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[var(--brand-500)]">
                      {node.label}
                    </p>
                    <p className="mt-0.5 text-[11px] leading-snug muted">
                      {node.detail}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-1.5 rounded-lg bg-[var(--surface-2)] p-3 font-mono-brand text-[10px] leading-relaxed muted">
                <p><span className="text-emerald-500">✓</span> run #4821 — completed in 1.2s</p>
                <p><span className="text-emerald-500">✓</span> run #4822 — completed in 0.8s</p>
                <p><span className="text-amber-500">↻</span> run #4823 — retrying step 2 (attempt 2/3)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
