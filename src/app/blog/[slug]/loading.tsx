export default function PostLoading() {
  return (
    <div aria-label="Loading…" aria-busy="true">
      {/* Back link */}
      <div className="sk mb-8" style={{ height: 13, width: 100, borderRadius: 4 }} />

      {/* Post header */}
      <div className="sk mb-3" style={{ height: 11, width: 80, borderRadius: 4 }} />
      <div className="sk mb-2" style={{ height: 64, width: "90%", borderRadius: 8 }} />
      <div className="sk mb-6" style={{ height: 64, width: "65%", borderRadius: 8 }} />

      {/* Meta row */}
      <div style={{ display: "flex", gap: 16, marginBottom: 40 }}>
        <div className="sk" style={{ height: 13, width: 96, borderRadius: 4 }} />
        <div className="sk" style={{ height: 13, width: 64, borderRadius: 4 }} />
      </div>

      <div className="sk mb-10" style={{ height: 1, borderRadius: 0 }} />

      {/* Body paragraphs */}
      {[100, 88, 94, 78, 100, 85, 70, 96, 80].map((w, i) => (
        <div key={i} className="sk mb-3" style={{ height: 14, width: `${w}%`, borderRadius: 4 }} />
      ))}

      <div style={{ height: 28 }} />

      {[92, 100, 76, 88, 60].map((w, i) => (
        <div key={i} className="sk mb-3" style={{ height: 14, width: `${w}%`, borderRadius: 4 }} />
      ))}
    </div>
  );
}
