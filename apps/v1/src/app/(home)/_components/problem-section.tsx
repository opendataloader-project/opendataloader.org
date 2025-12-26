import { AlertTriangle, Cloud, FileText, MapPin, Table2 } from "lucide-react";

import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { LazyVideo } from "@/components/ui/lazy-video";

const problemCards = [
  {
    icon: FileText,
    title: "Scrambled Reading Order",
    description:
      "Multi-column layouts read left-to-right across the page, mixing content from different columns. Your LLM receives jumbled text that makes no sense.",
  },
  {
    icon: Table2,
    title: "Lost Table Structure",
    description:
      "Tables become walls of unformatted text. Row and column relationships disappear, making financial data and specifications unusable.",
  },
  {
    icon: MapPin,
    title: "No Source Coordinates",
    description:
      "No way to cite where information came from or highlight the original PDF location. Users can't verify your AI's answers.",
  },
  {
    icon: Cloud,
    title: "Privacy & Cost Trade-offs",
    description:
      "Cloud APIs leak sensitive data (HIPAA/SOC2 violations). Commercial services charge $0.01-0.10 per page at scale.",
  },
];

export default function ProblemSection() {
  return (
    <section
      id="problem"
      className="relative overflow-hidden bg-slate-50 py-20 dark:bg-slate-900"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-50" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center">
          {/* Section label */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-sm font-medium text-rose-700 dark:border-rose-800/50 dark:bg-rose-950/50 dark:text-rose-300">
            <AlertTriangle className="h-3.5 w-3.5" />
            The Problem
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl dark:text-white">
            PDFs Break RAG Pipelines
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-lg text-slate-600 dark:text-slate-300">
            Most PDF parsers weren&apos;t designed for LLMs. The parsing tool
            you choose determines 90% of your RAG pipeline&apos;s accuracy.
          </p>
        </AnimateOnScroll>

        {/* Key Message Callout - More distinctive */}
        <AnimateOnScroll className="mx-auto mb-16 mt-10 max-w-3xl">
          <div className="relative rounded-2xl border border-amber-200/50 bg-gradient-to-br from-amber-50 to-orange-50/50 p-6 dark:border-amber-800/30 dark:from-amber-950/30 dark:to-orange-950/20">
            <div className="absolute -left-3 top-6 h-12 w-1 rounded-full bg-gradient-to-b from-amber-400 to-orange-500" />
            <p className="text-lg font-medium italic text-amber-900 dark:text-amber-100">
              &quot;If the data isn&apos;t parsed properly, your RAG system will
              never retrieve accurate answers. Garbage in = garbage out.&quot;
            </p>
          </div>
        </AnimateOnScroll>

        {/* Problem Cards Grid - Horizontal cards */}
        <div className="grid gap-4 md:grid-cols-2">
          {problemCards.map((card, index) => (
            <AnimateOnScroll key={card.title} delay={30 * index}>
              <div className="group flex h-full gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-slate-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-rose-100 to-rose-50 ring-1 ring-rose-200/50 dark:from-rose-900/30 dark:to-rose-800/20 dark:ring-rose-800/30">
                  <card.icon className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {card.description}
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Problem/Solution Comparison Video with frame */}
        <AnimateOnScroll className="mt-16">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl bg-gradient-to-b from-slate-200 to-slate-100 p-1 shadow-xl ring-1 ring-slate-900/5 dark:from-slate-700 dark:to-slate-800 dark:ring-white/5">
              <LazyVideo
                src="/figures/problem-solution.mp4"
                poster="/figures/problem-solution-poster.webp"
                className="w-full rounded-xl"
              />
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
