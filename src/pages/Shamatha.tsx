import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GlassCard } from "../components/GlassCard";
import { ContemplativePageLayout } from "../components/ContemplativePageLayout";
import { PageSection } from "../components/PageSection";

const symbolismCards = [
  {
    title: "Elephant",
    emoji: "🐘",
    description:
      "The elephant represents the mind itself. At the beginning it is dark, heavy, and resistant, showing dullness and lack of clarity. As training deepens, it becomes lighter, reflecting increasing stability and brightness of awareness.",
    glow: "radial-gradient(circle at top, rgba(120,120,160,0.22), transparent 72%)",
  },
  {
    title: "Monkey",
    emoji: "🐒",
    description:
      "The monkey stands for restlessness. It pulls the elephant toward distraction, showing how easily attention is carried away by thoughts and impulses.",
    glow: "radial-gradient(circle at top, rgba(210,140,70,0.22), transparent 72%)",
  },
  {
    title: "Rabbit",
    emoji: "🐇",
    description:
      "The rabbit symbolizes subtle dullness — a quiet but obscuring lack of sharpness that remains even after gross distraction fades.",
    glow: "radial-gradient(circle at top, rgba(180,180,220,0.18), transparent 72%)",
  },
  {
    title: "Fire",
    emoji: "🔥",
    description:
      "The fire along the path represents effort. Early on it burns intensely, but as familiarity grows the effort becomes calmer and more refined.",
    glow: "radial-gradient(circle at top, rgba(255,120,40,0.24), transparent 72%)",
  },
  {
    title: "Monk, Rope, Hook",
    emoji: "🧘",
    description:
      "The monk represents the practitioner. The rope symbolizes mindfulness — holding attention steadily. The hook symbolizes introspective awareness that notices distraction and gently corrects it.",
    glow: "radial-gradient(circle at top, rgba(220,200,140,0.18), transparent 72%)",
  },
];

const summaryCard = {
  title: "Summary",
  emoji: "✨",
  description:
    "As the path unfolds, restlessness and dullness are gradually overcome. The monkey disappears, the elephant becomes fully clear, and the mind no longer chases but rides in steady lucid attention.",
  glow:
    "radial-gradient(circle at top, rgba(255,255,255,0.14), transparent 72%)",
};

const contemplativeNavButtonStyle = {
  border: "none",
  background: "transparent",
  color: "rgba(255,255,255,0.78)",
  fontSize: "1rem",
  letterSpacing: "0.04em",
  cursor: "pointer",
} as const;

const navigationDotStyle = {
  height: "10px",
  borderRadius: "999px",
  border: "none",
  transition: "all 260ms ease",
  cursor: "pointer",
  padding: 0,
} as const;

const Shamatha = () => {
  const navigate = useNavigate();

  const [currentCardIndex, setCurrentCardIndex] =
    useState(0);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const allCards = [
    ...symbolismCards,
    summaryCard,
  ];


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            if (!isNaN(index)) {
              setCurrentCardIndex(index);
            }
          }
        });
      },
      {
        threshold: 0.6,
      }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <ContemplativePageLayout
      title="What is Shamatha?"
      subtitle="A symbolic introduction to calm abiding and the transformation of attention through Shamatha practice."
    >
      <style>
        {`
          @keyframes fadeSymbolismCard {
            from {
              opacity: 0;
              transform: translateY(10px);
            }

            to {
              opacity: 1;
              transform: translateY(0px);
            }
          }
        `}
      </style>
      <PageSection>
        <div
          style={{
            maxWidth: "880px",
            margin: "0 auto",
          }}
        >
        <GlassCard
          subdued
          padding="28px"
          style={{
            backdropFilter: "blur(8px)",
            background:
              "linear-gradient(to bottom, rgba(10,18,40,0.58), rgba(5,10,24,0.72))",
            border:
              "1px solid rgba(255,255,255,0.08)",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.45)",
          }}
        >
          <div
            style={{
              position: "relative",
              marginBottom: "42px",
              overflow: "hidden",
              borderRadius: "18px",
            }}
          >
            <img
              src="/shamatha.png"
              alt="Shamatha symbolic progression"
              style={{
                width: "100%",
                display: "block",
                filter: "brightness(0.98) contrast(1.04)",
                boxShadow: "0 18px 50px rgba(0,0,0,0.42)",
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.04), rgba(0,0,0,0.24))",
                pointerEvents: "none",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {allCards.map((card, index) => {
              const isActive = index === currentCardIndex;

              return (
                <div
                  key={card.title}
                  data-index={index}
                  ref={(el) => (cardRefs.current[index] = el)}
                  style={{
                    minHeight: "340px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    animation: isActive ? "fadeSymbolismCard 520ms ease" : "none",
                    transition: "opacity 520ms ease",
                    background: card.glow,
                    borderRadius: "22px",
                    padding: "28px",
                    opacity: isActive ? 1 : 0.55,
                    transform: isActive ? "scale(1)" : "scale(0.98)",
                  }}
                >
                  <h2
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginTop: 0,
                      marginBottom: "24px",
                      color: "#E7D7A2",
                      fontSize: "2rem",
                      lineHeight: 1.2,
                    }}
                  >
                    <span>{card.emoji}</span>
                    {card.title}
                  </h2>

                  <p
                    style={{
                      margin: 0,
                      lineHeight: 2.05,
                      letterSpacing: "0.01em",
                      fontSize: "1.14rem",
                      maxWidth: "760px",
                      fontStyle: "italic",
                      color: "rgba(255,255,255,0.92)",
                      fontWeight: 300,
                    }}
                  >
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </GlassCard>
        </div>
      </PageSection>
    </ContemplativePageLayout>
  );
};

export default Shamatha;
