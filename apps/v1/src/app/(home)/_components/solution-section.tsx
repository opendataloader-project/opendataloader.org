import Link from "next/link";
import {
  ArrowRight,
  Lock,
  MapPin,
  Shield,
  Sparkles,
  Table2,
  Target,
} from "lucide-react";

import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

const features = [
  {
    icon: Target,
    title: "XY-Cut++ Reading Order",
    description:
      "Correctly reads multi-column layouts. Text flows in the order humans read it.",
    link: "/docs/reading-order",
    linkText: "How it works",
    color: "emerald",
  },
  {
    icon: Sparkles,
    title: "Hybrid OCR & AI",
    description:
      "Optional LLM enhancement for OCR and complex tables. 93% table accuracy when enabled.",
    link: "/docs/hybrid-mode",
    linkText: "Enable hybrid",
    color: "amber",
  },
  {
    icon: MapPin,
    title: "Bounding Boxes",
    description:
      "Every element includes [x1, y1, x2, y2] coordinates for precise citations.",
    link: "/docs/json-schema",
    linkText: "JSON schema",
    color: "violet",
  },
  {
    icon: Table2,
    title: "Table Extraction",
    description:
      "Detects borders and clusters text into rows/columns. Handles merged cells.",
    link: "/docs/json-schema#table",
    linkText: "Table schema",
    color: "rose",
  },
  {
    icon: Lock,
    title: "100% Local by Default",
    description:
      "No network calls required. Enable hybrid mode only when you need maximum accuracy.",
    link: "/docs/hybrid-mode",
    linkText: "Hybrid mode docs",
    color: "sky",
  },
  {
    icon: Shield,
    title: "AI Safety Built-in",
    description:
      "Filters hidden text, off-page content, and prompt injection attempts.",
    link: "/docs/ai-safety",
    linkText: "Safety docs",
    color: "cyan",
  },
];

const colorClasses = {
  cyan: {
    bg: "from-cyan-100 to-cyan-50 dark:from-cyan-900/30 dark:to-cyan-800/20",
    ring: "ring-cyan-200/50 dark:ring-cyan-800/30",
    icon: "text-cyan-600 dark:text-cyan-400",
    link: "text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300",
  },
  emerald: {
    bg: "from-emerald-100 to-emerald-50 dark:from-emerald-900/30 dark:to-emerald-800/20",
    ring: "ring-emerald-200/50 dark:ring-emerald-800/30",
    icon: "text-emerald-600 dark:text-emerald-400",
    link: "text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300",
  },
  violet: {
    bg: "from-violet-100 to-violet-50 dark:from-violet-900/30 dark:to-violet-800/20",
    ring: "ring-violet-200/50 dark:ring-violet-800/30",
    icon: "text-violet-600 dark:text-violet-400",
    link: "text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300",
  },
  amber: {
    bg: "from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-800/20",
    ring: "ring-amber-200/50 dark:ring-amber-800/30",
    icon: "text-amber-600 dark:text-amber-400",
    link: "text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300",
  },
  rose: {
    bg: "from-rose-100 to-rose-50 dark:from-rose-900/30 dark:to-rose-800/20",
    ring: "ring-rose-200/50 dark:ring-rose-800/30",
    icon: "text-rose-600 dark:text-rose-400",
    link: "text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300",
  },
  sky: {
    bg: "from-sky-100 to-sky-50 dark:from-sky-900/30 dark:to-sky-800/20",
    ring: "ring-sky-200/50 dark:ring-sky-800/30",
    icon: "text-sky-600 dark:text-sky-400",
    link: "text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300",
  },
};

export default function SolutionSection() {
  return (
    <section
      id="solution"
      className="relative bg-white py-20 dark:bg-slate-950"
    >
      {/* Section divider */}
      <div className="section-divider absolute inset-x-0 top-0" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center">
          {/* Section label */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 dark:border-emerald-800/50 dark:bg-emerald-950/50 dark:text-emerald-300">
            <Sparkles className="h-3.5 w-3.5" />
            The Solution
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl dark:text-white">
            Built for RAG, Not Just PDF Reading
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-lg text-slate-600 dark:text-slate-300">
            OpenDataLoader PDF delivers what LLM pipelines actually need.
          </p>
        </AnimateOnScroll>

        {/* Feature Cards Grid */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const colors =
              colorClasses[feature.color as keyof typeof colorClasses];
            return (
              <AnimateOnScroll key={feature.title} delay={30 * index}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600">
                  {/* Icon */}
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${colors.bg} ring-1 ${colors.ring}`}
                  >
                    <feature.icon className={`h-6 w-6 ${colors.icon}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>

                  {/* Link */}
                  {feature.link && feature.linkText && (
                    <Link
                      href={feature.link}
                      className={`mt-4 inline-flex items-center text-sm font-medium ${colors.link}`}
                    >
                      {feature.linkText}
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  )}
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
