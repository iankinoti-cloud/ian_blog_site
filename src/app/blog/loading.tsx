export default function BlogLoading() {
  return (
    <div aria-label="Loading…" aria-busy="true">
      {/* Chapter frame stubs */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="sk mb-1"
          style={{
            height: "clamp(220px, 36vw, 380px)",
            borderRadius: i === 0 ? "16px 16px 0 0" : i === 2 ? "0 0 16px 16px" : 0,
            opacity: 1 - i * 0.12,
          }}
        />
      ))}

      {/* Chapter nav dots */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", margin: "24px 0 40px" }}>
        {[0, 1, 2].map((i) => (
          <div key={i} className="sk" style={{ width: 8, height: 8, borderRadius: "50%" }} />
        ))}
      </div>

      {/* Post card skeletons */}
      {[0, 1, 2].map((i) => (
        <div key={i} className="sk mb-6" style={{ height: 120, borderRadius: 16 }} />
      ))}
    </div>
  );
}
