import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImg from "../assets/background.jpeg";

const sections = [
  {
    title: "Elephant",
    icon: "🐘",
    content: "The elephant represents the mind itself. At the beginning it is dark, heavy, and resistant, showing dullness and lack of clarity. As training deepens, it becomes lighter, reflecting increasing stability and brightness of awareness."
  },
  {
    title: "Monkey",
    icon: "🐒",
    content: "The monkey stands for restlessness. It pulls the elephant toward distraction, showing how easily attention is carried away by thoughts and impulses."
  },
  {
    title: "Monk, Rope, Hook",
    icon: "🧘",
    content: "The monk represents the practitioner, who follows with intention and persistence. The rope signifies mindfulness, the ability to hold attention steady. The hook represents introspective awareness, the faculty that notices distraction and corrects it."
  },
  {
    title: "Fire",
    icon: "🔥",
    content: "The fire along the path indicates effort. In the early stages it burns strongly, as control is difficult. Over time, as familiarity grows, effort reduces and becomes more refined."
  },
  {
    title: "Rabbit",
    icon: "🐇",
    content: "The rabbit appearing later symbolizes subtle dullness, a quiet but obscuring lack of sharpness that remains even after gross distraction is reduced."
  },
  {
    title: "Summary",
    icon: "✨",
    content: "As the path unfolds, restlessness and dullness are both overcome. The monkey disappears, the elephant becomes fully clear, and the monk no longer chases but rides. The mind, once unruly, now rests in steady, lucid attention."
  }
];

const Shamatha = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const next = () => {
    if (index < sections.length - 1) setIndex(index + 1);
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const current = sections[index];

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "24px 16px",
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Back Button */}
      <div style={{ position: "absolute", top: "20px", left: "16px" }}>
        <button
          onClick={() => navigate("/", { replace: true })}
          style={{
            padding: "8px 12px",
            fontSize: "18px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.05)",
            color: "white",
            cursor: "pointer",
          }}
        >
          ←
        </button>
      </div>

      <h1
        style={{
          marginTop: "48px",
          color: "white",
          fontSize: "28px",
          fontWeight: 400,
          fontFamily: "'Georgia', serif",
        }}
      >
        What is Shamatha?
      </h1>

      {/* Section Card */}
      <div
        style={{
          marginTop: "40px",
          borderRadius: "16px",
          padding: "24px",
          background: "linear-gradient(180deg, rgba(18,22,34,0.75), rgba(18,22,34,0.55))",
          borderTop: "3px solid #BFA86A",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 12px 30px rgba(0,0,0,0.45)",
          maxWidth: "600px",
          textAlign: "justify",
          color: "rgba(255,255,255,0.9)",
          fontFamily: "'Georgia', serif",
          lineHeight: 1.8,
        }}
      >
        {index === 0 && (
          <img
            src="/shamatha.png"
            alt="Shamatha Map"
            style={{
              width: "100%",
              borderRadius: "14px",
              marginBottom: "16px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
              border: "1px solid rgba(255,255,255,0.05)"
            }}
          />
        )}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
          <span style={{ fontSize: "28px", marginRight: "12px" }}>{current.icon}</span>
          <h2 style={{ color: "#BFA86A", fontSize: "20px", margin: 0 }}>{current.title}</h2>
        </div>
        <p style={{ fontStyle: "italic", margin: 0 }}>{current.content}</p>
      </div>

      {/* Navigation Buttons */}
      <div
        style={{
          marginTop: "40px",
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <button
          onClick={prev}
          disabled={index === 0}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.9)",
            fontFamily: "'Georgia', serif",
            cursor: index === 0 ? "not-allowed" : "pointer",
          }}
        >
          Previous
        </button>
        {index < sections.length - 1 && (
          <button
            onClick={next}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.9)",
              fontFamily: "'Georgia', serif",
              cursor: "pointer",
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Shamatha;
