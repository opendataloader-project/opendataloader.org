import type { Metadata } from "next";

import { Section } from "@/components/features/layout/section";

import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact | OpenDataLoader",
  description:
    "Contact the OpenDataLoader team to discuss enterprise deployments, partnerships, or community collaboration.",
};

export default function ContactPage() {
  return (
    <main className="flex-1 bg-background">
      <Section
        id="contact"
        title="Get in touch"
        subtitle="Share a few details and our team will reach out shortly."
      >
        <div className="mx-auto max-w-3xl text-left">
          <ContactForm />
        </div>
      </Section>
    </main>
  );
}
