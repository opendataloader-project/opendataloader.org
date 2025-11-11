import type { Metadata } from "next";
import Image from "next/image";

import Link from "next/link";

import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShowcaseCtaButtons } from "@/app/showcase/showcase-cta";

const highlights = [
  {
    title: "Viewing Mode Preview",
    description:
      "Review teams compare rendered pages with extracted JSON so that every token, table, and annotation stays trustworthy.",
  },
  {
    title: "Studio workflow controls",
    description:
      "Operators can flag corrections, leave guidance, and push documents through approval without leaving the browser.",
  },
  {
    title: "OpenDataLoader engine",
    description:
      "HANCOM ships the OpenDataLoader PDF extraction core with commercial support, localization, and deployment tooling.",
  },
];

export const metadata: Metadata = {
  title: "Showcase | Data Loader Studio Powered by HANCOM",
  description:
    "See how HANCOM built the commercial Data Loader Studio experience on top of OpenDataLoader PDF.",
};

export default function ShowcasePage() {
  return (
    <main className="flex-1 bg-background">
      <section className="border-b bg-muted/40">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:px-8 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
                <Badge variant="secondary" className="uppercase tracking-wide">
                  Showcase
                </Badge>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Data Loader Studio
                </h1>
                <div className="flex flex-wrap items-center gap-1">
                  <span className="text-sm text-muted-foreground">
                    Powered by
                  </span>
                  <Image
                    src="/figures/hnc-logo.svg"
                    alt="HANCOM logo"
                    width={180}
                    height={48}
                    className="h-4 w-auto dark:hidden"
                    priority
                  />
                  <Image
                    src="/figures/hnc-logo-dark.svg"
                    alt="HANCOM logo"
                    width={180}
                    height={48}
                    className="hidden h-4 w-auto dark:block"
                    priority
                  />
                </div>
              </div>
              <p className="text-lg text-muted-foreground">
                Data Loader Studio is a commercial product developed by HANCOM
                using OpenDataLoader PDF, pairing the extraction engine with an
                operator-ready workspace.
              </p>
            </div>
            <ShowcaseCtaButtons />
          </div>
          <div className="border border-neutral-200 bg-background/90 shadow-xl shadow-black/5 dark:border-neutral-800 dark:bg-neutral-900/60">
            <Image
              src="/figures/hnc-studio-preview.webp"
              alt="Data Loader Studio viewing mode preview"
              width={1911}
              height={1019}
              className="h-auto w-full"
              priority
            />
          </div>
        </div>
      </section>

      <Section
        id="studio-highlights"
        title="Designed for review-ready data loading"
        subtitle="HANCOM blends visual assurance with OpenDataLoader's structured export formats."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        id="hancom-story"
        title="Why HANCOM chose OpenDataLoader"
        subtitle="A reliable PDF-to-JSON core lets Data Loader Studio ship faster for enterprises."
      >
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5 text-base text-muted-foreground">
            <p>
              HANCOM teams needed a multilingual pipeline that preserves tables,
              annotations, and page context for regulated industries. Instead of
              rebuilding a parser, they started with OpenDataLoader PDF to get
              high-fidelity JSON, Markdown, and HTML exports out of unstructured
              PDF archives.
            </p>
            <p>
              Inside Data Loader Studio, operators can audit every extraction in
              Viewing Mode Preview, leave inline feedback, and re-run jobs with
              tuned settings. That human-in-the-loop experience keeps datasets
              trustworthy while the OpenDataLoader core handles the heavy text
              analytics work.
            </p>
            <p>
              With OpenDataLoader as the foundation, HANCOM focuses on customer
              onboarding, access control, and SLA-backed hosting—delivering a
              polished commercial product without sacrificing the openness of
              the underlying engine.
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Deployment snapshot</CardTitle>
              <CardDescription>
                Key ingredients that make Data Loader Studio enterprise ready.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div>
                <p className="font-semibold text-foreground">Tech stack</p>
                <p>OpenDataLoader PDF + HANCOM automation layer</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">Core focus</p>
                <p>Regulated document review, localization, and approvals.</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">Availability</p>
                <p>Commercial product offered directly by HANCOM.</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">Connect</p>
                <p>
                  Reach the team at{" "}
                  <Link
                    href="mailto:open.dataloader@hancom.com"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    open.dataloader@hancom.com
                  </Link>
                  .
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>
    </main>
  );
}
