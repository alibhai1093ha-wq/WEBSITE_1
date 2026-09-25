import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import { business } from "@/config/business";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for using Nexaro Tech products and services.",
  alternates: { canonical: "/terms" },
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: [
      `By accessing or using ${business.name}'s website and services, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our services.`,
    ],
  },
  {
    title: "2. Services",
    body: [
      "Nexaro Tech provides workflow automation software and related services. Specific features, usage limits, and pricing are described on our pricing page and in your service agreement.",
    ],
  },
  {
    title: "3. Accounts & Acceptable Use",
    body: [
      "You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.",
      "You agree not to use our services for unlawful activity, to infringe others' rights, or to attempt to disrupt or gain unauthorized access to our systems.",
    ],
  },
  {
    title: "4. Billing & Cancellation",
    body: [
      "Paid plans bill in advance on a monthly or annual basis. You can cancel at any time; cancellations take effect at the end of the current billing period. Annual plans are refundable pro-rata within the first 30 days.",
    ],
  },
  {
    title: "5. Intellectual Property",
    body: [
      "All content, trademarks, and software on this site are the property of Nexaro Tech or its licensors. You retain all rights to the data you process through our platform.",
    ],
  },
  {
    title: "6. Disclaimers & Limitation of Liability",
    body: [
      "Our services are provided 'as is'. While we target a 99.99% uptime SLA on eligible plans, we do not guarantee uninterrupted service. To the maximum extent permitted by law, our total liability is limited to the fees you paid in the 12 months preceding the claim.",
    ],
  },
  {
    title: "7. Changes to These Terms",
    body: [
      "We may update these terms from time to time. Material changes will be communicated to account holders in advance. Continued use of the services constitutes acceptance of the updated terms.",
    ],
  },
  {
    title: "8. Contact",
    body: [
      `Questions about these terms? Email ${business.email} or call ${business.phone}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms &"
        highlight="Conditions"
        description={`The agreement between you and ${business.legalName}. Last updated: January 2026.`}
      />
      <Section>
        <div className="mx-auto max-w-3xl space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-bold">{section.title}</h2>
              {section.body.map((paragraph, i) => (
                <p key={i} className="mt-3 leading-relaxed muted">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </Section>
    </>
  );
}
