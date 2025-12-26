"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpDown,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Trophy,
} from "lucide-react";

import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const benchmarkData = [
  {
    engine: "opendataloader",
    speed: 0.05,
    readingOrder: 0.91,
    table: 0.49,
    heading: 0.65,
  },
  {
    engine: "docling",
    speed: 0.73,
    readingOrder: 0.9,
    table: 0.89,
    heading: 0.8,
  },
  {
    engine: "pymupdf4llm",
    speed: 0.09,
    readingOrder: 0.89,
    table: 0.4,
    heading: 0.41,
  },
  {
    engine: "markitdown",
    speed: 0.04,
    readingOrder: 0.88,
    table: 0,
    heading: 0,
  },
];

type SortKey = "speed" | "readingOrder" | "table" | "heading";
type SortDirection = "asc" | "desc";

// Column definitions for sortable headers
const columns: {
  key: SortKey;
  label: string;
  color: string;
  inverted?: boolean;
}[] = [
  {
    key: "speed",
    label: "Speed (s/page)",
    color: "bg-cyan-400",
    inverted: true,
  },
  { key: "readingOrder", label: "Reading Order", color: "bg-blue-400" },
  { key: "table", label: "Table", color: "bg-orange-400" },
  { key: "heading", label: "Heading", color: "bg-green-400" },
];

function SortIcon({
  sortKey,
  currentSort,
  direction,
}: {
  sortKey: SortKey;
  currentSort: SortKey | null;
  direction: SortDirection;
}) {
  if (currentSort !== sortKey) {
    return <ArrowUpDown className="ml-1 inline h-3 w-3 opacity-50" />;
  }
  return direction === "asc" ? (
    <ChevronUp className="ml-1 inline h-3 w-3" />
  ) : (
    <ChevronDown className="ml-1 inline h-3 w-3" />
  );
}

// Mini bar component for benchmark table
function MiniBar({
  value,
  max,
  color,
  inverted = false,
  label,
}: {
  value: number;
  max: number;
  color: string;
  inverted?: boolean;
  label: string;
}) {
  // For inverted (speed), lower is better so we invert the percentage
  const percentage = inverted
    ? ((max - value) / max) * 100
    : (value / max) * 100;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="mx-auto mt-1 h-3 w-20 cursor-pointer rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className={`h-3 rounded-full ${color}`}
            style={{ width: `${Math.max(percentage, 2)}%` }}
          />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <span>
          {label}: {value.toFixed(2)}
        </span>
      </TooltipContent>
    </Tooltip>
  );
}

const useCaseRecommendations = [
  {
    useCase: "Best overall balance",
    recommended: "opendataloader",
    reason: "Fast with highest reading order accuracy",
  },
  {
    useCase: "Maximum accuracy",
    recommended: "docling",
    reason: "Highest scores for tables and headings, but significantly slower",
  },
  {
    useCase: "PyMuPDF ecosystem",
    recommended: "pymupdf4llm",
    reason: "Good balance if already using PyMuPDF",
  },
  {
    useCase: "Speed-critical pipelines",
    recommended: "markitdown",
    reason: "Fastest, but no table/heading extraction",
  },
];

export default function WhyOpenDataLoader() {
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const sortedData = useMemo(() => {
    if (!sortKey) return benchmarkData;

    return [...benchmarkData].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      const isInverted = sortKey === "speed";
      const multiplier = sortDirection === "asc" ? 1 : -1;
      const invertMultiplier = isInverted ? -1 : 1;
      return (aVal - bVal) * multiplier * invertMultiplier;
    });
  }, [sortKey, sortDirection]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("desc");
    }
  };

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
              Built specifically for RAG pipelines. Highest reading order
              accuracy, fast processing, and bounding boxes for every element —
              all running <strong>100% locally</strong> on your CPU.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Benchmark Comparison - Redesigned */}
        <AnimateOnScroll className="mt-16">
          <h3 className="mb-8 text-center text-xl font-semibold text-slate-900 dark:text-white">
            Benchmark Comparison
          </h3>

          {/* Enhanced Benchmark Table */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800/50">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
                    <th className="w-1/5 px-5 py-4 text-left font-semibold text-slate-900 dark:text-white">
                      Engine
                    </th>
                    {columns.map((col) => (
                      <th
                        key={col.key}
                        className="w-1/5 cursor-pointer select-none px-5 py-4 text-center font-semibold text-slate-900 transition-colors hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"
                        onClick={() => handleSort(col.key)}
                      >
                        <span className="inline-flex items-center gap-1">
                          {col.label}
                          <SortIcon
                            sortKey={col.key}
                            currentSort={sortKey}
                            direction={sortDirection}
                          />
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {sortedData.map((row) => (
                    <tr
                      key={row.engine}
                      className={`transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 ${
                        row.engine === "opendataloader"
                          ? "bg-cyan-50/50 dark:bg-cyan-950/20"
                          : ""
                      }`}
                    >
                      <td className="w-1/5 px-5 py-4">
                        <span
                          className={`font-medium ${
                            row.engine === "opendataloader"
                              ? "text-cyan-700 dark:text-cyan-400"
                              : "text-slate-900 dark:text-white"
                          }`}
                        >
                          {row.engine}
                        </span>
                      </td>
                      {columns.map((col) => (
                        <td key={col.key} className="w-1/5 px-5 py-4">
                          <MiniBar
                            value={row[col.key]}
                            max={col.key === "speed" ? 0.8 : 1}
                            color={col.color}
                            inverted={col.inverted}
                            label={col.label}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-slate-200 bg-slate-50 px-5 py-3 dark:border-slate-700 dark:bg-slate-800">
              <p className="text-center text-xs text-slate-500 dark:text-slate-400">
                Scores normalized to [0,1]. Higher is better for accuracy; lower
                for speed.
              </p>
            </div>
          </div>

          {/* When to Use Each - Redesigned as cards */}
          <div className="mt-16">
            <h3 className="mb-8 text-center text-xl font-semibold text-slate-900 dark:text-white">
              When to Use Each Engine
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {useCaseRecommendations.map((row) => (
                <div
                  key={row.useCase}
                  className={`rounded-xl border p-5 transition-all hover:shadow-md ${
                    row.recommended === "opendataloader"
                      ? "border-cyan-200 bg-gradient-to-br from-cyan-50 to-sky-50/30 dark:border-cyan-800/50 dark:from-cyan-950/30 dark:to-sky-950/10"
                      : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800/50"
                  }`}
                >
                  <div className="mb-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                    {row.useCase}
                  </div>
                  <div
                    className={`text-lg font-semibold ${
                      row.recommended === "opendataloader"
                        ? "text-cyan-700 dark:text-cyan-400"
                        : "text-slate-900 dark:text-white"
                    }`}
                  >
                    {row.recommended}
                  </div>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    {row.reason}
                  </p>
                </div>
              ))}
            </div>
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
