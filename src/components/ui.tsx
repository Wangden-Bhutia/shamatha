import React from "react";
import backgroundImg from "../assets/background.jpeg";
import { contemplativeTheme } from "../theme/contemplativeTheme";

type PageShellProps = {
  children: React.ReactNode;
  isDimmed?: boolean;
  maxWidth?: number;
};

export function PageShell({ children, isDimmed = false, maxWidth = 600 }: PageShellProps) {
  return (
    <main
      className={`page-shell${isDimmed ? " page-shell--dimmed" : ""}`}
      style={{ "--content-width": `${maxWidth}px` } as React.CSSProperties}
    >
      <div className="page-shell__bg" style={{ backgroundImage: `url(${backgroundImg})` }} />
      <div className="page-shell__content">{children}</div>
    </main>
  );
}

type InfoPanelProps = {
  title: string;
  children?: React.ReactNode;
};

export function InfoPanel({
  title,
  children,
}: InfoPanelProps) {
  return (
    <div
      style={{
        marginBottom:
          contemplativeTheme.spacing.md,
        padding:
          contemplativeTheme.spacing.md,
        borderRadius:
          contemplativeTheme.radius.md,
        background:
          "rgba(231,215,162,0.06)",
        border:
          `1px solid ${contemplativeTheme.colors.goldBorder}`,
        backdropFilter: "blur(10px)",
        boxShadow:
          contemplativeTheme.shadows.soft,
        transition:
          contemplativeTheme.transitions.smooth,
      }}
    >
      <p
        style={{
          margin: 0,
          color:
            contemplativeTheme.colors.goldPrimary,
          fontSize:
            contemplativeTheme.typography.caption.fontSize,
          letterSpacing:
            contemplativeTheme.typography.caption.letterSpacing,
          textTransform: "uppercase",
        }}
      >
        {title}
      </p>

      {children && (
        <div
          style={{
            marginTop:
              contemplativeTheme.spacing.xs,
            color:
              contemplativeTheme.colors.textSecondary,
            lineHeight:
              contemplativeTheme.typography.bodyMedium.lineHeight,
            fontSize:
              contemplativeTheme.typography.bodyMedium.fontSize,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  role?: string;
  tabIndex?: number;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
};

export function GlassCard({ children, className = "", ...props }: GlassCardProps) {
  return (
    <div className={`glass-card ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

type BackButtonProps = {
  onClick: () => void;
  label?: string;
};

export function BackButton({ onClick, label = "Back" }: BackButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      style={{
        width: "48px",
        height: "48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
        cursor: "pointer",
        transition:
          contemplativeTheme.transitions.smooth,
        fontSize: "1rem",
      }}
    >
      ←
    </button>
  );
}

type AppButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  fullWidth?: boolean;
};

export function AppButton({
  className = "",
  variant = "secondary",
  fullWidth = false,
  type = "button",
  style,
  ...props
}: AppButtonProps & {
  style?: React.CSSProperties;
}) {
  const backgrounds = {
    primary:
      contemplativeTheme.colors.goldPrimary,
    secondary: "rgba(255,255,255,0.08)",
    ghost: "rgba(255,255,255,0.04)",
  };

  const colors = {
    primary:
      contemplativeTheme.colors.backgroundPrimary,
    secondary:
      contemplativeTheme.colors.textPrimary,
    ghost:
      contemplativeTheme.colors.textSecondary,
  };

  return (
    <button
      type={type}
      {...props}
      className={className}
      style={{
        width: fullWidth ? "100%" : "auto",
        minHeight: "52px",
        padding:
          contemplativeTheme.buttons.primary.padding,
        borderRadius:
          contemplativeTheme.radius.md,
        border:
          variant === "primary"
            ? `1px solid ${contemplativeTheme.colors.goldBorder}`
            : `1px solid ${contemplativeTheme.colors.borderSubtle}`,
        background: backgrounds[variant],
        color: colors[variant],
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
        cursor: "pointer",
        transition:
          contemplativeTheme.transitions.smooth,
        WebkitTapHighlightColor: "transparent",
        ...style,
      }}
    />
  );
}

type OptionButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
};

export function OptionButton({
  selected = false,
  className = "",
  type = "button",
  style,
  ...props
}: OptionButtonProps & {
  style?: React.CSSProperties;
}) {
  return (
    <button
      className={className}
      type={type}
      aria-pressed={selected}
      {...props}
      style={{
        minHeight: "46px",
        padding: `0 ${contemplativeTheme.spacing.md}`,
        borderRadius:
          contemplativeTheme.radius.pill,
        border: selected
          ? `1px solid ${contemplativeTheme.colors.goldBorder}`
          : `1px solid ${contemplativeTheme.colors.borderSubtle}`,
        background: selected
          ? contemplativeTheme.colors.goldSoft
          : "rgba(255,255,255,0.04)",
        color: selected
          ? contemplativeTheme.colors.goldPrimary
          : contemplativeTheme.colors.textSecondary,
        backdropFilter: "blur(10px)",
        fontFamily:
          contemplativeTheme.typography.fontFamily,
        fontSize:
          contemplativeTheme.typography.bodyMedium.fontSize,
        fontWeight: 500,
        letterSpacing: "0.01em",
        cursor: "pointer",
        transition:
          contemplativeTheme.transitions.smooth,
        WebkitTapHighlightColor: "transparent",
        ...style,
      }}
    />
  );
}

type PagerProps = {
  index: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
  hideNext?: boolean;
};

export function Pager({ index, total, onPrevious, onNext, hideNext = false }: PagerProps) {
  return (
    <div className="pager">
      <AppButton onClick={onPrevious} disabled={index === 0}>
        Previous
      </AppButton>
      {!hideNext && (
        <AppButton onClick={onNext} disabled={index >= total - 1}>
          Next
        </AppButton>
      )}
    </div>
  );
}
