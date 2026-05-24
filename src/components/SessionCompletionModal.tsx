import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { contemplativeTheme } from "../theme/contemplativeTheme";
import { GlassCard } from "./GlassCard";
import { ContemplativeButton } from "./ContemplativeButton";

type Mood =
  | "restless"
  | "steady"
  | "dull"
  | "clear";

interface SessionCompletionModalProps {
  open: boolean;
  durationMinutes: number;
  onClose: () => void;
  onSave: (payload: {
    reflection: string;
    mood: Mood;
  }) => void;
}

const moods: Mood[] = [
  "restless",
  "steady",
  "dull",
  "clear",
];

const MAX_REFLECTION_LENGTH = 400;

export function SessionCompletionModal({
  open,
  durationMinutes,
  onClose,
  onSave,
}: SessionCompletionModalProps) {
  const [reflection, setReflection] =
    useState("");

  const [mood, setMood] =
    useState<Mood>("steady");

  const [isSaving, setIsSaving] =
    useState(false);

  const trimmedReflection = useMemo(
    () => reflection.trim(),
    [reflection],
  );

  useEffect(() => {
    if (!open) {
      setReflection("");
      setMood("steady");
      setIsSaving(false);
    }
  }, [open]);

  const handleSave = () => {
    if (isSaving) {
      return;
    }

    setIsSaving(true);

    try {
      onSave({
        reflection:
          trimmedReflection.slice(
            0,
            MAX_REFLECTION_LENGTH,
          ),
        mood,
      });

      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  if (!open) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background:
          "rgba(2,6,18,0.72)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter:
          "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "18px",
        zIndex: 999,
      }}
    >
      <GlassCard
        padding="24px"
        style={{
          width: "100%",
          maxWidth: "500px",
          maxHeight: "92vh",
          overflowY: "auto",
          background: "rgba(10,14,24,0.72)",
          backdropFilter: "blur(18px)",
          boxShadow:
            "0 24px 80px rgba(0,0,0,0.34)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "22px",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                marginBottom: "10px",
                fontWeight: 450,
                color:
                  contemplativeTheme.colors
                    .textPrimary,
                letterSpacing: "0.02em",
                lineHeight: 1.2,
                opacity: 0.88,
                textShadow:
                  "0 1px 12px rgba(255,255,255,0.03)",
              }}
            >
              Sitting Complete
            </h2>

            <p
              style={{
                margin: 0,
                lineHeight: 1.9,
                fontFamily: "inherit",
                fontSize: "0.92rem",
                letterSpacing: "0.012em",
                opacity: 0.66,
                color:
                  contemplativeTheme.colors
                    .textSecondary,
              }}
            >
              You sat quietly for {durationMinutes} minutes.
            </p>
          </div>

          <div>
            <div
              style={{
                marginBottom: "12px",
                opacity: 0.72,
                fontSize: "0.92rem",
              }}
            >
              How does the mind feel now?
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              {moods.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setMood(value)
                  }
                  style={{
                    border:
                      mood === value
                        ? `1px solid ${contemplativeTheme.colors.goldPrimary}`
                        : "1px solid rgba(255,255,255,0.08)",
                    background:
                      mood === value
                        ? "rgba(231,215,162,0.12)"
                        : "rgba(255,255,255,0.04)",
                    color:
                      contemplativeTheme.colors
                        .textPrimary,
                    borderRadius: "999px",
                    padding:
                      "10px 18px",
                    minHeight: "40px",
                    cursor: "pointer",
                    textTransform:
                      "capitalize",
                    fontSize: "0.88rem",
                    letterSpacing: "0.01em",
                    fontWeight: 400,
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter:
                      "blur(8px)",
                    transition:
                      contemplativeTheme
                        .transitions
                        .smooth,
                  }}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div
              style={{
                marginBottom: "12px",
                opacity: 0.72,
                fontSize: "0.92rem",
              }}
            >
              What remains with you?
            </div>
            <div
              style={{
                marginBottom: "12px",
                opacity: 0.58,
                fontSize: "0.8rem",
                lineHeight: 1.7,
                letterSpacing: "0.01em",
                color:
                  contemplativeTheme.colors
                    .textMuted,
              }}
            >
              Optional reflection — even a
              few quiet words may help
              reveal how the practice is
              slowly unfolding over time.
            </div>
            <textarea
              value={reflection}
              onChange={(event) =>
                setReflection(
                  event.target.value.slice(
                    0,
                    MAX_REFLECTION_LENGTH,
                  ),
                )
              }
              placeholder="A few quiet words... if they wish to remain."
              maxLength={MAX_REFLECTION_LENGTH}
              rows={3}
              style={{
                width: "100%",
                resize: "none",
                borderRadius: "22px",
                padding: "18px",
                background:
                  "rgba(255,255,255,0.045)",
                border:
                  "1px solid rgba(255,255,255,0.07)",
                boxShadow:
                  "inset 0 1px 2px rgba(255,255,255,0.03), 0 8px 24px rgba(0,0,0,0.16)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter:
                  "blur(10px)",
                color:
                  contemplativeTheme.colors
                    .textPrimary,
                outline: "none",
                lineHeight: 1.75,
                fontSize: "0.95rem",
                fontFamily: "inherit",
                boxSizing: "border-box",
                transition:
                  contemplativeTheme
                    .transitions.smooth,
              }}
            />
            <div
              style={{
                marginTop: "2px",
                fontSize: "0.76rem",
                letterSpacing: "0.01em",
                opacity: 0.42,
                textAlign: "right",
              }}
            >
              {
                trimmedReflection.length
              }
              /{MAX_REFLECTION_LENGTH}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "2px",
            }}
          >
            <ContemplativeButton
              onClick={handleSave}
              style={{
                minWidth: "120px",
                paddingInline: "22px",
              }}
            >
              {isSaving ? "Saving..." : "Done"}
            </ContemplativeButton>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}