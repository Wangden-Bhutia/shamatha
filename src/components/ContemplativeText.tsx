import { ReactNode } from "react";

interface ContemplativeTextProps {
  children: ReactNode;
  style?: React.CSSProperties;
}

function ContemplativeText({
  children,
  style = {},
}: ContemplativeTextProps) {
  return (
    <div
      style={{
        fontSize: "1.02rem",
        lineHeight: 1.95,
        fontWeight: 300,
        letterSpacing: "0.01em",
        color: "rgba(255,255,255,0.88)",
        fontStyle: "italic",
        textRendering: "optimizeLegibility",
        WebkitFontSmoothing: "antialiased",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default ContemplativeText;