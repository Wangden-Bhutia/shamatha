

import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

type ContemplativeInputProps =
  InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
  };

type ContemplativeTextareaProps =
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
  };

export function ContemplativeInput({
  label,
  style,
  ...props
}: ContemplativeInputProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      {label && (
        <label
          style={{
            fontSize: "13px",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.62)",
          }}
        >
          {label}
        </label>
      )}

      <input
        {...props}
        style={{
          width: "100%",
          padding: "12px 14px",
          borderRadius: "10px",
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.04)",
          color: "rgba(255,255,255,0.92)",
          fontSize: "15px",
          outline: "none",
          boxSizing: "border-box",
          ...style,
        }}
      />
    </div>
  );
}

export function ContemplativeTextarea({
  label,
  style,
  ...props
}: ContemplativeTextareaProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      {label && (
        <label
          style={{
            fontSize: "13px",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.62)",
          }}
        >
          {label}
        </label>
      )}

      <textarea
        {...props}
        style={{
          width: "100%",
          minHeight: "120px",
          padding: "12px 14px",
          borderRadius: "10px",
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.04)",
          color: "rgba(255,255,255,0.92)",
          fontSize: "15px",
          outline: "none",
          resize: "vertical",
          boxSizing: "border-box",
          ...style,
        }}
      />
    </div>
  );
}