import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-[var(--brand-600)] to-[var(--accent-500)] text-white shadow-lg shadow-[var(--ring)] hover:scale-[1.03] focus-visible:outline-[var(--brand-500)]",
  secondary:
    "border border-[var(--border)] hover:border-[var(--brand-500)] hover:text-[var(--brand-500)] focus-visible:outline-[var(--brand-500)]",
  ghost: "muted hover:text-[var(--brand-500)] focus-visible:outline-[var(--brand-500)]",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

type ButtonAsLink = CommonProps & { href: string } & Omit<
    ComponentProps<typeof Link>,
    "className" | "children" | "href"
  >;
type ButtonAsButton = CommonProps &
  Omit<ComponentProps<"button">, "className" | "children"> & { href?: undefined };

function classes(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

/** Renders a next/link for internal hrefs, an <a> for external/mailto/tel. */
export function ButtonLink({ href, variant, size, className, children, ...rest }: ButtonAsLink) {
  const cls = classes(variant, size, className ?? "");
  const external = /^(https?:|mailto:|tel:)/.test(href);
  if (external) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

export function Button({ variant, size, className, children, ...rest }: ButtonAsButton) {
  return (
    <button className={classes(variant, size, className ?? "")} {...rest}>
      {children}
    </button>
  );
}
