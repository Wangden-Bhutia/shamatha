import { useNavigate } from "react-router-dom";
import ContemplativeCard from "../components/ContemplativeCard";
import { ContemplativeButton } from "../components/ContemplativeButton";
import PageShell from "../components/ui/PageShell";
function Index() {
  const navigate = useNavigate();

  return (
  <PageShell>
    <div
      style={{
        position: "fixed",
        inset: 0,
        bottom: "72px",
        overflow: "hidden",
        boxSizing: "border-box",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "12px 18px 8px",
      }}
    >
      <main
        style={{
          width: "100%",
          maxWidth: "460px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
          gap: "18px",
        }}
      >
        <header
          style={{
            textAlign: "center",
            textShadow:
              "0 3px 14px rgba(0,0,0,0.6)",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2.6rem, 12vw, 4.2rem)",
              fontWeight: 400,
              letterSpacing: "0",
              margin: 0,
              color: "#BFA86A",
              fontFamily: "'Georgia', serif",
              fontStyle: "italic",
              lineHeight: 1,
            }}
          >
            Shamatha
          </h1>
          <p
            style={{
              marginTop: "10px",
              marginBottom: 0,
              opacity: 0.55,
              color: "rgba(255,255,255,0.75)",
              fontStyle: "italic",
              fontFamily: "'Georgia', serif",
              fontWeight: 300,
              fontSize: "1rem",
              lineHeight: 1.5,
            }}
          >
            The Nine Stages of Calm Abiding
          </p>
        </header>

        <ContemplativeCard padding="16px">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <ContemplativeButton
              variant="primary"
              onClick={() => navigate("/practice")}
              style={{ width: "100%" }}
            >
              Start Practice
            </ContemplativeButton>

            <ContemplativeButton
              variant="secondary"
              onClick={() => navigate("/shamatha")}
              style={{ width: "100%" }}
            >
              What is Shamatha?
            </ContemplativeButton>

            <ContemplativeButton
              variant="secondary"
              onClick={() => navigate("/path")}
              style={{ width: "100%" }}
            >
              The 9 Stages of Shamatha
            </ContemplativeButton>

            <ContemplativeButton
              variant="ghost"
              onClick={() => navigate("/assessment")}
              style={{ width: "100%" }}
            >
              Find My Stage
            </ContemplativeButton>
          </div>
        </ContemplativeCard>

        <div
          style={{
            textAlign: "center",
            fontSize: "0.72rem",
            letterSpacing: "0.08em",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          A StillMind Labs creation
        </div>
      </main>
    </div>
  </PageShell>
  );
}

export default Index;
