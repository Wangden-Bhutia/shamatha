import React from "react";

interface StageCardProps {
  level: string | number;
  title: string;
  description?: string;
  symbolicLine?: string;
  onOpen: () => void;
}

// --- Design Tokens (Step 9.2 micro-unification layer)
const CARD_HEIGHT = 220;
const CARD_OPACITY = 0.92;
const SCALE = 0.995;

const DESCRIPTION_STYLE = {
  marginTop: "10px",
  opacity: 0.62,
  lineHeight: 1.65,
  fontSize: "0.9rem",
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
} as const;

const SYMBOLIC_STYLE = {
  marginTop: "10px",
  opacity: 0.45,
  fontSize: "0.8rem",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
} as const;

const CTA_STYLE = {
  width: "100%",
  display: "block",
  textAlign: "center",
  fontWeight: 400,
  opacity: 0.75,
  letterSpacing: "0.3px",
  marginTop: "auto",
  paddingTop: "12px",
  flexShrink: 0,
} as const;

const CONTAINER_STYLE = {
  minHeight: `${CARD_HEIGHT}px`,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: "14px",
  opacity: CARD_OPACITY,
  transform: `scale(${SCALE})`,
} as const;

export const StageCard: React.FC<StageCardProps> = ({
  level,
  title,
  description,
  symbolicLine,
  onOpen,
}) => {
  return (
    <button
      className="stage-card-button glass-card"
      type="button"
      onClick={onOpen}
      style={CONTAINER_STYLE}
    >
      <span className="stage-level">{level}</span>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h3 style={{ margin: 0 }}>{title}</h3>

        {description && (
          <div style={DESCRIPTION_STYLE}>
            {description}
          </div>
        )}

        {symbolicLine && (
          <p style={SYMBOLIC_STYLE}>
            {symbolicLine}
          </p>
        )}
      </div>

      <span className="stage-card-button__cta" style={CTA_STYLE}>
        Open stage
      </span>
    </button>
  );
};