import type {
  CSSProperties,
  PropsWithChildren,
} from "react";

import backgroundImg from "../assets/background.jpeg";
import { contemplativeTheme } from "../theme/contemplativeTheme";

type PageShellProps =
  PropsWithChildren<{
    isDimmed?: boolean;
    style?: CSSProperties;
  }>;

export function PageShell({
  children,
  isDimmed = false,
  style,
}: PageShellProps) {
  return (
    <main
      style={{
        minHeight: "100vh",
        width: "100%",
        maxWidth: "100vw",
        boxSizing: "border-box",
        left: 0,
        right: 0,
        color:
          contemplativeTheme.colors.textPrimary,
        position: "relative",
        overflowX: "clip",
        fontFamily:
          contemplativeTheme.typography.fontFamily,
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: isDimmed
            ? `linear-gradient(to bottom, rgba(6,8,12,0.78), rgba(6,8,12,0.78)), url(${backgroundImg})`
            : `linear-gradient(to bottom, rgba(6,8,12,0.65), rgba(6,8,12,0.65)), url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          overflow: "hidden",
          transform: "translateZ(0)",
          zIndex: -1,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "calc(100% - 32px)",
          boxSizing: "border-box",
          overflowX: "hidden",
          maxWidth: "760px",
          margin: "0 auto",
          paddingTop: "clamp(34px, 7vw, 56px)",
          paddingBottom: "calc(148px + env(safe-area-inset-bottom))",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(24px, 5vw, 34px)",
        }}
      >
        {children}
      </div>
    </main>
  );
}
