"use client";

import Link from "next/link";
import type { BadgeLinkItem, FeatureItem } from "@/types";
import Autoplay from "embla-carousel-autoplay";

import { trackBadgeClick } from "@/lib/tracking";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Section } from "@/components/features/layout/section";

const features: FeatureItem[] = [
  {
    icon: "🛡️",
    title: "AI-Safety",
    description:
      "Proactively identifies and neutralizes potential malicious content before it can affect the integrity and security.",
  },
  {
    icon: "🔒",
    title: "Local-First Privacy",
    description:
      "This keeps your data under your control, reducing the risk of breaches and limiting what companies can collect.",
  },
  {
    icon: "🖍️",
    title: "Annotated PDF Visualization",
    description:
      "Instantly recognized layouts, tables, and text elements overlaid on the original document for confident data validation.",
  },
  {
    icon: "🧾",
    title: "Rich, Structured Output",
    description:
      "Beyond simply extracting text, you can obtain data with meaning and structure, and data with rich information context.",
  },
  {
    icon: "🧩",
    title: "Layout Reconstruction",
    description:
      "Understanding the structure, such as headings, paragraphs, lists, and tables to restore the original document's layout.",
  },
  {
    icon: "⚡",
    title: "Fast & Light weight",
    description:
      "Instead of relying on a GPU, it leverages a rule-based heuristic approach to achieve high performance.",
  },
];

const badgeLinks: BadgeLinkItem[] = [
  {
    badge: "license",
    href: "https://github.com/opendataloader-project/opendataloader-pdf/blob/main/LICENSE",
    imageSrc: "https://img.shields.io/pypi/l/opendataloader-pdf.svg",
    alt: "License",
  },
  {
    badge: "java-version",
    href: "https://search.maven.org/artifact/org.opendataloader/opendataloader-pdf-core",
    imageSrc: "https://img.shields.io/badge/Java-11+-blue.svg",
    alt: "Java",
  },
  {
    badge: "python-version",
    href: "https://pypi.org/project/opendataloader-pdf/",
    imageSrc: "https://img.shields.io/badge/Python-3.9+-blue.svg",
    alt: "Python",
  },
  {
    badge: "maven-central",
    href: "https://search.maven.org/artifact/org.opendataloader/opendataloader-pdf-core",
    imageSrc:
      "https://img.shields.io/maven-central/v/org.opendataloader/opendataloader-pdf-core.svg",
    alt: "Maven Central",
  },
  {
    badge: "pypi-version",
    href: "https://pypi.org/project/opendataloader-pdf/",
    imageSrc: "https://img.shields.io/pypi/v/opendataloader-pdf.svg",
    alt: "PyPI version",
  },
  {
    badge: "npm-version",
    href: "https://www.npmjs.com/package/@opendataloader/pdf",
    imageSrc: "https://img.shields.io/npm/v/@opendataloader/pdf.svg",
    alt: "npm version",
  },
  {
    badge: "ghcr-version",
    href: "https://github.com/opendataloader-project/opendataloader-pdf/pkgs/container/opendataloader-pdf-cli",
    imageSrc:
      "https://ghcr-badge.egpl.dev/opendataloader-project/opendataloader-pdf-cli/latest_tag?trim=major&label=docker-image",
    alt: "GHCR Version",
  },
  {
    badge: "codecov",
    href: "https://app.codecov.io/gh/opendataloader-project/opendataloader-pdf",
    imageSrc:
      "https://codecov.io/gh/opendataloader-project/opendataloader-pdf/branch/main/graph/badge.svg",
    alt: "Coverage",
  },
  {
    badge: "cla-assistant",
    href: "https://cla-assistant.io/opendataloader-project/opendataloader-pdf",
    imageSrc:
      "https://cla-assistant.io/readme/badge/opendataloader-project/opendataloader-pdf",
    alt: "CLA assistant",
  },
];

const FeatureCarousel = () => (
  <div className="w-full max-w-4xl mx-auto p-10">
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <CarouselContent>
        {features.map((feature) => (
          <CarouselItem
            key={feature.title}
            className="md:basis-1/2 lg:basis-1/3"
          >
            <Card className="mx-1 h-full">
              <CardHeader className="h-full space-y-4">
                <span aria-hidden className="text-3xl">
                  {feature.icon}
                </span>
                <div className="space-y-2">
                  <CardTitle className="text-lg font-semibold">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed text-secondary-foreground">
                    {feature.description}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </div>
);

const BadgeGallery = () => (
  <div className="flex flex-wrap gap-2 justify-center">
    {badgeLinks.map((badge) => (
      <Link
        key={badge.badge}
        href={badge.href}
        prefetch={false}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackBadgeClick(badge.badge, "home-about")}
      >
        <img src={badge.imageSrc} alt={badge.alt} />
      </Link>
    ))}
  </div>
);

export default function About() {
  return (
    <Section
      id="about"
      title="About"
      subtitle="It reconstructs document layout (headings, lists, tables, and reading order) so the content is easier to chunk, index, and query. Powered by fast, heuristic, rule-based inference, it runs entirely on your local machine and delivers high-throughput processing for large document sets. AI-safety is enabled by default and automatically filters likely prompt-injection content embedded in PDFs to reduce downstream risk."
    >
      <BadgeGallery />
      <FeatureCarousel />
    </Section>
  );
}
