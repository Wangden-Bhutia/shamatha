import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { modules } from "../data/modules";
import backgroundImg from "../assets/background.jpeg";
import designTokens from "../theme/designTokens";

const stageIcons: Record<number, string> = {
  1: "🌊",
  2: "✦",
  3: "◇",
  4: "○",
  5: "◈",
  6: "☾",
  7: "💧",
  8: "🪷",
  9: "✨"
};

const stageSymbolism: Record<number, string> = {
  1: "The waterfall mind — attention rushes uncontrollably toward distraction.",
  2: "The flickering star — moments of attention begin appearing between distraction.",
  3: "The open diamond — attention stabilizes briefly but still collapses frequently.",
  4: "The circle — continuity of attention begins forming more naturally.",
  5: "The centered jewel — awareness becomes clearer and more balanced.",
  6: "The moon — calmness deepens and subtle dullness becomes visible.",
  7: "The water drop — attention becomes gentle, continuous, and less effortful.",
  8: "The lotus — stability and clarity mature into serenity and pliancy.",
  9: "The radiant star — attention rests naturally in vivid calm abiding."
};

function Stage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const module = modules.find(
    (m) => Number(m.id) === Number(id)
  );
  const [index, setIndex] = useState(0);
  const [pulseKey, setPulseKey] = useState(0);
  const [isIdle, setIsIdle] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0); 
  const [direction, setDirection] = useState<"left" | "right">("left");

  useEffect(() => {
    let timer: any;

    const resetIdle = () => {
      setIsIdle(false);
      clearTimeout(timer);

      timer = setTimeout(() => {
        setIsIdle(true);
      }, 4000);
    };

    const events = ["mousemove", "keydown", "scroll", "touchstart"];

    events.forEach((event) =>
      window.addEventListener(event, resetIdle)
    );

    resetIdle();

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, resetIdle)
      );
      clearTimeout(timer);
    };
  }, []);

  if (!module) {
    return (
      <div style={{ padding: "20px", position: "relative" }}>
        <div style={{ position: "absolute", top: "26px", left: "16px" }}>
          <button
            onClick={() => navigate("/path")}
            style={{
              width: "42px",
              height: "42px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.10)",
              background: "rgba(18,22,34,0.28)",
              backdropFilter: "blur(10px)",
              color: "rgba(255,255,255,0.88)",
              boxShadow: "0 3px 10px rgba(0,0,0,0.16)",
              cursor: "pointer",
              transition: "all 180ms ease",
            }}
          >
            ←
          </button>
        </div>
        <p style={{ marginTop: "20px" }}>Stage not found</p>
      </div>
    );
  }

  const sections = [
    {
      subtitle: "What to Practice",
      content: module.what,
    },
    {
      subtitle: "How to Practice",
      content: (module.how ?? [])
        .map((step) => `• ${step}`)
        .join("\n"),
    },
    {
      subtitle: "What You Will Notice",
      content: module.feel,
    },
    {
      subtitle: "Common Mistakes",
      content: module.mistake,
    },
    {
      subtitle: "Key Instructions",
      content: module.instruction,
    },
    {
      subtitle: "Mind Activity",
      content: module.imbalance,
    },
    {
      subtitle: "Symbolic Meaning",
      content: stageSymbolism[Number(module.id)],
      practiceButton: true,
    },
  ];

  const currentSection = sections[index];

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "24px 16px 120px",
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Back Button */}
      <div style={{ position: "absolute", top: "26px", left: "16px" }}>
        <button
          onClick={() => navigate("/path")}
          style={{
            width: "42px",
            height: "42px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.10)",
            background: "rgba(18,22,34,0.28)",
            backdropFilter: "blur(10px)",
            color: "rgba(255,255,255,0.88)",
            boxShadow: "0 3px 10px rgba(0,0,0,0.16)",
            cursor: "pointer",
            transition: "all 180ms ease",
          }}
        >
          ←
        </button>
      </div>

      <h1 style={{ marginTop: "58px", color: "white", fontSize: "20px", fontWeight: 400, fontFamily: "'Georgia', serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ marginRight: "12px" }}>
          {stageIcons[Number(module.id)]}
        </span>
        {module.title.replace(/^Stage \d+ — /, "")}
      </h1>

      {/* Section Card */}
<div
  onTouchStart={(e) => {
    setTouchStartX(
      e.changedTouches[0].screenX
    );
  }}
  onTouchEnd={(e) => {
    const endX =
      e.changedTouches[0].screenX;

    setTouchEndX(endX);

    const swipeDistance =
      touchStartX - endX;

    if (
      swipeDistance > 60 &&
      index < sections.length - 1
    ) {
      setDirection("left");
      setIndex(index + 1);
      setPulseKey(Date.now());
    }

    if (
      swipeDistance < -60 &&
      index > 0
    ) {
      setDirection("right");
      setIndex(index - 1);
      setPulseKey(Date.now());
    }
  }}
  style={{
          marginTop: "40px",
          borderRadius: "16px",
          padding: "24px",
          background: "linear-gradient(180deg, rgba(18,22,34,0.58), rgba(18,22,34,0.38))",
          borderTop: "3px solid #BFA86A",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(6px)",
          boxShadow: "0 12px 30px rgba(0,0,0,0.45)",
          width: "100%",
          maxWidth: "600px",
          boxSizing: "border-box",
          marginLeft: "auto",
          marginRight: "auto",
          minHeight: "280px",
          textAlign: "justify",
          color: "rgba(255,255,255,0.9)",
          fontFamily: "'Georgia', serif",
          lineHeight: 1.8,
          whiteSpace: "pre-line",
          transition:
            "transform 320ms cubic-bezier(0.22, 1, 0.36, 1), opacity 260ms ease",
          transform:
            direction === "left"
              ? "translateX(0px)"
              : "translateX(0px)",
          opacity: 1,
          willChange: "transform, opacity",
        }}
      >
        <div>
          <h4
            style={{
              color: "#BFA86A",
              marginTop: 0,
              fontSize: window.innerWidth < 640 ? "16px" : "17px",
              marginBottom: "18px",
              letterSpacing: "0.02em",
            }}
          >
            {currentSection.subtitle}
          </h4>

          <p
            style={{
              marginTop: "8px",
              lineHeight: 1.92,
              fontSize: window.innerWidth < 640 ? "14.5px" : "15px",
              color: "rgba(255,255,255,0.92)",
            }}
          >
            {currentSection.content}
          </p>
        </div>

      </div>

      {/* Breath Progression Bar */}
      <style>{`
@keyframes breathPulse {
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.35);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.7;
  }
}
`}</style>
      <div
        style={{
          marginTop: "40px",
          width: "100%",
          maxWidth: "600px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {sections.map((_, i) => {
          const isActive = i === index;
          return (
            <div
              key={i}
              onClick={() => {
                setDirection(i > index ? "left" : "right");
                setIndex(i);
                setPulseKey(Date.now());
              }}
              style={{
                width: isActive ? "28px" : "10px",
                height: "10px",
                borderRadius: "20px",
                background: isActive
                  ? "rgba(223, 196, 95, 0.9)"
                  : "rgba(255,255,255,0.2)",
                cursor: "pointer",
                transition: `${designTokens.motion.normal} ${designTokens.motion.easing}`,
                transform: isActive ? "scale(1.25)" : "scale(1)",
                boxShadow:
                  isActive && !isIdle
                    ? "0 0 18px rgba(223, 196, 95, 0.35)"
                    : "0 0 10px rgba(223, 196, 95, 0.12)",
                animation:
                  isActive
                    ? (isIdle ? designTokens.motion.slow : designTokens.motion.breathe)
                    : "none",
              }}
            />
          );
        })}
      </div>

      {/* Practice button row */}
      {currentSection.practiceButton && (
        <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "40px", paddingBottom: "24px" }}>
          <button
            onClick={() => navigate("/practice", { state: { module } })}
            style={{
              width: "70%",
              padding: "16px",
              borderRadius: "8px",
              border: "none",
              background: "rgba(223, 196, 95, 0.6)",
              backdropFilter: "blur(8px)",
              color: "#111",
              fontWeight: 600,
              boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
              cursor: "pointer",
            }}
          >
            Practice this stage
          </button>
        </div>
      )}
    </div>
  );
}

export default Stage;
