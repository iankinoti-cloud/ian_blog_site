import Button from "@/components/shared/Button";
import { FadeUp, PageTransition } from "@/components/shared/Motion";

const techStack = [
  { category: "Frontend", items: "React.js · Three.js · Tailwind CSS" },
  { category: "Backend", items: "Robust APIs · Scalable Database Management" },
  { category: "Environment", items: "Command-line first development" },
];

export default function AboutPage() {
  return (
    <PageTransition>
      {/* ── Section 1: The Person ── */}
      <div className="max-w-2xl mb-24">
        <FadeUp>
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--brown-muted)]">About</p>
          <h1 className="mt-2 text-5xl font-bold text-[var(--brown-dark)]">Ian Kinoti</h1>
          <div className="mt-5 h-px w-12 bg-[var(--tan)]" />
        </FadeUp>

        <FadeUp delay={0.15}>
          <p className="mt-10 text-lg text-[var(--text-muted)] leading-relaxed">
            My journey started with the fundamentals, but it quickly evolved into a
            fascination with how pieces fit together. Whether it&apos;s the clean structure
            of a Ruby on Rails backend or the precision of Tailwind CSS,
            I&apos;ve spent my time mastering the tools that allow for total control
            over the user experience.
          </p>
        </FadeUp>

        <FadeUp delay={0.25}>
          <p className="mt-6 text-[var(--text-muted)] leading-relaxed">
            I believe great development is 50% architecture and 50% psychology. To build
            a platform like a professional marketplace or an elegant educational interface,
            you have to understand user behavior and how to guide a user&apos;s eye, how to
            ensure security, and how to make a digital interaction feel as solid as a
            physical one.
          </p>
        </FadeUp>
      </div>

      {/* ── Divider ── */}
      <FadeUp>
        <div className="mb-24 h-px w-full bg-[var(--tan-light)]" />
      </FadeUp>

      {/* ── Section 2: The Arsenal ── */}
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
                <p className="w-32 shrink-0 text-xs tracking-[0.2em] uppercase text-[var(--brown-muted)] pt-1">
                  {item.category}
                </p>
                <p className="text-[var(--text)] font-medium leading-relaxed">
                  {item.items}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.35}>
          <div className="mt-14">
            <Button href="/blog">Read the Blog →</Button>
          </div>
        </FadeUp>
      </div>
    </PageTransition>
  );
}
