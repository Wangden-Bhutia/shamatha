import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../components/ui/PageShell";
import { modules } from "../data/modules";
import { StageCard } from "../components/ui/StageCard";
import designTokens from "../theme/designTokens";

function Path() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const railRef = useRef<HTMLElement | null>(null);
  const current = modules[index];

  useEffect(() => {
    const rail = railRef.current;

    if (!rail) return;

    const activeButton = rail.querySelector(
      ".stage-dot--active"
    ) as HTMLElement | null;

    if (!activeButton) return;

    activeButton.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [index]);

  const recommendedStage = Number(localStorage.getItem("recommendedStage"));
  const recommendedModule = modules.find(
    (m) => m.id === recommendedStage
  );

  const openStage = (stageId: number | string) => {
    localStorage.setItem("currentStage", String(stageId));
    navigate(`/stage/${stageId}`);
  };

  return (
    <PageShell>
      <section className="path-page">
        <h1
          className="page-title"
          style={{
            color: designTokens.colors.gold
          }}
        >
          The 9 Stages of Shamatha
        </h1>
        <div style={{ marginTop: "6px" }}>
          {recommendedModule && (
            <p
              className="path-recommendation"
              style={{
                opacity: designTokens.opacity.soft,
                fontSize: designTokens.typography.body.fontSize,
                fontWeight: 400,
                letterSpacing: designTokens.typography.subtitle.letterSpacing,
              }}
            >
              Next suggested stage: {recommendedModule.title}
            </p>
          )}
        </div>

        <div className="stage-rail-wrapper">
           <nav
            ref={railRef}
            className="stage-rail"
            aria-label="Stages"
          >
          {modules.map((stage, stageIndex) => (
            <button
              key={stage.id}
              type="button"
              className={stage.id === current.id ? "stage-dot stage-dot--active" : "stage-dot"}
              title={stage.title}
              onClick={() => setIndex(stageIndex)}
              aria-label={stage.title}
              aria-current={stage.id === current.id ? "step" : undefined}
            >
              {stage.id}
            </button>
          ))}
        </nav>
        </div>
        
        <StageCard
          level={current.level ?? current.id}
          title={current.title}
          description={current.description}
          symbolicLine={current.symbolicLine}
          onOpen={() => openStage(current.id)}
        />

        
      </section>
    </PageShell>
  );
}

export default Path;
