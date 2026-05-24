import { useMemo, useState } from "react";

import { AppButton } from "./AppButton";
import { contemplativeTheme } from "../theme/contemplativeTheme";

type ActiveMeditationViewProps = {
  timeRemaining: string;
  onEndSession: () => void;
  guidance?: string;
  sessionRecovered?: boolean;
};

export function ActiveMeditationView({
  timeRemaining,
  onEndSession,
guidance =
  "Let attention rest softly with the breath",
  sessionRecovered = false,
}: ActiveMeditationViewProps) {
  const [endingSession, setEndingSession] =
    useState(false);

  const recoveryMessage = useMemo(() => {
    if (!sessionRecovered) {
      return null;
    }

    return "Previous sitting restored";
  }, [sessionRecovered]);

  const handleEndSession = () => {
    if (endingSession) {
      return;
    }

    setEndingSession(true);

    try {
      onEndSession();
    } finally {
      window.setTimeout(() => {
        setEndingSession(false);
      }, 800);
    }
  };
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0px 20px 96px",
        textAlign: "center",
        gap: "18px",
        overflow: "hidden",
        isolation: "isolate",
        zIndex: 100,
        background:
          "radial-gradient(circle at center, rgba(18,26,42,0.10) 0%, rgba(2,4,10,0.72) 76%)",
        animation:
          "ambientPulse 12s ease-in-out infinite",
        transition:
          "background 2s ease",
      }}
    >
      <style>
        {`
          @media (prefers-reduced-motion: reduce) {
            * {
              animation: none !important;
              transition: none !important;
            }
          }

          @keyframes ambientPulse {
            0% {
              background:
                radial-gradient(circle at center, rgba(22,28,42,0.14) 0%, rgba(2,4,10,0.9) 74%);
            }

            50% {
              background:
                radial-gradient(circle at center, rgba(34,42,60,0.2) 0%, rgba(2,4,10,0.94) 76%);
            }

            100% {
              background:
                radial-gradient(circle at center, rgba(22,28,42,0.14) 0%, rgba(2,4,10,0.9) 74%);
            }
          }

          @keyframes ambientGlow {
            0% {
              opacity: 0.42;
              transform: scale(1);
            }

            50% {
              opacity: 0.74;
              transform: scale(1.06);
            }

            100% {
              opacity: 0.42;
              transform: scale(1);
            }
          }
        `}
      </style>

      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, rgba(231,215,162,0.022) 0%, transparent 62%)",
          opacity: 0.32,
          pointerEvents: "none",
          mixBlendMode: "screen",
          animation:
            "ambientGlow 24s ease-in-out infinite",
          zIndex: 0,
        }}
      />

      {recoveryMessage && (
        <div
          style={{
            padding: `${contemplativeTheme.spacing.xs} ${contemplativeTheme.spacing.md}`,
            borderRadius: contemplativeTheme.radius.pill,
            background:
              "rgba(231,215,162,0.08)",
            border:
              "1px solid rgba(231,215,162,0.12)",
            color:
              contemplativeTheme.colors.textSecondary,
            fontSize:
              contemplativeTheme.typography.bodySmall.fontSize,
            letterSpacing: "0.03em",
            opacity: 0.68,
            textAlign: "center",
          }}
        >
          {recoveryMessage}
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          position: "relative",
          zIndex: 1,
          transform: "translateY(-4vh)",
width: "100%",
maxWidth: "520px",
margin: "0 auto",
        }}
      >
        <p
          style={{
            marginBottom: "6px",
            opacity: 0.38,
            letterSpacing: "0.04em",
            color:
              contemplativeTheme.colors.textSecondary,
            fontSize: "0.88rem",
            maxWidth: "560px",
            marginInline: "auto",
            lineHeight: 2.1,
            textWrap: "balance",
          }}
        >
          {guidance}
        </p>

        <h2
          style={{
            fontSize:
              "clamp(3.4rem, 13vw, 5.8rem)",
            margin: 0,
            fontWeight: 300,
            color:
              contemplativeTheme.colors.goldPrimary,
            letterSpacing: "0.08em",
            lineHeight: 1,
            fontVariantNumeric: "tabular-nums",
            textShadow:
              "0 0 22px rgba(231,215,162,0.05)",
            opacity: 0.94,
            transform: "translateZ(0)",
            userSelect: "none",
          }}
        >
          {timeRemaining}
        </h2>
      </div>

      <AppButton
        variant="ghost"
        onClick={handleEndSession}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = "0.5";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = "0.28";
        }}
        style={{
          opacity: 0.28,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter:
            "blur(10px)",
          border:
            "1px solid rgba(255,255,255,0.04)",
          background:
            "rgba(255,255,255,0.03)",
          transition:
            "opacity 0.5s ease, background 0.5s ease",
          minWidth: "118px",
          fontSize: "0.72rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          zIndex: 1,
          position: "relative",
          pointerEvents: endingSession
            ? "none"
            : "auto",
        }}
      >
        {endingSession
          ? "Closing Sitting..."
          : "End Sitting"}
      </AppButton>
    </div>
  );
}
