

import type {
  CSSProperties,
} from "react";
import { contemplativeTheme } from "../theme/contemplativeTheme";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  style?: CSSProperties;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  style,
}: SectionHeadingProps) {
  return (
    <div
      style={{
        marginBottom: "18px",
        textAlign: align,
        ...style,
      }}
    >
      {eyebrow && (
        <p
          style={{
            marginTop: 0,
            marginBottom: "8px",
            color: "rgba(231,215,162,0.82)",
            fontSize:
              contemplativeTheme.typography.caption.fontSize,
            letterSpacing:
              contemplativeTheme.typography.caption.letterSpacing,
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </p>
      )}

      <h2
        style={{
          marginTop: 0,
          marginBottom: subtitle ? "8px" : 0,
          color: "rgba(231,215,162,0.86)",
          lineHeight:
            contemplativeTheme.typography.sectionTitle.lineHeight,
          fontSize: "1.24rem",
          fontWeight: 350,
          letterSpacing: "0",
        }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          style={{
            margin: 0,
            color:
              contemplativeTheme.colors.textSecondary,
            lineHeight: 1.74,
            fontSize:
              contemplativeTheme.typography.bodyMedium.fontSize,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
