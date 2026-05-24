import React from "react";
import backgroundImg from "../../assets/background.jpeg";

type PageShellProps = {
  children: React.ReactNode;
};

export default function PageShell({ children }: PageShellProps) {
  return (
    <main
      className="page-shell"
      style={{
        background: "transparent",
        minHeight: "100dvh",
        position: "relative",
      }}
    >
      <div
        className="page-shell__bg"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          opacity: 1,
          filter: "brightness(2.35) saturate(1.28) contrast(1.1)",
        }}
      />

      <div
        className="page-shell__content"
        style={{
          paddingTop: "6px",
          paddingBottom: "calc(100px + env(safe-area-inset-bottom))"
        }}
      >
        {children}
      </div>
    </main>
  );
}