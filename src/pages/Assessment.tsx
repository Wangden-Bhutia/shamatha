function buildExplanation(answers: number[]): string[] {
  const notes: string[] = [];

  const avg = answers.reduce((a, b) => a + b, 0) / answers.length;

  if (avg <= 2) {
    notes.push("Attention is breaking quickly and often.");
  }
  if (avg > 2 && avg <= 3.5) {
    notes.push("Attention is returning more often but still unstable.");
  }
  if (avg > 3.5 && avg <= 4.2) {
    notes.push("Attention is mostly stable but can become dull or drift subtly.");
  }
  if (avg > 4.2) {
    notes.push("Attention is stable with minimal effort.");
  }

  // specific signals
  if (answers[2] === 4) {
    notes.push("There is noticeable dullness or heaviness in attention.");
  }
  if (answers[0] <= 2) {
    notes.push("The mind tends to leave the breath very quickly.");
  }
  if (answers[4] >= 4) {
    notes.push("Continuity of attention is strong.");
  }

  return notes;
}

function buildAction(answers: number[]): string {
  const avg = answers.reduce((a, b) => a + b, 0) / answers.length;

  if (avg <= 2.5) {
    return "Focus on noticing distraction sooner and gently returning to the breath.";
  }
  if (avg <= 3.8) {
    return "Focus on shortening the gap between distraction and noticing.";
  }
  if (avg <= 4.3) {
    return "Focus on maintaining clarity — don’t let attention become dull.";
  }
  return "Focus on maintaining balance — stay relaxed and avoid unnecessary effort.";
}
import React, { useState } from "react";
import backgroundImg from "../assets/background.jpeg";
import { questions } from "../data/questions";
import { calculateStage } from "../utils/assessment";
import { modules } from "../data/modules";
import { useNavigate } from "react-router-dom";

