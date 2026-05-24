import React, { useState } from "react";

const hiddenScrollbarStyles = `
  .what-happens-card::-webkit-scrollbar {
    display: none;
  }
`;

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
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("left");

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
        padding: "24px 16px 48px",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{hiddenScrollbarStyles}</style>

      {/* Section Card */}
      <div
        className="what-happens-card"
        onTouchStart={(e) => {
          setTouchStartX(e.changedTouches[0].screenX);
        }}
        onTouchEnd={(e) => {
          const endX = e.changedTouches[0].screenX;

          setTouchEndX(endX);

          const swipeDistance = touchStartX - endX;

          if (
            swipeDistance > 60 &&
            index < sections.length - 1
          ) {
            setDirection("left");
            setIndex(index + 1);
          }

          if (
            swipeDistance < -60 &&
            index > 0
          ) {
            setDirection("right");
            setIndex(index - 1);
          }
        }}
        style={{
          marginTop: "12px",
          borderRadius: "16px",
          padding: window.innerWidth < 640 ? "22px 18px" : "24px 22px",
          minHeight: window.innerWidth < 640 ? "320px" : "340px",
          maxHeight: window.innerWidth < 640 ? "420px" : "440px",
          overflowY: "auto",
          overflowX: "hidden",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
          maxWidth: "760px",
          width: "100%",
          textAlign: "justify",
          color: "rgba(255,255,255,0.9)",
          fontFamily: "'Georgia', serif",
          lineHeight: 1.8,
          transition:
            "transform 340ms cubic-bezier(0.22, 1, 0.36, 1), opacity 260ms ease",
          transform:
            direction === "left"
              ? "translateX(0px)"
              : "translateX(0px)",
          opacity: 1,
          willChange: "transform, opacity",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "18px",
          }}
        >
          <span
            style={{
              fontSize: window.innerWidth < 640 ? "26px" : "28px",
              marginRight: "12px",
            }}
          >
            {current.icon}
          </span>
          <h2
            style={{
              color: "#BFA86A",
              fontSize: window.innerWidth < 640 ? "19px" : "20px",
              margin: 0,
              letterSpacing: "0.02em",
            }}
          >
            {current.title}
          </h2>
        </div>
        <p
          style={{
            fontStyle: "italic",
            lineHeight: 1.95,
            fontSize: window.innerWidth < 640 ? "14.5px" : "15px",
            color: "rgba(255,255,255,0.92)",
            margin: 0,
          }}
        >
          {current.content}
        </p>
      </div>

      {/* Navigation Buttons */}
      <div
        style={{
          marginTop: "18px",
          display: "flex",
          justifyContent: "center",
          width: "100%",
          maxWidth: "760px",
          position: "relative",
          minHeight: "12px",
          paddingTop: "0px",
          zIndex: 1,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: index === sections.length - 1 ? "0px" : "-2px",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "10px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {sections.map((_, i) => (
            <div
              key={i}
              onClick={() => {
                setDirection(i > index ? "left" : "right");
                setIndex(i);
              }}
              style={{
                width: i === index ? "20px" : "8px",
                height: "8px",
                borderRadius: "999px",
                background:
                  i === index
                    ? "rgba(191,168,106,0.95)"
                    : "rgba(255,255,255,0.22)",
                transition: "all 220ms ease",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
        {index === sections.length - 1 && (
          <button
            onClick={() => setIndex(0)}
            style={{
              padding: "8px 16px",
              borderRadius: "999px",
              border: "1px solid rgba(191,168,106,0.12)",
              background: "rgba(191,168,106,0.045)",
              backdropFilter: "blur(10px)",
              color: "rgba(255,248,230,0.88)",
              fontFamily: "'Georgia', serif",
              cursor: "pointer",
              transition: "all 180ms ease",
              letterSpacing: "0.02em",
              fontSize: "0.82rem",
              boxShadow: "0 4px 14px rgba(0,0,0,0.14)",
            position: "absolute",
            top: "22px",
            left: "50%",
            transform: "translateX(-50%)",
            }}
          >
            Done
          </button>
        )}
      </div>

    </div>
  );
};

export default WhatHappens;