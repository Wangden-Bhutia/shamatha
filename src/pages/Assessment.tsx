import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppButton,
  GlassCard,
  OptionButton,
  PageShell,
} from "../components/ui";
import { questions } from "../data/questions";
import { modules } from "../data/modules";
import { calculateStage } from "../utils/assessment";
import {
  buildAction,
  buildExplanation,
} from "../domain/services/assessmentService";
import designTokens from "../theme/designTokens";

function Assessment() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(0));
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const [resultStage, setResultStage] = useState<number | null>(null);
  const [observing, setObserving] = useState(false);

  const isLast = current === questions.length - 1;
  const q = questions[current];

  const handleSelect = (value: number) => {
    const updated = [...answers];
    updated[current] = value;
    setAnswers(updated);

    setObserving(true);

    window.setTimeout(() => {
      if (isLast) {
        const detectedStage = calculateStage(updated);

        localStorage.setItem(
          "current-shamatha-stage",
          detectedStage.toString()
        );

        localStorage.setItem(
          "recommendedStage",
          detectedStage.toString()
        );
        window.dispatchEvent(
          new Event("shamatha-assessment-updated")
        );

        // Keep observation state active during calm reveal transition
        window.setTimeout(() => {
          setResultStage(detectedStage);
          setObserving(false);
        }, parseInt(designTokens.motion.slow));

        return;
      }

      setFade(false);
      setCurrent((c) => c + 1);
      setTimeout(() => setFade(true), parseInt(designTokens.motion.fast));
      setObserving(false);
    }, parseInt(designTokens.motion.normal));
  };

  const resetAssessment = () => {
    setResultStage(null);
    setCurrent(0);
    setAnswers(Array(questions.length).fill(0));
    localStorage.removeItem("current-shamatha-stage");
    localStorage.removeItem("recommendedStage");
    window.dispatchEvent(
      new Event("shamatha-assessment-updated")
    );
  };

  if (resultStage !== null) {
    const resultModule = modules.find(
      (m) => Number(m.id) === Number(resultStage)
    );

    const explanation = buildExplanation(answers);
    const action = buildAction(
      String(resultStage) as
        | "beginner"
        | "intermediate"
        | "advanced"
    );

    return (
      <PageShell>
        <section className="assessment-page">
          <h1 className="page-title assessment-title">Your Stage</h1>

          <GlassCard className="assessment-card">
            <div className="result-summary">
              <h2>{resultModule?.title ?? `Stage ${resultStage}`}</h2>
              <p style={{ opacity: 0.85, lineHeight: 1.7 }}>
                {resultModule?.what ?? resultModule?.description}
              </p>
              <p className="result-note" style={{ opacity: 0.65 }}>
                This reflects a pattern of attention rather than a fixed identity.
              </p>
            </div>

            <div className="result-guidance">
              <p style={{ opacity: 0.85, lineHeight: 1.7 }}>
                {explanation.join(" ")}
              </p>

              <p
                style={{
                  marginTop: "16px",
                  opacity: 0.75,
                  fontWeight: 500,
                  color: "rgba(223, 196, 95, 0.9)",
                }}
              >
                {action}
              </p>
            </div>
          </GlassCard>

          <div
  className="action-stack"
  style={{
    paddingBottom:
      window.innerWidth < 640
        ? "96px"
        : "24px",
  }}
>
            <AppButton variant="primary" fullWidth onClick={() => navigate(`/stage/${resultStage}`)}>
              View My Practice
            </AppButton>
            <AppButton fullWidth onClick={resetAssessment}>
              Retake Assessment
            </AppButton>
          </div>
        </section>
      </PageShell>
    );
  }

  if (!q) {
    return (
      <PageShell>
        <p className="muted-text">Loading...</p>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="assessment-page">
        <h1
          className="page-title"
          style={{
            color: designTokens.colors.gold,
            marginBottom: "38px"
          }}
        >
          Self Assessment
        </h1>

        <div
          style={{
            paddingTop: "30px",
          }}
        >
          <GlassCard className="assessment-card">
          <p className="question-count">{current + 1} / {questions.length}</p>
          <div className="progress-track" aria-hidden="true">
            <div
              style={{
                width: `${((current + 1) / questions.length) * 100}%`,
                background: "rgba(223, 196, 95, 0.82)",
                boxShadow: "0 0 10px rgba(223, 196, 95, 0.10)",
              }}
            />
          </div>

          <div className={`question-panel${fade ? "" : " question-panel--hidden"}`}>
            <p
              className="question-text"
              style={{
                lineHeight: 1.28,
                fontWeight: 600,
                fontSize: "1.02rem",
              }}
            >
              {q.text}
            </p>
            <div className="answer-list" role="group" aria-label={q.text}>
              {(q.options ?? []).map((option, optionIndex) => {
                const value = optionIndex + 1;

                return (
                  <OptionButton
                    key={option}
                    className="answer-option"
                    selected={answers[current] === value}
                    onClick={() => handleSelect(value)}
                    style={{
                      opacity: Math.min(0.50 + value * 0.095, 0.92),
                      transform: answers[current] === value ? "scale(1.02)" : "scale(1)",
                      border: answers[current] === value
                        ? "1px solid rgba(223, 196, 95, 0.18)"
                        : "1px solid rgba(255,255,255,0.05)",
                      transition: "all 0.25s ease",
                      fontWeight: answers[current] === value ? 500 : 400,
                      fontSize: "0.92rem",
                      lineHeight: 1.45,
                    }}
                  >
                    {option}
                  </OptionButton>
                );
              })}
            </div>
          </div>
          </GlassCard>
        </div>

        {observing && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.35)",
              backdropFilter: "blur(6px)",
              color: "rgba(255,255,255,0.85)",
              fontSize: "1rem",
              letterSpacing: "0.5px",
              zIndex: 10,
            }}
          >
            Observing pattern...
          </div>
        )}

      </section>
    </PageShell>
  );
}

export default Assessment;
