import type {
  CSSProperties,
  PropsWithChildren,
  ReactNode,
} from "react";
import { contemplativeTheme } from "../theme/contemplativeTheme";

type MetricCardProps =
  PropsWithChildren<{
    label: string;
    value: ReactNode;
    accent?: string;
    footer?: ReactNode;
    style?: CSSProperties;
  }>;

export function MetricCard({
  label,
  value,
  accent = contemplativeTheme.colors.goldPrimary,
  footer,
  children,
  style,
}: MetricCardProps) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: "180px",
        padding: contemplativeTheme.spacing.md,
        borderRadius:
          contemplativeTheme.radius.md,
        background:
          "rgba(255,255,255,0.035)",
        border:
          `1px solid ${contemplativeTheme.colors.borderSubtle}`,
        backdropFilter: "blur(10px)",
        transition:
          contemplativeTheme.transitions.smooth,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        ...style,
      }}
    >
      <div>
        <p
          style={{
            marginTop: 0,
            marginBottom:
              contemplativeTheme.spacing.xs,
            fontSize:
              contemplativeTheme.typography.caption.fontSize,
            color:
              contemplativeTheme.colors.textMuted,
            textTransform: "uppercase",
            letterSpacing:
              contemplativeTheme.typography.caption.letterSpacing,
          }}
        >
          {label}
        </p>

        <h3
          style={{
            margin: 0,
            color: accent,
            lineHeight: 1.2,
            fontWeight: 500,
            fontSize: "1.5rem",
            letterSpacing: "0.01em",
          }}
        >
          {value}
        </h3>
      </div>

      {children}

      {footer && (
        <div
          style={{
            marginTop: "auto",
            fontSize:
              contemplativeTheme.typography.caption.fontSize,
            color:
              contemplativeTheme.colors.textSecondary,
            lineHeight: 1.6,
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}