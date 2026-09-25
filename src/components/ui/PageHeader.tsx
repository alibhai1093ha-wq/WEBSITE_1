import Link from "next/link";

/**
 * Consistent hero banner for inner pages (About, Services, …)
 * with breadcrumb navigation and ambient glows.
 */
export default function PageHeader({
  eyebrow,
  title,
  highlight,
  description,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border)] pb-16 pt-36">
      <div className="glow left-1/2 top-[-8rem] h-72 w-[36rem] -translate-x-1/2 bg-[var(--brand-500)]/25" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 font-mono-brand text-xs muted">
            <li>
              <Link href="/" className="transition-colors hover:text-[var(--brand-500)]">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-[var(--brand-500)]">
              {eyebrow}
            </li>
          </ol>
        </nav>
        <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          {title} {highlight && <span className="text-gradient">{highlight}</span>}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed muted sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
