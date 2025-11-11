"use client";

import type { ReactNode } from "react";
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
  type LabelProps,
  type TooltipContentProps,
} from "recharts";

import { track } from "@/lib/tracking";

type ChartDatum = {
  engine: string;
  overall?: number;
  elapsed_per_doc?: number;
};

type LabelRenderer = (props: LabelProps) => ReactNode;

export interface MetricBarChartProps {
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
  formatEngineLabel?: (engine: string) => string;
}

const defaultFormatEngineLabel = (value: string) => value;

export function MetricBarChart({
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
  formatEngineLabel: formatEngineLabelProp,
}: Readonly<MetricBarChartProps>) {
  const formatEngineLabel = formatEngineLabelProp ?? defaultFormatEngineLabel;

  const tooltipContent = ({
    active,
    payload,
    label,
  }: TooltipContentProps<number, string>) => {
    if (!active || !payload?.length) {
      return null;
    }

    const value = payload[0]?.value ?? 0;
    const engineLabel = formatEngineLabel(String(label));

    return (
      <div className="rounded-md border bg-background px-3 py-2 text-xs shadow-lg sm:text-sm">
        <p className="font-semibold text-foreground">{engineLabel}</p>
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
            tickFormatter={(value) => formatEngineLabel(String(value))}
            tickLine={false}
            axisLine={false}
            angle={-20}
            textAnchor="end"
            interval={0}
            height={60}
          />
          <YAxis
            tick={{ fontSize: 11 }}
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
            <LabelList dataKey={dataKey} content={labelRenderer} />
            {data.map((entry) => {
              const styles = getCellColors(entry.engine);
              return <Cell key={`${chartId}-${entry.engine}`} {...styles} />;
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
