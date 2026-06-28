export default function AboutLoading() {
  return (
    <div aria-label="Loading…" aria-busy="true">
      {/* Desktop — three-column orbit layout */}
      <div className="hidden md:grid" style={{ gridTemplateColumns: "1fr auto 1fr", gap: 40, minHeight: "80vh", alignItems: "center" }}>
        {/* Bio card */}
        <div>
          <div className="sk mb-4" style={{ height: 11, width: 60, borderRadius: 4 }} />
          <div className="sk mb-2" style={{ height: 52, width: "80%", borderRadius: 8 }} />
          <div className="sk mb-6" style={{ height: 1, width: 48 }} />
          <div className="sk mb-2 rounded-full" style={{ width: 56, height: 56, borderRadius: "50%" }} />
          {[90, 100, 75, 92].map((w, i) => (
            <div key={i} className="sk mb-2" style={{ height: 13, width: `${w}%`, borderRadius: 4 }} />
          ))}
        </div>

        {/* Center photo */}
        <div className="sk" style={{ width: "clamp(190px, 25vw, 330px)", height: "clamp(240px, 32vw, 420px)", borderRadius: 20 }} />

        {/* Tech card */}
        <div>
          <div className="sk mb-4" style={{ height: 11, width: 120, borderRadius: 4 }} />
          <div className="sk mb-2" style={{ height: 40, width: "60%", borderRadius: 8 }} />
          <div className="sk mb-6" style={{ height: 1, width: 48 }} />
          {["Frontend", "Backend", "Env"].map((_, i) => (
            <div key={i} className="sk mb-3" style={{ height: 48, borderRadius: 8 }} />
          ))}
        </div>
      </div>

      {/* Mobile — stacked */}
      <div className="flex flex-col gap-5 md:hidden pb-16 pt-4">
        <div className="sk" style={{ height: "clamp(240px, 60vw, 420px)", borderRadius: 20 }} />
        <div className="sk" style={{ height: 200, borderRadius: 20 }} />
        <div className="sk" style={{ height: 180, borderRadius: 20 }} />
        <div className="sk" style={{ height: 44, width: 160, borderRadius: 10 }} />
      </div>
    </div>
  );
}
