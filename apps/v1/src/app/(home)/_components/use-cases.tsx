import { Accessibility, Bot, Briefcase, GraduationCap } from "lucide-react";

import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

const useCases = [
  {
    icon: Bot,
    industry: "AI/ML",
    title: "RAG Pipeline Integration",
    description:
      "Official LangChain integration. Structured JSON with bounding boxes ready for chunking, embedding, and citations.",
    color: "amber",
  },
  {
    icon: GraduationCap,
    industry: "Research",
    title: "Academic Paper Ingestion",
    description:
      "Build knowledge bases from two-column papers. XY-Cut++ handles multi-column layouts correctly.",
    color: "cyan",
  },
  {
    icon: Accessibility,
    industry: "Compliance",
    title: "Tagged PDF / Accessibility",
    description:
      "EAA 2025 ready. Extract semantic structure from tagged PDFs — headings, lists, tables preserved.",
    color: "violet",
  },
];

const colorClasses = {
  amber: {
    badge:
      "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800/50 dark:bg-amber-950/50 dark:text-amber-300",
    icon: "from-amber-100 to-amber-50 ring-amber-200/50 dark:from-amber-900/30 dark:to-amber-800/20 dark:ring-amber-800/30",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  cyan: {
    badge:
      "border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-800/50 dark:bg-cyan-950/50 dark:text-cyan-300",
    icon: "from-cyan-100 to-cyan-50 ring-cyan-200/50 dark:from-cyan-900/30 dark:to-cyan-800/20 dark:ring-cyan-800/30",
    iconColor: "text-cyan-600 dark:text-cyan-400",
  },
  violet: {
    badge:
      "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800/50 dark:bg-violet-950/50 dark:text-violet-300",
    icon: "from-violet-100 to-violet-50 ring-violet-200/50 dark:from-violet-900/30 dark:to-violet-800/20 dark:ring-violet-800/30",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
};

export default function UseCases() {
  return (
    <section
      id="use-cases"
      className="relative bg-white py-20 dark:bg-slate-950"
    >
      {/* Section divider */}
      <div className="section-divider absolute inset-x-0 top-0" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center">
          {/* Section label */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-sm font-medium text-rose-700 dark:border-rose-800/50 dark:bg-rose-950/50 dark:text-rose-300">
            <Briefcase className="h-3.5 w-3.5" />
            Use Cases
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl dark:text-white">
            Built for Production RAG Pipelines
          </h2>
        </AnimateOnScroll>

        {/* Use Case Cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {useCases.map((useCase, index) => {
            const colors =
              colorClasses[useCase.color as keyof typeof colorClasses];
            return (
              <AnimateOnScroll key={useCase.title} delay={30 * index}>
                <div className="group relative h-full rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600">
                  {/* Industry badge */}
                  <span
                    className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${colors.badge}`}
                  >
                    {useCase.industry}
                  </span>

                  {/* Icon */}
                  <div
                    className={`mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ring-1 ${colors.icon}`}
                  >
                    <useCase.icon className={`h-6 w-6 ${colors.iconColor}`} />
                  </div>

                  {/* Content */}
                  <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                    {useCase.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {useCase.description}
                  </p>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
