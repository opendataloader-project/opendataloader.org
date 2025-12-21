"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpDown,
  BarChart3,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  FileText,
  Lock,
  MapPin,
  Shield,
  Target,
  Zap,
} from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const metrics = [
  {
    icon: Zap,
    label: "Processing Speed",
    value: "Fast",
    unit: "",
    description:
      "Rule-based heuristics deliver high throughput without GPU overhead",
  },
  {
    icon: Target,
    label: "Extraction Accuracy",
    value: "Accurate",
    unit: "",
    description: "Reading order, tables, and headings extracted correctly",
  },
  {
    icon: Lock,
    label: "Data Privacy",
    value: "100% Local",
    unit: "",
    description: "Zero network calls — documents never leave your machine",
  },
];

const features = [
  {
    icon: MapPin,
    title: "Bounding Boxes",
    description:
      "Every element includes [x1, y1, x2, y2] coordinates for precise citations",
  },
  {
    icon: CheckCircle,
    title: "Deterministic Output",
    description:
      "Same input always produces same output — essential for testing and audits",
  },
  {
    icon: Shield,
    title: "AI Safety Built-in",
    description:
      "Auto-filters hidden text, off-page content, and prompt injection attempts",
  },
  {
    icon: FileText,
    title: "Multiple Formats",
    description: "JSON, Markdown, HTML output — ready for any LLM pipeline",
  },
];

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
      // For speed, lower is better, so we invert the sort
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
      setSortDirection("desc"); // Default to desc (best first)
    }
  };

  return (
    <section
      id="why-opendataloader"
      className="bg-gray-50 py-16 dark:bg-gray-900"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
            Why OpenDataLoader PDF?
          </h2>
        </motion.div>

        {/* TL;DR Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-8 max-w-3xl rounded-lg border border-blue-200 bg-blue-50 p-4 text-center dark:border-blue-800 dark:bg-blue-900/20"
        >
          <p className="text-blue-800 dark:text-blue-200">
            OpenDataLoader PDF is built specifically for RAG pipelines. It
            delivers high reading order accuracy, fast processing speed, and
            bounding boxes for every element — all running 100% locally on your
            CPU with no GPU required.
          </p>
        </motion.div>

        {/* Key Metrics Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 2) }}
            >
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <metric.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {metric.value}
                    <span className="ml-1 text-lg font-normal text-gray-500 dark:text-gray-400">
                      {metric.unit}
                    </span>
                  </div>
                  <CardTitle className="text-base">{metric.label}</CardTitle>
                  <CardDescription className="text-sm">
                    {metric.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Feature Highlight Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 5) }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                    <feature.icon className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Benchmark Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-12"
        >
          <h3 className="mb-6 text-center text-xl font-semibold text-gray-900 dark:text-white">
            Benchmark Comparison
          </h3>

          {/* Benchmark Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="w-1/5 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                    Engine
                  </th>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className="w-1/5 cursor-pointer select-none px-4 py-3 text-center font-semibold text-gray-900 transition-colors hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                      onClick={() => handleSort(col.key)}
                    >
                      {col.label}
                      <SortIcon
                        sortKey={col.key}
                        currentSort={sortKey}
                        direction={sortDirection}
                      />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {sortedData.map((row) => (
                  <tr
                    key={row.engine}
                    className="bg-white transition-colors hover:bg-gray-50 dark:bg-gray-950 dark:hover:bg-gray-900"
                  >
                    <td className="w-1/5 px-4 py-3 font-medium text-gray-900 dark:text-white">
                      {row.engine}
                    </td>
                    {columns.map((col) => (
                      <td key={col.key} className="w-1/5 px-4 py-3">
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

          <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
            Scores normalized to [0,1]. Higher is better for accuracy; lower for
            speed.
          </p>

          {/* When to Use Each */}
          <div className="mt-12 overflow-x-auto">
            <h3 className="mb-6 text-center text-xl font-semibold text-gray-900 dark:text-white">
              When to Use Each Engine
            </h3>
            <table className="w-full text-sm">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                    Use Case
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                    Recommended
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                    Why
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {useCaseRecommendations.map((row) => (
                  <tr
                    key={row.useCase}
                    className="bg-white transition-colors hover:bg-gray-50 dark:bg-gray-950 dark:hover:bg-gray-900"
                  >
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                      {row.useCase}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                      {row.recommended}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                      {row.reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Benchmark Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-8 text-center"
        >
          <Link
            href="/docs/benchmark"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <BarChart3 className="h-4 w-4" />
            See transparent benchmark methodology and results
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
