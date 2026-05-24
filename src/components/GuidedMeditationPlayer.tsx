import { useState } from "react";

import { useGuidedMeditation } from "../application/useGuidedMeditation";
import { useStageProgression } from "../application/useStageProgression";
import { getStageProfile } from "../domain/stages/stageProfiles";
import { SectionHeading } from "./SectionHeading";
import { ProgressBar } from "./ProgressBar";
import { VerticalStack } from "./VerticalStack";
import { ActionRow } from "./ActionRow";
import { InsightListItem } from "./InsightListItem";
import ContemplativeCard from "./ContemplativeCard";
import ContemplativeText from "./ContemplativeText";

export function GuidedMeditationPlayer() {
  const [isExpanded, setIsExpanded] =
    useState(false);

  const [hasStarted, setHasStarted] =
    useState(false);

  const {
    currentStage,
    recordSessionComplete,
  } = useStageProgression();

  const profile = getStageProfile(currentStage);

  const {
    meditation,
    currentPhase,
    playbackState,
    startMeditation,
    nextPhase,
    resetMeditation,
  } = useGuidedMeditation();

  const isComplete =
    playbackState.currentPhaseIndex ===
      meditation.phases.length - 1 &&
    !playbackState.isPlaying;

  return (
    <ContemplativeCard
      padding="18px"
      style={{
        marginBottom: "0",
      }}
    >
      <button
        onClick={() =>
          setIsExpanded((current) => !current)
        }
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          padding: 0,
          color: "white",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <VerticalStack gap={12}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <div
                  style={{
                    fontSize: "0.78rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    opacity: 0.58,
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  Guided Meditation
                </div>

                <SectionHeading
                  title="Guided Practice"
                />
              </div>
            </div>

            <span
              style={{
                opacity: 0.7,
                fontSize: "1.1rem",
              }}
            >
              {isExpanded ? "−" : "+"}
            </span>
          </div>

          <div
            style={{
              fontSize: "0.96rem",
            }}
          >
            <ContemplativeText>
              Practice guidance for your current stage.
            </ContemplativeText>
          </div>
        </VerticalStack>
      </button>

      {isExpanded && (
        <div
          style={{
            marginTop: "10px",
          }}
        >
          <ProgressBar
            value={
              playbackState.currentPhaseIndex + 1
            }
            max={meditation.phases.length}
          />

          <div
            style={{
              marginTop: "10px",
              fontSize: "0.88rem",
              color: "rgba(255,255,255,0.62)",
            }}
          >
            {currentPhase.title}
          </div>

          {isComplete ? (
            <div
              style={{
                marginTop: "18px",
              }}
            >
              <ContemplativeText>
                Practice completed gently.
              </ContemplativeText>

              <button
                onClick={() => {
                  recordSessionComplete(
                    "guided-meditation",
                    1,
                  );

                  resetMeditation();
                  setHasStarted(false);
                  setIsExpanded(false);
                }}
                style={{
                  marginTop: "18px",
                  width: "100%",
                  background: "none",
                  border: "none",
                  color: "var(--accent-color)",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                }}
              >
                Return to Guide
              </button>
            </div>
          ) : (
            <>
              {hasStarted && (
                <div
                  style={{
                    marginTop: "18px",
                  }}
                >
                  <InsightListItem
                    title={currentPhase.title}
                    description={currentPhase.instruction}
                  />
                </div>
              )}

              {!hasStarted && (
                <div
                  style={{
                    marginTop: "18px",
                    opacity: 0.6,
                  }}
                >
                  <ContemplativeText>
                    When ready, gently begin.
                  </ContemplativeText>
                </div>
              )}

              <ActionRow gap="md">
                <button
                  onClick={() => {
                    if (!hasStarted) {
                      setHasStarted(true);
                      startMeditation();
                      return;
                    }

                    nextPhase();
                  }}
                  style={{
                    marginTop: "18px",
                    width: "100%",
                    background: "none",
                    border: "none",
                    color: "var(--accent-color)",
                    cursor: "pointer",
                    fontSize: "0.95rem",
                  }}
                >
                  Continue when ready
                </button>
              </ActionRow>
            </>
          )}
        </div>
      )}
    </ContemplativeCard>
  );
}