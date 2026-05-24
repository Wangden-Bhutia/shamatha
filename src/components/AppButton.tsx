import type {
  ButtonHTMLAttributes,
  CSSProperties,
  PropsWithChildren,
} from "react";

import { contemplativeTheme } from "../theme/contemplativeTheme";

type AppButtonVariant =
  | "primary"
  | "secondary"
  | "ghost";

type AppButtonProps =
  PropsWithChildren<
    ButtonHTMLAttributes<HTMLButtonElement> & {
      variant?: AppButtonVariant;
      fullWidth?: boolean;
      compact?: boolean;
      style?: CSSProperties;
    }
  >;

function getBackground(
  variant: AppButtonVariant,
) {
  switch (variant) {
    case "primary":
      return contemplativeTheme.colors.goldPrimary;

    case "secondary":
      return "rgba(255,255,255,0.08)";

    case "ghost":
      return "rgba(255,255,255,0.04)";
  }
}

function getColor(
  variant: AppButtonVariant,
) {
  switch (variant) {
    case "primary":
      return contemplativeTheme.colors.backgroundPrimary;

    case "secondary":
      return contemplativeTheme.colors.textPrimary;

    case "ghost":
      return contemplativeTheme.colors.textSecondary;
  }
}

function getBorder(
  variant: AppButtonVariant,
) {
  switch (variant) {
    case "primary":
      return `1px solid ${contemplativeTheme.colors.goldBorder}`;

    case "secondary":
      return `1px solid ${contemplativeTheme.colors.borderStrong}`;

    case "ghost":
      return `1px solid ${contemplativeTheme.colors.borderSubtle}`;
  }
}

export function AppButton({
  children,
  variant = "primary",
  fullWidth = false,
  compact = false,
  disabled,
  style,
  ...props
}: AppButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      style={{
        width: fullWidth ? "100%" : "auto",

        minHeight: compact ? "42px" : "52px",

        padding: compact
          ? `0 ${contemplativeTheme.spacing.md}`
          : contemplativeTheme.buttons.primary.padding,

        borderRadius:
          contemplativeTheme.radius.md,

        border: getBorder(variant),

        background: getBackground(variant),

        color: getColor(variant),

        backdropFilter: "blur(10px)",

        boxShadow:
          variant === "primary"
            ? contemplativeTheme.shadows.contemplativeGlow
            : contemplativeTheme.shadows.soft,

        fontFamily:
          contemplativeTheme.typography.fontFamily,

        fontSize:
          contemplativeTheme.typography.bodyMedium.fontSize,

        fontWeight: 600,

        letterSpacing: "0.01em",

        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: contemplativeTheme.spacing.xs,

        cursor: disabled
          ? "not-allowed"
          : "pointer",

        opacity: disabled ? 0.5 : 1,

        transition:
          contemplativeTheme.transitions.smooth,

        WebkitTapHighlightColor: "transparent",

        ...style,
      }}
    >
      {children}
    </button>
  );
}
