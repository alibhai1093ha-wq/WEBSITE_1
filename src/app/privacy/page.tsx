import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import { business } from "@/config/business";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Nexaro Tech collects, uses, and protects your personal information.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    title: "1. Information We Collect",
    body: [
      "When you contact us through our website, we collect the information you provide directly: your name, email address, phone number, and the contents of your message.",
      "When you use our platform, we collect account information, usage data, and technical logs necessary to operate and secure the service.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    body: [
      "We use your information to respond to inquiries, provide and improve our services, send service-related communications, and comply with legal obligations.",
      "We never sell your personal information to third parties.",
    ],
  },
  {
    title: "3. Data Storage & Security",
    body: [
      "Your data is encrypted in transit (TLS) and at rest. Our infrastructure is SOC 2 Type II certified, and access to personal data is restricted to personnel who need it to do their jobs.",
    ],
  },
  {
    title: "4. Cookies",
    body: [
      "We use only essential cookies required for the website to function. We do not use advertising or cross-site tracking cookies.",
    ],
  },
  {
    title: "5. Data Retention",
    body: [
      "We keep contact inquiries for as long as needed to handle your request and for a reasonable archival period afterwards. You may request deletion at any time.",
    ],
  },
  {
    title: "6. Your Rights",
    body: [
      "Depending on your jurisdiction, you may have the right to access, correct, export, or delete your personal data. To exercise these rights, contact us using the details below.",
    ],
  },
  {
    title: "7. Contact",
    body: [
      `Questions about this policy? Email us at ${business.email} or call ${business.phone}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Privacy"
        title="Privacy"
        highlight="Policy"
        description={`How ${business.name} collects, uses, and protects your information. Last updated: January 2026.`}
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
