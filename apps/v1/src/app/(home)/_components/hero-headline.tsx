import { Shield, Target, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export default function HeroHeadline() {
  return (
    <div className="text-center">
      {/* Eyebrow Badges */}
      <div className="flex items-center justify-center gap-3">
        <Badge variant="secondary" className="gap-1.5">
          <Zap className="h-3.5 w-3.5" />
          Fast
        </Badge>
        <Badge variant="secondary" className="gap-1.5">
          <Target className="h-3.5 w-3.5" />
          Accurate
        </Badge>
        <Badge variant="secondary" className="gap-1.5">
          <Shield className="h-3.5 w-3.5" />
          100% Local
        </Badge>
      </div>

      {/* Headline - LCP element, rendered without JS */}
      <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
        Best Open-Source PDF Parser
        <br />{" "}
        <span className="bg-linear-to-r from-red-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
          for RAG &amp; LLM Pipelines
        </span>
      </h1>

      {/* Subheadline */}
      <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600 sm:text-xl dark:text-gray-300">
        No GPU required, 100% local processing with bounding boxes.
        <br />
        Convert PDFs to LLM-ready Markdown and JSON with accurate reading order
        and table extraction.
      </p>
    </div>
  );
}
