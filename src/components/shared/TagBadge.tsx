export default function TagBadge({ tag }: { tag: string }) {
  return (
    <span
      className="inline-block rounded-full px-3 py-0.5 text-xs font-medium tracking-wide text-[var(--brown)] backdrop-blur-sm"
      style={{
        background: "rgba(255,255,255,0.38)",
        border: "1px solid rgba(255,255,255,0.6)",
        boxShadow: "inset 0 1px 1px rgba(255,255,255,0.7), 0 1px 4px rgba(107,66,38,0.07)",
      }}
    >
      {tag}
    </span>
  );
}
