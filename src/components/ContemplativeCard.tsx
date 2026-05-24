import { ReactNode } from "react";
import { GlassCard } from "./GlassCard";

interface ContemplativeCardProps {
  children: ReactNode;
  padding?: string;
  style?: React.CSSProperties;
}

function ContemplativeCard({
  children,
  padding = "clamp(22px, 4vw, 30px)",
  style = {},
}: ContemplativeCardProps) {
  return (
    <GlassCard
      subdued
      padding={padding}
      style={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        background:
          "linear-gradient(to bottom, rgba(10,18,34,0.78), rgba(5,9,18,0.9))",
        border: "1px solid rgba(255,255,255,0.065)",
        boxShadow: "0 18px 46px rgba(0,0,0,0.34)",
        borderRadius: "28px",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </GlassCard>
  );
}

export default ContemplativeCard;
