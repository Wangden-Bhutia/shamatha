

import type {
  CSSProperties,
  PropsWithChildren,
} from "react";

type MetricGridProps =
  PropsWithChildren<{
    minItemWidth?: number;
    gap?: number;
    style?: CSSProperties;
  }>;

export function MetricGrid({
  children,
  minItemWidth = 180,
  gap = 12,
  style,
}: MetricGridProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit, minmax(${minItemWidth}px, 1fr))`,
        gap: `${gap}px`,
        width: "100%",
        ...style,
      }}
    >
      {children}
    </div>
  );
}