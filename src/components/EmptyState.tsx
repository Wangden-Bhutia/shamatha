import type {
  CSSProperties,
  ReactNode,
} from "react";

import { GlassCard } from "./GlassCard";
import { contemplativeTheme } from "../theme/contemplativeTheme";

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  style?: CSSProperties;
  subdued?: boolean;
};

export function EmptyState({
  title,
  description,
  icon,
  action,
  style,
  subdued = false,
}: EmptyStateProps) {
  return (
    <GlassCard
      subdued={subdued}
      style={{
        textAlign: "center",
        padding: `${contemplativeTheme.spacing.xl} ${contemplativeTheme.spacing.lg}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: contemplativeTheme.spacing.sm,
        ...style,
      }}
    >
      {icon && (
        <div
          style={{
            fontSize: "42px",
            marginBottom: contemplativeTheme.spacing.xs,
            opacity: 0.82,
          }}
        >
          {icon}
        </div>
      )}

      <h3
        style={{
          marginTop: 0,
          marginBottom: description
            ? contemplativeTheme.spacing.xs
            : 0,
          color:
            contemplativeTheme.colors.goldPrimary,
          fontWeight: 500,
          letterSpacing: "0.02em",
          textWrap: "balance",
        }}
      >
        {title}
      </h3>

      {description && (
        <p
          style={{
            marginTop: 0,
            marginBottom: action
              ? contemplativeTheme.spacing.md
              : 0,
            lineHeight: 1.8,
            color:
              contemplativeTheme.colors.textSecondary,
            maxWidth: "560px",
            opacity: 0.78,
            textWrap: "balance",
          }}
        >
          {description}
        </p>
      )}

      {action && (
        <div
          style={{
            marginTop:
              contemplativeTheme.spacing.xs,
          }}
        >
          {action}
        </div>
      )}
    </GlassCard>
  );
}
