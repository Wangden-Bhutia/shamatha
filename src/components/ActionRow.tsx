import type {
  CSSProperties,
  PropsWithChildren,
} from "react";
import { contemplativeTheme } from "../theme/contemplativeTheme";

type ActionRowProps =
  PropsWithChildren<{
    gap?: keyof typeof contemplativeTheme.spacing;
    align?: CSSProperties["alignItems"];
    justify?: CSSProperties["justifyContent"];
    wrap?: boolean;
    style?: CSSProperties;
  }>;

export function ActionRow({
  children,
  gap = "sm",
  align = "center",
  justify = "flex-start",
  wrap = true,
  style,
}: ActionRowProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap ? "wrap" : "nowrap",
        gap: contemplativeTheme.spacing[gap],
        width: "100%",
        transition:
          contemplativeTheme.transitions.smooth,

        rowGap:
          contemplativeTheme.spacing.sm,
        ...style,
      }}
    >
      {children}
    </div>
  );
}