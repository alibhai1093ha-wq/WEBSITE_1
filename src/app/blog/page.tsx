import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { blogPosts, blogCategories } from "@/config/content";
import { byNewest, formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guides and field notes from the Nexaro Tech team — on automation, reliability, AI, and building systems that actually run.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = byNewest(blogPosts);
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Field notes on"
        highlight="automation"
        description="Tactical guides and honest post-mortems from the team behind Nexaro Tech. No fluff, no recycled listicles — just what we learned shipping real systems."
      />

      <Section>
        {/* Featured post */}
        {featured && (
          <Reveal>
            <Link
              href={`/blog/${featured.slug}`}
              className="card card-hover group grid gap-6 p-8 md:grid-cols-[1.2fr_1fr]"
            >
              <div className="flex h-full flex-col justify-center">
                <span className="eyebrow w-fit">Featured · {featured.category}</span>
                <h2 className="mt-4 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 leading-relaxed muted">{featured.excerpt}</p>
                <div className="mt-6 flex items-center gap-3 text-sm muted">
                  <span
                    aria-hidden
                    className={`grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br ${featured.author.color} text-xs font-bold text-white`}
                  >
                    {featured.author.initials}
                  </span>
                  <div>
                    <p className="font-semibold text-[var(--foreground)]">{featured.author.name}</p>
                    <p>
                      {formatDate(featured.date)} · {featured.readTime} read
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between gap-4">
                <div className="flex items-center justify-center rounded-xl bg-gradient-to-br from-[var(--brand-600)] to-[var(--accent-500)] py-12 text-6xl shadow-lg shadow-[var(--ring)]">
                  <span aria-hidden>✍️</span>
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-500)] transition-transform group-hover:translate-x-0.5">
                  Read the article <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          </Reveal>
        )}

        {/* Category chips (visual only — posts are chronological) */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {blogCategories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-[var(--border)] px-4 py-1.5 text-sm font-medium muted"
            >
              {category}
            </span>
          ))}
        </div>

        {/* Post grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 50}>
              <Link
                href={`/blog/${post.slug}`}
                className="card card-hover group flex h-full flex-col p-6"
              >
                <div className="flex items-center justify-between text-xs muted">
                  <span className="font-mono-brand uppercase tracking-wider text-[var(--brand-500)]">
                    {post.category}
                  </span>
                  <span>{formatDate(post.date)}</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-snug transition-colors group-hover:text-[var(--brand-500)]">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed muted">{post.excerpt}</p>
                <div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-4 text-xs muted">
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      aria-hidden
                      className={`grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br ${post.author.color} text-[9px] font-bold text-white`}
                    >
                      {post.author.initials}
                    </span>
                    {post.author.name}
                  </span>
                  <span>{post.readTime} read</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Subscribe / CTA */}
        <Reveal className="mt-16 text-center">
          <h2 className="text-2xl font-bold tracking-tight">Enjoying the reads?</h2>
          <p className="mx-auto mt-3 max-w-md text-sm muted">
            We publish a new guide roughly twice a month. Tell us what you&apos;d
            like us to write about next.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact" variant="primary" size="lg">
              Request a Topic
            </ButtonLink>
            <ButtonLink href="/services" variant="secondary" size="lg">
              See Our Services
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}