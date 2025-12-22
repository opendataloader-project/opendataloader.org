"use client";

import Link from "next/link";

import { trackNavigation } from "@/lib/tracking";
import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/ui/icons/github";
import { LazyVideo } from "@/components/ui/lazy-video";

export default function HeroContent() {
  return (
    <>
      {/* CTA Buttons */}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button asChild size="lg" className="rounded-lg px-6">
          <Link
            href="/docs/quick-start-python"
            onClick={() => trackNavigation("get_started", "home-hero")}
          >
            Get Started
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="rounded-lg px-6">
          <Link
            href="https://github.com/opendataloader-project/opendataloader-pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackNavigation("github", "home-hero")}
          >
            <GitHubIcon className="mr-2 h-5 w-5" />
            GitHub
          </Link>
        </Button>
      </div>

      {/* Hero Illustration */}
      <div className="mx-auto mt-12 max-w-2xl">
        <LazyVideo
          src="/figures/hero.mp4"
          poster="/figures/hero-poster.webp"
          className="rounded-xl shadow-lg"
          priority
        />
      </div>
    </>
  );
}
