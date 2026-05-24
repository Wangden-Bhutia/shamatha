// Step 10: Global Contemplative Design System Tokens
// Shamatha UI System (StillMindLabs)

export const colors = {
  gold: "#E6C15A",
  goldSoft: "rgba(230, 193, 90, 0.75)",
  goldFaint: "rgba(230, 193, 90, 0.35)",

  textPrimary: "rgba(255, 255, 255, 0.92)",
  textSecondary: "rgba(255, 255, 255, 0.65)",
  textFaint: "rgba(255, 255, 255, 0.45)",

  backgroundSoft: "rgba(255, 255, 255, 0.06)",
  backgroundGlass: "rgba(255, 255, 255, 0.1)",

  blackOverlay: "rgba(0, 0, 0, 0.35)",
};

export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  xxl: "40px",
};

export const typography = {
  title: {
    fontSize: "1.4rem",
    fontWeight: 500,
    letterSpacing: "0.2px",
  },
  subtitle: {
    fontSize: "0.95rem",
    fontWeight: 400,
    letterSpacing: "0.1px",
  },
  body: {
    fontSize: "0.9rem",
    lineHeight: 1.65,
  },
  caption: {
    fontSize: "0.8rem",
    opacity: 0.7,
  },
};

export const opacity = {
  strong: 0.92,
  medium: 0.65,
  soft: 0.5,
  faint: 0.35,
};

export const motion = {
  fast: "150ms",
  normal: "250ms",
  slow: "400ms",

  easing: "cubic-bezier(0.4, 0, 0.2, 1)",

  breathe: "2.4s ease-in-out infinite",
};

export const layout = {
  cardHeight: 220,
  cardScale: 0.995,
  borderRadius: "12px",
};

// Unified export
const designTokens = {
  colors,
  spacing,
  typography,
  opacity,
  motion,
  layout,
};

export default designTokens;
