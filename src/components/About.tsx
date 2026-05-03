import { FadeUp } from "@/components/shared/Motion";

export interface AboutProps {
  name: string;
  bio: string;
  philosophy: string;
  techStack: { category: string; items: string }[];
}

export default function About({ name, bio, philosophy, techStack }: AboutProps) {
  return (
    <>
      {/* ── Section 1: The Person ── */}
      <div className="max-w-2xl mb-24">
        <FadeUp>
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--brown-muted)]">About</p>
          <h1 className="mt-2 text-5xl font-bold text-[var(--brown-dark)]">{name}</h1>
          <div className="mt-5 h-px w-12 bg-[var(--tan)]" />
        </FadeUp>

        <FadeUp delay={0.15}>
          <p className="mt-10 text-lg text-[var(--text-muted)] leading-relaxed">{bio}</p>
        </FadeUp>

        <FadeUp delay={0.25}>
          <p className="mt-6 text-[var(--text-muted)] leading-relaxed">{philosophy}</p>
        </FadeUp>
      </div>

      {/* ── Divider ── */}
      <FadeUp>
        <div className="mb-24 h-px w-full bg-[var(--tan-light)]" />
      </FadeUp>

      {/* ── Section 2: Tech Stack ── */}
      <div className="max-w-2xl">
        <FadeUp>
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--brown-muted)]">
            Technical Arsenal
          </p>
          <h2 className="mt-2 text-3xl font-bold text-[var(--brown-dark)]">My Stack</h2>
          <div className="mt-5 h-px w-12 bg-[var(--tan)]" />
        </FadeUp>

        <div className="mt-10 flex flex-col gap-8">
          {techStack.map((item, i) => (
            <FadeUp key={item.category} delay={i * 0.1}>
              <div className="flex gap-8 border-b border-[var(--tan-light)] pb-6">
                <p className="w-28 shrink-0 text-xs tracking-widest uppercase text-[var(--brown-muted)] pt-1">
                  {item.category}
                </p>
                <p className="text-[var(--text)] leading-relaxed">{item.items}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </>
  );
}
