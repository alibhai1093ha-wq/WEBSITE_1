import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import PortfolioGallery from "@/components/PortfolioGallery";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected automation projects by Nexaro Tech — lead routing engines, invoice ops suites, AI support triage, e-commerce sync, and revenue dashboards.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Work that speaks for"
        highlight="itself"
        description="Selected projects from six years of automation work. Each engagement started with a messy manual process and ended with a pipeline that just runs."
      />

      <Section>
        <PortfolioGallery />

        <Reveal className="mt-14 text-center">
          <h2 className="text-2xl font-bold">Have a project in mind?</h2>
          <p className="mx-auto mt-3 max-w-md text-sm muted">
            We take on a limited number of new engagements each quarter. Tell us
            what you&apos;re building.
          </p>
          <div className="mt-6">
            <ButtonLink href="/contact" variant="primary" size="lg">
              Start a Conversation
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
