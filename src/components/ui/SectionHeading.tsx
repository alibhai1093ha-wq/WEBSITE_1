import Reveal from "./Reveal";

/**
 * Consistent section heading: mono eyebrow, bold title with
 * optional gradient highlight, and a muted subtitle.
 */
export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const alignClass =
    align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl";

  return (
    <Reveal className={alignClass}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        {title} {highlight && <span className="text-gradient">{highlight}</span>}
      </h2>
      {subtitle && <p className="mt-4 text-base muted">{subtitle}</p>}
    </Reveal>
  );
}
