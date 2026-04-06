import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { modules } from "../data/modules";
import backgroundImg from "../assets/background.jpeg";

const stageIcons = {
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

function Stage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const module = modules.find((m) => m.id === Number(id));
  const [index, setIndex] = useState(0);

  if (!module) {
    return (
      <div style={{ padding: "20px", position: "relative" }}>
        <div style={{ position: "absolute", top: "20px", left: "16px" }}>
          <button
            onClick={() => navigate("/path")}
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
        <p style={{ marginTop: "20px" }}>Stage not found</p>
      </div>
    );
  }

  const sections = [
    {
      subsections: [
        { subtitle: "What to Practice", content: module.what },
        { subtitle: "How to Practice", content: module.how.map((step, i) => `• ${step}`).join("\n") },
      ],
    },
    {
      subsections: [
        { subtitle: "What You Will Notice", content: module.feel },
        { subtitle: "Common Mistakes", content: module.mistake },
      ],
    },
    {
      subsections: [
        { subtitle: "Key Instructions", content: module.instruction },
        { subtitle: "Mind Activity", content: module.imbalance },
      ],
      practiceButton: true // add a flag to show button on this card
    },
  ];

  const current = sections[index];

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "24px 16px",
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Back Button */}
      <div style={{ position: "absolute", top: "20px", left: "16px" }}>
        <button
          onClick={() => navigate("/path")}
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

      <h1 style={{ marginTop: "48px", color: "white", fontSize: "20px", fontWeight: 400, fontFamily: "'Georgia', serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ marginRight: "12px" }}>{stageIcons[module.id]}</span>
        {module.title.replace(/^Stage \d+ — /, "")}
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
          width: "100%",
          maxWidth: "600px",
          boxSizing: "border-box",
          marginLeft: "auto",
          marginRight: "auto",
          minHeight: "250px",
          textAlign: "justify",
          color: "rgba(255,255,255,0.9)",
          fontFamily: "'Georgia', serif",
          lineHeight: 1.8,
          whiteSpace: "pre-line",
        }}
      >
        {/* Removed combined section title */}
        {current.subsections && current.subsections.map((sub, i) => (
          <div key={i} style={{ marginTop: i === 0 ? "0" : "16px" }}>
            <h4 style={{ color: "#BFA86A", marginTop: 0, fontSize: "16px" }}>{sub.subtitle}</h4>
            <p style={{ marginTop: "8px", lineHeight: 1.6, fontSize: "14px" }}>{sub.content}</p>
          </div>
        ))}

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
          onClick={() => index > 0 && setIndex(index - 1)}
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
        {!current.practiceButton && (
          <button
            onClick={() => index < sections.length - 1 && setIndex(index + 1)}
            disabled={index === sections.length - 1}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.9)",
              fontFamily: "'Georgia', serif",
              cursor: index === sections.length - 1 ? "not-allowed" : "pointer",
            }}
          >
            Next
          </button>
        )}
      </div>

      {/* Practice button row */}
      {current.practiceButton && (
        <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "40px" }}>
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