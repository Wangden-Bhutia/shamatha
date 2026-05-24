import type {
  ButtonHTMLAttributes,
  PropsWithChildren,
} from "react";
import { contemplativeTheme } from "../theme/contemplativeTheme";

type ContemplativeButtonVariant =
  | "primary"
  | "secondary"
  | "ghost";

type ContemplativeButtonProps =
  PropsWithChildren<
    ButtonHTMLAttributes<HTMLButtonElement> & {
      variant?: ContemplativeButtonVariant;
    }
  >;

export function ContemplativeButton({
  children,
  variant = "secondary",
  style,
  ...props
}: ContemplativeButtonProps) {
  return (
    <button
      {...props}
      style={{
        padding:
          contemplativeTheme.buttons.primary.padding,
        borderRadius:
          contemplativeTheme.radius.md,
        border: getBorder(variant),
        background: getBackground(variant),
        color: getColor(variant),
        fontFamily:
          contemplativeTheme.typography.fontFamily,
        fontSize:
          contemplativeTheme.typography.bodyMedium.fontSize,
        letterSpacing: "0.02em",
        fontWeight: 500,
        cursor: props.disabled
          ? "not-allowed"
          : "pointer",
        transition:
          contemplativeTheme.transitions.smooth,
        minHeight: "44px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        userSelect: "none",
        opacity: props.disabled ? 0.5 : 1,
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function getBorder(
  variant: ContemplativeButtonVariant,
) {
  switch (variant) {
    case "primary":
      return (
        contemplativeTheme.buttons.primary.border ||
        contemplativeTheme.colors.goldBorder
      );

    case "ghost":
      return contemplativeTheme.buttons.ghost.border;

    default:
      return contemplativeTheme.colors.borderStrong;
  }
}

function getBackground(
  variant: ContemplativeButtonVariant,
) {
  switch (variant) {
    case "primary":
      return contemplativeTheme.buttons.primary.background;

    case "ghost":
      return contemplativeTheme.buttons.ghost.background;

    default:
      return "rgba(255,255,255,0.05)";
  }
}

function getColor(
  variant: ContemplativeButtonVariant,
) {
  switch (variant) {
    case "primary":
      return contemplativeTheme.colors.backgroundPrimary;

    case "ghost":
      return contemplativeTheme.colors.textSecondary;

    default:
      return contemplativeTheme.colors.textPrimary;
  }
}