import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { OptionSelector } from "../components/OptionSelector";
import { SectionHeading } from "../components/SectionHeading";
import { AmbientAudioPanel } from "../components/AmbientAudioPanel";
import { ActiveMeditationView } from "../components/ActiveMeditationView";
import type { PracticeHistoryEntry } from "../components/PracticeHistoryTimeline";

import { PracticeRecommendationCard } from "../components/PracticeRecommendationCard";
import { useProgress } from "../hooks/useProgress";
import {
  clearPersistedActiveSession,
  loadPersistedActiveSession,
  loadPracticeHistory,
  persistActiveSession,
  persistPracticeHistory,
} from "../hooks/usePracticePersistence";
import {
  generateMeditationRecommendation,
} from "../domain/services/recommendationService";
import { getStageProfile } from "../domain/stages/stageProfiles";
import type {
  Module,
  PracticeSession,
} from "../domain/types/domain";
import { SessionCompletionModal } from "../components/SessionCompletionModal";
import ContemplativeCard from "../components/ContemplativeCard";
import ContemplativeText from "../components/ContemplativeText";
import PageHeader from "../components/PageHeader";
import PageShell from "../components/ui/PageShell";
import { AppButton } from "../components/ui";
import { MeditationDurationControl } from "../components/MeditationDurationControl";
import { appendSession } from "../repositories/sessionRepository";

type BellMode = "off" | "end" | "both";
type SessionState =
  | "IDLE"
  | "ACTIVE"
  | "COMPLETED";
type PracticeLocationState = {
  module?: Module;
};
const bellOptions: Array<{ label: string; value: BellMode }> = [
  { label: "Off", value: "off" },
  { label: "End Only", value: "end" },
  { label: "Start + End", value: "both" },
];

const durationOptions = [5, 10, 15, 20] as const;

const ACTIVE_SESSION_ID =
  "shamatha-active-session";
const MAX_HISTORY_ENTRIES = 30;
const MINIMUM_COMPLETION_SECONDS = 3;

function buildPersistedSession(
  moduleId: string,
  durationMinutes: number,
  remainingSeconds: number,
) {
  return {
    id: ACTIVE_SESSION_ID,
    moduleId,
    startedAt: new Date().toISOString(),
    durationMinutes,
    remainingSeconds,
  };
}

