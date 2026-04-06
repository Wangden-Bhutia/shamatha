import { useProgress } from "../hooks/useProgress";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import backgroundImg from "../assets/background.jpeg";

function Practice() {
  const [minutes, setMinutes] = useState(10);
  const [isActive, setIsActive] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isCustom, setIsCustom] = useState(false);
  const [bellMode, setBellMode] = useState<"off" | "end" | "both">("both");

  const navigate = useNavigate();
  const location = useLocation();
  const module = location.state?.module;

  const { addSession } = useProgress();

  const hasRecordedRef = useRef(false);

  const playBell = () => {
    try {
      const audio = new Audio("/bell.mp3");
      audio.volume = 0.6;
      audio.play();
    } catch (e) {}
  };

  const playStartBell = () => {
    playBell(); // single soft bell
  };

  const playEndBell = () => {
    playBell();
    setTimeout(() => playBell(), 800); // double bell for completion
  };

  const startSession = () => {
    hasRecordedRef.current = false;
    setIsComplete(false);
    setSecondsLeft(minutes * 60);
    setIsActive(true);
    if (bellMode === "both") {
      setTimeout(() => playStartBell(), 3000); // start bell after 3s
    }
  };

  const endSession = () => {
    setIsActive(false);
    setSecondsLeft(0);
  };

  const isValid = minutes >= 1;

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 0) return 0;

        // Schedule end bell 5 seconds before session ends
        if (bellMode === "both" || bellMode === "end") {
          if (prev <= 5 && prev > 0) {
            playEndBell();
          }
        }

        if (prev === 1) {
          clearInterval(timer);
          setIsActive(false);
          setIsComplete(true);
          // Removed direct call to playEndBell() here
          if (!hasRecordedRef.current) {
            addSession(minutes);
            hasRecordedRef.current = true;
          }
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "24px 16px",
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "600px", margin: "0 auto", color: "white", display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "80vh" }}>
        <h1 style={{ color: "white" }}>Practice</h1>
        {module && (
          <div style={{ marginTop: "10px" }}>
            <h3>{module.title}</h3>
            <p>{module.description}</p>
          </div>
        )}
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

        {/* Bell Card */}
        {(!isActive && !isComplete) && (
          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              borderRadius: "16px",
              background: "linear-gradient(180deg, rgba(18,22,34,0.7), rgba(18,22,34,0.5))",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <p style={{ margin: 0, fontSize: "14px", opacity: 0.85, display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ color: "#BFA86A", fontSize: "16px" }}>🔔</span> Bell
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {[
                  { label: "Off", value: "off" },
                  { label: "End Only", value: "end" },
                  { label: "Start + End", value: "both" },
                ].map((opt) => {
                  const selected = bellMode === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => setBellMode(opt.value as any)}
                      style={{
                        padding: "6px 14px",
                        borderRadius: "999px",
                        border: selected
                          ? "1px solid rgba(191,168,106,0.6)"
                          : "1px solid rgba(255,255,255,0.15)",
                        background: selected
                          ? "rgba(191,168,106,0.2)"
                          : "rgba(255,255,255,0.05)",
                        color: selected ? "#BFA86A" : "rgba(255,255,255,0.6)",
                        fontSize: "12px",
                        cursor: "pointer",
                      }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {isComplete && (
          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              borderRadius: "16px",
              background: "linear-gradient(180deg, rgba(18,22,34,0.7), rgba(18,22,34,0.5))",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <p style={{ margin: 0, fontSize: "14px", opacity: 0.85, display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ color: "#BFA86A", fontSize: "16px" }}>🔔</span> Bell
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {[
                  { label: "Off", value: "off" },
                  { label: "End Only", value: "end" },
                  { label: "Start + End", value: "both" },
                ].map((opt) => {
                  const selected = bellMode === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => setBellMode(opt.value as any)}
                      style={{
                        padding: "6px 14px",
                        borderRadius: "999px",
                        border: selected
                          ? "1px solid rgba(191,168,106,0.6)"
                          : "1px solid rgba(255,255,255,0.15)",
                        background: selected
                          ? "rgba(191,168,106,0.2)"
                          : "rgba(255,255,255,0.05)",
                        color: selected ? "#BFA86A" : "rgba(255,255,255,0.6)",
                        fontSize: "12px",
                        cursor: "pointer",
                      }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {/* Session Length/Start Card */}
        <div
          style={{
            marginTop: (!isActive && !isComplete) ? "16px" : (isComplete ? "16px" : "30px"),
            padding: "24px",
            borderRadius: "16px",
            background: "linear-gradient(180deg, rgba(18,22,34,0.7), rgba(18,22,34,0.5))",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(8px)",
            boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
          }}
        >
          {!isActive && !isComplete && (
            <>
              <div style={{ marginTop: "10px" }}>
                {/* Session Length row */}
                <p style={{ margin: "12px 0 6px 0", opacity: 0.85, fontSize: "14px", letterSpacing: "0.5px" }}>
                  Session Length
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ display: "flex", gap: "10px" }}>
                    {[5, 10, 15, 20, "custom"].map((m) => {
                      const selected = m === "custom" ? isCustom : minutes === m;
                      return (
                        <button
                          key={m}
                          onClick={() => {
                            if (m === "custom") {
                              setIsCustom(true);
                            } else {
                              setIsCustom(false);
                              setMinutes(m as number);
                            }
                          }}
                          style={{
                            flex: 1,
                            padding: "10px",
                            borderRadius: "10px",
                            border: selected
                              ? "1px solid rgba(191,168,106,0.6)"
                              : "1px solid rgba(255,255,255,0.08)",
                            background: selected
                              ? "linear-gradient(180deg, rgba(191,168,106,0.25), rgba(18,22,34,0.5))"
                              : "rgba(255,255,255,0.03)",
                            color: selected ? "#BFA86A" : "rgba(255,255,255,0.8)",
                            fontWeight: 500,
                            cursor: "pointer",
                          }}
                        >
                          {m === "custom" ? "Custom" : `${m}m`}
                        </button>
                      );
                    })}
                  </div>
                  {isCustom && (
                    <div
                      style={{
                        marginTop: "12px",
                        marginBottom: "12px",
                        padding: "12px 16px",
                        borderRadius: "12px",
                        background: "linear-gradient(180deg, rgba(191,168,106,0.25), rgba(191,168,106,0.1))",
                        border: "1px solid rgba(191,168,106,0.6)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "16px",
                        boxShadow: "0 4px 12px rgba(191,168,106,0.2)",
                      }}
                    >
                      <button
                        onClick={() => setMinutes(Math.max(1, minutes - 1))}
                        style={{
                          padding: "10px 14px",
                          borderRadius: "10px",
                          border: "1px solid rgba(255,255,255,0.15)",
                          background: "rgba(255,255,255,0.05)",
                          color: "white",
                          fontSize: "16px",
                          cursor: "pointer",
                        }}
                      >
                        -
                      </button>
                      <span style={{ color: "white", fontSize: "16px", minWidth: "40px", textAlign: "center" }}>{minutes} min</span>
                      <button
                        onClick={() => setMinutes(minutes + 1)}
                        style={{
                          padding: "10px 14px",
                          borderRadius: "10px",
                          border: "1px solid rgba(255,255,255,0.15)",
                          background: "rgba(255,255,255,0.05)",
                          color: "white",
                          fontSize: "16px",
                          cursor: "pointer",
                        }}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ marginTop: "24px" }}>
                <button
                  onClick={startSession}
                  disabled={!isValid}
                  style={{
                    padding: "12px",
                    width: "100%",
                    fontSize: "15px",
                    borderRadius: "8px",
                    border: "none",
                    background: isValid
                      ? "linear-gradient(180deg, #ffffff, #e6e6e6)"
                      : "rgba(255,255,255,0.2)",
                    color: isValid ? "#111" : "rgba(255,255,255,0.5)",
                    fontWeight: 600,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                    cursor: "pointer",
                  }}
                >
                  Start Session
                </button>
              </div>
            </>
          )}
          {isActive && (
            <>
              <p style={{ textAlign: "center", opacity: 0.7, marginTop: "10px" }}>
                Rest your attention on the breath
              </p>
              <h2 style={{ fontSize: "64px", textAlign: "center", marginTop: "20px", letterSpacing: "1px" }}>
                {formatTime(secondsLeft)}
              </h2>

              <div style={{ marginTop: "20px" }}>
                <button
                  onClick={endSession}
                  style={{
                    padding: "10px 16px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.2)",
                    background: "rgba(255,255,255,0.05)",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  End Session
                </button>
              </div>
            </>
          )}
          {isComplete && (
            <>
              <h2 style={{ textAlign: "center" }}>Session Complete</h2>
              <div style={{ marginTop: "10px" }}>
                <p style={{ margin: "12px 0 6px 0", opacity: 0.85, fontSize: "14px", letterSpacing: "0.5px" }}>
                  Session Length
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ display: "flex", gap: "10px" }}>
                    {[5, 10, 15, 20, "custom"].map((m) => {
                      const selected = m === "custom" ? isCustom : minutes === m;
                      return (
                        <button
                          key={m}
                          onClick={() => {
                            if (m === "custom") {
                              setIsCustom(true);
                            } else {
                              setIsCustom(false);
                              setMinutes(m as number);
                            }
                          }}
                          style={{
                            flex: 1,
                            padding: "10px",
                            borderRadius: "10px",
                            border: selected
                              ? "1px solid rgba(191,168,106,0.6)"
                              : "1px solid rgba(255,255,255,0.08)",
                            background: selected
                              ? "linear-gradient(180deg, rgba(191,168,106,0.25), rgba(18,22,34,0.5))"
                              : "rgba(255,255,255,0.03)",
                            color: selected ? "#BFA86A" : "rgba(255,255,255,0.8)",
                            fontWeight: 500,
                            cursor: "pointer",
                          }}
                        >
                          {m === "custom" ? "Custom" : `${m}m`}
                        </button>
                      );
                    })}
                  </div>
                  {isCustom && (
                    <div
                      style={{
                        marginTop: "12px",
                        marginBottom: "12px",
                        padding: "12px 16px",
                        borderRadius: "12px",
                        background: "linear-gradient(180deg, rgba(191,168,106,0.25), rgba(191,168,106,0.1))",
                        border: "1px solid rgba(191,168,106,0.6)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "16px",
                        boxShadow: "0 4px 12px rgba(191,168,106,0.2)",
                      }}
                    >
                      <button
                        onClick={() => setMinutes(Math.max(1, minutes - 1))}
                        style={{
                          padding: "10px 14px",
                          borderRadius: "10px",
                          border: "1px solid rgba(255,255,255,0.15)",
                          background: "rgba(255,255,255,0.05)",
                          color: "white",
                          fontSize: "16px",
                          cursor: "pointer",
                        }}
                      >
                        -
                      </button>
                      <span style={{ color: "white", fontSize: "16px", minWidth: "40px", textAlign: "center" }}>{minutes} min</span>
                      <button
                        onClick={() => setMinutes(minutes + 1)}
                        style={{
                          padding: "10px 14px",
                          borderRadius: "10px",
                          border: "1px solid rgba(255,255,255,0.15)",
                          background: "rgba(255,255,255,0.05)",
                          color: "white",
                          fontSize: "16px",
                          cursor: "pointer",
                        }}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ marginTop: "24px" }}>
                <button
                  onClick={startSession}
                  style={{
                    padding: "12px",
                    width: "100%",
                    fontSize: "15px",
                    borderRadius: "8px",
                    border: "none",
                    background: "linear-gradient(180deg, #ffffff, #e6e6e6)",
                    color: "#111",
                    fontWeight: 600,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                    cursor: "pointer",
                  }}
                >
                  Start Again
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Practice;