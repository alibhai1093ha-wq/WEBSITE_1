"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { projects, projectCategories, type Project } from "@/config/content";

/**
 * Reusable, filterable project grid. Client component because of
 * the category filter state. Card sizes adapt to context:
 * "preview" for the homepage section, "full" for /portfolio.
 */
export default function PortfolioGallery({
  size = "full",
}: {
  size?: "preview" | "full";
}) {
  const preview = size === "preview";
  const [active, setActive] = useState("All");
  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      {/* Category filter */}
      <Reveal className="flex flex-wrap justify-center gap-2">
        {projectCategories.map((category) => (
          <button
            key={category}
            onClick={() => setActive(category)}
            aria-pressed={active === category}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              active === category
                ? "bg-[var(--brand-600)] text-white shadow-lg shadow-[var(--ring)]"
                : "border border-[var(--border)] muted hover:border-[var(--brand-500)] hover:text-[var(--brand-500)]"
            }`}
          >
            {category}
          </button>
        ))}
      </Reveal>

      <div
        className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${preview ? "mt-10" : "mt-12"}`}
      >
        {filtered.map((project, i) => (
          <Reveal key={project.slug} delay={i * 50}>
            <Link
              href={`/portfolio/${project.slug}`}
              className="card card-hover group flex h-full flex-col overflow-hidden"
            >
              {/* Visual header (CSS gradient — zero image weight) */}
              <div
                className={`flex items-center justify-center bg-gradient-to-br text-5xl ${project.gradient} ${preview ? "h-36" : "h-44"}`}
              >
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:scale-110"
                >
                  {project.icon}
                </span>
              </div>
              <div className={`flex flex-1 flex-col ${preview ? "p-5" : "p-6"}`}>
                <span className="font-mono-brand text-xs uppercase tracking-wider text-[var(--brand-500)]">
                  {project.category}
                </span>
                <h3 className="mt-1.5 text-base font-semibold">{project.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed muted">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--border)] px-2.5 py-0.5 text-xs muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-500)] transition-transform group-hover:translate-x-0.5">
                  View case study <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-12 text-center">
          <p className="text-lg font-semibold">Nothing here yet</p>
          <p className="mt-2 text-sm muted">
            No projects in this category — check back soon or ask us about
            similar work.
          </p>
        </div>
      )}
    </>
  );
}

// Re-export for consumers that only need the type
export type { Project };
