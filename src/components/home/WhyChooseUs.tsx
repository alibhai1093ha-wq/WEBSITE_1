import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { whyChooseUs } from "@/config/content";

export default function WhyChooseUs() {
  return (
    <Section id="why-us">
      <SectionHeading
        eyebrow="Why Choose Us"
        title="Benefits you can"
        highlight="measure"
        subtitle="We hold ourselves to the standards we'd want from any partner we hire."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {whyChooseUs.map((item, i) => (
          <Reveal key={item.title} delay={i * 60}>
            <div className="card card-hover h-full p-6">
              <span aria-hidden className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--brand-600)]/10 text-xl">
                {item.icon}
              </span>
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed muted">{item.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
