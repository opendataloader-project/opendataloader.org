"use client";

import { useMemo, type ReactNode } from "react";
import { useTheme } from "next-themes";

import { MetricBarChart } from "@/components/charts/metric-bar-chart";
import { Section } from "@/components/section";
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

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

const formatEngineLabel = (value: string) => engineLabelMap[value] ?? value;

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
                    ? "rgba(236,72,153,0.9)"
                    : "rgba(99,102,241,0.9)",
                stroke:
                  engine === highlightTarget
                    ? "rgba(236,72,153,1)"
                    : "rgba(99,102,241,0.4)",
              })}
              isDark={isDark}
              formatEngineLabel={formatEngineLabel}
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
                isDark ? "rgba(124,58,237,0.15)" : "rgba(59,130,246,0.08)"
              }
              barSize={40}
              getCellColors={(engine) => ({
                fill:
                  engine === highlightTarget
                    ? "rgba(236,72,153,0.8)"
                    : "rgba(99,102,241,0.8)",
                stroke:
                  engine === highlightTarget
                    ? "rgba(236,72,153,1)"
                    : "rgba(99,102,241,1)",
              })}
              isDark={isDark}
              formatEngineLabel={formatEngineLabel}
            />
          </ChartCard>
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Button size="lg" className="rounded-2xl" disabled>
                  Learn More
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>Upcoming in November 2025</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-2xl"
                  disabled
                >
                  <GitHubIcon className="h-4 w-4" /> GitHub
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>Upcoming in November 2025</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </Section>
  );
}
