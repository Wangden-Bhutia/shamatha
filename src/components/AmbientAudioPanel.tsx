import { useState } from "react";

import {
  type AmbientAudioTrack,
  useAmbientAudio,
} from "../application/useAmbientAudio";

const TRACK_OPTIONS: AmbientAudioTrack[] = [
  "rain",
  "forest",
  "night",
];

const TRACK_LABELS: Record<AmbientAudioTrack, string> = {
  rain: "🌧 Rain",
  forest: "🌲 Forest",
  night: "🌙 Night",
};

export function AmbientAudioPanel() {
  const {
    currentTrack,
    isPlaying,
    toggleAudio,
    selectTrack,
  } = useAmbientAudio();
  const [isExpanded, setIsExpanded] =
    useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        alignItems: "flex-start",
        width: "100%",
      }}
    >
      <button
        onClick={() => setIsExpanded((current) => !current)}
        aria-expanded={isExpanded}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          background: "transparent",
          border: "none",
          color: "inherit",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <h3
            style={{
              marginTop: 0,
              marginBottom: 0,
              textAlign: "left",
              fontSize: "0.96rem",
              fontWeight: 500,
              color: "rgba(243,239,227,0.9)",
            }}
          >
            Ambient audio
          </h3>

          <p
            style={{
              margin: 0,
              opacity: 0.64,
              fontSize: "0.95rem",
              lineHeight: 1.6,
              textAlign: "left",
            }}
          >
            Optional background atmosphere for sitting.
          </p>
        </div>

        <span
          style={{
            fontSize: "1.1rem",
            opacity: 0.46,
            marginLeft: "8px",
            lineHeight: 1,
          }}
        >
          {isExpanded ? "−" : "+"}
        </span>
      </button>

      {isExpanded && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            width: "100%",
          }}
        >
          <div
            role="group"
            aria-label="Ambient audio controls"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            <div
              role="tablist"
              aria-label="Ambient sound options"
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "flex-start",
                width: "100%",
                minWidth: 0,
                flexShrink: 1,
              }}
            >
              {TRACK_OPTIONS.map((track) => {
                const isActive = currentTrack === track;

                return (
                  <button
                    key={track}
                    onClick={() => selectTrack(track)}
                    aria-pressed={isActive}
                    style={{
                      padding: "6px 10px",
                      borderRadius: "999px",
                      border: isActive
                        ? "1px solid rgba(191,168,106,0.6)"
                        : "1px solid rgba(255,255,255,0.12)",
                      background: isActive
                        ? "rgba(191,168,106,0.16)"
                        : "rgba(255,255,255,0.03)",
                      color: isActive ? "#E7D7A2" : "rgba(255,255,255,0.82)",
                      cursor: "pointer",
                      textTransform: "none",
                      fontSize: "0.78rem",
                      whiteSpace: "nowrap",
                      flex: "0 0 auto",
                      transition: "all 0.2s ease",
                      boxShadow: isActive
                        ? "0 0 0 1px rgba(191,168,106,0.25), 0 0 12px rgba(191,168,106,0.18)"
                        : "none",
                      transform: isActive ? "scale(1.04)" : "scale(1)",
                    }}
                  >
                    {TRACK_LABELS[track]}
                  </button>
                );
              })}
              <button
                onClick={toggleAudio}
                aria-pressed={isPlaying}
                style={{
                  padding: "6px 14px",
                  borderRadius: "10px",
                  border: isPlaying
                    ? "1px solid rgba(191,168,106,0.45)"
                    : "1px solid rgba(255,255,255,0.10)",
                  background: isPlaying
                    ? "rgba(191,168,106,0.08)"
                    : "transparent",
                  color: isPlaying ? "#E7D7A2" : "rgba(255,255,255,0.82)",
                  cursor: "pointer",
                  fontSize: "0.78rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  flex: "0 0 auto",
                  alignSelf: "center",
                  marginLeft: "0px",
                  minWidth: "96px",
                  justifyContent: "center",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s ease",
                  boxShadow: isPlaying
                    ? "0 0 0 1px rgba(191,168,106,0.28), 0 0 18px rgba(191,168,106,0.26), 0 0 32px rgba(191,168,106,0.10)"
                    : "none",
                  transform: isPlaying ? "scale(1.03)" : "scale(1)",
                }}
              >
                {isPlaying ? "⏸ Pause" : "▶ Play"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
