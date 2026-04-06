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

    // Schedule start bell after 3 seconds if applicable
    if (bellMode === "both" || bellMode === "start") {
      setTimeout(() => playStartBell(), 3000);
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

        // When timer reaches 0, end session
        if (prev === 1) {
          clearInterval(timer);
          setIsActive(false);
          setIsComplete(true);

          // Play end bell if applicable
          if (bellMode === "both" || bellMode === "end") {
            playEndBell();
          }

          // Record session only once
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
  }, [isActive, bellMode, minutes, addSession]);

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
      {/* Overlay for active session */}
      {isActive && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.35)",
            zIndex: 1,
          }}
        ></div>
      )}
      <div style={{
        maxWidth: "600px",
        margin: "0 auto",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        minHeight: "80vh",
        paddingTop: "60px", // Added top padding to prevent overlap with back arrow
      }}>
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
            position: isActive ? "relative" : undefined,
            zIndex: isActive ? 2 : undefined,
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
            <div
              style={{
                position: "relative",
                zIndex: 2,
                marginTop: "40px",
                padding: "60px 24px",
                borderRadius: "20px",
                background: "linear-gradient(180deg, rgba(18,22,34,0.8), rgba(18,22,34,0.6))",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(14px)",
                boxShadow: "0 14px 35px rgba(0,0,0,0.55)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                maxWidth: "480px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <p style={{
                textAlign: "center",
                fontSize: "16px",
                opacity: 0.8,
                fontStyle: "italic",
                marginBottom: "24px",
                color: "rgba(255,255,255,0.85)"
              }}>
                Rest your attention on the breath
              </p>
              <h2 style={{
                fontSize: "84px",
                textAlign: "center",
                margin: "0 0 36px 0",
                letterSpacing: "2px",
                fontWeight: 600,
                color: "#FFF"
              }}>
                {formatTime(secondsLeft)}
              </h2>
              <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <button
                  onClick={endSession}
                  style={{
                    padding: "14px 28px",
                    borderRadius: "12px",
                    border: "none",
                    background: "linear-gradient(180deg, #ffffff, #e6e6e6)",
                    color: "#111",
                    fontWeight: 600,
                    fontSize: "16px",
                    cursor: "pointer",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                    minWidth: "160px",
                    textAlign: "center"
                  }}
                >
                  End Session
                </button>
              </div>
            </div>
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