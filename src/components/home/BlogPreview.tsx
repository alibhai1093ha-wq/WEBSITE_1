import Link from "next/link";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { blogPosts } from "@/config/content";
import { byNewest, formatDate } from "@/lib/format";

export default function BlogPreview() {
  const latest = byNewest(blogPosts).slice(0, 3);

  return (
    <Section id="blog" alt divider>
      <SectionHeading
        eyebrow="From the Blog"
        title="Notes from the"
        highlight="trenches"
        subtitle="Tactical guides on automation, reliability, and AI — straight from shipping real systems."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {latest.map((post, i) => (
          <Reveal key={post.slug} delay={i * 60}>
            <Link
              href={`/blog/${post.slug}`}
              className="card card-hover group flex h-full flex-col p-6"
            >
              <div className="flex items-center justify-between text-xs muted">
                <span className="font-mono-brand uppercase tracking-wider text-[var(--brand-500)]">
                  {post.category}
                </span>
                <span>{post.readTime} read</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold leading-snug transition-colors group-hover:text-[var(--brand-500)]">
                {post.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed muted">
                {post.excerpt}
              </p>
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
                <span>{formatDate(post.date)}</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 text-center">
        <ButtonLink href="/blog" variant="secondary" size="lg">
          Visit the blog
        </ButtonLink>
      </Reveal>
    </Section>
  );
}