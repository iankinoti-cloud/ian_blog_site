import { FadeUp } from "@/components/shared/Motion";

export interface AboutProps {
  name?: string;
  image: string;
  about: string;
  techStack?: { category: string; items: string }[];
}

export default function About({ name, image, about, techStack = [] }: AboutProps) {
  return (
    <aside>
      {/* ── Section 1: The Person ── */}
      <div className="max-w-2xl mb-14 md:mb-24">
        <FadeUp>
          {name && (
            <>
              <p className="text-xs tracking-[0.3em] uppercase text-[var(--brown-muted)]">About</p>
              <h2 className="mt-2 text-3xl sm:text-5xl font-bold text-[var(--brown-dark)]">{name}</h2>
              <div className="mt-5 h-px w-12 bg-[var(--tan)]" />
            </>
          )}
          <img
            src={image}
            alt="blog logo"
            className="mt-8 w-24 h-24 rounded-full object-cover border-2 border-[var(--tan)] shadow-md"
          />
        </FadeUp>

        <FadeUp delay={0.15}>
          <p className="mt-10 text-lg text-[var(--text-muted)] leading-relaxed">{about}</p>
        </FadeUp>
      </div>

      {/* ── Divider ── */}
      {techStack.length > 0 && (
        <>
          <FadeUp>
            <div className="mb-14 md:mb-24 h-px w-full bg-[var(--tan-light)]" />
          </FadeUp>

          {/* ── Section 2: Tech Stack ── */}
          <div className="max-w-2xl">
            <FadeUp>
              <p className="text-xs tracking-[0.3em] uppercase text-[var(--brown-muted)]">
                Technical Arsenal
              </p>
              <h3 className="mt-2 text-3xl font-bold text-[var(--brown-dark)]">My Stack</h3>
              <div className="mt-5 h-px w-12 bg-[var(--tan)]" />
            </FadeUp>

            <div className="mt-10 flex flex-col gap-8">
              {techStack.map((item, i) => (
                <FadeUp key={item.category} delay={i * 0.1}>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 border-b border-[var(--tan-light)] pb-6">
                    <p className="sm:w-28 sm:shrink-0 text-xs tracking-widest uppercase text-[var(--brown-muted)] sm:pt-1">
                      {item.category}
                    </p>
                    <p className="text-[var(--text)] leading-relaxed">{item.items}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </>
      )}
    </aside>
  );
}
