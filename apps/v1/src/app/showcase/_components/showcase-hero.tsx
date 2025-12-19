"use client";

import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { HeroSection } from "@/components/features/layout/hero-section";
import { ShowcaseCtaButtons } from "@/app/showcase/showcase-cta";

export function ShowcaseHero() {
  return (
    <HeroSection
      media={
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
      }
    >
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
            <span className="text-sm text-muted-foreground">Powered by</span>
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
          Data Loader Studio is a commercial product developed by HANCOM using
          OpenDataLoader PDF, pairing the extraction engine with an
          operator-ready workspace.
        </p>
      </div>
      <ShowcaseCtaButtons />
    </HeroSection>
  );
}
