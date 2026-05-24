interface PageHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

function PageHeader({
  eyebrow,
  title,
  subtitle,
}: PageHeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        paddingTop: "30px",
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: "0.72rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          opacity: 0.42,
          color: "rgba(243,239,227,0.72)",
        }}
      >
        {eyebrow}
      </p>

      <h1
        style={{
          margin: 0,
          fontSize: "clamp(1.75rem, 6vw, 2.55rem)",
          lineHeight: 1.22,
          fontWeight: 300,
          letterSpacing: "0",
          color: "#BFA86A",
          maxWidth: "680px",
        }}
      >
        {title}
      </h1>

      {subtitle && (
        <p
          style={{
            margin: 0,
            fontSize: "1rem",
            lineHeight: 1.82,
            opacity: 0.68,
            color: "rgba(243,239,227,0.76)",
            maxWidth: "640px",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default PageHeader;
