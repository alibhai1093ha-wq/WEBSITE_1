import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import TestimonialCard from "@/components/TestimonialCard";
import { ButtonLink } from "@/components/ui/Button";
import { testimonials, trustedLogos } from "@/config/content";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "See what teams say about Nexaro Tech — real testimonials from COOs, engineers, and operators running their businesses on our platform.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Testimonials"
        title="Loved by teams that"
        highlight="ship"
        description="Real feedback from real operators. No cherry-picking — these are the words we're trusted to publish."
      />

      <Section>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 80}>
              <TestimonialCard testimonial={t} />
            </Reveal>
          ))}
        </div>

        {/* Logo band */}
        <Reveal className="mt-16">
          <div className="card p-8">
            <p className="text-center font-mono-brand text-xs uppercase tracking-[0.2em] muted">
              Trusted by fast-growing teams
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {trustedLogos.map((logo) => (
                <span key={logo} className="text-lg font-semibold tracking-tight muted">
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-14 text-center">
          <h2 className="text-2xl font-bold">Want results like these?</h2>
          <p className="mx-auto mt-3 max-w-md text-sm muted">
            Join 12,000+ teams automating their operations with Nexaro.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact" variant="primary">
              Get Started
            </ButtonLink>
            <ButtonLink href="/#pricing" variant="secondary">
              See Pricing
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
