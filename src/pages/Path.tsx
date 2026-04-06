import React, { useState, useEffect } from "react";
import { modules } from "../data/modules";
import { useNavigate } from "react-router-dom";
import backgroundImg from "../assets/background.jpeg";

function Path() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const stages = modules.map((module) => ({
    title: module.title,
    symbolicLine: module.symbolicLine,
    id: module.id
  }));

  const current = stages[index];

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        padding: "20px 16px",
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
          onClick={() => navigate("/")}
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
          textAlign: "center",
        }}
      >
        The 9 Stages of Shamatha
      </h1>

      {/* Stage Card */}
      <div
        onClick={() => {
          localStorage.setItem("currentStage", String(current.id));
          navigate(`/stage/${current.id}`);
        }}
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
          width: "100%",
          boxSizing: "border-box",
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "justify",
          color: "rgba(255,255,255,0.9)",
          fontFamily: "'Georgia', serif",
          lineHeight: 1.8,
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <h3 style={{ color: "#BFA86A", marginTop: 0 }}>{current.title}</h3>
        <div
          style={{
            marginTop: "8px",
            width: "32px",
            height: "2px",
            background: "#BFA86A",
            opacity: 0.9,
          }}
        />
        <p
          style={{
            marginTop: "8px",
            color: "#BFA86A",
            fontSize: "13px",
            lineHeight: 1.6,
            letterSpacing: "0.3px",
            fontWeight: 400,
            fontStyle: "italic",
            textAlign: "justify",
          }}
        >
          {current.symbolicLine}
        </p>
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
          onClick={() => setIndex(index - 1)}
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
        {index < stages.length - 1 && (
          <button
            onClick={() => setIndex(index + 1)}
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
}

export default Path;