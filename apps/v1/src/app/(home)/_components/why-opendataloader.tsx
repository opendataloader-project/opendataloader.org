"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
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

const metrics = [
  {
    icon: Zap,
    label: "Processing Speed",
    value: "0.05s",
    unit: "/page",
    description:
      "Rule-based heuristics deliver high throughput without GPU overhead",
  },
  {
    icon: Target,
    label: "Reading Order",
    value: "91%",
    unit: "accuracy",
    description: "XY-Cut++ algorithm correctly reads multi-column layouts",
  },
  {
    icon: Lock,
    label: "Privacy",
    value: "100%",
    unit: "local",
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
    highlight: true,
  },
  {
    engine: "docling",
    speed: 0.73,
    readingOrder: 0.9,
    table: 0.89,
    heading: 0.8,
    highlight: false,
  },
  {
    engine: "pymupdf4llm",
    speed: 0.09,
    readingOrder: 0.89,
    table: 0.4,
    heading: 0.41,
    highlight: false,
  },
  {
    engine: "markitdown",
    speed: 0.04,
    readingOrder: 0.88,
    table: 0.0,
    heading: 0.0,
    highlight: false,
  },
];

// Calculate ranks for each metric with tie handling
function calculateRanks() {
  const ranks: Record<string, Record<string, number>> = {};

  // Helper to assign ranks with ties (same value = same rank)
  function assignRanks(
    sorted: typeof benchmarkData,
    getValue: (item: (typeof benchmarkData)[0]) => number,
    field: string
  ) {
    let currentRank = 1;
    sorted.forEach((item, idx) => {
      if (!ranks[item.engine]) ranks[item.engine] = {};
      if (idx > 0 && getValue(sorted[idx - 1]) === getValue(item)) {
        // Same value as previous = same rank
        ranks[item.engine][field] = ranks[sorted[idx - 1].engine][field];
      } else {
        ranks[item.engine][field] = currentRank;
      }
      currentRank++;
    });
  }

  // Speed: lower is better
  const speedSorted = [...benchmarkData].sort((a, b) => a.speed - b.speed);
  assignRanks(speedSorted, (item) => item.speed, "speed");

  // Reading Order: higher is better
  const roSorted = [...benchmarkData].sort(
    (a, b) => b.readingOrder - a.readingOrder
  );
  assignRanks(roSorted, (item) => item.readingOrder, "readingOrder");

  // Table: higher is better
  const tableSorted = [...benchmarkData].sort((a, b) => b.table - a.table);
  assignRanks(tableSorted, (item) => item.table, "table");

  // Heading: higher is better
  const headingSorted = [...benchmarkData].sort(
    (a, b) => b.heading - a.heading
  );
  assignRanks(headingSorted, (item) => item.heading, "heading");

  return ranks;
}

const ranks = calculateRanks();

function RankBadge({ rank }: { rank: number }) {
  if (rank > 2) return null;
  const colors = {
    1: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400", // 금색
    2: "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300", // 은색
  };
  return (
    <span
      className={`ml-1.5 inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium ${colors[rank as keyof typeof colors]}`}
    >
      #{rank}
    </span>
  );
}

// Mini bar component for benchmark table
function MiniBar({
  value,
  max,
  color,
  inverted = false,
}: {
  value: number;
  max: number;
  color: string;
  inverted?: boolean;
}) {
  // For inverted (speed), lower is better so we invert the percentage
  const percentage = inverted
    ? ((max - value) / max) * 100
    : (value / max) * 100;
  return (
    <div className="mt-1 h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
      <div
        className={`h-1.5 rounded-full ${color}`}
        style={{ width: `${Math.max(percentage, 2)}%` }}
      />
    </div>
  );
}

const useCaseRecommendations = [
  {
    useCase: "Best overall balance",
    recommended: "opendataloader",
    reason: "Fast (0.05s/page) with highest reading order accuracy",
  },
  {
    useCase: "Maximum accuracy",
    recommended: "docling",
    reason: "Highest scores for tables and headings, but 15x slower",
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
            delivers 91% reading order accuracy, 0.05s per page processing
            speed, and bounding boxes for every element — all running 100%
            locally on your CPU with no GPU required.
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
                  <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                    Engine
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-900 dark:text-white">
                    Speed (s/page)
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-900 dark:text-white">
                    Reading Order
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-900 dark:text-white">
                    Table
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-900 dark:text-white">
                    Heading
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {benchmarkData.map((row) => (
                  <tr
                    key={row.engine}
                    className={
                      row.highlight
                        ? "bg-blue-50 dark:bg-blue-900/20"
                        : "bg-white dark:bg-gray-950"
                    }
                  >
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                      {row.highlight ? (
                        <span className="font-bold">{row.engine}</span>
                      ) : (
                        row.engine
                      )}
                    </td>
                    <td className="px-4 py-3 font-mono text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-10 text-right ${ranks[row.engine].speed === 1 ? "font-bold text-green-600 dark:text-green-400" : ""}`}
                        >
                          {row.speed.toFixed(2)}
                        </span>
                        <RankBadge rank={ranks[row.engine].speed} />
                      </div>
                      <MiniBar
                        value={row.speed}
                        max={0.8}
                        color="bg-cyan-500"
                        inverted
                      />
                    </td>
                    <td className="px-4 py-3 font-mono text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-10 text-right ${ranks[row.engine].readingOrder === 1 ? "font-bold text-green-600 dark:text-green-400" : ""}`}
                        >
                          {row.readingOrder.toFixed(2)}
                        </span>
                        <RankBadge rank={ranks[row.engine].readingOrder} />
                      </div>
                      <MiniBar
                        value={row.readingOrder}
                        max={1}
                        color="bg-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3 font-mono text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-10 text-right ${ranks[row.engine].table === 1 ? "font-bold text-green-600 dark:text-green-400" : ""}`}
                        >
                          {row.table.toFixed(2)}
                        </span>
                        <RankBadge rank={ranks[row.engine].table} />
                      </div>
                      <MiniBar
                        value={row.table}
                        max={1}
                        color="bg-orange-500"
                      />
                    </td>
                    <td className="px-4 py-3 font-mono text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-10 text-right ${ranks[row.engine].heading === 1 ? "font-bold text-green-600 dark:text-green-400" : ""}`}
                        >
                          {row.heading.toFixed(2)}
                        </span>
                        <RankBadge rank={ranks[row.engine].heading} />
                      </div>
                      <MiniBar
                        value={row.heading}
                        max={1}
                        color="bg-green-500"
                      />
                    </td>
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
                  <tr key={row.useCase} className="bg-white dark:bg-gray-950">
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                      {row.useCase}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                      {row.recommended === "opendataloader" ? (
                        <span className="font-bold text-blue-600 dark:text-blue-400">
                          {row.recommended}
                        </span>
                      ) : (
                        row.recommended
                      )}
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
