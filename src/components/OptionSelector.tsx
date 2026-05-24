import type { CSSProperties } from "react";

import { contemplativeTheme } from "../theme/contemplativeTheme";

export type OptionSelectorItem<T> = {
  label: string;
  value: T;
  description?: string;
};

type OptionSelectorProps<T> = {
  options: OptionSelectorItem<T>[];
  selectedValue: T;
  onSelect: (value: T) => void;
  compact?: boolean;
  fullWidth?: boolean;
  style?: CSSProperties;
  disabled?: boolean;
};

export function OptionSelector<T extends string | number>({
  options,
  selectedValue,
  onSelect,
  compact = false,
  fullWidth = false,
  style,
  disabled = false,
}: OptionSelectorProps<T>) {
  const rootStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "15px",
    width: "100%",
    maxWidth: "100%",
    overflowX: "hidden",
    flex: "0 0 auto",
    ...style,
  } as React.CSSProperties;

  return (
    <div style={rootStyle}>
      {options.length === 0 && (
        <div
          style={{
            width: "fit-content",
            maxWidth: "100%",
            padding: contemplativeTheme.spacing.md,
            borderRadius:
              contemplativeTheme.radius.lg,
            border:
              "1px solid rgba(255,255,255,0.05)",
            background: "rgba(255,255,255,0.015)",
            textAlign: "center",
            color:
              contemplativeTheme.colors.textSecondary,
            fontSize:
              contemplativeTheme.typography.bodySmall.fontSize,
            opacity: 0.72,
          }}
        >
          No options available
        </div>
      )}
      {options.map((option) => {
        const isSelected =
          option.value === selectedValue;

        return (
          <button
            key={String(option.value)}
            onClick={() => {
              if (disabled) {
                return;
              }

              onSelect(option.value);
            }}
            type="button"
            disabled={disabled}
            style={{
              flex: fullWidth ? 1 : ("0 0 auto" as any),

              minHeight: compact ? "34px" : "41px",
              minWidth: compact ? "45px" : undefined,

              padding: compact ? "0 9px" : "6px 11px",

              borderRadius: contemplativeTheme.radius.pill,

              border: isSelected
                ? `1px solid rgba(231,215,162,0.14)`
                : `1px solid rgba(255,255,255,0.035)`,

              background: isSelected
                ? "rgba(231,215,162,0.065)"
                : "rgba(255,255,255,0.018)",

              color: isSelected
                ? "rgba(231,215,162,0.74)"
                : "rgba(255,255,255,0.52)",

              backdropFilter: "blur(4px)",

              boxShadow: isSelected
                ? "0 0 18px rgba(231,215,162,0.09), 0 0 4px rgba(231,215,162,0.05)"
                : "none",

              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1px",

              textAlign: "center",

              fontFamily: contemplativeTheme.typography.fontFamily,

              fontSize: compact ? "0.65rem" : contemplativeTheme.typography.bodyMedium.fontSize,

              opacity: disabled ? 0.38 : isSelected ? 0.9 : 0.72,

              fontWeight: isSelected ? 450 : 350,

              letterSpacing: "0.002em",

              cursor: disabled ? "not-allowed" : "pointer",

              transition: contemplativeTheme.transitions.smooth,

              WebkitTapHighlightColor: "transparent",
            }}
          >
            <span>{option.label}</span>

            {option.description && (
              <span
                style={{
                  fontSize:
                    contemplativeTheme.typography.caption.fontSize,

                  opacity: 0.56,

                  letterSpacing:
                    contemplativeTheme.typography.caption.letterSpacing,
                }}
              >
                {option.description}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}