import Link from "next/link";

export interface ServiceCardData {
  slug: string;
  icon: string;
  title: string;
  short: string;
}

export default function ServiceCard({
  service,
  showLearnMore = true,
}: {
  service: ServiceCardData;
  showLearnMore?: boolean;
}) {
  return (
    <div className="card card-hover group flex h-full flex-col p-6">
      <span
        aria-hidden
        className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-[var(--brand-500)] to-[var(--accent-500)] text-xl shadow-lg"
      >
        {service.icon}
      </span>
      <h3 className="mt-4 text-lg font-semibold">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed muted">{service.short}</p>
      {showLearnMore && (
        <Link
          href={`/services#${service.slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-500)] transition-transform group-hover:translate-x-0.5"
        >
          Learn More <span aria-hidden>→</span>
        </Link>
      )}
    </div>
  );
}
