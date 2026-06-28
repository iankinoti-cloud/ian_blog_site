export default function ProjectsLoading() {
  return (
    <div aria-label="Loading…" aria-busy="true">
      {/* Header */}
      <div className="mb-10">
        <div className="sk mb-3" style={{ height: 11, width: 60, borderRadius: 4 }} />
        <div className="sk mb-2" style={{ height: 72, width: "40%", borderRadius: 8 }} />
        <div className="sk mb-5" style={{ height: 1, width: 48 }} />
        <div className="sk mb-2" style={{ height: 13, width: "70%", borderRadius: 4 }} />
        <div className="sk" style={{ height: 13, width: "55%", borderRadius: 4 }} />
      </div>

      {/* Project cards */}
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="sk mb-6" style={{ height: 140, borderRadius: 16 }} />
      ))}
    </div>
  );
}
