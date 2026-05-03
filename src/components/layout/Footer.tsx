export default function Footer() {
  return (
    <footer className="w-full border-t border-[var(--tan-light)] bg-[var(--parchment)] mt-auto">
      <div className="mx-auto max-w-4xl px-6 py-8 text-center text-sm text-[var(--brown-muted)] tracking-wide">
        <p>© {new Date().getFullYear()} Ian Kinoti &mdash; All rights reserved.</p>
      </div>
    </footer>
  );
}
