import type {
  CSSProperties,
  ReactNode,
} from "react";
import { contemplativeTheme } from "../theme/contemplativeTheme";

type InsightListItemProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  rightContent?: ReactNode;
  style?: CSSProperties;
};

export function InsightListItem({
  title,
  description,
  icon,
  rightContent,
  style,
}: InsightListItemProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap:
          window.innerWidth < 640
            ? "10px"
            : contemplativeTheme.spacing.sm,
        padding:
          window.innerWidth < 640
            ? "12px 14px"
            : `${contemplativeTheme.spacing.sm} ${contemplativeTheme.spacing.md}`,
        borderRadius:
          contemplativeTheme.radius.md,
        background:
          "rgba(255,255,255,0.035)",
        border:
          `1px solid ${contemplativeTheme.colors.borderSubtle}`,
        backdropFilter: "blur(10px)",
        transition:
          contemplativeTheme.transitions.smooth,
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          gap:
            window.innerWidth < 640
              ? "10px"
              : contemplativeTheme.spacing.sm,
          flex: 1,
        }}
      >
        {icon && (
          <div
            style={{
              fontSize: "1.2rem",
              lineHeight: 1,
              paddingTop: "2px",
            }}
          >
            {icon}
          </div>
        )}

        <div>
          <h4
            style={{
              marginTop: 0,
              marginBottom: description
                ? window.innerWidth < 640
                  ? "4px"
                  : contemplativeTheme.spacing.xs
                : 0,
              color:
                contemplativeTheme.colors.textPrimary,
              fontWeight: 500,
              letterSpacing: "0.01em",
              lineHeight: 1.3,
            }}
          >
            {title}
          </h4>

          {description && (
            <p
              style={{
                margin: 0,
                maxWidth:
                  window.innerWidth < 640
                    ? "34ch"
                    : undefined,
                color:
                  contemplativeTheme.colors.textSecondary,
                lineHeight:
                  window.innerWidth < 640
                    ? 1.62
                    : contemplativeTheme.typography.bodyMedium.lineHeight,
                fontSize:
                  window.innerWidth < 640
                    ? "0.94rem"
                    : contemplativeTheme.typography.bodyMedium.fontSize,
                fontWeight: 300,
                fontStyle:
                  window.innerWidth < 640
                    ? "normal"
                    : "italic",
                letterSpacing:
                  window.innerWidth < 640
                    ? "0.002em"
                    : undefined,
              }}
            >
              {description}
            </p>
          )}
        </div>
      </div>

      {rightContent && (
        <div>
          {rightContent}
        </div>
      )}
    </div>
  );
}