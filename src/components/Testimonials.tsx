import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import TestimonialCard from "@/components/TestimonialCard";
import { testimonials, trustedLogos } from "@/config/content";

export default function Testimonials() {
  return (
    <Section id="testimonials">
      <SectionHeading
        eyebrow="Testimonials"
        title="Loved by teams that"
        highlight="ship"
        subtitle="Real feedback from real operators running their businesses on Nexaro."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {testimonials.slice(0, 3).map((t, i) => (
          <Reveal key={t.name} delay={i * 80}>
            <TestimonialCard testimonial={t} />
          </Reveal>
        ))}
      </div>

      {/* Logo marquee */}
      <Reveal className="mt-16 overflow-hidden">
        <p className="text-center font-mono-brand text-xs uppercase tracking-[0.2em] muted">
          Trusted by fast-growing teams
        </p>
        <div className="relative mt-6">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--background)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--background)] to-transparent" />
          <div className="flex w-max animate-marquee gap-14 pr-14">
            {[...trustedLogos, ...trustedLogos].map((logo, i) => (
              <span
                key={`${logo}-${i}`}
                className="whitespace-nowrap text-lg font-semibold tracking-tight muted"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
