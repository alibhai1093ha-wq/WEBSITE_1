import { business, activeSocials } from "@/config/business";

/**
 * Reusable "how to reach us" block: email, phone, and WhatsApp
 * as clickable links, plus optional social icons. Used in the
 * hero, contact CTA, and contact page.
 */
export default function ContactMethods({
  variant = "cards",
}: {
  variant?: "cards" | "inline";
}) {
  if (variant === "inline") {
    return (
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        <a
          href={business.mailto}
          className="inline-flex items-center gap-2 transition-colors hover:text-[var(--brand-500)]"
        >
          <span aria-hidden>✉️</span>
          {business.email}
        </a>
        <a
          href={business.tel}
          className="inline-flex items-center gap-2 transition-colors hover:text-[var(--brand-500)]"
        >
          <span aria-hidden>📞</span>
          {business.phone}
        </a>
      </div>
    );
  }

  const methods = [
    {
      icon: "✉️",
      label: "Email us",
      value: business.email,
      href: business.mailto,
      cta: "Email Us",
    },
    {
      icon: "📞",
      label: "Call us",
      value: business.phone,
      href: business.tel,
      cta: "Call Now",
    },
    ...(business.whatsapp && !business.whatsapp.startsWith("YOUR_")
      ? [
          {
            icon: "💬",
            label: "WhatsApp",
            value: "Chat instantly",
            href: business.whatsappLink,
            cta: "WhatsApp Us",
          },
        ]
      : []),
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {methods.map((m) => (
        <a
          key={m.label}
          href={m.href}
          className="card card-hover group flex flex-col p-5"
        >
          <span className="flex items-center gap-2 text-sm font-semibold">
            <span aria-hidden className="text-lg">{m.icon}</span>
            {m.label}
          </span>
          <span className="mt-2 flex-1 truncate text-sm muted">{m.value}</span>
          <span className="mt-3 text-sm font-semibold text-[var(--brand-500)] group-hover:underline">
            {m.cta} →
          </span>
        </a>
      ))}
      {activeSocials.length > 0 && (
        <div className="card flex flex-col p-5 sm:col-span-2 lg:col-span-1">
          <span className="text-sm font-semibold">Follow us</span>
          <div className="mt-3 flex flex-wrap gap-2">
            {activeSocials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--border)] text-xs font-bold transition-colors hover:border-[var(--brand-500)] hover:text-[var(--brand-500)]"
              >
                {s.icon.charAt(0).toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
