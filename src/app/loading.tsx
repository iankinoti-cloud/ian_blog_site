export default function HomeLoading() {
  return (
    <div aria-label="Loading…" aria-busy="true">
      {/* Banner placeholder */}
      <div className="sk mb-6" style={{ height: "clamp(180px, 28vw, 280px)", borderRadius: 20 }} />

      {/* Button row */}
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 56 }}>
        <div className="sk" style={{ height: 44, width: 148, borderRadius: 10 }} />
        <div className="sk" style={{ height: 44, width: 130, borderRadius: 10 }} />
        <div className="sk" style={{ height: 44, width: 110, borderRadius: 10 }} />
      </div>

      {/* Marquee strip */}
      <div className="sk mb-14" style={{ height: 56, borderRadius: 12 }} />

      {/* Section label */}
      <div className="sk mb-8" style={{ height: 11, width: 140, borderRadius: 4 }} />

      {/* Post cards */}
      {[0, 1, 2].map((i) => (
        <div key={i} className="sk mb-6" style={{ height: 120, borderRadius: 16 }} />
      ))}

      {/* CTA block */}
      <div className="sk mt-8" style={{ height: 220, borderRadius: 20 }} />
    </div>
  );
}
