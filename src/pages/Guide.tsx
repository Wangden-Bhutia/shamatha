import ContemplativeCard from "../components/ContemplativeCard";
import ContemplativeText from "../components/ContemplativeText";
import { GuidedMeditationPlayer } from "../components/GuidedMeditationPlayer";
import PageHeader from "../components/PageHeader";
import PageShell from "../components/ui/PageShell";

function Guide() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Guide"
        title="Contemplative orientation."
        subtitle="Gentle instruction and guided support for your practice."
      />

      <ContemplativeCard>
        <ContemplativeText>
          You do not need to prepare anything.
          Just sit quietly for a moment,
          and let attention settle on its own.
        </ContemplativeText>
      </ContemplativeCard>

      <ContemplativeText
        style={{
          marginTop: "16px",
          marginBottom: "8px",
          opacity: 0.6,
          fontSize: "0.9rem",
          textAlign: "center",
        }}
      >
        When ready, begin.
      </ContemplativeText>

      <GuidedMeditationPlayer />
    </PageShell>
  );
}

export default Guide;
