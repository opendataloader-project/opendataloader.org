"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Copy, MessageSquare, Star } from "lucide-react";

import { trackNavigation } from "@/lib/tracking";
import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/ui/icons/github";

const installCommand = "pip install opendataloader-pdf";

export default function FinalCTA() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(installCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <section
      id="cta"
      className="bg-gradient-to-r from-blue-600 to-blue-800 py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Ready to Parse PDFs the Right Way?
          </h2>

          {/* Install Command */}
          <div className="mx-auto mt-8 max-w-md">
            <div className="flex items-center overflow-hidden rounded-lg bg-slate-900">
              <code className="flex-1 px-4 py-3 text-left text-gray-100">
                {installCommand}
              </code>
              <button
                onClick={handleCopy}
                className="flex h-full items-center gap-2 border-l border-slate-700 px-4 py-3 text-gray-400 transition-colors hover:bg-slate-800 hover:text-white"
                aria-label="Copy to clipboard"
              >
                <Copy className="h-4 w-4" />
                <span className="text-sm">{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-700 hover:bg-gray-100"
            >
              <Link
                href="/docs"
                onClick={() => trackNavigation("docs", "home-cta")}
              >
                Read the Docs
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:bg-white/10"
            >
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
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-white/80">
            <Link
              href="/docs"
              className="flex items-center gap-1.5 hover:text-white"
            >
              <BookOpen className="h-4 w-4" />
              <span>Documentation</span>
            </Link>
            <Link
              href="https://github.com/opendataloader-project/opendataloader-pdf/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white"
            >
              <MessageSquare className="h-4 w-4" />
              <span>GitHub Discussions</span>
            </Link>
            <Link
              href="https://github.com/opendataloader-project/opendataloader-pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white"
            >
              <Star className="h-4 w-4" />
              <span>Star on GitHub</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
