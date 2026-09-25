import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesGrid from "@/components/home/ServicesGrid";
import AboutPreview from "@/components/home/AboutPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import PortfolioPreview from "@/components/home/PortfolioPreview";
import BlogPreview from "@/components/home/BlogPreview";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ServicesGrid />
        <AboutPreview />
        <HowItWorks />
        <WhyChooseUs />
        <PortfolioPreview />
        <BlogPreview />
        <Testimonials />
        <Pricing />

        {/* FAQ preview */}
        <Section id="faq">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions?"
            highlight="Answered."
            subtitle="The things teams ask us most before getting started."
          />
          <Reveal className="mx-auto mt-12 max-w-3xl">
            <FAQ limit={5} />
            <div className="mt-8 text-center">
              <ButtonLink href="/faq" variant="secondary">
                View all FAQs
              </ButtonLink>
            </div>
          </Reveal>
        </Section>

        <CTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