function Practice() {
  const [mins, setMins] = useState(10);
  const totalMinutes = mins;
  const [sessionState, setSessionState] =
    useState<SessionState>("IDLE");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [bellMode, setBellMode] = useState<BellMode>("both");
  const [practiceHistory, setPracticeHistory] =
    useState<PracticeHistoryEntry[]>([]);
  const completionTriggeredRef = useRef(false);
  // --- MOBILE RESPONSIVENESS STATE ---
  const [isMobile, setIsMobile] = useState(false);
  // --- RESPONSIVE: DETECT MOBILE WIDTH ---
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 480);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const module = (location.state as PracticeLocationState | null)?.module;
  const { addSession } = useProgress();

  const activeModuleId = String(
    module?.id ?? "general",
  );

  const currentStage =
    Number(
      localStorage.getItem(
        "current-shamatha-stage"
      )
    ) || 1;

  const stageProfile =
    getStageProfile(currentStage);

  const meditationRecommendation =
    generateMeditationRecommendation(
      practiceHistory.map<PracticeSession>(
        (entry, index) => ({
          id: `${entry.date}-${index}`,
          moduleId: activeModuleId,
          startedAt: entry.date,
          completedAt: entry.date,
          durationMinutes:
            entry.durationMinutes,
          reflection: entry.reflection,
          mood: entry.mood,
        }),
      ),
    );

  const shouldShowSupportSections =
    sessionState !== "COMPLETED";

  const hasRecordedRef = useRef(false);
  const startBellTimeoutRef = useRef<number | null>(null);
  const endBellTimeoutRef = useRef<number | null>(null);

  const clearBellTimeouts = () => {
    if (startBellTimeoutRef.current !== null) {
      window.clearTimeout(startBellTimeoutRef.current);
      startBellTimeoutRef.current = null;
    }
    if (endBellTimeoutRef.current !== null) {
      window.clearTimeout(endBellTimeoutRef.current);
      endBellTimeoutRef.current = null;
    }
  };

  const persistUpdatedHistory = (
    history: PracticeHistoryEntry[],
  ) => {
    const normalizedHistory = history.slice(
      0,
      MAX_HISTORY_ENTRIES,
    );

    setPracticeHistory(normalizedHistory);
    persistPracticeHistory(normalizedHistory);
  };

  const playBell = () => {
    const audio = new Audio("/bell.mp3");
    audio.volume = 0.6;
    void audio.play().catch(() => {
      // Browsers may block audio if the user has not interacted recently.
    });
  };

  const playEndBell = () => {
    playBell();
    endBellTimeoutRef.current = window.setTimeout(playBell, 800);
  };

  const recordCompletion = () => {
    if (hasRecordedRef.current) return;

    addSession(mins);

    const nextEntry: PracticeHistoryEntry = {
      date: new Date().toISOString(),
      durationMinutes: totalMinutes,
      practiceType:
        module?.title || "Breath Awareness",
    };

    const updatedHistory = [
      nextEntry,
      ...practiceHistory,
    ];

    appendSession({
      id: crypto.randomUUID(),
      moduleId: activeModuleId,
      startedAt: nextEntry.date,
      completedAt: nextEntry.date,
      durationMinutes: totalMinutes,
    });

    persistUpdatedHistory(updatedHistory);

    hasRecordedRef.current = true;
  };

  const startSession = () => {
    clearBellTimeouts();
    hasRecordedRef.current = false;
    completionTriggeredRef.current = false;
    setSecondsLeft(totalMinutes * 60);
    setSessionState("ACTIVE");

    persistActiveSession(
      buildPersistedSession(
        activeModuleId,
        totalMinutes,
        totalMinutes * 60,
      ),
    );

    if (bellMode === "both") {
      startBellTimeoutRef.current = window.setTimeout(playBell, 3000);
    }
  };

  const endSession = () => {
  clearBellTimeouts();

  completionTriggeredRef.current = true;

  clearPersistedActiveSession();

  if (bellMode === "both" || bellMode === "end") {
    playEndBell();
  }

  setSessionState("COMPLETED");
  setSecondsLeft(0);

  recordCompletion();
};

  const closeCompletionModal = () => {
    setSessionState("IDLE");
    setSecondsLeft(0);
    completionTriggeredRef.current = false;
    clearPersistedActiveSession();
  };

  useEffect(() => {
    if (sessionState !== "ACTIVE") return undefined;

    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) {
          const nextValue = prev - 1;
          persistActiveSession(
            buildPersistedSession(
              activeModuleId,
              totalMinutes,
              nextValue,
            ),
          );
          return nextValue;
        }

        if (
  completionTriggeredRef.current
) {
  return 0;
}

completionTriggeredRef.current = true;

window.clearInterval(timer);

clearPersistedActiveSession();

if (bellMode === "both" || bellMode === "end") {
  playEndBell();
}

recordCompletion();

window.setTimeout(() => {
  setSessionState("COMPLETED");
}, 50);

return 0;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [
    activeModuleId,
    addSession,
    bellMode,
    sessionState,
    totalMinutes,
    practiceHistory,
  ]);

  useEffect(() => {
    return () => {
      clearBellTimeouts();
    };
  }, []);

  useEffect(() => {
    setPracticeHistory(loadPracticeHistory());
  }, []);

  useEffect(() => {
    const persistedSession =
      loadPersistedActiveSession();

    if (!persistedSession) {
      return;
    }

    if (
      persistedSession.remainingSeconds <= 0
    ) {
      clearPersistedActiveSession();
      return;
    }

    if (
      typeof persistedSession.durationMinutes !==
      "number"
    ) {
      clearPersistedActiveSession();
      return;
    }

    if (
      typeof persistedSession.remainingSeconds !==
      "number"
    ) {
      clearPersistedActiveSession();
      return;
    }

    setMins(persistedSession.durationMinutes);

    setSecondsLeft(
      persistedSession.remainingSeconds,
    );

    setSessionState("ACTIVE");
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };
  const shouldShowActiveMeditation =
  sessionState === "ACTIVE";

  return (
  <PageShell>
  <div
    style={{
      paddingBottom:
        sessionState === "COMPLETED"
          ? "110px"
          : "32px",
    }}
  >
{shouldShowActiveMeditation && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 100,
      background:
        "rgba(2, 6, 20, 0.72)",
      backdropFilter: "blur(18px)",
      WebkitBackdropFilter: "blur(18px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <ActiveMeditationView
      timeRemaining={formatTime(secondsLeft)}
      onEndSession={endSession}
    />
  </div>
)}
      <>
        <div
  style={{
    marginBottom: "26px",
  }}
>
  <PageHeader
    eyebrow="Practice"
    title="Practice"
    subtitle="Choose a length and settle into the practice."
  />
</div>
        {module && (
          <div className="stage-context" style={{ marginTop: "4px" }}>
            <h2>{module.title}</h2>
            <ContemplativeText
              style={{
  fontSize: "0.96rem",
  lineHeight: 1.75,
  opacity: 0.88,
}}
            >
              {module.what ?? module.description}
            </ContemplativeText>
          </div>
        )}

        <section style={{ marginTop: "0px" }}>
            <ContemplativeCard
  style={{
    padding: "24px",
    overflowX: "hidden",
    boxSizing: "border-box",
    marginBottom:
      sessionState === "COMPLETED"
        ? "72px"
        : "0px",
  }}
>

            {sessionState === "COMPLETED" && (
              <>
                <div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "14px",
    marginBottom: "8px",
  }}
>
  <h2
    className="complete-title"
    style={{
      margin: 0,
      opacity: 0.86,
      letterSpacing: "0.015em",
      fontWeight: 500,
    }}
  >
    Sitting Complete
  </h2>

  <ContemplativeText
    style={{
      maxWidth: "420px",
      textAlign: "center",
      fontSize: "0.94rem",
      lineHeight: 1.95,
      opacity: 0.66,
    }}
  >
    Remain quietly with the after-feeling of the sitting for a few moments.
  </ContemplativeText>
</div>
                <div
                  style={{
                    width: "100%",
                    overflowX: "hidden",
                    boxSizing: "border-box",
                  }}
                >
                  <MeditationDurationControl
                    mins={mins}
                    setMins={setMins}
                    isMobile={isMobile}
                  />
                </div>
                <AppButton
  variant="primary"
  fullWidth
  onClick={startSession}
  style={{
    marginTop: "10px",
    opacity: 0.9,
  }}
>
  Begin Practice
</AppButton>
              </>
            )}

            {/* Move CTA (durationPicker + Enter Practice) to bottom of card */}
            {shouldShowSupportSections && (
              <>
                <div
                  style={{
                    width: "100%",
                    overflowX: "hidden",
                    boxSizing: "border-box",
                  }}
                >
                  <MeditationDurationControl
                    mins={mins}
                    setMins={setMins}
                    isMobile={isMobile}
                  />
                </div>
                <AppButton
                  variant="primary"
                  fullWidth
                  onClick={startSession}
                  style={{
                    marginTop: "12px",
                    opacity: 0.88,
                    letterSpacing: "0.02em",
                    transition: "all 300ms ease"
                  }}
                >
                  Enter Practice
                </AppButton>
              </>
            )}
          </ContemplativeCard>
        </section>

        {/* Practice Field section: move to first after main card */}
        {shouldShowSupportSections && (
          <section style={{ marginTop: "18px" }}>
            <ContemplativeCard
              padding="20px"
              style={{
                background:
                  "linear-gradient(180deg, rgba(10,18,40,0.52), rgba(5,10,24,0.34))",
                backdropFilter: "blur(10px)",
                opacity: 0.97,
                transform: "translateY(0px)",
                transition: "opacity 900ms ease, transform 900ms ease",
                animation: "practiceFieldBreath 6s ease-in-out infinite"
              }}
            >
              <SectionHeading title="Practice Field" />

              <div
                style={{
                  marginTop: "14px",
                  marginBottom: "10px",
                  fontSize: "0.96rem",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.82)",
                  lineHeight: 1.5,
                }}
              >
                Current Stage {stageProfile.stage} — {stageProfile.title}
              </div>

              <ContemplativeText
                style={{
                  lineHeight: 1.75,
                  marginBottom: "14px",
                  fontSize: "0.98rem",
                }}
              >
                {stageProfile.trainingGoal}
              </ContemplativeText>

              <div
                style={{
                  fontSize: "0.72rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.42)",
                  marginBottom: "6px",
                }}
              >
                Suggested tone
              </div>

              <ContemplativeText
                style={{
                  fontSize: "0.96rem",
                  lineHeight: 1.7,
                }}
              >
                {stageProfile.guidanceTone}
              </ContemplativeText>
            </ContemplativeCard>
          </section>
        )}

        {/* PracticeRecommendationCard section: now second */}
        {shouldShowSupportSections && (
          <section style={{ marginTop: "18px" }}>
            <PracticeRecommendationCard
              recommendedPracticeType={
                meditationRecommendation?.recommendedPracticeType
              }
              rationale={
                meditationRecommendation?.rationale
              }
              recommendedDurationMinutes={
                meditationRecommendation?.recommendedDurationMinutes
              }
            />
          </section>
        )}

        {/* Support section: now third / last */}
        {shouldShowSupportSections && (
          <section style={{ marginTop: "18px" }}>
            <ContemplativeCard
              padding="18px"
              style={{
                background:
                  "linear-gradient(180deg, rgba(8,12,22,0.34), rgba(5,8,18,0.22))",
                border: "1px solid rgba(255,255,255,0.045)",
                backdropFilter: "blur(8px)",
              }}
            >
              <SectionHeading title="Support" />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: "14px",
                  paddingBottom: "16px",
                  borderBottom:
                    "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <p
                  className="practice-label"
                  style={{
                    opacity: 0.74,
                    fontSize: "0.9rem",
                  }}
                >
                  Bell
                </p>
                <div
                  style={{
                    transform: "scale(1.08)",
                    transformOrigin: "left center",
                  }}
                >
                  <OptionSelector
                    options={bellOptions.map((option) => ({
                      label: option.label,
                      value: option.value,
                    }))}
                    selectedValue={bellMode}
                    onSelect={(value) =>
                      setBellMode(value as BellMode)
                    }
                    compact
                  />
                </div>
              </div>

              <div
                style={{
                  paddingTop: "14px",
                  opacity: 0.92,
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <AmbientAudioPanel />
              </div>
            </ContemplativeCard>
          </section>
        )}

        <SessionCompletionModal
          open={sessionState === "COMPLETED"}
          durationMinutes={totalMinutes}
          onClose={closeCompletionModal}
          onSave={({ reflection, mood }) => {
            setPracticeHistory((previous) => {
              if (previous.length === 0) {
                return previous;
              }

              const updated = [...previous];

              updated[0] = {
                ...updated[0],
                reflection,
                mood,
              };

              const normalizedUpdatedHistory =
                updated.slice(
                  0,
                  MAX_HISTORY_ENTRIES,
                );

              persistPracticeHistory(
                normalizedUpdatedHistory,
              );

              return normalizedUpdatedHistory;
            });

            // session restart intentionally removed (handled by session flow controller)
          }}
        />
      </>
    </div>
    </PageShell>
  );
}

export default Practice;
