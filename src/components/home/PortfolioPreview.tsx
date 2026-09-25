import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import PortfolioGallery from "@/components/PortfolioGallery";
import { ButtonLink } from "@/components/ui/Button";

export default function PortfolioPreview() {
  return (
    <Section id="portfolio">
      <SectionHeading
        eyebrow="Portfolio"
        title="Work that speaks for"
        highlight="itself"
        subtitle="A sample of the pipelines, integrations, and dashboards we've shipped for teams like yours."
      />

      <PortfolioGallery size="preview" />

      <Reveal className="mt-10 text-center">
        <ButtonLink href="/portfolio" variant="secondary" size="lg">
          View full portfolio
        </ButtonLink>
      </Reveal>
    </Section>
  );
}