function Assessment() {
  const navigate = useNavigate();

  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(0));
  const [current, setCurrent] = useState<number>(0);
  const [fade, setFade] = useState<boolean>(true);
  const [resultStage, setResultStage] = useState<number | null>(null);

  const isLast = current === questions.length - 1;

  const handleSelect = (value: number) => {
    const updated = [...answers];
    updated[current] = value;
    setAnswers(updated);

    if (isLast) {
      const stage = calculateStage(updated);
      setResultStage(stage);
    } else if (current < questions.length - 1) {
      setFade(false);
      setTimeout(() => {
        setCurrent((c) => c + 1);
        setFade(true);
      }, 150);
    }
  };

  const back = () => {
    if (current > 0) setCurrent((c) => c - 1);
  };

  const q = questions[current];

  if (resultStage !== null) {
    return (
      <div style={{ minHeight: "100vh", position: "relative", backgroundImage: `url(${backgroundImg})`, backgroundSize: "cover", backgroundPosition: "center", padding: "24px 16px" }}>
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
        <div style={{ maxWidth: "600px", margin: "0 auto", lineHeight: 1.6 }}>
          <h1 style={{ marginTop: "40px", color: "#BFA86A" }}>Your Stage</h1>
          <div style={{ marginTop: "16px", background: "linear-gradient(180deg, rgba(18,22,34,0.65), rgba(18,22,34,0.45))", borderRadius: "16px", padding: "20px", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(8px)", boxShadow: "0 6px 20px rgba(0,0,0,0.3)" }}>
              <div
                style={{
                  background: "linear-gradient(180deg, rgba(18,22,34,0.6), rgba(18,22,34,0.4))",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  padding: "16px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                <h2 style={{ marginTop: 0, color: "white", fontSize: "22px", fontWeight: 600 }}>
                  {modules.find((m) => m.id === resultStage)?.title || `Stage ${resultStage}`}
                </h2>
                <p style={{ marginTop: "10px", opacity: 0.85, color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}>
                  {modules.find((m) => m.id === resultStage)?.what}
                </p>
                <p style={{ marginTop: "12px", opacity: 0.85, fontSize: "13px", color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>
                  This reflects how your attention is behaving right now — not a fixed level.
                </p>
              </div>
              <div
                style={{
                  marginTop: "16px",
                  borderRadius: "12px",
                  padding: "16px",
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                <ul style={{ paddingLeft: "18px", opacity: 0.85, color: "rgba(255,255,255,0.85)", margin: 0 }}>
                  {buildExplanation(answers).map((line, i) => (
                    <li key={i} style={{ marginBottom: "6px" }}>{line}</li>
                  ))}
                </ul>

                <div
                  style={{
                    marginTop: "14px",
                    paddingTop: "10px",
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <p style={{ margin: 0, fontWeight: 600, color: "#BFA86A" }}>What to focus on next</p>
                  <p style={{ marginTop: "6px", opacity: 0.85, color: "rgba(255,255,255,0.85)" }}>
                    {buildAction(answers)}
                  </p>
                </div>
              </div>
          </div>

          <button
            onClick={() => navigate(`/stage/${resultStage}`)}
            style={{
              marginTop: "30px",
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              background: "linear-gradient(180deg, #ffffff, #e6e6e6)",
              color: "#111",
              fontWeight: 600,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              cursor: "pointer",
            }}
          >
            View My Practice
          </button>

          <button
            onClick={() => {
              setResultStage(null);
              setCurrent(0);
              setAnswers(Array(questions.length).fill(0));
            }}
            style={{
              marginTop: "10px",
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.05)",
              color: "rgba(255,255,255,0.8)",
              cursor: "pointer",
            }}
          >
            Retake Assessment
          </button>
        </div>
      </div>
    );
  }

  if (!q) {
    return <div style={{ padding: "24px" }}>Loading...</div>;
  }

  return (
    <div style={{ minHeight: "100vh", position: "relative", backgroundImage: `url(${backgroundImg})`, backgroundSize: "cover", backgroundPosition: "center", padding: "24px 16px" }}>
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
      <div style={{ maxWidth: "600px", margin: "0 auto", lineHeight: 1.6 }}>
        <h1 style={{ color: "white", marginTop: "40px" }}>Self Assessment</h1>

        <div style={{ marginTop: "16px", background: "linear-gradient(180deg, rgba(18,22,34,0.6), rgba(18,22,34,0.4))", borderRadius: "16px", padding: "20px", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(8px)", boxShadow: "0 6px 20px rgba(0,0,0,0.3)" }}>
          <p style={{ marginTop: "10px", opacity: 0.6, color: "rgba(255,255,255,0.6)" }}>
            {current + 1} / {questions.length}
          </p>

          <div style={{ marginTop: "8px", height: "6px", background: "rgba(255,255,255,0.1)", borderRadius: "6px" }}>
            <div
              style={{
                width: `${((current + 1) / questions.length) * 100}%`,
                height: "100%",
                background: "#BFA86A",
                borderRadius: "6px",
                transition: "width 0.2s ease",
              }}
            />
          </div>

          <div
            style={{
              marginTop: "24px",
              opacity: fade ? 1 : 0,
              transition: "opacity 0.15s ease",
            }}
          >
            <p style={{ fontWeight: 600, marginBottom: "12px", color: "white" }}>{q.text}</p>

            {q.options.map((opt, oIndex) => {
              const selected = answers[current] === oIndex + 1;

              return (
                <div
                  key={oIndex}
                  onClick={() => handleSelect(oIndex + 1)}
                  style={{
                    marginTop: "10px",
                    padding: "14px",
                    borderRadius: "12px",
                    border: selected ? "1px solid rgba(191,168,106,0.6)" : "1px solid rgba(255,255,255,0.08)",
                    background: selected
                      ? "linear-gradient(180deg, rgba(191,168,106,0.25), rgba(18,22,34,0.5))"
                      : "rgba(255,255,255,0.03)",
                    color: "rgba(255,255,255,0.9)",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!selected) e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    if (!selected) e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  }}
                >
                  {opt}
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ marginTop: "30px" }}>
          <button
            onClick={back}
            disabled={current === 0}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              background: "#fff",
              cursor: current === 0 ? "not-allowed" : "pointer",
              opacity: current === 0 ? 0.5 : 1,
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default Assessment;