export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        width: "100%",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 100%), rgba(237,227,211,0.72)",
        borderTop: "1px solid rgba(255,255,255,0.5)",
        boxShadow: "inset 0 1px 1px rgba(255,255,255,0.7)",
        backdropFilter: "blur(12px) saturate(140%)",
        WebkitBackdropFilter: "blur(12px) saturate(140%)",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          maxWidth: 896,
          margin: "0 auto",
          padding: "clamp(28px, 4vw, 48px) clamp(16px, 4vw, 24px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        {/* Logomark */}
        <div>
          <p
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(22px, 3.5vw, 32px)",
              letterSpacing: "0.06em",
              color: "var(--brown-dark)",
              lineHeight: 1,
            }}
          >
            IAN
            <span style={{ color: "var(--tan)" }}> Creative</span>
          </p>
          <p
            style={{
              marginTop: 4,
              fontSize: 10,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--brown-muted)",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Developer · Writer · Builder
          </p>
        </div>

        {/* Right side */}
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.18em",
            color: "var(--brown-muted)",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          © {year} Ian Kinoti
        </p>
      </div>
    </footer>
  );
}
