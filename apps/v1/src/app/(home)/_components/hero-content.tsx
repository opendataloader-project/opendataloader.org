"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { trackNavigation } from "@/lib/tracking";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/ui/icons/github";

export default function HeroContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      {/* Eyebrow Badges */}
      <div className="flex items-center justify-center gap-3">
        <Badge className="gap-2 bg-yellow-100 px-3 py-1 text-yellow-700 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-300">
          Fast
        </Badge>
        <Badge className="gap-2 bg-blue-100 px-3 py-1 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300">
          Accurate
        </Badge>
        <Badge className="gap-2 bg-green-100 px-3 py-1 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300">
          100% Local
        </Badge>
      </div>

      {/* Headline */}
      <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
        Best Open-Source PDF Parser
        <br />
        <span className="text-blue-600 dark:text-blue-400">
          for RAG & LLM Pipelines
        </span>
      </h1>

      {/* Subheadline */}
      <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600 sm:text-xl dark:text-gray-300">
        No GPU required, 100% local processing with bounding boxes.
        <br />
        Convert PDFs to LLM-ready Markdown and JSON with accurate reading order
        and table extraction.
      </p>

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
        <video
          src="/figures/hero.mp4"
          poster="/figures/hero-poster.webp"
          autoPlay
          loop
          muted
          playsInline
          className="rounded-xl shadow-lg"
        />
      </div>
    </motion.div>
  );
}
