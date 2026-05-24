export const contemplativeTheme = {
  colors: {
    backgroundPrimary: "#07111F",
    backgroundSecondary: "#0C1828",
    backgroundElevated: "rgba(10,18,40,0.88)",
    backgroundFloating: "rgba(14,24,42,0.72)",

    textPrimary: "rgba(255,255,255,0.94)",
    textSecondary: "rgba(255,255,255,0.72)",
    textMuted: "rgba(255,255,255,0.52)",

    goldPrimary: "#E7D7A2",
    accent: "#E7D7A2",
    goldSoft: "rgba(231,215,162,0.18)",
    goldBorder: "rgba(231,215,162,0.26)",
    goldMuted: "rgba(231,215,162,0.58)",

    borderSubtle: "rgba(255,255,255,0.08)",
    borderStrong: "rgba(255,255,255,0.16)",

    glassOverlay:
      "linear-gradient(to bottom, rgba(10,18,40,0.88), rgba(5,10,24,0.94))",
  },

  typography: {
    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, sans-serif",

    contemplativeFont:
      "Georgia, Cambria, 'Times New Roman', serif",

    heroTitle: {
      fontSize: "4rem",
      fontWeight: 200,
      letterSpacing: "0.025em",
      lineHeight: 1.04,
    },

    sectionTitle: {
      fontSize: "1.58rem",
      fontWeight: 350,
      lineHeight: 1.16,
    },

    bodyLarge: {
      fontSize: "1.04rem",
      lineHeight: 1.82,
      letterSpacing: "0.01em",
      fontWeight: 300,
    },

    bodyMedium: {
      fontSize: "1rem",
      lineHeight: 1.68,
      fontWeight: 350,
    },

    bodySmall: {
      fontSize: "0.92rem",
      lineHeight: 1.72,
      fontWeight: 350,
      letterSpacing: "0.01em",
    },

    caption: {
      fontSize: "0.92rem",
      letterSpacing: "0.06em",
    },
  },

  spacing: {
    xxs: "4px",
    xs: "6px",
    sm: "10px",
    md: "16px",
    lg: "26px",
    xl: "40px",
    xxl: "72px",
    section: "96px",
  },

  radius: {
    sm: "10px",
    md: "14px",
    lg: "22px",
    xl: "28px",
    immersive: "36px",
    pill: "999px",
  },

  shadows: {
    soft:
      "0 8px 24px rgba(0,0,0,0.20)",

    elevated:
      "0 20px 60px rgba(0,0,0,0.45)",

    contemplativeGlow:
      "0 0 60px rgba(231,215,162,0.12)",

    softInset:
      "inset 0 1px 0 rgba(255,255,255,0.04)",
  },

  transitions: {
    smooth: "all 260ms ease",
    slow: "all 420ms ease",
    immersive: "all 600ms ease",
    gentle: "all 340ms cubic-bezier(0.22, 1, 0.36, 1)",
  },

  glassCard: {
    background:
      "linear-gradient(to bottom, rgba(10,18,40,0.88), rgba(5,10,24,0.94))",
    border:
      "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(12px)",
    boxShadow:
      "0 20px 60px rgba(0,0,0,0.45)",
    borderRadius: "22px",
    overflow: "hidden",
  },

  buttons: {
    primary: {
      background: "#E7D7A2",
      color: "#07111F",
      border: "1px solid rgba(231,215,162,0.22)",
      borderRadius: "16px",
      padding: "10px 16px",
      fontWeight: 500,
    },

    ghost: {
      background: "rgba(255,255,255,0.04)",
      border:
        "1px solid rgba(255,255,255,0.08)",
      color: "rgba(255,255,255,0.82)",
      borderRadius: "16px",
      padding: "10px 16px",
    },
  },
} as const;
