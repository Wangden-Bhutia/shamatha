import ContemplativeCard from "../components/ContemplativeCard";
import ContemplativeText from "../components/ContemplativeText";
import PageHeader from "../components/PageHeader";
import PageShell from "../components/ui/PageShell";
import { SectionHeading } from "../components/SectionHeading";
import { getStageProfile } from "../domain/stages/stageProfiles";
import {
  loadPracticeHistory,
} from "../hooks/usePracticePersistence";

function Reflections() {
  const practiceHistory =
    loadPracticeHistory();

  const currentStage =
    Number(
      localStorage.getItem(
        "current-shamatha-stage"
      )
    ) || 1;

  const profile = getStageProfile(currentStage);

  const recentReflections =
    practiceHistory
      .filter(
        (entry) =>
          entry.reflection &&
          entry.reflection.trim().length > 0,
      )
      .slice(0, 8)
      .reverse();

  return (
    <PageShell>
      <div
        style={{
          marginBottom: "28px",
        }}
      >
        <PageHeader
          eyebrow="Reflections"
          title="Contemplation."
          subtitle="A quiet place for what remains after practice."
        />
      </div>

      <ContemplativeCard
        style={{
          marginBottom: "28px",
          background:
            "linear-gradient(180deg, rgba(10,18,40,0.52), rgba(5,10,24,0.36))",
          backdropFilter: "blur(10px)",
        }}
      >
        <SectionHeading title="Current Terrain" />

        <div
          style={{
            marginTop: "18px",
            marginBottom: "20px",
            fontSize: "1.02rem",
            fontWeight: 500,
            color: "rgba(255,255,255,0.94)",
            lineHeight: 1.6,
          }}
        >
          Stage {profile.stage} — {profile.title}
        </div>

        <ContemplativeText
          style={{
            lineHeight: 1.95,
            marginBottom: "18px",
          }}
        >
          {profile.dominantChallenge}
          <br />
          <br />
          The practice now is simply learning how to
          remain gentle and present with the mind as it is.
        </ContemplativeText>

        <div
          style={{
            fontSize: "0.78rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.48)",
            marginBottom: "8px",
          }}
        >
          For now
        </div>

        <ContemplativeText>
          {profile.encouragement}
        </ContemplativeText>
      </ContemplativeCard>

      {practiceHistory.length === 0 && (
        <ContemplativeCard>
          <SectionHeading title="Nothing here yet" />
          <ContemplativeText>
            After a few sittings, quiet reflections and
            small patterns in practice will begin appearing here.
          </ContemplativeText>
        </ContemplativeCard>
      )}

      {practiceHistory.length > 0 && (
        <>
          <ContemplativeCard
            style={{
              marginBottom: "28px",
            }}
          >
            <SectionHeading title="Recent Reflections" />

            {recentReflections.length > 0 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0",
                  marginTop: "22px",
                }}
              >
                {recentReflections.map(
                  (reflection, index) => (
                    <div
                      key={`${reflection.date}-${index}`}
                      style={{
                        padding:
                          index === 0
                            ? "0 0 30px"
                            : "30px 0",
                        borderBottom:
                          index ===
                          recentReflections.length - 1
                            ? "none"
                            : "1px solid rgba(255,255,255,0.045)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.72rem",
                          opacity: 0.28,
                          marginBottom: "14px",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {new Date(
                          reflection.date,
                        ).toLocaleDateString()}
                      </div>

                      <ContemplativeText>
                        “{reflection.reflection}”
                      </ContemplativeText>
                    </div>
                  ),
                )}
              </div>
            ) : (
              <ContemplativeText
                style={{
                  marginTop: "22px",
                }}
              >
                Reflections from practice will slowly gather here over time.
              </ContemplativeText>
            )}
          </ContemplativeCard>

          <ContemplativeCard>
            <SectionHeading title="Quiet Patterns" />

            <ContemplativeText
              style={{
                marginTop: "18px",
                lineHeight: 1.9,
                opacity: 0.75,
              }}
            >
              Progress is rarely linear. What appears here are subtle tendencies, not achievements.
            </ContemplativeText>
          </ContemplativeCard>
        </>
      )}
    </PageShell>
  );
}

export default Reflections;
