import React from "react";
import { useNavigate } from "react-router-dom";
import { useProgress } from "../hooks/useProgress";
import backgroundImg from "../assets/background.jpeg";

function Index() {
  const shamathaQuote = "Shamatha is not the end—it prepares the ground for insight (vipashyana).";

  const navigate = useNavigate();
  const { sessions, totalMinutes, getLast7DaysCount } = useProgress();

  return (
    <div
      style={{
        minHeight: "100vh",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "40px",
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      {/* Content */}
      <div style={{ position: "relative", width: "100%", maxWidth: "460px", padding: "12px" }}>

        {/* Brand Signature */}
        <div
          style={{
            position: "absolute",
            top: "120px",
            right: "10px",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              padding: "2px 6px",
              borderRadius: "999px",
              background: "transparent",
              border: "none",
              fontSize: "9px",
              letterSpacing: "0.6px",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            A StillMind Labs creation
          </div>
        </div>
        
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "70px", textShadow: "0 3px 14px rgba(0,0,0,0.6)" }}>
          <h1
            style={{
              fontSize: "36px",
              fontWeight: 400,
              letterSpacing: "0.5px",
              margin: 0,
              color: "white",
              fontFamily: "'Georgia', serif",
              fontStyle: "italic",
            }}
          >
            Shamatha
          </h1>
          <p style={{
            marginTop: "12px",
            opacity: 0.65,
            letterSpacing: "0.6px",
            color: "rgba(255,255,255,0.85)",
            fontStyle: "italic",
            fontFamily: "'Georgia', serif",
            fontWeight: 300,
            fontSize: "16px"
          }}>
            The Nine Stages of Calm Abiding
          </p>
        </div>

        {/* Card 1 — Practice + Stats */}
        <div
          style={{
            background: "linear-gradient(180deg, rgba(18,22,34,0.7), rgba(18,22,34,0.5))",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "12px",
            padding: "12px",
            backdropFilter: "blur(6px)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
          }}
        >
          <h3 style={{ color: "#BFA86A", marginTop: 0, fontWeight: 400, fontFamily: "'Georgia', serif" }}>
            Your Practice
          </h3>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "14px",
              textAlign: "center",
            }}
          >
            {/* Total Time */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  margin: "0 auto",
                  background: "rgba(255,255,255,0.08)",
                  boxShadow: "inset 0 1px 4px rgba(0,0,0,0.4), 0 2px 6px rgba(0,0,0,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "6px",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#BFA86A">
                  <path d="M12 1a1 1 0 0 1 1 1v1.07A9 9 0 1 1 11 3.07V2a1 1 0 0 1 1-1zm0 4a7 7 0 1 0 7 7 7 7 0 0 0-7-7zm.5 3a1 1 0 0 0-2 0v4.59l3.3 3.3a1 1 0 0 0 1.4-1.42l-2.7-2.7z"/>
                </svg>
              </div>
              <p style={{ margin: 0 }}>{totalMinutes}m</p>
              <p style={{ fontSize: "11px", opacity: 0.6, marginTop: "3px" }}>
                TOTAL TIME
              </p>
            </div>

            {/* Sessions */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  margin: "0 auto",
                  background: "rgba(255,255,255,0.08)",
                  boxShadow: "inset 0 1px 4px rgba(0,0,0,0.4), 0 2px 6px rgba(0,0,0,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "6px",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#BFA86A">
                  <path d="M6 2h2l-1 6h4l1-6h2l-1 6h4v2h-4l-1 6h4v2h-4l-1 6h-2l1-6H7l-1 6H4l1-6H1v-2h4l1-6H2V8h4l1-6zm2.5 8-1 6h4l1-6z"/>
                </svg>
              </div>
              <p style={{ margin: 0 }}>{sessions}</p>
              <p style={{ fontSize: "11px", opacity: 0.6, marginTop: "3px" }}>
                SESSIONS
              </p>
            </div>

            {/* Last 7 Days */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  margin: "0 auto",
                  background: "rgba(255,255,255,0.08)",
                  boxShadow: "inset 0 1px 4px rgba(0,0,0,0.4), 0 2px 6px rgba(0,0,0,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "6px",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#BFA86A">
                  <path d="M21 12.79A9 9 0 0 1 11.21 3a7 7 0 1 0 9.79 9.79z"/>
                </svg>
              </div>
              <p style={{ margin: 0 }}>{getLast7DaysCount()}</p>
              <p style={{ fontSize: "11px", opacity: 0.6, marginTop: "3px" }}>
                LAST 7 DAYS
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 — Actions */}
        <div style={{ marginTop: "16px" }}>
          <div
            style={{
              background: "linear-gradient(180deg, rgba(18,22,34,0.6), rgba(18,22,34,0.4))",
              borderRadius: "12px",
              padding: "10px",
              backdropFilter: "blur(6px)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
          <button
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              background: "#BFA86A",
              color: "#111",
              fontWeight: 600,
              letterSpacing: "0.3px",
              boxShadow: "0 3px 12px rgba(0,0,0,0.25)",
              fontFamily: "'Georgia', serif",
            }}
            onClick={() => navigate("/practice")}
          >
            Start Practice
          </button>

          <div
            style={{
              height: "1px",
              background: "rgba(255,255,255,0.08)",
              margin: "14px 0 10px 0",
            }}
          />

          <div style={{ marginTop: "10px" }}>
            <button
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.9)",
                fontFamily: "'Georgia', serif",
              }}
              onClick={() => navigate("/shamatha")}
            >
              What is Shamatha?
            </button>
          </div>

          <div style={{ marginTop: "10px" }}>
            <button
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.9)",
                fontFamily: "'Georgia', serif",
              }}
              onClick={() => navigate("/path")}
            >
              The 9 Stages of Shamatha
            </button>
          </div>

          <div style={{ marginTop: "10px" }}>
            <button
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.9)",
                fontFamily: "'Georgia', serif",
              }}
              onClick={() => navigate("/assessment")}
            >
              Find My Stage
            </button>
          </div>

          <div style={{ marginTop: "10px" }}>
            <button
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.9)",
                fontFamily: "'Georgia', serif",
              }}
              onClick={() => navigate("/whathappens")}
            >
              What Happens in Meditation?
            </button>
          </div>
          </div>
        </div>

      </div>

      <div style={{
        marginTop: "40px",
        width: "100%",
        maxWidth: "500px",
        fontStyle: "italic",
        fontSize: "12px",
        color: "rgba(255,255,255,0.7)",
        textAlign: "center",
        marginLeft: "auto",
        marginRight: "auto",
        boxSizing: "border-box"
      }}>
        {shamathaQuote}
      </div>

    </div>
  );
}

export default Index;