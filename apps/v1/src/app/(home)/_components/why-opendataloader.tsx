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

const benchmarkData = [
  {
    engine: "opendataloader",
    mode: "local" as const,
    speed: 0.05,
    readingOrder: 0.91,
    table: 0.49,
    heading: 0.65,
  },
  {
    engine: "opendataloader",
    mode: "hybrid" as const,
    speed: 0.45,
    readingOrder: 0.93,
    table: 0.93,
    heading: 0.78,
  },
  {
    engine: "docling",
    mode: null,
    speed: 0.73,
    readingOrder: 0.9,
    table: 0.89,
    heading: 0.8,
  },
  {
    engine: "pymupdf4llm",
    mode: null,
    speed: 0.09,
    readingOrder: 0.89,
    table: 0.4,
    heading: 0.41,
  },
  {
    engine: "markitdown",
    mode: null,
    speed: 0.04,
    readingOrder: 0.88,
    table: 0,
    heading: 0,
  },
];

type SortKey = "readingOrder" | "table" | "heading" | "speed";
type SortDirection = "asc" | "desc";

// Column definitions for sortable headers
const columns: {
  key: SortKey;
  label: string;
  color: string;
}[] = [
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
}: {
  value: number;
  max: number;
  color: string;
}) {
  const percentage = (value / max) * 100;
  const displayValue = Math.round(value * 100);
  const isSmall = percentage < 25;
  const barWidth = Math.max(percentage, 8);

  return (
    <div className="relative mx-auto h-6 w-32 rounded-md bg-gray-200 dark:bg-gray-700">
      <div
        className={`absolute inset-y-0 left-0 flex items-center justify-end rounded-md ${color}`}
        style={{ width: `${barWidth}%` }}
      >
        {!isSmall && (
          <span className="pr-2 text-xs font-semibold text-white drop-shadow-sm">
            {displayValue}%
          </span>
        )}
      </div>
      {isSmall && (
        <span
          className="absolute top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-700 dark:text-slate-300"
          style={{ left: `calc(${barWidth}% + 4px)` }}
        >
          {displayValue}%
        </span>
      )}
    </div>
  );
}

// Speed bar component (pages/sec - higher is better)
function SpeedBar({ speed }: { speed: number }) {
  const pagesPerSec = 1 / speed;
  const maxPagesPerSec = 25; // 0.04s = 25 pages/sec
  const percentage = (pagesPerSec / maxPagesPerSec) * 100;
  const barWidth = Math.max(percentage, 8);
  const isSmall = percentage < 25;

  return (
    <div className="relative mx-auto h-6 w-32 rounded-md bg-gray-200 dark:bg-gray-700">
      <div
        className="absolute inset-y-0 left-0 flex items-center justify-end rounded-md bg-cyan-400"
        style={{ width: `${barWidth}%` }}
      >
        {!isSmall && (
          <span className="pr-2 text-xs font-semibold text-white drop-shadow-sm">
            {pagesPerSec.toFixed(0)}
          </span>
        )}
      </div>
      {isSmall && (
        <span
          className="absolute top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-700 dark:text-slate-300"
          style={{ left: `calc(${barWidth}% + 4px)` }}
        >
          {pagesPerSec.toFixed(0)}
        </span>
      )}
    </div>
  );
}

export default function WhyOpenDataLoader() {
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const sortedData = useMemo(() => {
    if (!sortKey) {
      // Default: sort by total score (readingOrder + table + heading) descending
      return [...benchmarkData].sort((a, b) => {
        const aTotal = a.readingOrder + a.table + a.heading;
        const bTotal = b.readingOrder + b.table + b.heading;
        return bTotal - aTotal;
      });
    }

    return [...benchmarkData].sort((a, b) => {
      let aVal: number;
      let bVal: number;

      if (sortKey === "speed") {
        // Convert to pages/sec (higher is better)
        aVal = 1 / a.speed;
        bVal = 1 / b.speed;
      } else {
        aVal = a[sortKey];
        bVal = b[sortKey];
      }

      const multiplier = sortDirection === "asc" ? 1 : -1;
      return (aVal - bVal) * multiplier;
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
              Built specifically for RAG pipelines.{" "}
              <strong>91% accuracy</strong> in local mode at 0.05s/page, or{" "}
              <strong>93% with hybrid mode</strong> for complex documents.
              Bounding boxes for every element — 100% local by default.
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
                    <th
                      className="w-1/5 cursor-pointer select-none px-5 py-4 text-center font-semibold text-slate-900 transition-colors hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"
                      onClick={() => handleSort("speed")}
                    >
                      <span className="inline-flex items-center gap-1">
                        Pages/sec
                        <SortIcon
                          sortKey="speed"
                          currentSort={sortKey}
                          direction={sortDirection}
                        />
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {sortedData.map((row) => {
                    const isLocal =
                      row.engine === "opendataloader" && row.mode === "local";
                    const isHybrid =
                      row.engine === "opendataloader" && row.mode === "hybrid";

                    let rowBgClass = "";
                    let textColorClass = "text-slate-900 dark:text-white";

                    if (isLocal) {
                      rowBgClass = "bg-cyan-50/50 dark:bg-cyan-950/20";
                      textColorClass = "text-cyan-700 dark:text-cyan-400";
                    } else if (isHybrid) {
                      rowBgClass = "bg-amber-50/50 dark:bg-amber-950/20";
                      textColorClass = "text-amber-700 dark:text-amber-400";
                    }

                    return (
                      <tr
                        key={`${row.engine}-${row.mode}`}
                        className={`transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 ${rowBgClass}`}
                      >
                        <td className="w-1/5 px-5 py-4">
                          <span className={`font-medium ${textColorClass}`}>
                            {row.engine}
                          </span>
                          {isLocal && (
                            <span className="ml-1.5 rounded bg-cyan-100 px-1.5 py-0.5 text-[10px] font-medium text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300">
                              local
                            </span>
                          )}
                          {isHybrid && (
                            <span className="ml-1.5 rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-700 dark:bg-amber-900/50 dark:text-amber-300">
                              hybrid
                            </span>
                          )}
                        </td>
                        {columns.map((col) => (
                          <td key={col.key} className="w-1/5 px-5 py-4">
                            <MiniBar
                              value={row[col.key]}
                              max={1}
                              color={col.color}
                            />
                          </td>
                        ))}
                        <td className="w-1/5 px-5 py-4">
                          <SpeedBar speed={row.speed} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="border-t border-slate-200 bg-slate-50 px-5 py-3 dark:border-slate-700 dark:bg-slate-800">
              <p className="text-center text-xs text-slate-500 dark:text-slate-400">
                All metrics: higher is better. Speed shown in pages/second.
              </p>
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
