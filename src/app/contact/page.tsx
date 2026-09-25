import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/ContactForm";
import ContactMethods from "@/components/ui/ContactMethods";
import { business, activeSocials } from "@/config/business";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Nexaro Tech — email, phone, WhatsApp, or send us a message through our contact form. We reply within one business day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk about"
        highlight="your automation"
        description="Questions, demos, pricing, or a tricky workflow — we're one message away. Choose whichever channel suits you best."
      />

      <Section>
        {/* Direct contact details */}
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="card p-5">
              <span className="text-sm font-semibold">✉️ Email</span>
              <a
                href={business.mailto}
                className="mt-2 block break-all text-sm muted transition-colors hover:text-[var(--brand-500)]"
              >
                {business.email}
              </a>
            </div>
            <div className="card p-5">
              <span className="text-sm font-semibold">📞 Phone</span>
              <a
                href={business.tel}
                className="mt-2 block text-sm muted transition-colors hover:text-[var(--brand-500)]"
              >
                {business.phone}
              </a>
            </div>
            <div className="card p-5">
              <span className="text-sm font-semibold">📍 Address</span>
              <p className="mt-2 text-sm muted">{business.address}</p>
            </div>
            <div className="card p-5">
              <span className="text-sm font-semibold">🕒 Business Hours</span>
              <dl className="mt-2 space-y-1 text-sm muted">
                {business.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-2">
                    <dt>{h.days}</dt>
                    <dd className="text-right">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>

        {/* Form + socials */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <div className="card p-6 sm:p-8">
              <h2 className="text-xl font-bold">Send us a message</h2>
              <p className="mt-1.5 text-sm muted">
                Fill out the form and we&apos;ll get back to you within one business day.
              </p>
              <div className="mt-7">
                <ContactForm />
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="space-y-5">
              <div className="card p-6">
                <h2 className="text-base font-semibold">Other ways to reach us</h2>
                <div className="mt-4">
                  <ContactMethods />
                </div>
              </div>

              {activeSocials.length > 0 && (
                <div className="card p-6">
                  <h2 className="text-base font-semibold">Follow us</h2>
                  <ul className="mt-4 space-y-2.5">
                    {activeSocials.map((s) => (
                      <li key={s.label}>
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm muted transition-colors hover:text-[var(--brand-500)]"
                        >
                          {s.label} ↗
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="card bg-gradient-to-br from-[var(--brand-600)]/10 to-[var(--accent-500)]/10 p-6">
                <h2 className="text-base font-semibold">Prefer instant chat?</h2>
                <p className="mt-2 text-sm muted">
                  Our team answers messages during business hours — typically in
                  under 15 minutes.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
