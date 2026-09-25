import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { stats } from "@/config/content";
import { teamMembers } from "@/config/content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Nexaro Tech — our mission, vision, values, and the story behind the automation platform trusted by 12,000+ teams worldwide.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: "🧭",
    title: "Customer Obsession",
    description: "We start with the customer's problem and work backwards. Every roadmap item must trace to a real pain point.",
  },
  {
    icon: "🔨",
    title: "Craftsmanship",
    description: "We sweat the details — in our product, our docs, and our support. Good enough isn't.",
  },
  {
    icon: "🤝",
    title: "Transparency",
    description: "Real uptime numbers, honest pricing, and direct communication. No black boxes, ever.",
  },
  {
    icon: "⚡",
    title: "Speed With Care",
    description: "We move fast, but never at the expense of reliability or security. Ship, measure, iterate.",
  },
];

const leadership = teamMembers.filter((m) => m.department === "Leadership");

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="The team behind the"
        highlight="automation"
        description="Nexaro Tech was founded in 2019 by operations engineers who were tired of watching skilled people lose hours to copy-paste work. Today our platform runs millions of workflows a day for teams in 40+ countries."
      />

      {/* Stats band */}
      <Section className="py-14">
        <Reveal>
          <dl className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
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

      {/* Mission / Vision */}
      <Section alt divider className="py-20">
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="card h-full p-8">
              <span aria-hidden className="text-3xl">🎯</span>
              <h2 className="mt-3 text-2xl font-bold">Our Mission</h2>
              <p className="mt-3 leading-relaxed muted">
                To give every team — regardless of size or budget —
                enterprise-grade automation that eliminates busywork and lets
                people focus on the work only humans can do.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="card h-full p-8">
              <span aria-hidden className="text-3xl">🔭</span>
              <h2 className="mt-3 text-2xl font-bold">Our Vision</h2>
              <p className="mt-3 leading-relaxed muted">
                A world where no human spends their day copy-pasting between
                tools — where software does the glue work and people do the
                thinking.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Values */}
      <Section>
        <SectionHeading
          eyebrow="Our Values"
          title="What we"
          highlight="stand for"
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 60}>
              <div className="card card-hover flex h-full gap-4 p-6">
                <span aria-hidden className="text-2xl">{v.icon}</span>
                <div>
                  <h3 className="text-lg font-semibold">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed muted">{v.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Team */}
      <Section alt divider>
        <SectionHeading
          eyebrow="Leadership"
          title="The people behind"
          highlight="the product"
          subtitle="A compact team of engineers, operators, and customer advocates."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {leadership.map((member, i) => (
            <Reveal key={member.name} delay={i * 60}>
              <div className="card card-hover p-6 text-center">
                <span
                  aria-hidden
                  className={`mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br ${member.color} text-lg font-bold text-white`}
                >
                  {member.initials}
                </span>
                <h3 className="mt-4 text-base font-semibold">{member.name}</h3>
                <p className="mt-1 text-sm muted">{member.role}</p>
              </div>
            </Reveal>
          ))}
          <Reveal delay={leadership.length * 60}>
            <Link href="/team" className="card card-hover grid h-full place-items-center p-6 text-center">
              <span className="text-sm font-medium text-[var(--brand-500)]">
                View full team →
              </span>
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <Reveal className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Want to work with us?
          </h2>
          <p className="mx-auto mt-4 max-w-xl muted">
            Whether you&apos;re a future customer or a future teammate, we&apos;d love to hear from you.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact" variant="primary" size="lg">
              Contact Us
            </ButtonLink>
            <ButtonLink href="/services" variant="secondary" size="lg">
              Explore Services
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
