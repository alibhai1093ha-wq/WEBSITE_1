import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import ContactMethods from "@/components/ui/ContactMethods";
import { ButtonLink } from "@/components/ui/Button";
import { business } from "@/config/business";

export default function CTA() {
  return (
    <Section id="cta" className="overflow-hidden">
      <div className="glow -left-24 top-0 h-72 w-72 bg-[var(--brand-500)]/40" />
      <div className="glow -right-24 bottom-0 h-72 w-72 bg-[var(--accent-500)]/30" />

      <div className="relative">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Ready to put your busywork"
          highlight="on autopilot?"
          subtitle="Reach out directly — or tell us what you'd like to automate and we'll reply within one business day."
        />

        {/* Direct contact details — always visible */}
        <Reveal delay={100} className="mx-auto mt-8 max-w-md text-center">
          <div className="card inline-flex flex-col gap-2 px-8 py-5 text-sm">
            <a href={business.mailto} className="inline-flex items-center gap-2 font-medium transition-colors hover:text-[var(--brand-500)]">
              <span aria-hidden>✉️</span> {business.email}
            </a>
            <a href={business.tel} className="inline-flex items-center gap-2 font-medium transition-colors hover:text-[var(--brand-500)]">
              <span aria-hidden>📞</span> {business.phone}
            </a>
          </div>
        </Reveal>

        <Reveal delay={150} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/contact" variant="primary" size="lg">
            Contact Us
          </ButtonLink>
          <ButtonLink href={business.tel} variant="secondary" size="lg">
            📞 Call Now
          </ButtonLink>
          <ButtonLink href={business.mailto} variant="secondary" size="lg">
            ✉️ Email Us
          </ButtonLink>
        </Reveal>

        {/* Contact method cards + socials */}
        <div className="mt-14">
          <ContactMethods />
        </div>

        <Reveal delay={200} className="mt-12 text-center font-mono-brand text-xs muted">
          14-day trial · Cancel anytime · SOC 2 Type II
        </Reveal>
      </div>
    </Section>
  );
}
