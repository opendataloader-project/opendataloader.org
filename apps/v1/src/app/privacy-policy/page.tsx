import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Info, ShieldCheck } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = {
  title: "Privacy Policy | OpenDataLoader",
  description:
    "Learn how OpenDataLoader handles analytics data, contact submissions, retention, and your privacy choices when using opendataloader.org.",
};

type PolicySection = {
  id: string;
  title: string;
  content: ReactNode;
};

export default function PrivacyPolicyPage() {
  const orgName = "OpenDataLoader";
  const siteDomain = "opendataloader.org";
  const contactEmail = "open.dataloader@hancom.com";
  const lastUpdated = "September 17, 2025";

  const quickFacts = [
    {
      label: "Analytics",
      detail:
        "We rely on Google Analytics 4 (GA4) solely for aggregate usage insights.",
    },
    {
      label: "Contact form data",
      detail:
        "Name, business email, company, and project details are collected when you submit the contact form so we can reply.",
    },
    {
      label: "Retention",
      detail:
        "Contact submissions are kept for up to 12 months (or deleted sooner on request); aggregated GA4 data follows Google’s default window.",
    },
  ];

  const policySections: PolicySection[] = [
    {
      id: "info-we-collect",
      title: "1. Information We Collect",
      content: (
        <>
          <p>
            <strong>Google Analytics 4 (GA4):</strong> We use GA4 to capture
            basic usage information such as pages viewed, approximate location,
            device details, session duration, and interactions. This dataset is
            aggregated and does not personally identify you.
          </p>
          <p>
            <strong>Contact submissions:</strong> When you complete the contact
            form we collect the fields you provide (such as first and last name,
            business email, company, job title, and project details) so that our
            team can respond.
          </p>
        </>
      ),
    },
    {
      id: "contact-form",
      title: "2. Contact Form Submissions",
      content: (
        <div className="space-y-3">
          <p>
            Contact form data is sent to OpenDataLoader via secure email and
            stored in internal ticketing or CRM tools that are accessible only
            to the go-to-market and solutions engineering team members who need
            it to handle your request.
          </p>
          <p>
            We do not ask for sensitive categories of data, and we do not use
            contact submissions for unsolicited marketing. If you prefer not to
            share details in a form, you can email us directly at{" "}
            <a
              className="text-primary underline underline-offset-4"
              href={`mailto:${contactEmail}`}
            >
              {contactEmail}
            </a>
            {}.
          </p>
        </div>
      ),
    },
    {
      id: "how-we-use",
      title: "3. How We Use Information",
      content: (
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Understand how visitors discover, navigate, and exit the Site.
          </li>
          <li>Improve content relevance and overall site performance.</li>
          <li>Monitor traffic trends to prioritize new documentation.</li>
          <li>
            Respond to support, partnership, or enterprise inquiries you send.
          </li>
        </ul>
      ),
    },
    {
      id: "sharing",
      title: "4. Data Sharing",
      content: (
        <div className="space-y-3">
          <p>
            We do not sell, rent, or trade your information. GA4 data may be
            processed by Google in accordance with{" "}
            <a
              className="text-primary underline underline-offset-4"
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noreferrer"
            >
              Google’s privacy policy
            </a>
            {}.
          </p>
          <p>
            Contact submissions are shared only with internal OpenDataLoader
            personnel and trusted service providers (for example, email delivery
            or CRM vendors) who process the data on our behalf under contractual
            confidentiality obligations.
          </p>
        </div>
      ),
    },
    {
      id: "cookies",
      title: "5. Cookies",
      content: (
        <p>
          Cookies only support GA4 functionality. You may disable cookies in
          your browser; analytics accuracy may decrease, but your access to the
          Site remains unaffected.
        </p>
      ),
    },
    {
      id: "third-parties",
      title: "6. Third-Party Links",
      content: (
        <p>
          {siteDomain} may link to external sites for added resources. We are
          not responsible for the privacy practices or content of those
          third-party destinations. Review their policies when visiting.
        </p>
      ),
    },
    {
      id: "retention",
      title: "7. Data Retention",
      content: (
        <div className="space-y-3">
          <p>
            GA4 data is retained according to Google’s default window (often 14
            months). We do not maintain separate user-level identifiers on our
            infrastructure for tracking purposes.
          </p>
          <p>
            Contact submissions are kept for up to 12 months so we can track
            follow-ups and support outcomes. We delete records sooner if you
            withdraw consent or when we no longer need them for the original
            purpose.
          </p>
        </div>
      ),
    },
    {
      id: "rights",
      title: "8. Your Choices & Rights",
      content: (
        <div className="space-y-4">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Opt-out of analytics:</strong> Use browser settings or
              Google’s tools to limit or disable GA4 collection.
            </li>
            <li>
              <strong>Do Not Track:</strong> We do not modify collection when a
              DNT signal is detected, but we already minimize data and avoid
              PII.
            </li>
            <li>
              <strong>Access & deletion:</strong> You can request a copy or
              deletion of your contact submission at any time by emailing{" "}
              <a
                className="underline underline-offset-4"
                href={`mailto:${contactEmail}`}
              >
                {contactEmail}
              </a>
              {}. We will honor requests unless retention is required by law.
            </li>
          </ul>
          <Alert className="bg-muted/50">
            <Info className="text-primary" />
            <AlertTitle>Tip</AlertTitle>
            <AlertDescription>
              Learn more about Google’s official opt-out browser add-on at{" "}
              <a
                className="text-primary underline underline-offset-4"
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noreferrer"
              >
                tools.google.com/dlpage/gaoptout
              </a>
            </AlertDescription>
          </Alert>
        </div>
      ),
    },
    {
      id: "contact",
      title: "9. Contact",
      content: (
        <p>
          Questions about this Privacy Policy can be directed to{" "}
          <a
            className="text-primary underline underline-offset-4"
            href={`mailto:${contactEmail}`}
          >
            {contactEmail}
          </a>
          {}. We monitor this inbox for governance, compliance, and security
          inquiries.
        </p>
      ),
    },
  ];

  const defaultAccordionValues = policySections.map((section) => section.id);

  return (
    <main className="bg-background text-foreground">
      <div className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <Card>
          <CardHeader className="space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <ShieldCheck className="size-5" />
              <span className="text-sm font-medium uppercase tracking-wide">
                Privacy Policy
              </span>
            </div>
            <CardTitle>How we protect your data</CardTitle>
            <CardDescription>Last updated: {lastUpdated}.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-base text-muted-foreground">
            <p>
              Welcome to <strong>{siteDomain}</strong>. This statement explains
              what we collect, why we collect it, and the limited scenarios in
              which analytics data is processed. It applies whenever you view or
              interact with the Site. {orgName} respects your privacy and keeps
              the information collected on {siteDomain} intentionally minimal.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>At a glance</CardTitle>
            <CardDescription>
              Summary of the most common privacy questions we receive.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Topic</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quickFacts.map((fact) => (
                  <TableRow key={fact.label}>
                    <TableCell className="font-medium">{fact.label}</TableCell>
                    <TableCell>{fact.detail}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,18rem)_1fr]">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Contents</CardTitle>
              <CardDescription>
                Jump to any section in this policy.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="max-h-112 pr-2">
                <Table>
                  <TableBody>
                    {policySections.map((section, index) => (
                      <TableRow key={section.id} data-slot="toc-row">
                        <TableCell className="text-muted-foreground">
                          {index + 1}
                        </TableCell>
                        <TableCell>
                          <a
                            className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
                            href={`#${section.id}`}
                          >
                            {section.title.replace(/^\d+\.\s*/, "")}
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Full policy</CardTitle>
              <CardDescription>
                Expand any section below to learn how we handle data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion
                type="multiple"
                defaultValue={defaultAccordionValues}
                className="divide-y divide-border"
              >
                {policySections.map((section) => (
                  <AccordionItem
                    key={section.id}
                    value={section.id}
                    id={section.id}
                    className="py-2"
                  >
                    <AccordionTrigger className="text-lg font-semibold">
                      {section.title}
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 text-base text-muted-foreground">
                      {section.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              {`© ${new Date().getFullYear()} ${orgName}. Material changes are reflected by the "Last updated" date above.`}
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
