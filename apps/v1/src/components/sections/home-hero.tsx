"use client";

import { motion } from "framer-motion";
import { DoorOpen, Shield, Zap } from "lucide-react";

import { GitHubIcon } from "@/components/icons/github";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/tracking";
import Link from "next/link";

export default function HomeHero() {
  return (
    <section id="top" className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mt-10 flex items-center justify-center gap-3 text-xs text-muted-foreground">
            <Badge
              variant="outline"
              className="gap-2 px-3 py-1 text-muted-foreground"
            >
              <Shield className="h-3.5 w-3.5" /> Safe
            </Badge>
            <Badge
              variant="outline"
              className="gap-2 px-3 py-1 text-muted-foreground"
            >
              <DoorOpen className="h-3.5 w-3.5" /> Open
            </Badge>
            <Badge
              variant="outline"
              className="gap-2 px-3 py-1 text-muted-foreground"
            >
              <Zap className="h-3.5 w-3.5" /> High-Performance
            </Badge>
          </div>
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-5xl">
            OpenDataLoader {"  "}
            <span className="bg-linear-to-r from-red-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              PDF for AI
            </span>
          </h1>
          <p className="mt-8 max-w-7xl text-lg text-neutral-700 dark:text-neutral-300">
            OpenDataLoader-PDF safely and accurately converts PDFs to JSON,
            Markdown, or HTML.
          </p>
          <p className="max-w-7xl text-lg text-neutral-700 dark:text-neutral-300">
            Easily feed them into AI stacks like LLM, vector search, and RAG!
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg" className="rounded-2xl">
              <Link
                href="/docs"
                onClick={() => track("nav_get_started", { from: "hero" })}
              >
                Get Started
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-2xl">
              <Link
                href="https://github.com/opendataloader-project/opendataloader-pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("nav_github", { from: "hero" })}
              >
                <GitHubIcon className="h-4 w-4" /> GitHub
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
