import type { Testimonial } from "@/config/content";

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="card card-hover flex h-full flex-col p-6">
      <div className="flex gap-1 text-amber-400" aria-label={`Rated ${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} aria-hidden className={i < testimonial.rating ? "" : "opacity-25"}>
            ★
          </span>
        ))}
      </div>
      <blockquote className="mt-3 flex-1 text-sm leading-relaxed">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span
          aria-hidden
          className={`grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br ${testimonial.color} text-xs font-bold text-white`}
        >
          {testimonial.initials}
        </span>
        <span>
          <span className="block text-sm font-semibold">{testimonial.name}</span>
          <span className="block text-xs muted">{testimonial.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
