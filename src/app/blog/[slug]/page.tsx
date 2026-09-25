import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts, type BlogBlock } from "@/config/content";
import { business } from "@/config/business";
import { byNewest, formatDate } from "@/lib/format";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `${business.siteUrl.replace(/\/$/, "")}/blog/${post.slug}`,
    },
  };
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-12 scroll-mt-24 text-2xl font-bold tracking-tight">
          {block.text}
        </h2>
      );
    case "p":
      return <p className="mt-5 leading-relaxed">{block.text}</p>;
    case "quote":
      return (
        <blockquote className="mt-8 border-l-2 border-[var(--brand-500)] pl-5 text-lg font-medium italic text-[var(--foreground)]">
          {block.text}
        </blockquote>
      );
    case "callout":
      return (
        <div className="mt-8 rounded-xl border border-[var(--brand-500)]/30 bg-[var(--brand-500)]/5 p-5 text-sm leading-relaxed">
          💡 {block.text}
        </div>
      );
    case "list":
      return (
        <ul
          className={`mt-5 space-y-2.5 pl-1 ${block.ordered ? "list-decimal" : "list-disc"} marker:text-[var(--brand-500)]`}
        >
          {block.items.map((item, i) => (
            <li key={i} className="ml-5 leading-relaxed pl-1">
              {item}
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const index = blogPosts.findIndex((p) => p.slug === params.slug);
  if (index === -1) notFound();

  const post = blogPosts[index];
  const related = byNewest(blogPosts)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);
  const paragraphs = post.blocks.filter(
    (b) => b.type === "p",
  ).length;

  return (
    <article className="mx-auto max-w-6xl px-4 pb-24 pt-36 sm:px-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 font-mono-brand text-xs muted">
          <li>
            <Link href="/" className="transition-colors hover:text-[var(--brand-500)]">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/blog" className="transition-colors hover:text-[var(--brand-500)]">
              Blog
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="text-[var(--brand-500)]">
            {post.category}
          </li>
        </ol>
      </nav>

      <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-balance sm:text-5xl">
        {post.title}
      </h1>

      {/* Meta */}
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <span
          aria-hidden
          className={`grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br ${post.author.color} text-sm font-bold text-white`}
        >
          {post.author.initials}
        </span>
        <div>
          <p className="text-sm font-semibold">{post.author.name}</p>
          <p className="text-xs muted">{post.author.role}</p>
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-2 text-xs muted">
          <span>{formatDate(post.date)}</span>
          <span aria-hidden>·</span>
          <span>{post.readTime} read</span>
          <span aria-hidden>·</span>
          <span>~{paragraphs * 4} min</span>
        </div>
      </div>

      {/* Divider */}
      <div className="divider my-10" />

      {/* Body — narrow column, comfortable measure */}
      <div className="mx-auto max-w-[44rem] text-[1.05rem] leading-relaxed">
        {post.blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>

      {/* Tags */}
      <div className="mx-auto mt-12 flex max-w-[44rem] flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[var(--border)] px-3 py-1 text-xs muted"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Author box */}
      <div className="mx-auto mt-12 max-w-[44rem] rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <div className="flex flex-wrap items-center gap-4">
          <span
            aria-hidden
            className={`grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br ${post.author.color} text-sm font-bold text-white`}
          >
            {post.author.initials}
          </span>
          <div>
            <p className="font-semibold">{post.author.name}</p>
            <p className="text-sm muted">{post.author.role} at {business.name}</p>
          </div>
        </div>
        <p className="mt-4 text-sm muted">
          Read more from the {business.name} team in the{" "}
          <Link href="/blog" className="font-medium text-[var(--brand-500)] hover:underline">
            blog archive
          </Link>.
        </p>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <div className="mx-auto mt-16 max-w-4xl">
          <h2 className="text-xl font-bold tracking-tight">Keep reading</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {related.map((rel) => (
              <Link
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                className="card card-hover flex h-full flex-col p-5"
              >
                <span className="font-mono-brand text-[11px] uppercase tracking-wider text-[var(--brand-500)]">
                  {rel.category}
                </span>
                <h3 className="mt-2 text-sm font-semibold leading-snug">
                  {rel.title}
                </h3>
                <p className="mt-auto pt-3 text-xs muted">
                  {formatDate(rel.date)} · {rel.readTime} read
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}