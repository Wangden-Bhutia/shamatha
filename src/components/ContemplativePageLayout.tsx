import type {
  PropsWithChildren,
  ReactNode,
} from "react";

import backgroundImg from "../assets/background.jpeg";
import { contemplativeTheme } from "../theme/contemplativeTheme";

type ContemplativePageLayoutProps =
  PropsWithChildren<{
    title: string;
    subtitle?: string;
    headerContent?: ReactNode;
  }>;

export function ContemplativePageLayout({
  title,
  subtitle,
  headerContent,
  children,
}: ContemplativePageLayoutProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: `clamp(28px, 5vw, ${contemplativeTheme.spacing.xl}) clamp(18px, 4vw, 28px) ${contemplativeTheme.spacing.section}`,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(6,8,12,0.68), rgba(7,7,10,0.88))",
          backdropFilter: "blur(5px)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "860px",
          paddingBottom:
            contemplativeTheme.spacing.xxl,
        }}
      >
        {headerContent && (
          <div
            style={{
              marginBottom:
                contemplativeTheme.spacing.xl,
            }}
          >
            {headerContent}
          </div>
        )}

        <div
          style={{
            marginBottom:
              contemplativeTheme.spacing.xl,
          }}
        >
          <h1
            style={{
              color:
                "rgba(231,215,162,0.92)",
              marginTop: 0,
              marginBottom: subtitle
                ? contemplativeTheme.spacing.sm
                : "0",
              fontSize:
                "clamp(2.1rem, 5vw, 3.4rem)",
              fontWeight:
                contemplativeTheme.typography.heroTitle.fontWeight,
              letterSpacing:
                contemplativeTheme.typography.heroTitle.letterSpacing,
              lineHeight:
                contemplativeTheme.typography.heroTitle.lineHeight,
              opacity: 0.92,
              textWrap: "balance",
            }}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              style={{
                margin: 0,
                color:
                  contemplativeTheme.colors.textSecondary,
                lineHeight:
                  contemplativeTheme.typography.bodyLarge.lineHeight,
                fontSize:
                  "clamp(0.96rem, 1.8vw, 1.04rem)",
                fontWeight:
                  contemplativeTheme.typography.bodyLarge.fontWeight,
                letterSpacing:
                  contemplativeTheme.typography.bodyLarge.letterSpacing,
                maxWidth: "680px",
                opacity: 0.72,
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap:
              contemplativeTheme.spacing.lg,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}