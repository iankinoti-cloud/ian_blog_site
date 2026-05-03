export default function TagBadge({ tag }: { tag: string }) {
  return (
    <span className="inline-block rounded-full border border-[var(--tan)] bg-[var(--cream)] px-3 py-0.5 text-xs font-medium tracking-wide text-[var(--brown)]">
      {tag}
    </span>
  );
}
