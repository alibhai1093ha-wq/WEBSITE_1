import type { ReactNode } from "react";

/**
 * Consistent section shell: max-width container, vertical
 * rhythm, optional alternate background band and top/bottom
 * dividers.
 */
export default function Section({
  id,
  children,
  alt = false,
  divider = false,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  alt?: boolean;
  divider?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-20 py-24 ${divider ? "border-y border-[var(--border)]" : ""} ${alt ? "bg-[var(--surface-2)]/50" : ""} ${className}`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  );
}
