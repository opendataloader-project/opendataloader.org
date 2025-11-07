"use client";

import { useMemo, type ReactNode } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TooltipContentProps } from "recharts";

import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GitHubIcon } from "@/components/icons/github";
import {
  formatScore,
  formatSeconds,
  renderScoreLabel,
  renderSecondsLabel,
} from "@/lib/chart-format";
import { track } from "@/lib/tracking";

const barData = [
  {
    engine: "opendataloader-pdf",
    overall: 0.7778189897859346,
    elapsed_per_doc: 0.04914846062660217,
  },
  {
    engine: "docling",
    overall: 0.8767315385728099,
    elapsed_per_doc: 0.6291988396644592,
  },
  {
    engine: "pymupdf4llm",
    overall: 0.7315707809993062,
    elapsed_per_doc: 0.09198243498802185,
  },
  {
    engine: "markitdown",
    overall: 0.5831809981892546,
    elapsed_per_doc: 0.04330030083656311,
  },
];

const engineLabelMap: Record<string, string> = {
  "opendataloader-pdf": "OpenDataLoader PDF",
  docling: "Docling",
  pymupdf4llm: "PyMuPDF4LLM",
  markitdown: "MarkItDown",
};

type LabelRenderer = typeof renderScoreLabel;

type ChartDatum = {
  engine: string;
  overall?: number;
  elapsed_per_doc?: number;
};

interface MetricBarChartProps {
  chartId: string;
  data: ChartDatum[];
  dataKey: "overall" | "elapsed_per_doc";
  domain: [number, number] | [number, string];
  valueFormatter: (value: number | string) => string;
  tooltipLabel: string;
  tooltipValueFormatter: (value: number | string) => string;
  labelRenderer: LabelRenderer;
  cursorFill: string;
  barSize?: number;
  getCellColors: (engine: string) => {
    fill: string;
    stroke: string;
    strokeWidth?: number;
  };
  gradientDefs?: ReactNode;
  isDark: boolean;
}

