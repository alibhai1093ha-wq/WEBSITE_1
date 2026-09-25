import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import ServiceCard from "@/components/ServiceCard";
import { ButtonLink } from "@/components/ui/Button";
import { services } from "@/config/content";

export default function ServicesGrid() {
  return (
    <Section id="services" alt divider>
      <SectionHeading
        eyebrow="Our Services"
        title="Everything you need to"
        highlight="move faster"
        subtitle="One platform that replaces the patchwork of scripts, spreadsheets, and subscriptions holding your team back."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <Reveal key={service.slug} delay={i * 60}>
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 text-center">
        <ButtonLink href="/services" variant="secondary" size="lg">
          View all services
        </ButtonLink>
      </Reveal>
    </Section>
  );
}
