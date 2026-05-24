import React from "react";
import { OptionSelector } from "./OptionSelector";

const durationOptions = [5, 10, 20] as const;

type Props = {
  mins: number;
  setMins: (value: number) => void;
  isMobile: boolean;
};

export function MeditationDurationControl({
  mins,
  setMins,
  isMobile,
}: Props) {
  return (
    <div className="practice-section">
      <p
        style={{
          marginBottom: "10px",
          opacity: 0.72,
          fontSize: "0.9rem",
        }}
      >
        Sitting Length
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          alignItems: "center",
          gap: "4px",
          width: "100%",
          overflowX: "hidden",
          WebkitOverflowScrolling: "touch",
          minWidth: 0,
          marginBottom: "18px",
        }}
      >
        <OptionSelector
          style={{
            marginBottom: "0px",
            flex: "0 0 auto",
            width: "auto",
            minWidth: "0",
            display: "inline-flex",
            flexWrap: "nowrap",
            overflowX: "visible",
            opacity: 0.88,
            transform: "scale(0.94)",
            transformOrigin: "left center",
          }}
          options={durationOptions.map((d) => ({
            label: `${d} min`,
            value: String(d),
          }))}
          selectedValue={String(mins)}
          onSelect={(value) => setMins(Number(value))}
          compact
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            padding: "5px 7px",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            minHeight: "38px",
            width: "auto",
            flex: "0 0 auto",
            minWidth: "78px",
            maxWidth: "78px",
          }}
        >
          <input
            type="number"
            inputMode="numeric"
            value={mins === 0 ? "" : mins}
            min={1}
            max={180}
            onChange={(e) => {
              const value = e.target.value;

              if (value === "") {
                setMins(0);
                return;
              }

              const parsed = Number(value);

              if (Number.isNaN(parsed)) {
                return;
              }

              const clamped = Math.max(1, Math.min(180, parsed));

              setMins(clamped);
            }}
            style={{
              width: "36px",
              padding: "4px 4px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.9)",
              textAlign: "center",
              fontSize: "0.86rem",
              height: "34px",
              flex: "0 0 auto",
              minWidth: "36px",
              outline: "none",
            }}
          />

          <span
            style={{
              opacity: 0.62,
              fontSize: "0.74rem",
              lineHeight: 1,
              transform: "translateY(-0.5px)",
              letterSpacing: "0.01em",
            }}
          >
            min
          </span>
        </div>
      </div>
    </div>
  );
}