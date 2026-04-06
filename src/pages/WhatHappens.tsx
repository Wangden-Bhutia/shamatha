import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImg from "../assets/background.jpeg";

const sections = [
  {
    title: "Restlessness",
    icon: "🌊",
    content: "The mind may feel agitated, jumping from thought to thought like a waterfall crashing over rocks. This is not a sign of failure — it is often the first time you truly see how busy the mind has always been. The restlessness was always there; now you are simply aware of it."
  },
  {
    title: "Bliss",
    icon: "✦",
    content: "Waves of warmth, pleasure, or deep contentment may wash through the body and mind. This can feel extraordinary, even intoxicating. In the Dzogchen tradition, bliss is recognized as a nyam — a temporary meditation experience. It arises naturally as the body relaxes and the mind settles. Enjoy it, but do not chase it."
  },
  {
    title: "Clarity",
    icon: "◇",
    content:
      "Perception may become vivid and sharp — colors brighter, sounds crisper, thoughts transparent. The mind feels luminous, almost crystalline. This heightened clarity is another nyam. It shows the mind's natural capacity when freed from its usual dullness. But grasping at clarity creates a subtle tension that can block deeper realization."
  },
  {
    title: "Boredom",
    icon: "○",
    content: "A flat, grey feeling that nothing is happening. The mind craves stimulation and finds sitting still pointless. Boredom is actually a powerful teacher — it reveals the mind's addiction to entertainment. If you can sit with boredom without acting on it, you discover a spaciousness beneath it that is profoundly restful."
  },
  {
    title: "Visions",
    icon: "◈",
    content: "Lights, colors, images, or symbolic scenes may appear — sometimes beautiful, sometimes strange. In some traditions, these are given great significance. In Dzogchen, they are treated like any other thought: natural displays of the mind's creative energy. They are neither to be feared nor pursued. Let them arise and dissolve on their own."
  },
  {
    title: "Drowsiness",
    icon: "☾",
    content: "The body may feel heavy, the mind foggy. You may find yourself nodding off or losing awareness entirely. This is the mind's habitual response when it is not being stimulated — it either thinks or sleeps. Drowsiness will pass as your capacity for alert relaxation develops over time."
  },
  {
    title: "Emotional Release",
    icon: "💧",
    content: "Old emotions — grief, anger, fear, tenderness — may surface without any obvious cause. As the mind quiets, stored tensions in the body begin to unwind. These releases are a natural part of purification. Let the emotions move through you like weather passing through a valley. You are the valley, not the storm."
  },
];

const WhatHappens = () => {
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
          textShadow: "0 3px 14px rgba(0,0,0,0.5)"
        }}
      >
        What Happens in Meditation?
      </h1>

      {/* Section Card */}
      <div
        style={{
          marginTop: "48px",
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
        <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
          <span style={{ fontSize: "28px", marginRight: "12px" }}>{current.icon}</span>
          <h2 style={{ color: "#BFA86A", fontSize: "20px", margin: 0 }}>{current.title}</h2>
        </div>
        <p style={{ fontStyle: "italic" }}>{current.content}</p>
      </div>

      {/* Navigation Buttons */}
      <div style={{ marginTop: "40px", display: "flex", justifyContent: "space-between", width: "100%", maxWidth: "600px" }}>
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

      {index === sections.length - 1 && (
        <p style={{
          marginTop: "24px",
          fontStyle: "italic",
          fontSize: "12px",
          lineHeight: 1.4,
          color: "rgba(255,255,255,0.55)",
          textAlign: "justify",
          maxWidth: "600px"
        }}>
          Whatever arises, let it arise. Whatever stays, let it stay. Whatever goes, let it go. The awareness that witnesses all of this is your true nature.
          — Dzogchen instruction
        </p>
      )}

      {/* Floating Quote below navigation */}
      {index === 0 && (
        <p style={{
          marginTop: "24px",
          fontStyle: "italic",
          fontSize: "12px",
          lineHeight: 1.4,
          color: "rgba(255,255,255,0.55)",
          textAlign: "justify",
          maxWidth: "600px"
        }}>
          "These are normal experiences — don't cling to them." As your practice deepens, you will encounter many different states of mind and body. In the Dzogchen tradition, these are called nyam — temporary meditation experiences that are signs of progress, not destinations.
        </p>
      )}
    </div>
  );
};

export default WhatHappens;