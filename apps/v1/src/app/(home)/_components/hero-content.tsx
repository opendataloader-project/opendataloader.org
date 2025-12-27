"use client";

import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

import { trackNavigation } from "@/lib/tracking";
import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/ui/icons/github";
import { LazyVideo } from "@/components/ui/lazy-video";

export default function HeroContent() {
  return (
    <>
      {/* CTA Buttons */}
      <div className="mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
        <Button
          asChild
          size="lg"
          className="group h-12 rounded-full bg-slate-900 has-[>svg]:px-6 text-base font-semibold shadow-lg shadow-slate-900/20 transition-all hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/25 dark:bg-white dark:text-slate-900 dark:shadow-white/10 dark:hover:bg-slate-100"
        >
          <Link
            href="/docs/quick-start-python"
            onClick={() => trackNavigation("get_started", "home-hero")}
          >
            Get Started
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="h-12 rounded-full border-slate-300 has-[>svg]:px-6 text-base font-medium backdrop-blur-sm transition-all hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:hover:border-slate-600 dark:hover:bg-slate-900"
        >
          <Link
            href="https://github.com/opendataloader-project/opendataloader-pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackNavigation("github", "home-hero")}
          >
            <GitHubIcon className="mr-2 h-5 w-5" />
            View on GitHub
          </Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="h-12 rounded-full border-slate-300 has-[>svg]:px-6 text-base font-medium backdrop-blur-sm transition-all hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:hover:border-slate-600 dark:hover:bg-slate-900"
        >
          <Link
            href="/demo/samples/01030000000000?view1=annot&view2=json"
            onClick={() => trackNavigation("demo", "home-hero")}
          >
            <Play className="mr-2 h-4 w-4" />
            Live Demo
          </Link>
        </Button>
      </div>

      {/* Hero Illustration */}
      <div className="mx-auto mt-16 max-w-3xl">
        <div className="rounded-2xl bg-gradient-to-b from-slate-200 to-slate-100 p-1 shadow-xl ring-1 ring-slate-900/5 dark:from-slate-700 dark:to-slate-800 dark:ring-white/5">
          <LazyVideo
            src="/figures/hero.mp4"
            poster="/figures/hero-poster.webp"
            className="w-full rounded-xl"
            priority
          />
        </div>
      </div>
    </>
  );
}
