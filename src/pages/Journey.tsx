import ContemplativeCard from "../components/ContemplativeCard";
import ContemplativeText from "../components/ContemplativeText";
import { SectionHeading } from "../components/SectionHeading";
import PageShell from "../components/ui/PageShell";
import PageHeader from "../components/PageHeader";
import { useProgress } from "../hooks/useProgress";
import { useStageProgression } from "../application/useStageProgression";
import { useRecalibrationPrompt } from "../application/useRecalibrationPrompt";
import { useStageAssessmentFlow } from "../application/useStageAssessmentFlow";
function Journey() {
  useProgress();

  const {
    sessionCount,
  } = useStageProgression();

  const {
    isVisible,
    acceptRecalibration,
    declineRecalibration,
  } = useRecalibrationPrompt();

  const assessment = useStageAssessmentFlow();
  const {
    suggestedStage,
    stabilitySignal,
    confidence,
    requiresAlignmentReview,
  } = assessment;

  return (
    <PageShell>
      <PageHeader
        eyebrow="Journey"
        title="Practice Continuum."
        subtitle="A quiet trace of practice unfolding over time."
      />

      <ContemplativeCard
        style={{
          marginBottom: "18px",
          background:
            "linear-gradient(180deg, rgba(10,18,40,0.42), rgba(5,10,24,0.26))",
          backdropFilter: "blur(8px)",
        }}
      >
        <SectionHeading title="Practice Continuum" />

        <ContemplativeText
          style={{
            marginTop: "12px",
            fontSize: "0.95rem",
            opacity: 0.75,
            lineHeight: 1.8,
          }}
        >
          Foundations emerging • {sessionCount} session{sessionCount === 1 ? "" : "s"}
        </ContemplativeText>
      </ContemplativeCard>

      <ContemplativeCard
        style={{
          marginBottom: "18px",
          background:
            "linear-gradient(180deg, rgba(10,18,40,0.42), rgba(5,10,24,0.26))",
          backdropFilter: "blur(8px)",
        }}
      >
        <SectionHeading title="Stage Insight" />

        <ContemplativeText
          style={{
            marginTop: "12px",
            fontSize: "0.92rem",
            opacity: 0.78,
            lineHeight: 1.8,
          }}
        >
          Stability: {stabilitySignal}
          <br />
          Confidence: emerging
          <br />
          Suggested Alignment: Stage {suggestedStage}
        </ContemplativeText>
      </ContemplativeCard>

      {requiresAlignmentReview && (
        <ContemplativeCard
          style={{
            marginBottom: "18px",
            background:
              "linear-gradient(180deg, rgba(10,18,40,0.42), rgba(5,10,24,0.26))",
            backdropFilter: "blur(8px)",
          }}
        >
          <SectionHeading title="Alignment Check-in" />

          <ContemplativeText
            style={{
              marginTop: "12px",
              fontSize: "0.92rem",
              opacity: 0.78,
              lineHeight: 1.8,
            }}
          >
            Your practice pattern suggests a possible mismatch between perceived stability and observed consistency.
            You may choose to review your current stage alignment.
          </ContemplativeText>

          <div
            style={{
              marginTop: "14px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <button
              onClick={acceptRecalibration}
              style={{
                background: "none",
                border: "none",
                color: "var(--accent-color)",
                cursor: "pointer",
                opacity: 0.85,
                fontSize: "0.9rem",
                textAlign: "left",
              }}
            >
              Review alignment
            </button>

            <button
              onClick={declineRecalibration}
              style={{
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.6)",
                cursor: "pointer",
                fontSize: "0.9rem",
                textAlign: "left",
              }}
            >
              Not now
            </button>
          </div>
        </ContemplativeCard>
      )}

      {isVisible && (
        <ContemplativeCard
          style={{
            marginBottom: "18px",
            background:
              "linear-gradient(180deg, rgba(10,18,40,0.42), rgba(5,10,24,0.26))",
            backdropFilter: "blur(8px)",
          }}
        >
          <SectionHeading title="Recalibration" />

          <ContemplativeText
            style={{
              marginTop: "12px",
              fontSize: "0.92rem",
              opacity: 0.75,
              lineHeight: 1.8,
            }}
          >
            Your practice pattern suggests a possible shift in attentional stability.
            You may choose to re-check your current stage or continue as you are.
          </ContemplativeText>

          <div
            style={{
              marginTop: "14px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <button
              onClick={declineRecalibration}
              style={{
                background: "none",
                border: "none",
                color: "var(--accent-color)",
                cursor: "pointer",
                opacity: 0.8,
                fontSize: "0.9rem",
                textAlign: "left",
              }}
            >
              Continue current path
            </button>

            <button
              onClick={acceptRecalibration}
              style={{
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.6)",
                cursor: "pointer",
                fontSize: "0.9rem",
                textAlign: "left",
              }}
            >
              Revisit stage alignment
            </button>
          </div>
        </ContemplativeCard>
      )}

      <ContemplativeCard
        style={{
          marginBottom: "18px",
          background:
            "linear-gradient(180deg, rgba(10,18,40,0.42), rgba(5,10,24,0.26))",
          backdropFilter: "blur(8px)",
        }}
      >
        <SectionHeading title="The Stages" />

        <ContemplativeText
          style={{
            marginTop: "14px",
            lineHeight: 1.9,
            fontSize: "0.98rem",
            opacity: 0.9,
          }}
        >
          The stages are not ranks to achieve,
          but changing patterns of attention
          that unfold gradually through practice.
          <br />
          <br />
          Practice rarely moves in a straight line.
          Returning gently is already part of the path.
        </ContemplativeText>
      </ContemplativeCard>
    </PageShell>
  );
}

export default Journey;
