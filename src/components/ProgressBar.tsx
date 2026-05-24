import type {
  CSSProperties,
} from "react";
import { contemplativeTheme } from "../theme/contemplativeTheme";

type ProgressBarProps = {
  value: number;
  max?: number;
  height?: string | number;
  showLabel?: boolean;
  label?: string;
  style?: CSSProperties;
  valueLabel?: string;
  subdued?: boolean;
};

export function ProgressBar({
  value,
  max = 100,
  height = "10px",
  showLabel = false,
  label,
  style,
  valueLabel,
  subdued = false,
}: ProgressBarProps) {
  const safeMax = Number.isFinite(max)
    ? Math.max(1, max)
    : 100;

  const safeValue = Number.isFinite(value)
    ? Math.max(0, value)
    : 0;

  const normalized = Math.min(
    100,
    Math.max(0, (safeValue / safeMax) * 100),
  );

  return (
    <div
      style={{
        width: "100%",
        ...style,
      }}
    >
      {(showLabel || label) && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom:
              contemplativeTheme.spacing.xs,
          }}
        >
          <span
            style={{
              fontSize:
                contemplativeTheme.typography.caption.fontSize,
              color:
                contemplativeTheme.colors.textSecondary,
              letterSpacing:
                contemplativeTheme.typography.caption.letterSpacing,
            }}
          >
            {label ?? "Progress"}
          </span>

          <span
            style={{
              fontSize:
                contemplativeTheme.typography.caption.fontSize,
              color:
                contemplativeTheme.colors.goldPrimary,
              fontWeight: 500,
            }}
          >
            {valueLabel ?? `${Math.round(normalized)}%`}
          </span>
        </div>
      )}

      <div
        style={{
          width: "100%",
          height,
          borderRadius:
            contemplativeTheme.radius.pill,
          overflow: "hidden",
          background: subdued
            ? "rgba(255,255,255,0.03)"
            : "rgba(255,255,255,0.06)",
          border:
            `1px solid ${contemplativeTheme.colors.borderSubtle}`,
          backdropFilter: "blur(8px)",
          boxShadow:
            "inset 0 2px 8px rgba(0,0,0,0.18)",
        }}
      >
        <div
          style={{
            width: `${normalized}%`,
            height: "100%",
            borderRadius:
              contemplativeTheme.radius.pill,
            background: subdued
              ? "linear-gradient(90deg, rgba(138,125,86,0.52), rgba(191,177,126,0.72))"
              : "linear-gradient(90deg, rgba(191,168,106,0.78), rgba(231,215,162,0.98))",
            boxShadow: subdued
              ? "0 0 10px rgba(231,215,162,0.12)"
              : "0 0 18px rgba(231,215,162,0.24)",
            transition:
              contemplativeTheme.transitions.smooth,
          }}
        />
      </div>
    </div>
  );
}