const MetricBarChart = ({
  chartId,
  data,
  dataKey,
  domain,
  valueFormatter,
  tooltipLabel,
  tooltipValueFormatter,
  labelRenderer,
  cursorFill,
  barSize = 36,
  getCellColors,
  gradientDefs,
  isDark,
}: MetricBarChartProps) => {
  const tooltipContent = ({
    active,
    payload,
    label,
  }: TooltipContentProps<number, string>) => {
    if (!active || !payload?.length) {
      return null;
    }

    const value = payload[0]?.value ?? 0;

    return (
      <div className="rounded-md border bg-background px-3 py-2 text-xs shadow-lg sm:text-sm">
        <p className="font-semibold text-foreground">
          {engineLabelMap[label as string] ?? label}
        </p>
        <p className="text-muted-foreground">
          {tooltipLabel} {tooltipValueFormatter(value)}
        </p>
      </div>
    );
  };

  return (
    <div className="h-[280px] w-full min-h-[260px] sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          barCategoryGap={16}
          margin={{ top: 10, right: 8, left: 0, bottom: 10 }}
          onClick={() => track("benchmark_chart_interact", { metric: dataKey })}
        >
          {gradientDefs}
          <CartesianGrid
            strokeDasharray="4 4"
            stroke="currentColor"
            opacity={0.08}
          />
          <XAxis
            dataKey="engine"
            tick={{
              fontSize: 12,
              fill: isDark ? "#d1d5db" : "#4b5563",
            }}
            tickFormatter={(value) => {
              const key = String(value);
              return engineLabelMap[key] ?? key;
            }}
            tickLine={false}
            axisLine={false}
            angle={-20}
            textAnchor={"end"}
            interval={0}
            height={60}
            stroke={isDark ? "#aaa" : "#333"}
          />
          <YAxis
            tick={{ fontSize: 11, fill: isDark ? "#d1d5db" : "#4b5563" }}
            tickLine={false}
            axisLine={false}
            domain={domain}
            tickFormatter={valueFormatter}
          />
          <Tooltip cursor={{ fill: cursorFill }} content={tooltipContent} />
          <Bar
            dataKey={dataKey}
            name={tooltipLabel}
            radius={[8, 8, 0, 0]}
            barSize={barSize}
          >
            <LabelList
              dataKey={dataKey}
              content={(props) => labelRenderer(props)}
            />
            {data.map((entry) => {
              const styles = getCellColors(entry.engine);
              return <Cell key={`${chartId}-${entry.engine}`} {...styles} />;
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const ChartCard = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) => (
  <Card className="h-full">
    <CardHeader>
      <CardTitle className="text-base sm:text-lg">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="pt-2">{children}</div>
    </CardContent>
  </Card>
);

export default function HomeBenchmark() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const highlightTarget = "opendataloader-pdf";

  const accuracyData = useMemo(() => {
    return [...barData]
      .sort((a, b) => b.overall - a.overall)
      .map(({ engine, overall }) => ({ engine, overall }));
  }, []);

  const elapsedData = useMemo(() => {
    return [...barData]
      .sort((a, b) => a.elapsed_per_doc - b.elapsed_per_doc)
      .map(({ engine, elapsed_per_doc }) => ({ engine, elapsed_per_doc }));
  }, []);

  return (
    <Section
      id="benchmark"
      title="Benchmark"
      subtitle="OpenDataLoader PDF is continuously being researched and developed to provide more accurate extraction and recognition through objective evaluation metrics. Please compare the three components that make up the metrics. You'll find OpenDataLoader PDF, the document inference feature that's just right for you."
    >
      <div className="mx-auto w-full max-w-6xl py-10">
        <div className="grid gap-6 lg:grid-cols-2">
          <ChartCard
            title="Overall Accuracy"
            description="Higher is better. It is important for accurate processing of document structure, tables, reading order, etc."
          >
            <MetricBarChart
              chartId="overall"
              data={accuracyData}
              dataKey="overall"
              domain={[0, 1]}
              valueFormatter={(value) => formatScore(value)}
              tooltipLabel="Overall score"
              tooltipValueFormatter={formatScore}
              labelRenderer={renderScoreLabel}
              cursorFill={
                isDark ? "rgba(124,58,237,0.15)" : "rgba(59,130,246,0.08)"
              }
              barSize={40}
              getCellColors={(engine) => ({
                fill:
                  engine === highlightTarget
                    ? "url(#overallHighlight)"
                    : "url(#overallDefault)",
                stroke:
                  engine === highlightTarget
                    ? "rgba(236,72,153,0.6)"
                    : "rgba(99,102,241,0.4)",
                strokeWidth: engine === highlightTarget ? 2 : 1,
              })}
              gradientDefs={
                <defs>
                  <linearGradient
                    id="overallDefault"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.95} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0.9} />
                  </linearGradient>
                  <linearGradient
                    id="overallHighlight"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#f472b6" stopOpacity={0.95} />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity={0.9} />
                  </linearGradient>
                </defs>
              }
              isDark={isDark}
            />
          </ChartCard>
          <ChartCard
            title="Average Time"
            description="Lower is better. It is important for fast processing of large scale document sets."
          >
            <MetricBarChart
              chartId="elapsed"
              data={elapsedData}
              dataKey="elapsed_per_doc"
              domain={[0, "dataMax + 0.1"]}
              valueFormatter={formatSeconds}
              tooltipLabel="Avg. time"
              tooltipValueFormatter={formatSeconds}
              labelRenderer={renderSecondsLabel}
              cursorFill={
                isDark ? "rgba(56,189,248,0.15)" : "rgba(14,165,233,0.08)"
              }
              barSize={40}
              getCellColors={(engine) => ({
                fill:
                  engine === highlightTarget
                    ? "rgba(14,165,233,0.9)"
                    : "rgba(14,165,233,0.65)",
                stroke:
                  engine === highlightTarget
                    ? "rgba(14,165,233,1)"
                    : "rgba(14,165,233,0.4)",
                strokeWidth: engine === highlightTarget ? 2 : 1,
              })}
              isDark={isDark}
            />
          </ChartCard>
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="rounded-2xl">
            <Link
              href="/docs"
              onClick={() => track("nav_docs", { from: "home-benchmark" })}
            >
              Learn More
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-2xl">
            <Link
              href="https://github.com/opendataloader-project/opendataloader-dp-bench"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("nav_github", { from: "home-benchmark" })}
            >
              <GitHubIcon className="h-4 w-4" /> GitHub
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}
