import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { teamMembers } from "@/config/content";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the engineers, operators, and customer advocates behind Nexaro Tech — the people turning manual work into self-running pipelines.",
  alternates: { canonical: "/team" },
};

const departments = [
  {
    name: "Leadership",
    blurb: "Sets the direction and stays close to customers.",
  },
  {
    name: "Engineering",
    blurb: "Builds the execution engine, connectors, and AI copilot.",
  },
  {
    name: "Services",
    blurb: "Gets customers live fast and keeps them successful.",
  },
  {
    name: "Design",
    blurb: "Makes complex automation feel effortless.",
  },
  {
    name: "Trust",
    blurb: "Owns security, compliance, and the 99.99% uptime promise.",
  },
];

export default function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Team"
        title="The people behind the"
        highlight="platform"
        description="A compact team of engineers, operators, and customer advocates. We're proud of the product, but the humans making it run are the real story."
      />

      <Section>
        <SectionHeading
          eyebrow="The People"
          title="Meet the"
          highlight="team"
          subtitle="Small on purpose — we'd rather know every customer than sit in standups about them."
        />
        <Reveal className="mt-14">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, i) => (
              <Reveal key={member.name} delay={i * 50}>
                <div className="card card-hover flex h-full flex-col p-6 text-center">
                  <span
                    aria-hidden
                    className={`mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br ${member.color} text-xl font-bold text-white shadow-lg shadow-[var(--ring)]`}
                  >
                    {member.initials}
                  </span>
                  <h3 className="mt-5 text-base font-semibold">{member.name}</h3>
                  <p className="mt-1 text-sm font-medium text-[var(--brand-500)]">
                    {member.role}
                  </p>
                  <span className="mt-2 font-mono-brand text-[11px] uppercase tracking-wider muted">
                    {member.department}
                  </span>
                  <p className="mt-3 flex-1 text-sm leading-relaxed muted">
                    {member.bio}
                  </p>
                  {(member.linkedin || member.x) && (
                    <div className="mt-5 flex justify-center gap-2">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          aria-label={`${member.name} on LinkedIn`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="grid h-8 w-8 place-items-center rounded-lg border border-[var(--border)] text-xs muted transition-colors hover:border-[var(--brand-500)] hover:text-[var(--brand-500)]"
                        >
                          in
                        </a>
                      )}
                      {member.x && (
                        <a
                          href={member.x}
                          aria-label={`${member.name} on X`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="grid h-8 w-8 place-items-center rounded-lg border border-[var(--border)] text-xs muted transition-colors hover:border-[var(--brand-500)] hover:text-[var(--brand-500)]"
                        >
                          𝕏
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Department focus areas */}
      <Section alt divider>
        <SectionHeading
          eyebrow="How we're organized"
          title="Five teams,"
          highlight="one mission"
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {departments.map((dept, i) => (
            <Reveal key={dept.name} delay={i * 50}>
              <div className="card h-full p-6">
                <span className="eyebrow">{dept.name}</span>
                <p className="mt-4 text-sm leading-relaxed muted">{dept.blurb}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Join the team */}
      <Section>
        <Reveal className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Want to join the team?
          </h2>
          <p className="mx-auto mt-4 max-w-lg muted">
            We hire slowly and carefully. If you love removing busywork from the
            world, we&apos;d love to hear from you.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact" variant="primary" size="lg">
              Get in Touch
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}