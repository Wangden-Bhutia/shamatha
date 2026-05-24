import type {
  CSSProperties,
  PropsWithChildren,
} from "react";
import { contemplativeTheme } from "../theme/contemplativeTheme";

type GlassCardProps =
  PropsWithChildren<{
    padding?: string;
    radius?: string;
    style?: CSSProperties;
    subdued?: boolean;
  }>;

export function GlassCard({
  children,
  padding = contemplativeTheme.spacing.md,
  radius = contemplativeTheme.radius.md,
  style,
  subdued = false,
}: GlassCardProps) {
  const background = subdued
    ? contemplativeTheme.colors.backgroundFloating
    : contemplativeTheme.glassCard.background;

  const border = subdued
    ? "1px solid rgba(255,255,255,0.04)"
    : contemplativeTheme.glassCard.border;

  const shadow = subdued
    ? contemplativeTheme.shadows.softInset
    : contemplativeTheme.glassCard.boxShadow;

  const glassCardStyle: CSSProperties = {
    ...contemplativeTheme.glassCard,
    borderRadius: radius,
    background,
    border,
    boxShadow: shadow,
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    padding,
    color:
      contemplativeTheme.colors.textPrimary,
    transition:
      contemplativeTheme.transitions.smooth,
    overflow: "hidden",
  };

  return (
    <div
      className="glass-card"
      style={{
        ...glassCardStyle,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
