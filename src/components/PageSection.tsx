

import type {
  CSSProperties,
  PropsWithChildren,
} from "react";

type PageSectionProps =
  PropsWithChildren<{
    gap?: number;
    style?: CSSProperties;
  }>;

export function PageSection({
  children,
  gap = 20,
  style,
}: PageSectionProps) {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: `${gap}px`,
        marginBottom: "28px",
        width: "100%",
        ...style,
      }}
    >
      {children}
    </section>
  );
}