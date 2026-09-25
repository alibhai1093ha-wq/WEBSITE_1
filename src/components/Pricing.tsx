import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { tiers } from "@/config/content";

export default function Pricing() {
  return (
    <Section id="pricing" alt divider>
      <SectionHeading
        eyebrow="Pricing"
        title="Simple pricing that"
        highlight="scales with you"
        subtitle="Start free. Upgrade when your workflows start doing the work of a small team."
      />

      <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-3">
        {tiers.map((tier, i) => (
          <Reveal key={tier.name} delay={i * 80}>
            <div
              className={`card relative flex h-full flex-col p-7 ${
                tier.highlighted
                  ? "border-[var(--brand-500)]/60 shadow-xl shadow-[var(--ring)]"
                  : ""
              }`}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[var(--brand-600)] to-[var(--accent-500)] px-3 py-1 text-xs font-semibold text-white shadow-lg">
                  Most popular
                </span>
              )}

              <h3 className="text-lg font-semibold">{tier.name}</h3>
              <p className="mt-1 text-sm muted">{tier.description}</p>

              <div className="mt-5 flex items-baseline gap-1.5">
                <span className="text-4xl font-bold tracking-tight">{tier.price}</span>
                <span className="text-sm muted">{tier.period}</span>
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-500)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      aria-hidden
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="/contact"
                className={`mt-8 rounded-full py-2.5 text-center text-sm font-semibold transition-transform hover:scale-[1.03] ${
                  tier.highlighted
                    ? "bg-gradient-to-r from-[var(--brand-600)] to-[var(--accent-500)] text-white shadow-lg shadow-[var(--ring)]"
                    : "border border-[var(--border)] hover:border-[var(--brand-500)] hover:text-[var(--brand-500)]"
                }`}
              >
                {tier.cta}
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
