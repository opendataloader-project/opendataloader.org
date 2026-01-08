"use client";

import Link from "next/link";
import { ArrowRight, BarChart3, Trophy } from "lucide-react";

import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

const benchmarkData = [
  {
    engine: "opendataloader",
    mode: "heuristic" as const,
    readingOrder: 0.91,
    table: 0.49,
    heading: 0.65,
  },
  {
    engine: "opendataloader",
    mode: "hybrid" as const,
    readingOrder: 0.93,
    table: 0.93,
    heading: 0.78,
  },
  {
    engine: "docling",
    mode: null,
    readingOrder: 0.9,
    table: 0.89,
    heading: 0.8,
  },
  {
    engine: "marker",
    mode: null,
    readingOrder: 0.89,
    table: 0.81,
    heading: 0.8,
  },
  {
    engine: "mineru",
    mode: null,
    readingOrder: 0.86,
    table: 0.87,
    heading: 0.74,
  },
  {
    engine: "pymupdf4llm",
    mode: null,
    readingOrder: 0.89,
    table: 0.4,
    heading: 0.41,
  },
  {
    engine: "markitdown",
    mode: null,
    readingOrder: 0.88,
    table: 0,
    heading: 0,
  },
];

// Bar variant types for different engine types
type BarVariant = "heuristic" | "hybrid" | "other";

// Color styles based on variant
function getBarStyle(variant: BarVariant) {
  switch (variant) {
    case "heuristic":
      return "bg-slate-400";
    case "hybrid":
      return "bg-gradient-to-r from-cyan-400/85 to-teal-500/85";
    case "other":
    default:
      return "bg-indigo-400";
  }
}

// Get bar variant for a row
function getBarVariant(row: (typeof benchmarkData)[0]): BarVariant {
  if (row.engine === "opendataloader" && row.mode === "heuristic")
    return "heuristic";
  if (row.engine === "opendataloader" && row.mode === "hybrid") return "hybrid";
  return "other";
}

// Get display name for engine
function getEngineName(row: (typeof benchmarkData)[0]): string {
  if (row.engine === "opendataloader") {
    return row.mode === "heuristic"
      ? "opendataloader (heuristic)"
      : "opendataloader (hybrid)";
  }
  return row.engine;
}

// Get text color class for engine
function getTextColorClass(variant: BarVariant): string {
  switch (variant) {
    case "heuristic":
      return "text-slate-600 dark:text-slate-400";
    case "hybrid":
      return "text-cyan-700 dark:text-cyan-400";
    default:
      return "text-slate-500 dark:text-slate-400";
  }
}

// Metric card data structure
interface MetricData {
  key: string;
  title: string;
  subtitle: string;
  getValue: (row: (typeof benchmarkData)[0]) => number;
}

const metricCards: MetricData[] = [
  {
    key: "average",
    title: "Average Score",
    subtitle: "(NID + TEDS + MHS) / 3",
    getValue: (row) => (row.readingOrder + row.table + row.heading) / 3,
  },
  {
    key: "readingOrder",
    title: "Reading Order (NID)",
    subtitle: "Text sequence accuracy",
    getValue: (row) => row.readingOrder,
  },
  {
    key: "table",
    title: "Table Score (TEDS)",
    subtitle: "Table extraction accuracy",
    getValue: (row) => row.table,
  },
  {
    key: "heading",
    title: "Heading Score (MHS)",
    subtitle: "Heading detection accuracy",
    getValue: (row) => row.heading,
  },
];

// Metric Card Component
function MetricCard({ metric }: { metric: MetricData }) {
  const maxValue = 1;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800/50">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          {metric.title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {metric.subtitle}
        </p>
      </div>

      <div className="space-y-2.5">
        {benchmarkData.map((row) => {
          const value = metric.getValue(row);
          const variant = getBarVariant(row);
          const percentage = (value / maxValue) * 100;
          const barWidth = Math.max(percentage, 5);
          const isSmall = percentage < 20;
          const displayValue = Math.round(value * 100);

          return (
            <div
              key={`${row.engine}-${row.mode}`}
              className="flex items-center gap-3"
            >
              <div className="w-40 shrink-0">
                <span
                  className={`block truncate text-xs font-medium ${getTextColorClass(variant)}`}
                  title={getEngineName(row)}
                >
                  {getEngineName(row)}
                </span>
              </div>
              <div className="relative h-7 flex-1 overflow-hidden rounded-md bg-slate-100 dark:bg-slate-700">
                <div
                  className={`absolute inset-y-0 left-0 flex items-center justify-end rounded-md pr-2 ${getBarStyle(variant)}`}
                  style={{ width: `${barWidth}%` }}
                >
                  {!isSmall && (
                    <span className="text-xs font-semibold text-white drop-shadow-sm">
                      {displayValue}%
                    </span>
                  )}
                </div>
                {isSmall && (
                  <span
                    className="absolute top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-600 dark:text-slate-300"
                    style={{ left: `calc(${barWidth}% + 6px)` }}
                  >
                    {displayValue}%
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-4 border-t border-slate-200 pt-3 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-sm bg-gradient-to-r from-cyan-400 to-teal-500" />
          <span>hybrid</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-sm bg-slate-400" />
          <span>heuristic</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-sm bg-indigo-400" />
          <span>others</span>
        </div>
      </div>
    </div>
  );
}


export default function WhyOpenDataLoader() {
  return (
    <section
      id="why-opendataloader"
      className="relative bg-white py-20 dark:bg-slate-950"
    >
      {/* Section divider */}
      <div className="section-divider absolute inset-x-0 top-0" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center">
          {/* Section label */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-sm font-medium text-violet-700 dark:border-violet-800/50 dark:bg-violet-950/50 dark:text-violet-300">
            <Trophy className="h-3.5 w-3.5" />
            Benchmarks
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl dark:text-white">
            Why OpenDataLoader PDF?
          </h2>
        </AnimateOnScroll>

        {/* TL;DR Box - Enhanced */}
        <AnimateOnScroll className="mx-auto mt-10 max-w-3xl">
          <div className="relative rounded-2xl border border-cyan-200/50 bg-gradient-to-br from-cyan-50 to-sky-50/50 p-6 dark:border-cyan-800/30 dark:from-cyan-950/30 dark:to-sky-950/20">
            <div className="absolute -left-3 top-6 h-12 w-1 rounded-full bg-gradient-to-b from-cyan-400 to-sky-500" />
            <p className="text-lg text-cyan-900 dark:text-cyan-100">
              Built specifically for RAG pipelines.{" "}
              <strong>91% accuracy</strong> in local mode at 0.05s/page, or{" "}
              <strong>93% with hybrid mode</strong> for complex documents.
              Bounding boxes for every element — 100% local by default.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Benchmark Comparison - 2x2 Card Grid */}
        <AnimateOnScroll className="mt-16">
          <h3 className="mb-8 text-center text-xl font-semibold text-slate-900 dark:text-white">
            Benchmark Comparison
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {metricCards.map((metric) => (
              <MetricCard key={metric.key} metric={metric} />
            ))}
          </div>
        </AnimateOnScroll>

        {/* Benchmark Link - Enhanced */}
        <AnimateOnScroll animation="fade-in" className="mt-12 text-center">
          <Link
            href="/docs/benchmark"
            className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-700"
          >
            <BarChart3 className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            See transparent benchmark methodology
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
