import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import ContactMethods from "@/components/ui/ContactMethods";
import { services } from "@/config/content";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore Nexaro Tech services — workflow automation, integrations, AI copilot, live analytics, enterprise security, and scale infrastructure.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Everything you need to"
        highlight="move faster"
        description="Six core capabilities, one platform. Each service is designed to stand alone — and to compound when combined."
      />

      <Section>
        <div className="space-y-16">
          {services.map((service, i) => (
            <Reveal key={service.slug}>
              <article
                id={service.slug}
                className="card grid scroll-mt-28 gap-8 p-8 lg:grid-cols-[auto_1fr_auto] lg:items-center"
              >
                <span
                  aria-hidden
                  className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[var(--brand-500)] to-[var(--accent-500)] text-3xl shadow-lg"
                >
                  {service.icon}
                </span>
                <div>
                  <span className="font-mono-brand text-xs uppercase tracking-wider text-[var(--brand-500)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-1 text-2xl font-bold">{service.title}</h2>
                  <p className="mt-3 leading-relaxed muted">{service.description}</p>
                  <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5 text-sm">
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
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lg:w-40">
                  <ButtonLink href="/contact" variant="secondary" className="w-full whitespace-nowrap">
                    Get Started
                  </ButtonLink>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section alt divider>
        <Reveal className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Not sure where to start?
          </h2>
          <p className="mx-auto mt-4 max-w-xl muted">
            Tell us about your workflow — we&apos;ll map it to the right services in a free 30-minute consultation.
          </p>
          <div className="mt-8">
            <ButtonLink href="/contact" variant="primary" size="lg">
              Book a Free Consultation
            </ButtonLink>
          </div>
          <div className="mx-auto mt-14 max-w-4xl text-left">
            <ContactMethods />
          </div>
        </Reveal>
      </Section>
    </>
  );
}
