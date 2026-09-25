import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

const values = [
  {
    icon: "🎯",
    title: "Our Mission",
    text: "Give every team enterprise-grade automation — without the enterprise price tag or headcount.",
  },
  {
    icon: "🔭",
    title: "Our Vision",
    text: "A world where no human spends their day copy-pasting between tools.",
  },
  {
    icon: "💡",
    title: "What Makes Us Different",
    text: "Operators first: Nexaro is built by ops people, for ops people, with engineers welcome anytime.",
  },
];

export default function AboutPreview() {
  return (
    <Section alt divider>
      <div className="grid items-start gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow="About Us"
            title="Who we are — and why"
            highlight="teams trust us"
            subtitle="Nexaro Tech was founded in 2019 by operations engineers who were tired of watching skilled people lose hours to copy-paste work. Today our platform runs millions of workflows a day for teams in 40+ countries."
          />
          <Reveal delay={100}>
            <ul className="mt-6 space-y-3">
              {[
                "6+ years building mission-critical automation",
                "12,000+ teams onboarded, from startups to public companies",
                "SOC 2 Type II certified infrastructure",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm">
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
                  {item}
                </li>
              ))}
            </ul>
            <ButtonLink href="/about" variant="primary" className="mt-8">
              Learn More
            </ButtonLink>
          </Reveal>
        </div>

        <div className="grid gap-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 100}>
              <div className="card card-hover flex gap-4 p-5">
                <span aria-hidden className="text-2xl">{v.icon}</span>
                <div>
                  <h3 className="text-base font-semibold">{v.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed muted">{v.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
