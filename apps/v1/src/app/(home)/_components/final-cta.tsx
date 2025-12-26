"use client";

import Link from "next/link";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import {
  ArrowRight,
  BookOpen,
  MessageSquare,
  Rocket,
  Star,
  Terminal,
} from "lucide-react";

import { trackNavigation } from "@/lib/tracking";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/ui/icons/github";

const installCommand = "pip install -U opendataloader-pdf";

export default function FinalCTA() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="pointer-events-none absolute -left-40 -top-40 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center">
          {/* Section label */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-300">
            <Rocket className="h-4 w-4" />
            Get Started in Seconds
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Ready to Parse PDFs
            <br />
            <span className="text-gradient-brand">the Right Way?</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
            One command to get started. No API keys, no cloud, no hassle.
          </p>

          {/* Install Command - Enhanced terminal style */}
          <div className="mx-auto mt-10 max-w-lg">
            <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800/80 shadow-2xl backdrop-blur-sm">
              {/* Terminal header */}
              <div className="flex items-center gap-2 border-b border-slate-700 bg-slate-900/50 px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>
                <span className="ml-2 flex items-center gap-1.5 text-xs text-slate-400">
                  <Terminal className="h-3 w-3" />
                  terminal
                </span>
              </div>
              <div className="[&_pre]:!m-0 [&_pre]:!rounded-none [&_pre]:!border-0">
                <DynamicCodeBlock lang="bash" code={installCommand} />
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="group h-12 rounded-full bg-white px-10 text-base font-semibold text-slate-900 shadow-lg shadow-white/10 transition-all hover:bg-slate-100 hover:shadow-xl"
            >
              <Link
                href="/docs"
                onClick={() => trackNavigation("docs", "home-cta")}
              >
                Read the Docs
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-slate-500 bg-transparent px-10 text-base font-medium text-white backdrop-blur-sm transition-all hover:border-slate-400 hover:bg-white/10"
            >
              <Link
                href="https://github.com/opendataloader-project/opendataloader-pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackNavigation("github", "home-cta")}
              >
                <GitHubIcon className="mr-2 h-5 w-5" />
                View on GitHub
              </Link>
            </Button>
          </div>

          {/* Footer Links */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-slate-400">
            <Link
              href="/docs"
              className="flex items-center gap-2 text-sm transition-colors hover:text-white"
            >
              <BookOpen className="h-4 w-4" />
              <span>Documentation</span>
            </Link>
            <Link
              href="https://github.com/opendataloader-project/opendataloader-pdf/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm transition-colors hover:text-white"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Discussions</span>
            </Link>
            <Link
              href="https://github.com/opendataloader-project/opendataloader-pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm transition-colors hover:text-white"
            >
              <Star className="h-4 w-4" />
              <span>Star on GitHub</span>
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
