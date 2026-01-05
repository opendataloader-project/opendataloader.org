import { Sparkles, Target, Zap } from "lucide-react";

export default function HeroHeadline() {
  return (
    <div className="text-center">
      {/* Eyebrow Badges - Pill style with icons */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200 bg-cyan-50/80 px-3 py-1 text-xs font-medium text-cyan-700 backdrop-blur-sm dark:border-cyan-800/50 dark:bg-cyan-950/50 dark:text-cyan-300">
          <Zap className="h-3 w-3" />
          Lightning Fast
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1 text-xs font-medium text-emerald-700 backdrop-blur-sm dark:border-emerald-800/50 dark:bg-emerald-950/50 dark:text-emerald-300">
          <Target className="h-3 w-3" />
          93% Accuracy
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50/80 px-3 py-1 text-xs font-medium text-amber-700 backdrop-blur-sm dark:border-amber-800/50 dark:bg-amber-950/50 dark:text-amber-300">
          <Sparkles className="h-3 w-3" />
          Hybrid OCR & AI
        </span>
      </div>

      {/* Headline - LCP element, bold and impactful */}
      <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl dark:text-white">
        PDF Parsing
        <br />
        <span className="text-gradient-brand">Built for RAG</span>
      </h1>

      {/* Subheadline - Clear value prop with better hierarchy */}
      <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-slate-600 sm:text-xl dark:text-slate-300">
        Convert PDFs to LLM-ready Markdown and JSON with accurate reading order,
        table extraction, and bounding boxes for citations.
      </p>

      {/* Technical specs row */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          No GPU Required
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
          Open Source
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          Deterministic Output
        </span>
      </div>
    </div>
  );
}
