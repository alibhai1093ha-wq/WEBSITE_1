import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { projects } from "@/config/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — Case Study`,
    description: project.description,
    alternates: { canonical: `/portfolio/${project.slug}` },
  };
}

export default function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const index = projects.findIndex((p) => p.slug === params.slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      {/* Case study header */}
      <section className="relative overflow-hidden border-b border-[var(--border)] pb-20 pt-36">
        <div className="glow left-1/2 top-[-8rem] h-72 w-[36rem] -translate-x-1/2 bg-[var(--brand-500)]/25" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 font-mono-brand text-xs muted">
              <li>
                <Link href="/" className="transition-colors hover:text-[var(--brand-500)]">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/portfolio" className="transition-colors hover:text-[var(--brand-500)]">
                  Portfolio
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-[var(--brand-500)]">
                {project.category}
              </li>
            </ol>
          </nav>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <span className="font-mono-brand text-sm uppercase tracking-wider text-[var(--brand-500)]">
                {project.category} · {project.year}
              </span>
              <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                {project.title}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed muted sm:text-lg">
                {project.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--border)] px-3 py-1 text-xs muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div
              className={`flex aspect-[4/3] items-center justify-center rounded-2xl bg-gradient-to-br text-8xl shadow-xl shadow-[var(--ring)] ${project.gradient}`}
            >
              <span aria-hidden>{project.icon}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Key facts */}
      <Section className="py-14">
        <Reveal>
          <dl className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
            {[
              { label: "Client", value: project.client },
              { label: "Year", value: project.year },
              { label: "Duration", value: project.duration },
              { label: "Role", value: project.role },
            ].map((fact) => (
              <div key={fact.label}>
                <dt className="text-xs font-medium uppercase tracking-wider muted">
                  {fact.label}
                </dt>
                <dd className="mt-1.5 text-sm font-semibold">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Section>

      {/* Overview */}
      <Section alt divider className="py-20">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              The <span className="text-gradient">situation</span>
            </h2>
            <p className="mt-5 leading-relaxed">{project.overview}</p>
          </Reveal>
        </div>
      </Section>

      {/* Challenge + Solution */}
      <Section className="py-20">
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="card h-full p-8">
              <span aria-hidden className="text-3xl">🧗</span>
              <h2 className="mt-3 text-xl font-bold tracking-tight">The challenge</h2>
              <p className="mt-4 text-sm leading-relaxed muted">{project.challenge}</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="card h-full p-8">
              <span aria-hidden className="text-3xl">🛠️</span>
              <h2 className="mt-3 text-xl font-bold tracking-tight">The solution</h2>
              <p className="mt-4 text-sm leading-relaxed muted">{project.solution}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Metrics */}
      <Section alt divider>
        <Reveal>
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
            Measurable <span className="text-gradient">outcomes</span>
          </h2>
          <dl className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-6 text-center sm:grid-cols-4">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="card p-6">
                <dd className="text-3xl font-bold tracking-tight text-gradient">
                  {metric.value}
                </dd>
                <dt className="mt-1.5 text-xs muted">{metric.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </Section>

      {/* Results */}
      <Section className="py-20">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              The <span className="text-gradient">results</span>
            </h2>
            <ul className="mt-6 space-y-3">
              {project.results.map((result, i) => (
                <li key={i} className="flex items-start gap-3 text-[0.95rem] leading-relaxed">
                  <span
                    aria-hidden
                    className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--brand-500)]/10 text-xs text-[var(--brand-500)]"
                  >
                    ✓
                  </span>
                  {result}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-12 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" variant="primary" size="lg">
              Start a Project Like This
            </ButtonLink>
            <ButtonLink href="/portfolio" variant="secondary" size="lg">
              Back to Portfolio
            </ButtonLink>
          </Reveal>
        </div>
      </Section>

      {/* Next project */}
      <Section className="pb-20 pt-0">
        <Link
          href={`/portfolio/${next.slug}`}
          className="card card-hover group flex items-center justify-between gap-6 p-8"
        >
          <div>
            <span className="font-mono-brand text-xs uppercase tracking-wider muted">
              Next case study
            </span>
            <h2 className="mt-2 text-xl font-bold tracking-tight transition-colors group-hover:text-[var(--brand-500)]">
              {next.title}
            </h2>
            <p className="mt-1 text-sm muted">{next.description}</p>
          </div>
          <span
            aria-hidden
            className={`hidden h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-3xl sm:grid ${next.gradient}`}
          >
            {next.icon}
          </span>
        </Link>
      </Section>
    </>
  );
}