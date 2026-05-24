import { useState } from "react";
import ContemplativeCard from "../components/ContemplativeCard";
import ContemplativeText from "../components/ContemplativeText";
import { GuidedMeditationPlayer } from "../components/GuidedMeditationPlayer";
import PageHeader from "../components/PageHeader";
import PageShell from "../components/ui/PageShell";
import WhatHappens from "./WhatHappens";

function Library() {
  const [isWhatHappensOpen, setIsWhatHappensOpen] = useState(false);

  return (
    <PageShell>

      <div
        style={{
          marginTop: "20px",
          marginBottom: "8px",
        }}
      >
        <PageHeader
          eyebrow="Guide"
          title="Guided Practice"
          subtitle="A quiet place for instruction, study, and supportive guidance."
        />
      </div>
      <ContemplativeCard
        style={{
          marginTop: "8px",
          padding: "30px 28px",
          background:
            "linear-gradient(180deg, rgba(10,18,40,0.54), rgba(5,10,24,0.42))",
          backdropFilter: "blur(8px)",
        }}
      >
        <ContemplativeText
          style={{
            fontSize: "1.08rem",
            lineHeight: 1.95,
            color: "rgba(255,255,255,0.88)",
            fontStyle: "italic",
            textAlign: "left",
            margin: 0,
          }}
        >
          Practice remains simple.
          <br />
          <br />
          Guidance and study live here so they can be approached
          slowly, quietly, and without competing with the act of
          sitting itself.
        </ContemplativeText>
      </ContemplativeCard>

      <div
        style={{
          marginTop: "26px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
      <ContemplativeCard
        style={{
          marginTop: "6px",
          padding: isWhatHappensOpen ? "14px 16px" : "10px 14px",
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.06)",
          cursor: "pointer",
          marginBottom: isWhatHappensOpen ? "8px" : "0px",
          transition: "all 0.25s ease",
        }}
      >
        {/* Header Row */}
        <div
          onClick={() => setIsWhatHappensOpen(!isWhatHappensOpen)}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ContemplativeText
  style={{
    fontSize: "0.95rem",
    fontWeight: 500,
    color: "#BFA86A",
    opacity: 1,
  }}
>
  What Happens in Meditation
</ContemplativeText>

          <div
           style={{
           fontSize: "1.1rem",
           opacity: 0.7,
           transition: "0.2s ease",
           lineHeight: 1,
         }}
        >
  {isWhatHappensOpen ? "–" : "+"}
</div>
        </div>

        {/* Collapsible Content */}
        {isWhatHappensOpen && (
          <div style={{ marginTop: "10px" }}>
            <WhatHappens />
          </div>
        )}
      </ContemplativeCard>
      <ContemplativeCard
        style={{
          marginTop: "8px",
          padding: "14px 16px",
          background:
            "linear-gradient(180deg, rgba(10,18,40,0.50), rgba(5,10,24,0.35))",
          backdropFilter: "blur(8px)",
        }}
      >
        <ContemplativeText
          style={{
            fontSize: "0.95rem",
            lineHeight: 1.9,
            opacity: 0.78,
            marginBottom: "10px",
          }}
        >
          Current Rhythm
        </ContemplativeText>

        <ContemplativeText
          style={{
            fontSize: "0.92rem",
            lineHeight: 1.9,
            opacity: 0.72,
          }}
        >
          Practice develops through gentle repetition, not pressure or perfection.
          Each sitting is simply a return — nothing to complete, nothing to achieve.
          The rhythm of practice unfolds on its own when attention is allowed to settle.
        </ContemplativeText>
      </ContemplativeCard>
        <div style={{ marginTop: "8px" }}>
          <GuidedMeditationPlayer />
        </div>
      </div>
    </PageShell>
  );
}

export default Library;
