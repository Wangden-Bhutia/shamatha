import type {
  CSSProperties,
  PropsWithChildren,
} from "react";

type VerticalStackProps =
  PropsWithChildren<{
    gap?: number | string;
    align?: CSSProperties["alignItems"];
    justify?: CSSProperties["justifyContent"];
    style?: CSSProperties;
  }>;

export function VerticalStack({
  children,
  gap = 12,
  align = "stretch",
  justify = "flex-start",
  style,
}: VerticalStackProps) {
  const normalizedGap =
    typeof gap === "number"
      ? `${gap}px`
      : gap;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: align,
        justifyContent: justify,
        gap: normalizedGap,
        width: "100%",
        ...style,
      }}
    >
      {children}
    </div>
  );
}