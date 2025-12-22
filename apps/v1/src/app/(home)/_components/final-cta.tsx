"use client";

import Link from "next/link";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { BookOpen, MessageSquare, Star } from "lucide-react";

import { trackNavigation } from "@/lib/tracking";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/ui/icons/github";

const installCommand = "pip install opendataloader-pdf";

export default function FinalCTA() {
  return (
    <section
      id="cta"
      className="bg-gradient-to-br from-slate-50 via-gray-100 to-slate-100 py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Ready to Parse PDFs the Right Way?
          </h2>

          {/* Install Command */}
          <div className="mx-auto mt-8 max-w-md text-left">
            <DynamicCodeBlock lang="bash" code={installCommand} />
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link
                href="/docs"
                onClick={() => trackNavigation("docs", "home-cta")}
              >
                Read the Docs
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link
                href="https://github.com/opendataloader-project/opendataloader-pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackNavigation("github", "home-cta")}
              >
                <GitHubIcon className="mr-2 h-4 w-4" />
                View on GitHub
              </Link>
            </Button>
          </div>

          {/* Footer Links */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-gray-600">
            <Link
              href="/docs"
              className="flex items-center gap-1.5 hover:text-gray-900"
            >
              <BookOpen className="h-4 w-4" />
              <span>Documentation</span>
            </Link>
            <Link
              href="https://github.com/opendataloader-project/opendataloader-pdf/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-gray-900"
            >
              <MessageSquare className="h-4 w-4" />
              <span>GitHub Discussions</span>
            </Link>
            <Link
              href="https://github.com/opendataloader-project/opendataloader-pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-gray-900"
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
