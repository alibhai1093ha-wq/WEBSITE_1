import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { stats } from "@/config/content";

const steps = [
  {
    number: "01",
    title: "Connect your tools",
    description:
      "Link your existing stack with one-click integrations. Nexaro auto-discovers your data model — no mapping spreadsheets required.",
  },
  {
    number: "02",
    title: "Design workflows",
    description:
      "Drag and drop triggers, actions, and logic on a visual canvas. Or let the AI copilot draft the whole thing for you.",
  },
  {
    number: "03",
    title: "Ship and monitor",
    description:
      "Deploy with one click. Every run is logged, retried on failure, and surfaced on a live dashboard your whole team can see.",
  },
];

export default function HowItWorks() {
  return (
    <Section id="how-it-works" alt divider>
      <SectionHeading
        eyebrow="How It Works"
        title="From setup to scale in"
        highlight="three steps"
        subtitle="Most teams launch their first production workflow in under an hour."
      />

      <ol className="mt-14 grid gap-5 md:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.number}>
            <Reveal delay={i * 80}>
              <div className="card h-full p-6">
                <span className="font-mono-brand text-sm font-semibold text-[var(--brand-500)]">
                  {s.number}
                </span>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed muted">{s.description}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>

      <Reveal>
        <dl className="mt-16 grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dd className="text-3xl font-bold tracking-tight sm:text-4xl">
                <span className="text-gradient">{stat.value}</span>
              </dd>
              <dt className="mt-1 text-sm muted">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}
