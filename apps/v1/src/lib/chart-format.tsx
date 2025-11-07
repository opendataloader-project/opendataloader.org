import type { LabelProps } from "recharts";

export const formatScore = (value: number | string, decimals = 2) => {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) {
    return "-";
  }

  const fixed = numeric.toFixed(decimals);
  if (decimals === 0) {
    return fixed;
  }

  const trailing = `.${"0".repeat(decimals)}`;
  return fixed.endsWith(trailing) ? fixed.slice(0, -decimals - 1) : fixed;
};

export const formatSeconds = (value: number | string) => {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) {
    return "-";
  }

  return `${numeric.toFixed(3)}s`;
};

export const renderScoreLabel = ({
  x = 0,
  y = 0,
  width = 0,
  value,
}: LabelProps) => {
  if (value === undefined || value === null) {
    return null;
  }

  const numericX = typeof x === "number" ? x : Number(x ?? 0);
  const numericY = typeof y === "number" ? y : Number(y ?? 0);
  const numericWidth = typeof width === "number" ? width : Number(width ?? 0);

  return (
    <text
      x={numericX + numericWidth / 2}
      y={numericY - 8}
      textAnchor="middle"
      fill="var(--foreground)"
      fontSize={12}
      fontWeight={600}
    >
      {formatScore(value, 2)}
    </text>
  );
};

export const renderSecondsLabel = ({
  x = 0,
  y = 0,
  width = 0,
  value,
}: LabelProps) => {
  if (value === undefined || value === null) {
    return null;
  }

  const numericX = typeof x === "number" ? x : Number(x ?? 0);
  const numericY = typeof y === "number" ? y : Number(y ?? 0);
  const numericWidth = typeof width === "number" ? width : Number(width ?? 0);

  return (
    <text
      x={numericX + numericWidth / 2}
      y={numericY - 8}
      textAnchor="middle"
      fill="var(--foreground)"
      fontSize={12}
      fontWeight={600}
    >
      {formatSeconds(value)}
    </text>
  );
};
