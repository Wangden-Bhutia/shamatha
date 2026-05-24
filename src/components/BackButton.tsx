import type {
  ButtonHTMLAttributes,
  CSSProperties,
} from "react";

import { contemplativeTheme } from "../theme/contemplativeTheme";

type BackButtonProps =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    label?: string;
    compact?: boolean;
    style?: CSSProperties;
  };

export function BackButton({
  label = "Back",
  compact = false,
  style,
  ...props
}: BackButtonProps) {
  return (
    <button
      {...props}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: contemplativeTheme.spacing.xs,

        width: compact ? "44px" : "auto",
        minWidth: compact ? "44px" : "unset",
        height: compact ? "44px" : "52px",

        padding: compact
          ? 0
          : `0 ${contemplativeTheme.spacing.md}`,

        borderRadius:
          contemplativeTheme.radius.md,

        border:
          `1px solid ${contemplativeTheme.colors.borderSubtle}`,

        background: "rgba(255,255,255,0.04)",

        color:
          contemplativeTheme.colors.textPrimary,

        backdropFilter: "blur(10px)",

        boxShadow:
          contemplativeTheme.shadows.soft,

        fontFamily:
          contemplativeTheme.typography.fontFamily,

        fontSize:
          contemplativeTheme.typography.bodyMedium.fontSize,

        fontWeight: 500,

        letterSpacing: "0.01em",

        cursor: props.disabled
          ? "not-allowed"
          : "pointer",

        transition:
          contemplativeTheme.transitions.smooth,

        opacity: props.disabled ? 0.5 : 1,

        WebkitTapHighlightColor: "transparent",

        ...style,
      }}
    >
      <span
        style={{
          fontSize: "1rem",
          lineHeight: 1,
          opacity: 0.82,
        }}
      >
        ←
      </span>

      {!compact && (
        <span
          style={{
            lineHeight: 1,
          }}
        >
          {label}
        </span>
      )}
    </button>
  );
}
