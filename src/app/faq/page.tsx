import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import FAQ from "@/components/FAQ";
import ContactMethods from "@/components/ui/ContactMethods";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Nexaro Tech — security, trials, migration, support, pricing, and deployments answered.",
  alternates: { canonical: "/faq" },
};

export default function FAQPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="Questions?"
        highlight="Answered."
        description="Everything teams usually ask before getting started. Can't find your answer? We're one message away."
      />

      <Section>
        <Reveal className="mx-auto max-w-3xl">
          <FAQ />
        </Reveal>

        <Reveal className="mx-auto mt-16 max-w-3xl text-center">
          <h2 className="text-2xl font-bold">Still have questions?</h2>
          <p className="mx-auto mt-3 max-w-md text-sm muted">
            Reach out directly — a real human will get back to you, usually within the hour during business hours.
          </p>
          <div className="mt-6">
            <ButtonLink href="/contact" variant="primary" size="lg">
              Ask Us Anything
            </ButtonLink>
          </div>
          <div className="mt-12 text-left">
            <ContactMethods />
          </div>
        </Reveal>
      </Section>
    </>
  );
}
